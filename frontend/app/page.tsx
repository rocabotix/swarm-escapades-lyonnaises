import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 to-blue-950 flex items-center justify-center">
      <div className="text-center max-w-2xl px-6">
        <h1 className="text-6xl font-bold text-white mb-6">
          Swarm Escapades Lyonnaises
        </h1>
        <p className="text-2xl text-zinc-300 mb-10">
          Multi-agents IA qui trouvent les meilleurs prix vols, trains & bus depuis Lyon
        </p>
        <Link href="/demo">
          <Button size="lg" className="text-xl px-10 py-7 bg-green-600 hover:bg-green-500">
            Lancer le Swarm Scan →
          </Button>
        </Link>
      </div>
    </div>
  );
}