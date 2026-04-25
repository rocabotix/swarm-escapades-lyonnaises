from typing import List, Dict

async def get_lyon_trains() -> List[Dict]:
    """
    Agent Trains : Trenitalia (Italie) + Renfe (Espagne)
    """
    return [
        # Trenitalia
        {"dest": "Milan", "price": 49, "type": "Trenitalia"},
        {"dest": "Rome", "price": 79, "type": "Trenitalia"},
        {"dest": "Venise", "price": 95, "type": "Trenitalia"},
        {"dest": "Florence", "price": 69, "type": "Trenitalia"},

        # Renfe (Espagne)
        {"dest": "Barcelone", "price": 59, "type": "Renfe + TGV"},
        {"dest": "Madrid", "price": 89, "type": "Renfe"},
        {"dest": "Valence", "price": 75, "type": "Renfe"},
        {"dest": "Séville", "price": 110, "type": "Renfe (avec correspondance)"},
    ]