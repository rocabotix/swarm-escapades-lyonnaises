'use client';

import { Plane, TrainFront, Bus, CloudSun } from 'lucide-react';

export function LoadingAgents({ logs = [] }: { logs?: string[] }) {
  const agents = [
    { icon: Plane,      label: "Vols",   color: "text-blue-400"   },
    { icon: TrainFront, label: "Trains", color: "text-red-400"    },
    { icon: Bus,        label: "Bus",    color: "text-orange-400" },
    { icon: CloudSun,   label: "Météo",  color: "text-yellow-400" },
  ];

  return (
    <div className="flex flex-col items-center py-16">
      <div className="flex gap-10 mb-10">
        {agents.map((agent, i) => (
          <div
            key={i}
            className={`flex flex-col items-center ${agent.color} animate-bounce`}
            style={{ animationDelay: `${i * 0.2}s` }}
          >
            <agent.icon size={58} strokeWidth={1.5} />
            <p className="text-xs mt-4 font-mono tracking-widest">{agent.label}</p>
          </div>
        ))}
      </div>

      <p className="text-green-400 text-2xl font-medium flex items-center gap-3 animate-pulse">
        Le swarm scanne en temps réel
        <span>•••</span>
      </p>

      {logs.length > 0 && (
        <div className="mt-12 max-w-2xl w-full bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
          <h4 className="text-green-400 font-semibold mb-4">Logs du Swarm :</h4>
          <div className="space-y-2 text-sm font-mono text-zinc-300 max-h-64 overflow-y-auto">
            {logs.map((log, i) => (
              <div key={i} className="opacity-90">→ {log}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}