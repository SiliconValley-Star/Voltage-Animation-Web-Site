import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../Sections/Hero';
import Services from '../Sections/Services';
import GlobalImpact from '../Sections/GlobalImpact';
import Transmission from '../Sections/Transmission';
import Partners from '../Sections/Partners';
import FeaturedProjects from '../Sections/FeaturedProjects';
import LatestNews from '../Sections/LatestNews';
import ContactCTA from '../Sections/ContactCTA';

const Home: React.FC = () => {
    const { hash } = useLocation();

    // Scroll to section based on hash
    useEffect(() => {
        if (hash) {
            const element = document.querySelector(hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [hash]);

    return (
        <div className="w-full bg-transparent overflow-x-hidden relative">
            <Hero />
            <Services />
            <Transmission />
            <GlobalImpact />
            <FeaturedProjects />
            <LatestNews />
            <Partners />
            <ContactCTA />
        </div>
    );
};

export default Home;
