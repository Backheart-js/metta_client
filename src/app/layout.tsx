import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import './GlobalStyle.scss';
import './_variables.scss';
import StoreProvider from './StoreProvider';

const inter = Inter({ subsets: ['latin'] });

const APP_DEFAULT_TITLE = 'Metta Healthcare';
const APP_DESCRIPTION = 'A great app for healthy';

export const metadata: Metadata = {
    title: APP_DEFAULT_TITLE,
    description: APP_DESCRIPTION,
    manifest: '/manifest.webmanifest',
    themeColor: '#ffffff',
    appleWebApp: {
        capable: true,
        statusBarStyle: 'default',
        title: APP_DEFAULT_TITLE,
    },
    formatDetection: {
        telephone: false,
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body id="app" className={inter.className}>
                <StoreProvider>{children}</StoreProvider>
            </body>
        </html>
    );
}
