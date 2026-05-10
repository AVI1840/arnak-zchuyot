import { Component, ErrorInfo, ReactNode } from 'react';
import { Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6" dir="rtl">
          <div className="bg-card rounded-2xl border border-border shadow-lg p-10 max-w-md w-full text-center space-y-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">אירעה שגיאה</h1>
            <p className="text-muted-foreground">
              משהו השתבש. אנא נסה שוב.
            </p>
            <Button
              onClick={this.handleReload}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8"
              size="lg"
            >
              נסה שוב
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
