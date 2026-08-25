import './globals.css'; import type {Metadata} from 'next';
export const metadata:Metadata={applicationName:process.env.NEXT_PUBLIC_BRAND_NAME||'Toronto Performance Coaching'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" suppressHydrationWarning><body>{children}</body></html>}
