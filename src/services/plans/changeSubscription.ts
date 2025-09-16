
export interface ChangeSubscriptionRequest {
  plan_id: string;
}

export async function changeSubscriptionService(request: ChangeSubscriptionRequest) {
  // Mock service - validate plan exists
  const validPlans = ['basic', 'premium', 'basic_annual', 'premium_annual'];
  if (!validPlans.includes(request.plan_id)) {
    throw new Error('Invalid plan_id');
  }
  
  const subscriptionChangedMock = {
    "id": "sub_123",
    "plan": {
      "id": request.plan_id,
      "name": request.plan_id === 'basic' ? 'Basic' : 'Premium',
      "price_cents": request.plan_id === 'basic' ? 999 : 1999,
      "interval": "month",
      "devices": request.plan_id === 'basic' ? 1 : 4,
      "quality": request.plan_id === 'basic' ? 'HD' : '4K'
    },
    "status": "active",
    "current_period_start": "2025-09-01T00:00:00Z",
    "current_period_end": "2025-10-01T00:00:00Z",
    "cancel_at_period_end": false
  };
  
  return Promise.resolve(subscriptionChangedMock);
}