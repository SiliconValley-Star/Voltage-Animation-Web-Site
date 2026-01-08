import React, { useState, useRef, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onLoad?: () => void;
  onError?: () => void;
  sizes?: string;
  loading?: 'lazy' | 'eager';
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  quality = 75,
  placeholder = 'empty',
  blurDataURL,
  onLoad,
  onError,
  sizes,
  loading = 'lazy'
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || isInView) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px',
        threshold: 0.1
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [priority, isInView]);

  // Generate optimized image URLs
  const generateSrcSet = (baseSrc: string) => {
    if (baseSrc.includes('unsplash.com')) {
      // Unsplash optimization
      const baseUrl = baseSrc.split('?')[0];
      return [
        `${baseUrl}?w=400&q=${quality} 400w`,
        `${baseUrl}?w=800&q=${quality} 800w`,
        `${baseUrl}?w=1200&q=${quality} 1200w`,
        `${baseUrl}?w=1600&q=${quality} 1600w`,
      ].join(', ');
    }
    
    // For local images or other sources
    return undefined;
  };

  const getOptimizedSrc = (baseSrc: string, targetWidth?: number) => {
    if (baseSrc.includes('unsplash.com')) {
      const baseUrl = baseSrc.split('?')[0];
      return `${baseUrl}?w=${targetWidth || 800}&q=${quality}`;
    }
    return baseSrc;
  };

  // Handle image load
  const handleLoad = () => {
    setImageLoaded(true);
    onLoad?.();
  };

  // Handle image error
  const handleError = () => {
    setImageError(true);
    onError?.();
  };

  // Placeholder styles
  const placeholderStyle: React.CSSProperties = {
    backgroundColor: '#f3f4f6',
    backgroundImage: placeholder === 'blur' && blurDataURL 
      ? `url(${blurDataURL})` 
      : 'linear-gradient(45deg, #f9fafb 25%, transparent 25%), linear-gradient(-45deg, #f9fafb 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f9fafb 75%), linear-gradient(-45deg, transparent 75%, #f9fafb 75%)',
    backgroundSize: placeholder === 'blur' ? 'cover' : '20px 20px',
    backgroundPosition: placeholder === 'blur' ? 'center' : '0 0, 0 10px, 10px -10px, -10px 0px'
  };

  // Container styles
  const containerClasses = `
    relative overflow-hidden transition-all duration-300
    ${className}
    ${imageLoaded ? 'opacity-100' : 'opacity-90'}
  `.trim();

  // Image styles
  const imageClasses = `
    transition-all duration-700 ease-out
    ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}
    ${imageError ? 'hidden' : 'block'}
  `.trim();

  return (
    <div 
      ref={containerRef}
      className={containerClasses}
      style={{
        aspectRatio: width && height ? `${width}/${height}` : undefined,
        ...(!imageLoaded ? placeholderStyle : {})
      }}
    >
      {/* Loading skeleton */}
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-pulse">
            <div className="w-8 h-8 bg-gray-300 rounded-full opacity-30"></div>
          </div>
        </div>
      )}

      {/* Main image */}
      {(isInView || priority) && (
        <img
          ref={imgRef}
          src={getOptimizedSrc(src, width)}
          srcSet={generateSrcSet(src)}
          sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : loading}
          decoding="async"
          className={`w-full h-full object-cover ${imageClasses}`}
          onLoad={handleLoad}
          onError={handleError}
          style={{
            position: 'absolute',
            inset: 0
          }}
        />
      )}

      {/* Error fallback */}
      {imageError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center text-gray-500 p-4">
            <svg className="w-12 h-12 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-xs">Görsel yüklenemedi</p>
          </div>
        </div>
      )}

      {/* High priority preload */}
      {priority && (
        <link 
          rel="preload" 
          as="image" 
          href={getOptimizedSrc(src, width)}
          // @ts-ignore - React doesn't recognize imageSizes prop
          imageSizes={sizes}
        />
      )}
    </div>
  );
};

export default OptimizedImage;