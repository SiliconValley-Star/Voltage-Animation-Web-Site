import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import { useLenis } from '@studio-freight/react-lenis';

const ScrollManager: React.FC = () => {
    const lenis = useLenis(({ scroll }) => {
        // Optional: Real-time scroll logging or simpler sessionStorage updates if needed
        // But updating storage on every frame is expensive. We'll do it on unmount/change.
    });

    const location = useLocation();
    const navType = useNavigationType();
    
    // Ref to track active observers and timeouts for cleanup
    const cleanupRef = useRef<{
        resizeObserver?: ResizeObserver;
        mutationObserver?: MutationObserver;
        timeoutId?: number;
    }>({});

    // Save scroll position before leaving the current page
    useEffect(() => {
        // Current key for the page we are ON
        const key = `scroll-pos-${location.key}`;

        // Function to save current scroll with error handling
        const saveScroll = () => {
            try {
                if (lenis && lenis.scroll !== undefined) {
                    sessionStorage.setItem(key, lenis.scroll.toString());
                } else {
                    sessionStorage.setItem(key, window.scrollY.toString());
                }
            } catch (error) {
                console.warn('Failed to save scroll position:', error);
            }
        };

        return () => {
            saveScroll();
        };
    }, [location.key, lenis]);

    // Restore scroll or reset on mount/update
    useEffect(() => {
        if (!lenis) return;

        // Clear any existing observers/timeouts from previous effect runs
        const cleanup = cleanupRef.current;
        cleanup.resizeObserver?.disconnect();
        cleanup.mutationObserver?.disconnect();
        if (cleanup.timeoutId) {
            clearTimeout(cleanup.timeoutId);
        }

        const key = `scroll-pos-${location.key}`;

        // Handle Navigation Types
        if (navType === 'POP') {
            const savedScroll = sessionStorage.getItem(key);
            if (savedScroll) {
                const targetScroll = parseFloat(savedScroll);

                // Smart Restoration with proper cleanup
                const restore = () => {
                    try {
                        // Force recalculation of dimensions
                        lenis.resize();

                        // Check if we can scroll to target
                        if (lenis.limit >= targetScroll) {
                            lenis.scrollTo(targetScroll, { immediate: true });
                            return true; // Success
                        }
                        // Attempt to scroll as far as possible anyway
                        lenis.scrollTo(targetScroll, { immediate: true });
                        return false; // Clamped
                    } catch (error) {
                        console.warn('Scroll restoration failed:', error);
                        return true; // Treat as success to avoid infinite retry
                    }
                };

                // Initial attempt
                const success = restore();

                if (!success) {
                    // We are clamped. Valid height hasn't been reached yet.
                    // Observe body resize to retry when height grows.
                    const resizeObserver = new ResizeObserver(() => {
                        if (restore()) {
                            // Success - cleanup observer
                            resizeObserver.disconnect();
                            cleanupRef.current.resizeObserver = undefined;
                        }
                    });

                    resizeObserver.observe(document.body);
                    cleanupRef.current.resizeObserver = resizeObserver;

                    // Safety timeout: stop trying after 2 seconds
                    cleanupRef.current.timeoutId = window.setTimeout(() => {
                        resizeObserver.disconnect();
                        cleanupRef.current.resizeObserver = undefined;
                        cleanupRef.current.timeoutId = undefined;
                    }, 2000);
                }
            }
        } else {
            // PUSH or REPLACE
            if (location.hash) {
                const target = document.querySelector(location.hash);
                if (target) {
                    try {
                        lenis.scrollTo(target as HTMLElement, { immediate: true });
                    } catch (error) {
                        console.warn('Hash scroll failed:', error);
                    }
                } else {
                    // Wait for element with proper cleanup
                    const observer = new MutationObserver(() => {
                        const t = document.querySelector(location.hash);
                        if (t) {
                            try {
                                lenis.scrollTo(t as HTMLElement, { immediate: true });
                            } catch (error) {
                                console.warn('Hash scroll failed:', error);
                            }
                            observer.disconnect();
                            cleanupRef.current.mutationObserver = undefined;
                        }
                    });
                    
                    observer.observe(document.body, { childList: true, subtree: true });
                    cleanupRef.current.mutationObserver = observer;
                    
                    // Safety timeout for mutation observer
                    cleanupRef.current.timeoutId = window.setTimeout(() => {
                        observer.disconnect();
                        cleanupRef.current.mutationObserver = undefined;
                        cleanupRef.current.timeoutId = undefined;
                    }, 1000);
                }
            } else {
                try {
                    lenis.scrollTo(0, { immediate: true });
                } catch (error) {
                    console.warn('Scroll to top failed:', error);
                }
            }
        }

        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }

        // Cleanup function for this effect
        return () => {
            const cleanup = cleanupRef.current;
            cleanup.resizeObserver?.disconnect();
            cleanup.mutationObserver?.disconnect();
            if (cleanup.timeoutId) {
                clearTimeout(cleanup.timeoutId);
            }
            // Reset refs
            cleanupRef.current = {};
        };

    }, [location, navType, lenis]);

    return null;
};

export default ScrollManager;
