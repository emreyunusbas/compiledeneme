import { publicProcedure, router } from '../../create-context';
import { z } from 'zod';

export const authRouter = router({
  login: publicProcedure
    .input(z.object({
      phone: z.string(),
      otp: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      // Mock authentication logic
      if (input.phone === '+905551112233') {
        return {
          success: true,
          user: {
            id: '1',
            email: 'admin@pilatesstudio.com',
            phone: input.phone,
            role: 'ADMIN',
            name: 'Studio',
            surname: 'Owner',
            studioName: 'Pilates Excellence',
          },
          token: 'mock-jwt-token',
        };
      }

      throw new Error('Invalid credentials');
    }),

  sendOTP: publicProcedure
    .input(z.object({ phone: z.string() }))
    .mutation(async ({ input }) => {
      // Mock OTP sending
      console.log(`Sending OTP to ${input.phone}`);
      return {
        success: true,
        message: 'OTP sent successfully',
        expiresIn: 300, // 5 minutes
      };
    }),

  verifyOTP: publicProcedure
    .input(z.object({
      phone: z.string(),
      otp: z.string().length(6),
    }))
    .mutation(async ({ input }) => {
      // Mock OTP verification
      if (input.otp === '123456') {
        return {
          success: true,
          verified: true,
        };
      }

      throw new Error('Invalid OTP');
    }),
});