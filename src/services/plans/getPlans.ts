export async function getPlansService() {
  // Mock data directly in service to avoid import issues
  const plansMock = [
    {
      "id": "basic",
      "name": "Basic",
      "price_cents": 999,
      "interval": "month",
      "devices": 1,
      "quality": "HD"
    },
    {
      "id": "premium",
      "name": "Premium",
      "price_cents": 1999,
      "interval": "month",
      "devices": 4,
      "quality": "4K"
    },
    {
      "id": "basic_annual",
      "name": "Basic Annual",
      "price_cents": 9999,
      "interval": "year",
      "devices": 1,
      "quality": "HD"
    },
    {
      "id": "premium_annual",
      "name": "Premium Annual",
      "price_cents": 19999,
      "interval": "year",
      "devices": 4,
      "quality": "4K"
    }
  ];
  
  return Promise.resolve(plansMock);
}