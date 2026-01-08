import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    const isProd = mode === 'production';
    
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        react({
          // Enable React Fast Refresh optimizations
          fastRefresh: !isProd,
        })
      ],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        // Increase chunk size warning limit
        chunkSizeWarningLimit: 1000,
        
        // Enable source maps for debugging in production (optional)
        sourcemap: !isProd ? 'inline' : false,
        
        // Optimize minification
        minify: 'terser',
        terserOptions: {
          compress: {
            drop_console: isProd,
            drop_debugger: isProd,
          },
        },
        
        rollupOptions: {
          output: {
            // Manual chunk splitting for better caching
            manualChunks: {
              // React ecosystem
              'react-vendor': ['react', 'react-dom'],
              'router-vendor': ['react-router-dom'],
              
              // Three.js ecosystem (biggest chunk)
              'three-vendor': [
                'three',
                '@react-three/fiber',
                '@react-three/drei'
              ],
              
              // Animation libraries
              'animation-vendor': [
                'gsap',
                '@studio-freight/react-lenis'
              ],
              
              // Utils and smaller libraries
              'utils-vendor': []
            },
            
            // Optimize chunk naming for better caching
            chunkFileNames: (chunkInfo) => {
              const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/').pop().replace('.tsx', '').replace('.ts', '') : 'chunk';
              return `assets/${facadeModuleId}-[hash].js`;
            },
            
            // Optimize asset naming
            assetFileNames: (assetInfo) => {
              const info = assetInfo.name.split('.');
              const ext = info[info.length - 1];
              if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
                return `assets/images/[name]-[hash][extname]`;
              }
              if (/css/i.test(ext)) {
                return `assets/css/[name]-[hash][extname]`;
              }
              return `assets/[name]-[hash][extname]`;
            }
          }
        },
        
        // Optimize dependencies pre-bundling
        optimizeDeps: {
          include: [
            'react',
            'react-dom',
            'react-router-dom',
            'three',
            '@react-three/fiber',
            '@react-three/drei',
            'gsap'
          ],
          exclude: ['@studio-freight/react-lenis'] // May cause issues if pre-bundled
        }
      },
      
      // Performance optimizations
      esbuild: {
        // Remove console logs in production
        drop: isProd ? ['console', 'debugger'] : [],
      },
    };
});
