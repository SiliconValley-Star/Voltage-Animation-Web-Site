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
import SEOHead from '../Utils/SEOHead';

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
        <>
            <SEOHead
                title="Şensoy Elektrik | Elektrik Taahhüt ve Mühendislik"
                description="YG, OG, AG ve ZA sistemlerinde 10+ yıl deneyim. Endüstriyel tesisler, data center ve akıllı bina elektrik mühendislik çözümleri."
                keywords="elektrik taahhüt, yüksek gerilim, orta gerilim, alçak gerilim, zayıf akım, elektrik mühendislik, trafo merkezi, jeneratör, ups, bms, yangın algılama, şensoy elektrik"
                currentPath="/"
                type="website"
                breadcrumbs={[]}
            />
            <main id="main-content" className="w-full bg-transparent overflow-x-hidden relative" role="main">
                <section aria-labelledby="hero-section">
                    <Hero />
                </section>
                <section aria-labelledby="services-section">
                    <Services />
                </section>
                <section aria-labelledby="transmission-section">
                    <Transmission />
                </section>
                <section aria-labelledby="impact-section">
                    <GlobalImpact />
                </section>
                <section aria-labelledby="projects-section">
                    <FeaturedProjects />
                </section>
                <section aria-labelledby="news-section">
                    <LatestNews />
                </section>
                <section aria-labelledby="partners-section">
                    <Partners />
                </section>
                <section aria-labelledby="contact-section">
                    <ContactCTA />
                </section>
            </main>
        </>
    );
};

export default Home;
