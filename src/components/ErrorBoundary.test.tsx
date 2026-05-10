import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';

// Component that throws an error
function ThrowError() {
  throw new Error('Test error');
}

describe('ErrorBoundary', () => {
  // Suppress console.error for expected errors
  const originalError = console.error;
  beforeEach(() => {
    console.error = vi.fn();
  });
  afterEach(() => {
    console.error = originalError;
  });

  it('renders children when no error', () => {
    render(
      <ErrorBoundary>
        <div>תוכן תקין</div>
      </ErrorBoundary>
    );
    expect(screen.getByText('תוכן תקין')).toBeInTheDocument();
  });

  it('renders error screen when child throws', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );
    expect(screen.getByText('אירעה שגיאה')).toBeInTheDocument();
    expect(screen.getByText('משהו השתבש. אנא נסה שוב.')).toBeInTheDocument();
    expect(screen.getByText('נסה שוב')).toBeInTheDocument();
  });

  it('shows retry button that reloads page', () => {
    // Mock window.location.reload
    const reloadMock = vi.fn();
    Object.defineProperty(window, 'location', {
      value: { reload: reloadMock },
      writable: true,
    });

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    const retryButton = screen.getByText('נסה שוב');
    retryButton.click();
    expect(reloadMock).toHaveBeenCalled();
  });
});
