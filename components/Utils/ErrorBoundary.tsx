import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo
    });

    // Send error to analytics if available
    if (typeof gtag !== 'undefined') {
      gtag('event', 'exception', {
        description: error.toString(),
        fatal: true
      });
    }
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center text-white p-8">
          <div className="max-w-2xl text-center">
            {/* Technical Error Header */}
            <div className="mb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-red-500 flex items-center justify-center">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <span className="font-mono text-xs text-red-400 tracking-widest uppercase">SYSTEM_ERROR</span>
            </div>

            {/* Error Message */}
            <h1 className="text-4xl font-bold tracking-tighter mb-4">
              Sistem Hatası
            </h1>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Beklenmeyen bir hata oluştu. Sistem otomatik olarak rapor edildi.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="bg-[#2997FF] text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
              >
                Sayfayı Yenile
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="border border-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                Ana Sayfaya Dön
              </button>
            </div>

            {/* Technical Details (Development Only) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-8 text-left bg-gray-900 p-4 rounded-lg">
                <summary className="cursor-pointer text-sm font-mono text-red-400 mb-2">
                  Teknik Detaylar (Geliştirme Modu)
                </summary>
                <pre className="text-xs text-gray-300 overflow-auto max-h-40">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}

            {/* Contact Info */}
            <div className="mt-12 pt-8 border-t border-gray-800">
              <p className="text-sm text-gray-500">
                Sorun devam ederse:{' '}
                <a 
                  href="mailto:info@sensoyelektrik.com" 
                  className="text-[#2997FF] hover:underline"
                >
                  info@sensoyelektrik.com
                </a>
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;