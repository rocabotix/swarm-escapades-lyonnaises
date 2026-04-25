from typing import List, Dict

async def get_lyon_buses(budget: int = 120) -> List[Dict]:
    """
    Agent Bus / Cars (FlixBus, BlaBlaCar, etc.)
    """
    return [
        {"dest": "Paris", "price": 19, "type": "Bus FlixBus"},
        {"dest": "Barcelone", "price": 39, "type": "Bus low-cost"},
        {"dest": "Milan", "price": 29, "type": "BlaBlaCar"},
        {"dest": "Genève", "price": 15, "type": "Bus régional"},
        {"dest": "Amsterdam", "price": 55, "type": "Bus FlixBus"},
        {"dest": "Madrid", "price": 65, "type": "Bus FlixBus"},
        {"dest": "Lisbonne", "price": 79, "type": "Bus low-cost"},
    ]