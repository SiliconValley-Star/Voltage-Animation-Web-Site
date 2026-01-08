import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useScrollState } from './ScrollStore';

// Google Analytics configuration
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with actual GA4 ID

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window === 'undefined') return;

  // Create gtag script
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script1);

  // Initialize dataLayer and gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() {
    window.dataLayer.push(arguments);
  };

  // Configure GA
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: false, // We'll handle this manually for SPA
    custom_map: {
      'custom_parameter_1': 'company_type'
    }
  });

  console.log('Google Analytics initialized');
};

// Track page views
export const trackPageView = (path: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: path,
      page_title: title
    });

    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title
    });
  }
};

// Track custom events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    });
  }
};

// Track business-specific events
export const trackBusinessEvent = {
  // Contact form interactions
  contactForm: (action: 'start' | 'complete' | 'error', method?: string) => {
    trackEvent(action, 'contact_form', method);
  },

  // Service page views
  serviceView: (serviceName: string, serviceCategory: string) => {
    trackEvent('view_service', 'services', serviceName);
    window.gtag && window.gtag('event', 'view_item', {
      item_category: serviceCategory,
      item_name: serviceName,
      content_type: 'service'
    });
  },

  // Project page views  
  projectView: (projectName: string, projectCategory: string, location?: string) => {
    trackEvent('view_project', 'projects', projectName);
    window.gtag && window.gtag('event', 'view_item', {
      item_category: projectCategory,
      item_name: projectName,
      content_type: 'project',
      custom_parameter_1: location
    });
  },

  // WhatsApp clicks
  whatsappClick: (source: string) => {
    trackEvent('whatsapp_click', 'contact', source);
  },

  // Neural chat interactions
  chatInteraction: (action: 'open' | 'message_sent' | 'close') => {
    trackEvent(action, 'chat_widget');
  },

  // Download events (if any PDFs, brochures etc.)
  download: (fileName: string, fileType: string) => {
    trackEvent('download', 'files', fileName);
    window.gtag && window.gtag('event', 'file_download', {
      file_name: fileName,
      file_extension: fileType
    });
  },

  // Scroll depth tracking
  scrollDepth: (percentage: number) => {
    if (percentage === 25 || percentage === 50 || percentage === 75 || percentage === 100) {
      trackEvent('scroll', 'engagement', `${percentage}%`, percentage);
    }
  }
};

// Analytics component for page tracking
const Analytics: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Initialize GA on first load
    if (!window.gtag) {
      initGA();
    }
  }, []);

  useEffect(() => {
    // Track page changes in SPA
    const path = location.pathname + location.search;
    const title = document.title;
    
    // Small delay to ensure page title is updated
    setTimeout(() => {
      trackPageView(path, title);
    }, 100);
  }, [location]);

  // Optimized scroll depth tracking using ScrollStore
  const { scrollProgress } = useScrollState();
  
  useEffect(() => {
    const trackedPercentages = new Set<number>();
    
    const scrollPercent = Math.floor(scrollProgress * 100);
    
    [25, 50, 75, 100].forEach(milestone => {
      if (scrollPercent >= milestone && !trackedPercentages.has(milestone)) {
        trackedPercentages.add(milestone);
        trackBusinessEvent.scrollDepth(milestone);
      }
    });
  }, [scrollProgress]);

  return null; // This component doesn't render anything
};

export default Analytics;