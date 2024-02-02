import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Metta login',
    description: 'Authentication',
};

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <main className="">{children}</main>;
}
