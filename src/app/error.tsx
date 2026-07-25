'use client';
 
import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
 
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      <h2 className="text-3xl font-bold mb-4">A System Error Occurred</h2>
      <p className="text-gray-400 mb-8 max-w-md">
        Our digital systems encountered an unexpected anomaly. We are working to restore order.
      </p>
      <Button variant="secondary" onClick={() => reset()}>
        Attempt Recovery
      </Button>
    </div>
  );
}
