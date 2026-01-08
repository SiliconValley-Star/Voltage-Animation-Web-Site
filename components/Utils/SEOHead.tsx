import React from 'react';
import { SERVICES_DATA } from '../Pages/servicesData';
import { NAV_ITEMS } from '../../constants';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  currentPath?: string;
  breadcrumbs?: Array<{ name: string; url: string }>;
}

// Company Information
const COMPANY_INFO = {
  name: 'Şensoy Elektrik Elektronik İnşaat Proje Taahhüt San.Tic.Ltd.',
  shortName: 'Şensoy Elektrik',
  url: 'https://www.sensoyelektrik.com',
  telephone: '+90 (212) 555 55 55',
  email: 'info@sensoyelektrik.com',
  foundingDate: '2014',
  address: {
    streetAddress: 'Halide Edip Adıvar Cad. No:105/A',
    addressLocality: 'İstanbul',
    addressRegion: 'İstanbul',
    postalCode: '34000',
    addressCountry: 'TR'
  },
  sameAs: [
    'https://www.linkedin.com/company/sensoy-elektrik',
    'https://www.facebook.com/sensoyelektrik',
    'https://www.instagram.com/sensoyelektrik',
    'https://twitter.com/sensoyelektrik'
  ]
};

const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'Şensoy Elektrik - Elektrik Taahhüt ve Mühendislik',
  description = 'Yüksek Gerilim, Orta Gerilim, Alçak Gerilim ve Zayıf Akım sistemlerinde 10+ yıl deneyim. Endüstriyel tesisler, data center ve akıllı bina çözümleri.',
  keywords = 'elektrik taahhüt, yüksek gerilim, orta gerilim, alçak gerilim, zayıf akım, elektrik mühendislik, trafo merkezi, jeneratör, ups, bms, yangın algılama',
  image = '/images/og-image.jpg',
  url,
  type = 'website',
  author = 'Şensoy Elektrik',
  publishedTime,
  modifiedTime,
  currentPath = '/',
  breadcrumbs = []
}) => {
  
  // Dynamic URL generation based on current path
  const baseUrl = COMPANY_INFO.url;
  const currentUrl = url || `${baseUrl}${currentPath === '/' ? '' : currentPath}`;
  
  // Construct full URL for image if relative
  const fullImageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`;
  const fullTitle = title === 'Şensoy Elektrik - Elektrik Taahhüt ve Mühendislik' ? title : `${title} | Şensoy Elektrik`;

  // Generate rich schemas
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness", "ElectricalContractor"],
    "@id": `${baseUrl}/#organization`,
    "name": COMPANY_INFO.name,
    "alternateName": COMPANY_INFO.shortName,
    "url": COMPANY_INFO.url,
    "telephone": COMPANY_INFO.telephone,
    "email": COMPANY_INFO.email,
    "foundingDate": COMPANY_INFO.foundingDate,
    "image": fullImageUrl,
    "description": description,
    "logo": {
      "@type": "ImageObject",
      "url": `${baseUrl}/images/logo.png`,
      "width": 400,
      "height": 400
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": COMPANY_INFO.address.streetAddress,
      "addressLocality": COMPANY_INFO.address.addressLocality,
      "addressRegion": COMPANY_INFO.address.addressRegion,
      "postalCode": COMPANY_INFO.address.postalCode,
      "addressCountry": COMPANY_INFO.address.addressCountry
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 41.0082,
      "longitude": 28.9784
    },
    "numberOfEmployees": "10-50",
    "serviceArea": {
      "@type": "Country",
      "name": "Turkey"
    },
    "areaServed": ["Turkey", "İstanbul", "Ankara", "İzmir"],
    "sameAs": COMPANY_INFO.sameAs,
    "openingHours": ["Mo-Fr 08:00-18:00", "Sa 09:00-15:00"],
    "priceRange": "$$",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Elektrik Taahhüt Hizmetleri",
      "itemListElement": SERVICES_DATA.map(service => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": service.title,
          "description": service.description,
          "provider": {
            "@id": `${baseUrl}/#organization`
          },
          "serviceType": service.category,
          "availableAtOrFrom": {
            "@id": `${baseUrl}/#organization`
          }
        }
      }))
    },
    "makesOffer": SERVICES_DATA.slice(0, 10).map(service => ({
      "@type": "Service",
      "@id": `${baseUrl}/services/${service.slug}`,
      "name": service.title,
      "description": service.description,
      "serviceType": service.category,
      "provider": {
        "@id": `${baseUrl}/#organization`
      }
    }))
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    "url": baseUrl,
    "name": COMPANY_INFO.shortName,
    "description": description,
    "publisher": {
      "@id": `${baseUrl}/#organization`
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "inLanguage": "tr-TR"
  };

  const breadcrumbSchema = breadcrumbs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`
    }))
  } : null;

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": currentUrl,
    "url": currentUrl,
    "name": fullTitle,
    "description": description,
    "isPartOf": {
      "@id": `${baseUrl}/#website`
    },
    "about": {
      "@id": `${baseUrl}/#organization`
    },
    "author": {
      "@id": `${baseUrl}/#organization`
    },
    "inLanguage": "tr-TR",
    ...(type === 'article' && publishedTime && {
      "datePublished": publishedTime,
      "dateModified": modifiedTime || publishedTime
    })
  };

  return (
    <>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#2997FF" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content="Şensoy Elektrik" />
      <meta property="og:locale" content="tr_TR" />
      
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && (
        <meta property="article:author" content={author} />
      )}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:image:alt" content={title} />
      
      {/* Business/Company specific */}
      <meta name="company" content={COMPANY_INFO.name} />
      <meta name="industry" content="Elektrik Mühendislik ve Taahhüt" />
      <meta name="location" content="İstanbul, Türkiye" />
      <meta name="established" content={COMPANY_INFO.foundingDate} />
      
      {/* Technical SEO */}
      <meta name="format-detection" content="telephone=no" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      
      {/* PWA Meta Tags */}
      <meta name="application-name" content="Şensoy Elektrik" />
      <meta name="apple-mobile-web-app-title" content="Şensoy Elektrik" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://images.unsplash.com" />
      
      {/* DNS prefetch for better performance */}
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      <link rel="dns-prefetch" href="//schema.org" />
      
      {/* Rich Structured Data Schemas */}
      
      {/* Organization + LocalBusiness Schema */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>

      {/* Website Schema with SearchAction */}
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>

      {/* Breadcrumb Schema */}
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}

      {/* WebPage Schema */}
      <script type="application/ld+json">
        {JSON.stringify(webPageSchema)}
      </script>

      {/* Navigation Links for Sitelinks */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SiteNavigationElement",
          "name": NAV_ITEMS.map(item => item.label),
          "url": NAV_ITEMS.map(item => `${baseUrl}${item.href}`),
          "mainEntityOfPage": {
            "@id": currentUrl
          }
        })}
      </script>

      {/* Service Categories Schema for better categorization */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Elektrik Taahhüt Hizmetleri",
          "description": "Şensoy Elektrik'in sunduğu tüm elektrik mühendislik hizmetleri",
          "url": `${baseUrl}/services`,
          "numberOfItems": SERVICES_DATA.length,
          "itemListElement": SERVICES_DATA.slice(0, 20).map((service, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "Service",
              "@id": `${baseUrl}/services/${service.slug}`,
              "name": service.title,
              "description": service.description,
              "serviceType": service.category,
              "provider": {
                "@id": `${baseUrl}/#organization`
              },
              "offers": {
                "@type": "Offer",
                "availability": "https://schema.org/InStock",
                "itemCondition": "https://schema.org/NewCondition"
              }
            }
          }))
        })}
      </script>
    </>
  );
};

export default SEOHead;