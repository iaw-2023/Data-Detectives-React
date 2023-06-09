"use client";
import { Auth0Provider } from '@auth0/auth0-react'
import './globals.css'
import { Inter } from 'next/font/google'
import { usePathname } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

/* Comentado para que no tire error el deploy en vercel
export const metadata = {
  title: 'Health Time',
  description: 'Generated by create next app',
}*/

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = usePathname()
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/imgs/favicon.ico" /> 
      </head>
      <body className={inter.className}>
        <Auth0Provider 
          domain="dev-b6y5rs8y4it5vikj.us.auth0.com"
          clientId="EeMhVl8V4lgwCzuJWHENNyRr1EIhjMlP"
          useRefreshTokens={true}
          useRefreshTokensFallback={false}
          authorizationParams={{
            redirect_uri: "https://health-time-git-promocion-data-detectives-react.vercel.app"+router,
            audience: 'https://data-detectives-laravel.vercel.app/rest',
            scope: 'openid profile email'
          }}
        >
          {children}
        </Auth0Provider >
      </body>
    </html>
  )
}