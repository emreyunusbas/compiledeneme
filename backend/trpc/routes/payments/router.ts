import { publicProcedure, router } from '../../create-context';
import { z } from 'zod';

export const paymentsRouter = router({
  list: publicProcedure
    .input(z.object({
      memberId: z.string().optional(),
      startDate: z.string().optional(),
      endDate: z.string().optional(),
    }))
    .query(({ input }) => {
      // Mock payment data
      return {
        payments: [
          {
            id: '1',
            memberId: 'member-1',
            amount: 2500,
            currency: 'TRY',
            method: 'CASH',
            status: 'SUCCEEDED',
            createdAt: '2024-11-01T10:00:00Z',
          },
          {
            id: '2',
            memberId: 'member-2',
            amount: 1800,
            currency: 'TRY',
            method: 'CARD',
            status: 'SUCCEEDED',
            createdAt: '2024-11-03T14:30:00Z',
          },
        ],
        total: 4300,
      };
    }),

  create: publicProcedure
    .input(z.object({
      memberId: z.string(),
      amount: z.number(),
      method: z.enum(['CASH', 'CARD', 'BANK_TRANSFER']),
      description: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      // Mock payment creation
      const newPayment = {
        id: Date.now().toString(),
        ...input,
        currency: 'TRY',
        status: 'SUCCEEDED',
        createdAt: new Date().toISOString(),
      };

      return {
        success: true,
        payment: newPayment,
      };
    }),

  getSummary: publicProcedure
    .input(z.object({
      period: z.enum(['daily', 'weekly', 'monthly']).default('monthly'),
    }))
    .query(({ input }) => {
      // Mock financial summary
      return {
        period: input.period,
        totalRevenue: 15000,
        totalPayments: 43,
        averagePayment: 348.84,
        paymentMethods: {
          CASH: 8,
          CARD: 25,
          BANK_TRANSFER: 10,
        },
      };
    }),
});