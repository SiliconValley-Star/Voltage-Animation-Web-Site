import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface PreloadRule {
  currentRoute: string;
  preloadRoutes: string[];
  condition?: () => boolean;
  delay?: number;
}

// Smart preloading rules based on user journey patterns
const PRELOAD_RULES: PreloadRule[] = [
  {
    currentRoute: '/',
    preloadRoutes: ['/services', '/projects'],
    delay: 2000 // Wait 2 seconds on homepage before preloading
  },
  {
    currentRoute: '/services',
    preloadRoutes: ['/projects', '/contact'],
    delay: 1000
  },
  {
    currentRoute: '/projects',
    preloadRoutes: ['/contact', '/services'],
    delay: 1000
  },
  {
    currentRoute: '/about',
    preloadRoutes: ['/services', '/contact'],
    delay: 1500
  },
  {
    currentRoute: '/blog',
    preloadRoutes: ['/services', '/contact'],
    delay: 1500
  }
];

// Component import functions for lazy loading
const componentLoaders = {
  '/services': () => import('../Pages/ServicesPage'),
  '/projects': () => import('../Pages/ProjectsPage'),
  '/contact': () => import('../Pages/ContactPage'),
  '/about': () => import('../Pages/AboutPage'),
  '/blog': () => import('../Pages/BlogPage'),
  '/services/:slug': () => import('../Pages/ServiceDetailPage'),
  '/projects/:slug': () => import('../Pages/ProjectDetailPage'),
  '/blog/:slug': () => import('../Pages/BlogDetailPage')
};

// Preload cache to avoid duplicate loads
const preloadCache = new Set<string>();

// Intelligent preloader based on intersection observer and user behavior
class PreloaderService {
  private static instance: PreloaderService;
  private activeTimeouts = new Set<number>();
  private loadingPromises = new Map<string, Promise<any>>();
  
  public static getInstance(): PreloaderService {
    if (!PreloaderService.instance) {
      PreloaderService.instance = new PreloaderService();
    }
    return PreloaderService.instance;
  }

  // Cleanup method to prevent memory leaks
  public cleanup(): void {
    this.activeTimeouts.forEach(id => clearTimeout(id));
    this.activeTimeouts.clear();
    this.loadingPromises.clear();
  }

  preloadComponent(route: string): Promise<any> | null {
    // Return existing promise if already loading
    if (this.loadingPromises.has(route)) {
      return this.loadingPromises.get(route)!;
    }

    if (preloadCache.has(route)) {
      return null; // Already preloaded
    }

    const loader = componentLoaders[route as keyof typeof componentLoaders];
    if (!loader) {
      return null;
    }

    // Add to cache immediately to prevent duplicate requests
    preloadCache.add(route);
    
    const loadPromise = loader()
      .then(module => {
        console.log(`✅ Preloaded component: ${route}`);
        this.loadingPromises.delete(route);
        return module;
      })
      .catch(error => {
        console.warn(`❌ Failed to preload component: ${route}`, error);
        preloadCache.delete(route); // Remove from cache so it can be retried
        this.loadingPromises.delete(route);
        throw error;
      });

    this.loadingPromises.set(route, loadPromise);
    return loadPromise;
  }

  preloadWithConditions(currentRoute: string): void {
    const rule = PRELOAD_RULES.find(r => r.currentRoute === currentRoute);
    if (!rule) return;

    // Check condition if provided
    if (rule.condition && !rule.condition()) {
      return;
    }

    // Apply delay if specified
    const delay = rule.delay || 0;
    
    const timeoutId = window.setTimeout(() => {
      this.activeTimeouts.delete(timeoutId);
      rule.preloadRoutes.forEach(route => {
        this.preloadComponent(route);
      });
    }, delay);
    
    this.activeTimeouts.add(timeoutId);
  }
}

