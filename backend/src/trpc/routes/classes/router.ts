import { publicProcedure, router } from '../../create-context';
import { z } from 'zod';

export const classesRouter = router({
  list: publicProcedure
    .input(z.object({
      date: z.string().optional(),
      trainerId: z.string().optional(),
    }))
    .query(({ input }) => {
      // Mock class data
      return {
        classes: [
          {
            id: '1',
            title: 'Morning Pilates',
            description: 'Beginner friendly morning session',
            startTime: '2024-11-05T09:00:00Z',
            endTime: '2024-11-05T10:00:00Z',
            trainerId: 'trainer-1',
            capacity: 10,
            bookingCount: 8,
            status: 'SCHEDULED',
          },
          {
            id: '2',
            title: 'Advanced Core',
            description: 'Advanced core strengthening',
            startTime: '2024-11-05T10:30:00Z',
            endTime: '2024-11-05T11:30:00Z',
            trainerId: 'trainer-2',
            capacity: 6,
            bookingCount: 5,
            status: 'SCHEDULED',
          },
        ],
      };
    }),

  create: publicProcedure
    .input(z.object({
      title: z.string(),
      description: z.string().optional(),
      startTime: z.string(),
      endTime: z.string(),
      trainerId: z.string(),
      capacity: z.number(),
    }))
    .mutation(async ({ input }) => {
      // Mock class creation
      const newClass = {
        id: Date.now().toString(),
        ...input,
        bookingCount: 0,
        status: 'SCHEDULED',
        createdAt: new Date().toISOString(),
      };

      return {
        success: true,
        class: newClass,
      };
    }),
});