import { IHeader } from '@/services/interface';
import { Metadata } from 'next'

export async function generateMetadata( headerData :  IHeader): Promise<Metadata> {

  return {
    title: headerData?.site_title || '' ,
    description: headerData?.tagline || '' ,
    openGraph: {
      title: 'this is open graph title for testing',
      images: headerData?.site_icon, 
    },
  }
}