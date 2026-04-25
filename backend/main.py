from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import asyncio

from flights.flights import get_lyon_flights
from trains.trains import get_lyon_trains
from buses.buses import get_lyon_buses
from enrich import enrich_trip

app = FastAPI(title="Swarm Escapades Lyonnaises")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"status": "ok", "message": "Backend prêt"}

@app.get("/scan")
async def run_scan(budget: int = 150):
    print("🚀 Lancement du scan complet...")

    flights = await get_lyon_flights(budget)
    trains = await get_lyon_trains()
    buses = await get_lyon_buses(budget)

    all_trips = flights + trains + buses

    print(f"🌟 Enrichissement de {len(all_trips)} voyages...")

    # Enrichissement sécurisé
    enriched_trips = []
    for trip in all_trips:
        try:
            enriched = enrich_trip(trip)
            enriched_trips.append(enriched)
        except Exception as e:
            print(f"Erreur enrichissement voyage: {e}")
            enriched_trips.append(trip)  # fallback

    enriched_trips.sort(key=lambda x: float(str(x.get("price", "999")).replace("€", "")))

    print(f"✅ {len(enriched_trips)} voyages renvoyés")
    return enriched_trips