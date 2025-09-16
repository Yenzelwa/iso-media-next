import { getSubscriptionService } from '@/src/services/plans/getSubscription';
import { changeSubscriptionService } from '@/src/services/plans/changeSubscription';
import { cancelSubscriptionService } from '@/src/services/plans/cancelSubscription';
import { resumeSubscriptionService } from '@/src/services/plans/resumeSubscription';

describe('Subscription Services', () => {
  describe('getSubscriptionService', () => {
    test('returns user subscription data', async () => {
      const result = await getSubscriptionService();

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('plan');
      expect(result).toHaveProperty('status');
      expect(result).toHaveProperty('current_period_start');
      expect(result).toHaveProperty('current_period_end');
    });

    test('subscription has valid status', async () => {
      const result = await getSubscriptionService();
      
      const validStatuses = ['active', 'canceled', 'incomplete', 'trialing', 'past_due'];
      expect(validStatuses).toContain(result.status);
    });
  });

  describe('changeSubscriptionService', () => {
    test('changes subscription plan successfully', async () => {
      const request = { plan_id: 'premium' };
      const result = await changeSubscriptionService(request);

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('plan');
      expect(result.plan.id).toBe('premium');
    });

    test('throws error for invalid plan', async () => {
      const request = { plan_id: 'invalid_plan' };

      await expect(changeSubscriptionService(request))
        .rejects.toThrow('Invalid plan_id');
    });
  });

  describe('cancelSubscriptionService', () => {
    test('cancels subscription immediately', async () => {
      const request = { at_period_end: false };
      const result = await cancelSubscriptionService(request);

      expect(result.status).toBe('canceled');
    });

    test('schedules cancellation at period end', async () => {
      const request = { at_period_end: true };
      const result = await cancelSubscriptionService(request);

      expect(result.cancel_at_period_end).toBe(true);
    });
  });

  describe('resumeSubscriptionService', () => {
    test('resumes canceled subscription', async () => {
      const result = await resumeSubscriptionService();

      expect(result.status).toBe('active');
      expect(result.cancel_at_period_end).toBe(false);
    });
  });
});