export async function getSubscriptionService() {
  // Mock service - in real implementation would check auth and get user's subscription
  const subscriptionMock = {
    "id": "sub_123",
    "plan": {
      "id": "premium",
      "name": "Premium",
      "price_cents": 1999,
      "interval": "month",
      "devices": 4,
      "quality": "4K"
    },
    "status": "active",
    "current_period_start": "2025-09-01T00:00:00Z",
    "current_period_end": "2025-10-01T00:00:00Z",
    "cancel_at_period_end": false
  };
  
  return Promise.resolve(subscriptionMock);
}