import { IHeader } from '@/services/interface';
import { Metadata } from 'next'

export async function generateMetadata( headerData :  IHeader): Promise<Metadata> {

  return {
    title: headerData?.site_title || '' ,
    description: headerData?.tagline || '' ,
    openGraph: {
    title: 'Next.js',
    description: 'The React Framework for the Web',
    url: 'https://nextjs.org',
    siteName: 'Next.js',
    images: [
      {
        url: 'https://nextjs.org/og.png',
        width: 800,
        height: 600,
      },
      {
        url: 'https://nextjs.org/og-alt.png',
        width: 1800,
        height: 1600,
        alt: 'My custom alt',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  }
}