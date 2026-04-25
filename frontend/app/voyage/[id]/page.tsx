'use client';

import { useState, use } from 'react';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ id: string }>;
}

const voyageData: Record<number, any> = {
  1: { title: "Paris → Lyon en TGV InOui", destination: "Lyon, France", price: "39€", duration: "2h 10min", date: "15 Avril 2026", type: "train" },
  2: { title: "Vol direct Paris → Barcelone", destination: "Barcelone, Espagne", price: "69€", duration: "1h 55min", date: "18 Avril 2026", type: "flight" },
  3: { title: "Bus FlixBus Paris → Amsterdam", destination: "Amsterdam, Pays-Bas", price: "29€", duration: "8h 30min", date: "22 Avril 2026", type: "bus" },
  4: { title: "TGV Paris → Strasbourg", destination: "Strasbourg, France", price: "45€", duration: "1h 50min", date: "25 Avril 2026", type: "train" },
};

export default function VoyageDetailPage({ params }: Props) {
  const [isReserved, setIsReserved] = useState(false);

  // Version correcte et simple avec le hook 'use'
  const { id } = use(params);

  const voyageId = Number(id);
  const voyage = voyageData[voyageId];

  if (!voyage) {
    notFound();
  }

  const handleReservation = () => {
    setIsReserved(true);
    alert(`✅ Réservation confirmée pour : ${voyage.title}\n\nMerci ! Nous vous contacterons bientôt.`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <a
          href="/demo"
          className="inline-flex items-center text-primary hover:underline mb-8 text-lg"
        >
          ← Retour aux voyages
        </a>

        <div className="bg-white dark:bg-gray-900 rounded-3xl p-10 shadow-xl">
          <h1 className="text-4xl font-bold mb-6">{voyage.title}</h1>
          
          <div className="flex items-baseline gap-3 mb-10">
            <span className="text-5xl font-bold text-primary">{voyage.price}</span>
            <span className="text-muted-foreground">par personne</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12 text-lg">
            <div>
              <p className="text-sm text-muted-foreground">Destination</p>
              <p className="font-medium">{voyage.destination}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Date de départ</p>
              <p className="font-medium">{voyage.date}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Durée du trajet</p>
              <p className="font-medium">{voyage.duration}</p>
            </div>
          </div>

          <button
            onClick={handleReservation}
            disabled={isReserved}
            className={`w-full font-semibold text-lg py-5 rounded-2xl transition-all active:scale-95 ${
              isReserved
                ? 'bg-green-600 text-white cursor-not-allowed'
                : 'bg-primary hover:bg-primary/90 text-white'
            }`}
          >
            {isReserved ? '✅ Réservation confirmée !' : 'Réserver maintenant'}
          </button>

          {isReserved && (
            <p className="text-center text-green-600 mt-4 font-medium">
              Merci pour votre réservation ! Un email de confirmation vous sera envoyé.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}