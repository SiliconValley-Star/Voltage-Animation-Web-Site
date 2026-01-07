import React, { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import { useLenis } from '@studio-freight/react-lenis';

const ScrollManager: React.FC = () => {
    const lenis = useLenis(({ scroll }) => {
        // Optional: Real-time scroll logging or simpler sessionStorage updates if needed
        // But updating storage on every frame is expensive. We'll do it on unmount/change.
    });

    const location = useLocation();
    const navType = useNavigationType();

    // Save scroll position before leaving the current page
    useEffect(() => {
        // Current key for the page we are ON
        const key = `scroll-pos-${location.key}`;

        // Function to save current scroll
        const saveScroll = () => {
            if (lenis && lenis.scroll !== undefined) {
                sessionStorage.setItem(key, lenis.scroll.toString());
            } else {
                sessionStorage.setItem(key, window.scrollY.toString());
            }
        };

        // Save periodically or just assume we save before route change via cleanup?
        // Cleanup runs AFTER route change usually in React, which might be tricky for "current" key if it changed.
        // Actually, location.key changes on route change. So the effect for the *previous* location unmounts.
        // The previous location's effect cleanup "should" capture the scroll state... 
        // BUT, lenis might have already reset or we might race.
        // Better strategy: Save continuously or on specific events?
        // Let's try saving on 'beforeunload' and periodically (debounce) or just rely on the fact that 
        // we want to restore specifically.

        // Actually, React Router v6+:
        // We can just save the scroll position of the *current* page when we are about to leave it.
        // But how do we detect "leaving"?
        // The effect cleanup function runs when location changes.

        return () => {
            saveScroll();
        };
    }, [location.key, lenis]);

    // Restore scroll or reset on mount/update
    useEffect(() => {
        if (!lenis) return;

        const key = `scroll-pos-${location.key}`;

        // Handle Navigation Types
        if (navType === 'POP') {
            const savedScroll = sessionStorage.getItem(key);
            if (savedScroll) {
                const targetScroll = parseFloat(savedScroll);

                // Smart Restoration:
                // 1. Attempt immediate restoration
                // 2. If target > limit, wait for layout expansion

                const restore = () => {
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
                };

                // Initial attempt
                const success = restore();

                if (!success) {
                    // We are clamped. Valid height hasn't been reached yet.
                    // Observe body resize to retry when height grows.
                    const resizeObserver = new ResizeObserver(() => {
                        if (restore()) {
                            // If we successfully reached the target (limit >= target), stop observing
                            resizeObserver.disconnect();
                        }
                    });

                    resizeObserver.observe(document.body);

                    // Safety timeout: stop trying after 2 seconds
                    setTimeout(() => resizeObserver.disconnect(), 2000);

                    return () => resizeObserver.disconnect();
                }
            }
        } else {
            // PUSH or REPLACE
            if (location.hash) {
                const target = document.querySelector(location.hash);
                if (target) {
                    lenis.scrollTo(target as HTMLElement, { immediate: true });
                } else {
                    // Wait for element
                    const observer = new MutationObserver(() => {
                        const t = document.querySelector(location.hash);
                        if (t) {
                            lenis.scrollTo(t as HTMLElement, { immediate: true });
                            observer.disconnect();
                        }
                    });
                    observer.observe(document.body, { childList: true, subtree: true });
                    setTimeout(() => observer.disconnect(), 1000);
                }
            } else {
                lenis.scrollTo(0, { immediate: true });
            }
        }

        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }

    }, [location, navType, lenis]);

    return null;
};

export default ScrollManager;
