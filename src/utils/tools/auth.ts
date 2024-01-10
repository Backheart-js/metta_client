import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import auth from '../axios/auth';

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: '/auth',
    },
    session: {
        strategy: 'jwt',
    },
    providers: [
        CredentialsProvider({
            name: 'Sign in',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email',
                    placeholder: 'example@example.com',
                },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                try {
                    const res = await auth.login({
                        email: credentials!.email,
                        password: credentials!.password,
                    });
                    return {
                        id: res.data.userId,
                        ...res.data,
                    };

                    // return {
                    //     userId: '6575865e39da12ec24680680',
                    //     mesage: 'Login successfully',
                    //     id: '6575865e39da12ec24680680',
                    // };
                } catch (e) {
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        session: ({ session, token }) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    randomKey: token.randomKey,
                },
            };
        },
        jwt: ({ token, user }) => {
            if (user) {
                const u = user as unknown as any;
                return {
                    ...token,
                    id: u.id,
                    randomKey: u.randomKey,
                };
            }
            return token;
        },
    },
};
