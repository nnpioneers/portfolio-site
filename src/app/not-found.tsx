import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-8xl font-bold text-white mb-6 animate-pulse">404</h1>
      <h2 className="text-2xl md:text-3xl font-medium mb-4">Space Not Found</h2>
      <p className="text-gray-400 max-w-md mb-8">
        The coordinates you entered don't match any known sector in our digital universe.
      </p>
      <Link href="/">
        <Button variant="magnetic">Return to Base</Button>
      </Link>
    </div>
  );
}
