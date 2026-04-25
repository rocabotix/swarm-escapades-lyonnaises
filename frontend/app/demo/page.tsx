'use client';

import { useState, useEffect, useMemo } from 'react';
import { TripCard } from '@/components/TripCard';

interface Trip {
  id: number;
  title: string;
  destination: string;
  date: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: string;
  company: string;
  stops: number;
  baggage: boolean;
  flagSrc: string;
  type: string;
  mood?: string;
  isRoundTrip: boolean;
}

export default function DemoPage() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [searchDestination, setSearchDestination] = useState<string>("");
  const [tripType, setTripType] = useState<"all" | "oneway" | "roundtrip">("all");

  // Appel au backend
  useEffect(() => {
    fetch('/api/scan')
      .then(res => {
        if (!res.ok) throw new Error('Erreur serveur');
        return res.json();
      })
      .then(data => {
        // Ajout d'ID sûr si le backend n'en renvoie pas
        const tripsWithId = data.map((trip: any, index: number) => ({
          ...trip,
          id: trip.id || index + 1000,
        }));
        setTrips(tripsWithId);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erreur connexion backend:", err);
        setError("Impossible de se connecter au backend. Vérifie qu'il tourne sur http://127.0.0.1:8000");
        setLoading(false);
      });
  }, []);

  const filteredTrips = useMemo(() => {
    return trips.filter((trip) => {
      const matchDate = !selectedDate || trip.date === selectedDate;
      const matchDestination = !searchDestination || 
        (trip.destination && trip.destination.toLowerCase().includes(searchDestination.toLowerCase()));
      
      let matchType = true;
      if (tripType === "oneway") matchType = !trip.isRoundTrip;
      if (tripType === "roundtrip") matchType = trip.isRoundTrip;

      return matchDate && matchDestination && matchType;
    });
  }, [trips, selectedDate, searchDestination, tripType]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-xl">Chargement des voyages depuis le backend...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-600 p-8">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h1 className="text-5xl font-bold tracking-tight mb-3">
              Voyages au départ de Lyon
            </h1>
            <p className="text-xl text-muted-foreground">
              Bus, Trains & Vols depuis Lyon Saint-Exupéry
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl">
            <div className="flex-1">
              <label className="text-sm text-muted-foreground block mb-2">Destination</label>
              <input
                type="text"
                placeholder="Barcelone, Rome, Paris..."
                value={searchDestination}
                onChange={(e) => setSearchDestination(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="flex-1">
              <label className="text-sm text-muted-foreground block mb-2">Date de départ</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="flex-1">
              <label className="text-sm text-muted-foreground block mb-2">Type de voyage</label>
              <select
                value={tripType}
                onChange={(e) => setTripType(e.target.value as "all" | "oneway" | "roundtrip")}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">Tous</option>
                <option value="oneway">Aller simple</option>
                <option value="roundtrip">Aller-retour</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredTrips.length > 0 ? (
            filteredTrips.map((trip) => (
              <TripCard 
                key={trip.id} 
                {...trip} 
              />
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="text-xl text-muted-foreground">
                Aucun voyage trouvé avec ces critères.
              </p>
              <button
                onClick={() => {
                  setSelectedDate("");
                  setSearchDestination("");
                  setTripType("all");
                }}
                className="mt-4 text-primary underline"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}