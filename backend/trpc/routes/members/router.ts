import { publicProcedure, router } from '../../create-context';
import { z } from 'zod';

export const membersRouter = router({
  list: publicProcedure
    .input(z.object({
      page: z.number().default(1),
      limit: z.number().default(10),
      search: z.string().optional(),
    }))
    .query(({ input }) => {
      // Mock member data
      const mockMembers = [
        {
          id: '1',
          firstName: 'Ayşe',
          lastName: 'Yılmaz',
          email: 'ayse@example.com',
          phone: '+905551114433',
          membershipType: 'GRUP',
          remainingCredits: 8,
          endDate: '2024-12-15',
          status: 'ACTIVE',
        },
        {
          id: '2',
          firstName: 'Mehmet',
          lastName: 'Demir',
          email: 'mehmet@example.com',
          phone: '+905551115533',
          membershipType: 'BİREBİR',
          remainingCredits: 5,
          endDate: '2024-11-30',
          status: 'ACTIVE',
        },
      ];

      return {
        members: mockMembers,
        total: mockMembers.length,
        page: input.page,
        limit: input.limit,
      };
    }),

  create: publicProcedure
    .input(z.object({
      firstName: z.string(),
      lastName: z.string(),
      email: z.string().email(),
      phone: z.string(),
      membershipType: z.enum(['GRUP', 'BİREBİR']),
    }))
    .mutation(async ({ input }) => {
      // Mock member creation
      const newMember = {
        id: Date.now().toString(),
        ...input,
        remainingCredits: 0,
        status: 'ACTIVE',
        createdAt: new Date().toISOString(),
      };

      return {
        success: true,
        member: newMember,
      };
    }),

  getById: publicProcedure
    .input(z.object({ memberId: z.string() }))
    .query(({ input }) => {
      // Mock member data
      return {
        id: input.memberId,
        firstName: 'Ayşe',
        lastName: 'Yılmaz',
        email: 'ayse@example.com',
        phone: '+905551114433',
        membershipType: 'GRUP',
        remainingCredits: 8,
        endDate: '2024-12-15',
        status: 'ACTIVE',
        joinDate: '2024-01-15',
        measurements: [],
        payments: [],
      };
    }),
});