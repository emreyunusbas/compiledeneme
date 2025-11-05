import { publicProcedure, router } from '../../create-context';
import { z } from 'zod';

export const helloRouter = router({
  greet: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello, ${input.name}!`,
        timestamp: new Date().toISOString(),
      };
    }),

  hello: publicProcedure.query(() => {
    return {
      message: 'Hello from Pilates Studio Management API!',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
    };
  }),
});