import { router } from './create-context';
import { helloRouter } from './routes/hello/router';
import { authRouter } from './routes/auth/router';
import { usersRouter } from './routes/users/router';
import { classesRouter } from './routes/classes/router';
import { membersRouter } from './routes/members/router';
import { paymentsRouter } from './routes/payments/router';

export const appRouter = router({
  hello: helloRouter,
  auth: authRouter,
  users: usersRouter,
  classes: classesRouter,
  members: membersRouter,
  payments: paymentsRouter,
});

export type AppRouter = typeof appRouter;