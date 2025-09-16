
export interface CancelSubscriptionRequest {
  at_period_end?: boolean;
}

export async function cancelSubscriptionService(request: CancelSubscriptionRequest) {
  const atPeriodEnd = request.at_period_end ?? true;
  
  if (atPeriodEnd) {
    const subscriptionCanceledMock = {
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
      "cancel_at_period_end": true
    };
    return Promise.resolve(subscriptionCanceledMock);
  } else {
    // Immediate cancellation - change status to canceled
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
      "status": "canceled" as const,
      "current_period_start": "2025-09-01T00:00:00Z",
      "current_period_end": "2025-10-01T00:00:00Z",
      "cancel_at_period_end": false
    };
    return Promise.resolve(subscriptionMock);
  }
}