// Hook for component preloading with optimized event handling
export const useComponentPreloader = () => {
  const location = useLocation();
  const preloader = PreloaderService.getInstance();

  // Cleanup when component unmounts
  useEffect(() => {
    return () => {
      preloader.cleanup();
    };
  }, [preloader]);

  useEffect(() => {
    // Preload components based on current route
    preloader.preloadWithConditions(location.pathname);
  }, [location.pathname, preloader]);

  useEffect(() => {
    let hoverTimeout: number | null = null;

    // Throttled hover handler to prevent excessive preloading
    const handleLinkHover = (event: MouseEvent) => {
      if (hoverTimeout) return; // Throttle hover events
      
      const target = event.target as HTMLElement;
      const link = target.closest('a[href^="/"]');
      
      if (link) {
        const href = link.getAttribute('href');
        if (href && href !== location.pathname && href.startsWith('/')) {
          hoverTimeout = window.setTimeout(() => {
            preloader.preloadComponent(href);
            hoverTimeout = null;
          }, 50); // Debounce hover events
        }
      }
    };

    // Optimized focus handler
    const handleLinkFocus = (event: FocusEvent) => {
      const target = event.target as HTMLElement;
      if (target.tagName === 'A') {
        const href = target.getAttribute('href');
        if (href && href !== location.pathname && href.startsWith('/')) {
          preloader.preloadComponent(href);
        }
      }
    };

    // Add passive event listeners for better performance
    document.addEventListener('mouseover', handleLinkHover, { passive: true });
    document.addEventListener('focusin', handleLinkFocus, { passive: true });

    return () => {
      document.removeEventListener('mouseover', handleLinkHover);
      document.removeEventListener('focusin', handleLinkFocus);
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
    };
  }, [location.pathname, preloader]);

  // Preload on idle with better resource management
  useEffect(() => {
    if (!('requestIdleCallback' in window)) return;

    const idleCallback = window.requestIdleCallback(() => {
      // Only preload if not already loaded and network is good
      const connection = (navigator as any).connection;
      const isSlowConnection = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');
      
      if (isSlowConnection) return; // Skip on slow connections

      // Batch preload with priorities
      const priorityRoutes = ['/services', '/projects', '/contact'];
      const otherRoutes = Object.keys(componentLoaders).filter(route => !priorityRoutes.includes(route));
      
      // Preload priority routes first
      priorityRoutes.forEach(route => {
        if (!preloadCache.has(route)) {
          preloader.preloadComponent(route);
        }
      });

      // Then preload others with a delay
      setTimeout(() => {
        otherRoutes.forEach(route => {
          if (!preloadCache.has(route)) {
            preloader.preloadComponent(route);
          }
        });
      }, 1000);
    }, { timeout: 5000 });

    return () => {
      if ('cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleCallback);
      }
    };
  }, [preloader]);

  return {
    preloadComponent: preloader.preloadComponent.bind(preloader)
  };
};

// Prefetch component for manual preloading
const ComponentPreloader: React.FC = () => {
  useComponentPreloader();
  return null; // This component doesn't render anything
};

// Image preloader utility
export const preloadImages = (imageUrls: string[]): Promise<void[]> => {
  const preloadPromises = imageUrls.map(url => {
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
      img.src = url;
    });
  });

  return Promise.all(preloadPromises);
};

// Critical resource preloader
export const preloadCriticalResources = () => {
  // Preload critical CSS
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'style';
  link.href = '/assets/critical.css';
  document.head.appendChild(link);

  // Preload critical fonts
  const fontUrls = [
    '/assets/fonts/inter-var.woff2',
    '/assets/fonts/jetbrains-mono.woff2'
  ];

  fontUrls.forEach(url => {
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.as = 'font';
    fontLink.type = 'font/woff2';
    fontLink.href = url;
    fontLink.crossOrigin = 'anonymous';
    document.head.appendChild(fontLink);
  });

  // Preload hero images
  const heroImages = [
    '/images/hero-bg.webp',
    '/images/transformer-hero.webp'
  ];

  preloadImages(heroImages).catch(console.warn);
};

export default ComponentPreloader;