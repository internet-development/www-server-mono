import '@root/global.scss';
import '@root/animations.scss';

import * as Constants from '@common/constants';
import * as Utilities from '@common/utilities';

import DefaultLayout from '@components/DefaultLayout';
import IntDev from '@system/svg/IntDev';
import Package from '@root/package.json';
import Script from 'next/script';
import MarketingServerMono from '@components/MarketingServerMono';

export async function generateMetadata({ params, searchParams }) {
  const title = 'Server Mono';
  const description = Package.description;
  const url = 'https://servermono.com';
  const handle = '@internetxstudio';

  return {
    metadataBase: new URL('https://servermono.com'),
    title,
    description,
    url,
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      images: [
        {
          url: 'https://intdev-global.s3.us-west-2.amazonaws.com/public/internet-dev/e5957545-e79c-44d7-a7b0-e82b8edbc314.png',
          width: 1200,
          height: 628,
        },
      ],
    },
    twitter: {
      title,
      description,
      url,
      handle,
      card: 'summary_large_image',
      images: ['https://intdev-global.s3.us-west-2.amazonaws.com/public/internet-dev/e5957545-e79c-44d7-a7b0-e82b8edbc314.png'],
    },
    icons: {
      icon: '/favicon-32x32.png',
      shortcut: '/favicon-16x16.png',
      apple: [{ url: '/apple-touch-icon.png' }, { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
      other: [
        {
          rel: 'apple-touch-icon-precomposed',
          url: '/apple-touch-icon-precomposed.png',
        },
      ],
    },
  };
}

export default async function Page(props) {
  return (
    <DefaultLayout previewPixelSRC="https://intdev-global.s3.us-west-2.amazonaws.com/template-app-icon.png">
      <MarketingServerMono />
    </DefaultLayout>
  );
}
