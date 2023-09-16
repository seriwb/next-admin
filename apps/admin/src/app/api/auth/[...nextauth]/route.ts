import NextAuth from 'next-auth';
import { authOptions } from './options';
require('@/libs/prisma');

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
