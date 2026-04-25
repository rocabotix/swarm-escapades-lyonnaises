'use client';

import Link from 'next/link';
import { WavingFlag } from './WavingFlag';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Users, Sparkles, CloudSun, Luggage } from 'lucide-react';

interface TripCardProps {
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
  type: 'train' | 'flight' | 'bus';
  mood?: string;
  isRoundTrip: boolean;        // ← Nouveau champ
}

export function TripCard({
  id,
  title,
  destination,
  date,
  departureTime,
  arrivalTime,
  duration,
  price,
  company,
  stops,
  baggage,
  flagSrc,
  type,
  mood = "Aventure",
  isRoundTrip,
}: TripCardProps) {
  const getTypeIcon = () => {
    switch (type) {
      case 'train': return '🚄';
      case 'flight': return '✈️';
      case 'bus': return '🚌';
      default: return '🌍';
    }
  };

  const imageUrls = [
    "https://picsum.photos/id/1015/600/400",
    "https://picsum.photos/id/1016/600/400",
    "https://picsum.photos/id/133/600/400",
    "https://picsum.photos/id/201/600/400",
  ];

  const imageSrc = imageUrls[(id - 1) % imageUrls.length];

  return (
    <Link href={`/voyage/${id}`} className="block h-full group">
      <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-800 h-full flex flex-col cursor-pointer active:scale-[0.985]">
        
        <CardHeader className="p-0 relative">
          <div className="relative h-56 w-full overflow-hidden bg-gray-100">
            <img
              src={imageSrc}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            <div className="absolute top-4 right-4 z-20">
              <WavingFlag 
                src={flagSrc} 
                alt={`Drapeau de ${destination}`}
                width={58}
                height={38}
              />
            </div>

            <div className="absolute top-4 left-4 z-20">
              <Badge 
                variant="secondary" 
                className="bg-black/75 text-white hover:bg-black/90 flex items-center gap-1.5 px-3 py-1"
              >
                {getTypeIcon()} <span className="capitalize">{type}</span>
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-5 flex-1 flex flex-col">
          <div className="flex-1">
            <h3 className="font-semibold text-xl leading-tight line-clamp-2 mb-2">
              {title}
            </h3>
            <div className="flex items-center gap-1.5 text-muted-foreground mb-4">
              <MapPin className="w-4 h-4" />
              <span className="font-medium">{destination}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                {departureTime} → {arrivalTime}
              </div>
              <div className="text-muted-foreground">
                {stops === 0 ? "Direct" : `${stops} correspondance${stops > 1 ? 's' : ''}`}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-muted-foreground">Compagnie</p>
                <p className="font-medium">{company}</p>
              </div>

              <div className="flex items-center gap-1 text-sm">
                {baggage ? (
                  <span className="text-green-600 flex items-center gap-1">
                    <Luggage className="w-4 h-4" /> Bagages inclus
                  </span>
                ) : (
                  <span className="text-amber-600">Bagages payants</span>
                )}
              </div>
            </div>

            {/* Nouveau : Aller simple ou Aller-retour */}
            <div className="flex items-center gap-2">
              <Badge 
                variant={isRoundTrip ? "default" : "outline"}
                className="text-xs"
              >
                {isRoundTrip ? "Aller-Retour" : "Aller Simple"}
              </Badge>
            </div>

            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Départ</p>
                <p className="font-medium">{date}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Dès</p>
                <p className="text-3xl font-bold tracking-tighter text-primary">
                  {price}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}