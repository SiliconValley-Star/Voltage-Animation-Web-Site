import React, { createContext, useContext, useEffect, useState, useRef, ReactNode, useCallback, useMemo } from 'react';

interface ScrollState {
  scrollY: number;
  scrollProgress: number;
  scrollDirection: 'up' | 'down';
  scrollVelocity: number;
  isScrolling: boolean;
}

interface ScrollContextType {
  scrollState: ScrollState;
  subscribeToScroll: (callback: (state: ScrollState) => void) => () => void;
}

const ScrollContext = createContext<ScrollContextType | null>(null);

interface ScrollProviderProps {
  children: ReactNode;
}

export const ScrollProvider: React.FC<ScrollProviderProps> = ({ children }) => {
  const [scrollState, setScrollState] = useState<ScrollState>({
    scrollY: 0,
    scrollProgress: 0,
    scrollDirection: 'down',
    scrollVelocity: 0,
    isScrolling: false
  });

  const subscribersRef = useRef<Set<(state: ScrollState) => void>>(new Set());
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(Date.now());
  const scrollTimeoutRef = useRef<number>();
  const requestRef = useRef<number>();
  
  // Cache DOM measurements to avoid repeated queries
  const documentMetricsRef = useRef({
    height: 0,
    innerHeight: 0,
    lastUpdate: 0
  });

  const subscribeToScroll = useCallback((callback: (state: ScrollState) => void) => {
    subscribersRef.current.add(callback);
    // Immediately call with current state
    try {
      callback(scrollState);
    } catch (error) {
      console.warn('Scroll subscription callback error:', error);
      subscribersRef.current.delete(callback);
    }
    
    return () => {
      subscribersRef.current.delete(callback);
    };
  }, [scrollState]);

  // Optimized DOM measurement caching
  const getDocumentMetrics = useCallback(() => {
    const now = Date.now();
    const cache = documentMetricsRef.current;
    
    // Update metrics cache every 100ms to balance performance and accuracy
    if (now - cache.lastUpdate > 100) {
      cache.height = document.documentElement.scrollHeight;
      cache.innerHeight = window.innerHeight;
      cache.lastUpdate = now;
    }
    
    return cache;
  }, []);

  const updateScrollState = useCallback(() => {
    try {
      const currentScrollY = window.scrollY;
      const currentTime = Date.now();
      const deltaTime = currentTime - lastScrollTime.current;
      const deltaScroll = currentScrollY - lastScrollY.current;

      // Use cached document metrics
      const metrics = getDocumentMetrics();
      const documentHeight = metrics.height - metrics.innerHeight;
      const scrollProgress = documentHeight > 0 ? Math.min(currentScrollY / documentHeight, 1) : 0;

      // Calculate velocity (pixels per millisecond) with bounds checking
      const velocity = deltaTime > 0 ? Math.min(Math.abs(deltaScroll / deltaTime), 10) : 0;

      // Determine direction with current state reference
      const direction = deltaScroll > 0 ? 'down' : deltaScroll < 0 ? 'up' : scrollState.scrollDirection;

      const newScrollState: ScrollState = {
        scrollY: currentScrollY,
        scrollProgress,
        scrollDirection: direction,
        scrollVelocity: velocity,
        isScrolling: true
      };

      setScrollState(newScrollState);

      // Notify all subscribers with error handling
      if (subscribersRef.current.size > 0) {
        subscribersRef.current.forEach(callback => {
          try {
            callback(newScrollState);
          } catch (error) {
            console.warn('Scroll callback error:', error);
            subscribersRef.current.delete(callback);
          }
        });
      }

      // Update refs
      lastScrollY.current = currentScrollY;
      lastScrollTime.current = currentTime;

      // Clear and set timeout for stopped state
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      scrollTimeoutRef.current = window.setTimeout(() => {
        const stoppedState = { ...newScrollState, isScrolling: false, scrollVelocity: 0 };
        setScrollState(stoppedState);
        
        // Notify subscribers of stopped state
        subscribersRef.current.forEach(callback => {
          try {
            callback(stoppedState);
          } catch (error) {
            console.warn('Scroll callback error:', error);
            subscribersRef.current.delete(callback);
          }
        });
      }, 150);
    } catch (error) {
      console.warn('Scroll state update error:', error);
    }
  }, [scrollState.scrollDirection, getDocumentMetrics]);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestRef.current = requestAnimationFrame(() => {
          updateScrollState();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Handle resize to update cached metrics
    const handleResize = () => {
      documentMetricsRef.current.lastUpdate = 0; // Force metrics refresh
    };

    // Initial state
    updateScrollState();

    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      // Clear all subscribers on unmount
      subscribersRef.current.clear();
    };
  }, [updateScrollState]);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue: ScrollContextType = useMemo(() => ({
    scrollState,
    subscribeToScroll
  }), [scrollState, subscribeToScroll]);

  return (
    <ScrollContext.Provider value={contextValue}>
      {children}
    </ScrollContext.Provider>
  );
};

// Hook to use scroll state
export const useScrollState = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error('useScrollState must be used within a ScrollProvider');
  }
  return context.scrollState;
};

// Hook to subscribe to scroll changes
export const useScrollSubscription = (callback: (state: ScrollState) => void) => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error('useScrollSubscription must be used within a ScrollProvider');
  }

  useEffect(() => {
    return context.subscribeToScroll(callback);
  }, [callback, context]);
};

// Optimized scroll hook for specific use cases
export const useThrottledScroll = (
  callback: (scrollY: number, progress: number) => void,
  throttleMs: number = 16
) => {
  const lastCallTime = useRef(0);
  
  useScrollSubscription((state) => {
    const now = Date.now();
    if (now - lastCallTime.current >= throttleMs) {
      callback(state.scrollY, state.scrollProgress);
      lastCallTime.current = now;
    }
  });
};

// Export the provider as default for easy import
export default ScrollProvider;