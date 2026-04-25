import random
from datetime import datetime, timedelta

flag_map = {
    "Paris": "https://flagcdn.com/w80/fr.png",
    "Barcelone": "https://flagcdn.com/w80/es.png",
    "Amsterdam": "https://flagcdn.com/w80/nl.png",
    "Rome": "https://flagcdn.com/w80/it.png",
    "Marseille": "https://flagcdn.com/w80/fr.png",
    "Strasbourg": "https://flagcdn.com/w80/fr.png",
    "Londres": "https://flagcdn.com/w80/gb.png",
    "Berlin": "https://flagcdn.com/w80/de.png",
    "Madrid": "https://flagcdn.com/w80/es.png",
    "Lisbonne": "https://flagcdn.com/w80/pt.png",
    "Milan": "https://flagcdn.com/w80/it.png",
}

moods = ["Confort", "Économique", "Week-end", "Culture", "Aventure", "Famille", "Romantique"]

def enrich_trip(trip: dict) -> dict:
    """Enrichit un voyage avec des données manquantes"""
    
    # Copie pour éviter de modifier l'original
    enriched = dict(trip)

    # ID sûr
    if "id" not in enriched or not enriched.get("id"):
        enriched["id"] = random.randint(1000, 9999)

    # Drapeau selon la destination
    dest = enriched.get("destination", "").split(",")[0].strip()
    enriched["flagSrc"] = flag_map.get(dest, "https://flagcdn.com/w80/fr.png")

    # Mood
    enriched["mood"] = random.choice(moods)

    # Aller simple ou Aller-retour
    enriched["isRoundTrip"] = random.choice([True, False])

    # Prix
    if not enriched.get("price"):
        enriched["price"] = f"{random.randint(29, 89)}€"

    # Correspondances
    if "stops" not in enriched:
        enriched["stops"] = random.choice([0, 0, 1, 1, 2])

    # Bagages
    if "baggage" not in enriched:
        enriched["baggage"] = random.choice([True, True, False])

    # Date (étendue sur 1 mois)
    if not enriched.get("date"):
        start = datetime(2026, 4, 19)
        random_days = random.randint(0, 40)
        enriched["date"] = (start + timedelta(days=random_days)).strftime("%Y-%m-%d")

    return enriched