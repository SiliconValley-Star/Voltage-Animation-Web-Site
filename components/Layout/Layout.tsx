import React, { useState, useEffect, useRef } from 'react';
import ReactLenis from '@studio-freight/react-lenis';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import IgnitionLoader from '../UI/IgnitionLoader';
import { AppState } from '../../types';

const Layout: React.FC = () => {
    const [appState, setAppState] = useState<AppState>(AppState.IGNITION);
    const lenisRef = useRef<any>(null);
    const location = useLocation();

    // Reset scroll on route change
    useEffect(() => {
        if (lenisRef.current?.lenis) {
            lenisRef.current.lenis.scrollTo(0, { immediate: true });
        }
        window.scrollTo(0, 0);
    }, [location.pathname]);

    useEffect(() => {
        const body = document.body;
        const html = document.documentElement;

        if (appState === AppState.IGNITION) {
            // Lock Scroll
            if (lenisRef.current?.lenis) lenisRef.current.lenis.stop();
            body.style.overflow = 'hidden';
            html.style.overflow = 'hidden';
        } else {
            // Unlock Scroll
            if (lenisRef.current?.lenis) lenisRef.current.lenis.start();

            body.style.removeProperty('overflow');
            body.style.removeProperty('height');
            html.style.removeProperty('overflow');
            html.style.removeProperty('height');

            body.style.overflowY = 'auto';
            body.style.overflowX = 'hidden';
        }
    }, [appState]);

    const handleIgnitionComplete = () => {
        setAppState(AppState.RUNNING);
    };

    return (
        <ReactLenis
            ref={lenisRef}
            root
            options={{
                duration: 1.2,
                smoothWheel: true,
                touchMultiplier: 2,
                wheelMultiplier: 1.2,
            }}
        >
            <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F] relative w-full overflow-x-hidden flex flex-col justify-between">

                {/* Loading Screen - Only runs once on initial load ideally, but for now kept simple */}
                <IgnitionLoader onComplete={handleIgnitionComplete} />

                {/* Global Transitions */}
                <div className={`transition-opacity duration-1000 w-full flex-grow ${appState === AppState.RUNNING ? 'opacity-100' : 'opacity-0'}`}>
                    <Header />

                    <main className="w-full relative z-10 flex-grow">
                        <Outlet />
                    </main>

                    <Footer />
                </div>
            </div>
        </ReactLenis>
    );
};

export default Layout;
