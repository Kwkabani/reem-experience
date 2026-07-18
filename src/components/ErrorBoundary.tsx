import { Component, type ReactNode } from 'react';
import Button from './Button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex items-center justify-center min-h-[100dvh] bg-night">
            <div className="text-center p-8">
              <p className="text-4xl mb-4">⚠️</p>
              <p className="text-gold font-display font-bold text-lg mb-2">حدث خطأ غير متوقع</p>
              <p className="text-silver-blue text-sm">يرجى إعادة تحميل الصفحة</p>
              <Button onClick={() => window.location.reload()} variant="glass" className="mt-4">
                إعادة التحميل
              </Button>
            </div>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
