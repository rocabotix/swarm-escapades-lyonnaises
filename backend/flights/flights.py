from typing import List, Dict

async def get_lyon_flights(budget: int = 120) -> List[Dict]:
    """
    Agent Vols Directs au départ de Lyon (LYS)
    Placeholder réaliste - Remplace par ton vrai scraper/API quand tu veux.
    """
    flights = [
        {"dest": "Rome",      "price": 65, "type": "Vol direct", "duration": "1h50", "airline": "EasyJet"},
        {"dest": "Barcelone", "price": 45, "type": "Vol direct", "duration": "1h30", "airline": "Vueling"},
        {"dest": "Lisbonne",  "price": 89, "type": "Vol direct", "duration": "2h20", "airline": "TAP Air"},
        {"dest": "Milan",     "price": 55, "type": "Vol direct", "duration": "1h10", "airline": "EasyJet"},
        {"dest": "Madrid",    "price": 75, "type": "Vol direct", "duration": "2h00", "airline": "Iberia"},
        {"dest": "Amsterdam", "price": 70, "type": "Vol direct", "duration": "1h55", "airline": "Transavia"},
        {"dest": "Londres",   "price": 60, "type": "Vol direct", "duration": "1h45", "airline": "British Airways"},
        {"dest": "Séville",   "price": 95, "type": "Vol direct", "duration": "2h30", "airline": "Vueling"},
        {"dest": "Venise",    "price": 58, "type": "Vol direct", "duration": "1h30", "airline": "EasyJet"},
        {"dest": "Naples",    "price": 72, "type": "Vol direct", "duration": "2h00", "airline": "Ryanair"},
        {"dest": "Porto",     "price": 80, "type": "Vol direct", "duration": "2h10", "airline": "Ryanair"},
        {"dest": "Valence",   "price": 49, "type": "Vol direct", "duration": "1h40", "airline": "Vueling"},
    ]

    return [f for f in flights if f["price"] <= budget]