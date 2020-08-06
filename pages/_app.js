import React, {Fragment} from 'react';
import 'normalize.css';
import Head from 'next/head';
import '../styles/globals.scss';
import '../styles/animations.scss';

const meta = {
  title: 'Bojan Wilytsch',
  desc:
    'London based UX Engineer, Designer and Tinkerer with a passion for connecting design, art and technology.',
  image: 'https://madebybojan.com/og-image.jpg',
  imageAlt: 'Bojan Wilytsch - UX Engineer - Personal Site',
  url: 'https://madebybojan.com/',
  twitterHandle: '@bwilytsch',
  fbAppId: '',
};

const SocialMeta = ({meta}) => {
  return (
    <Fragment>
      <meta property="og:title" content={meta.title} key="title" />
      <meta property="og:description" content={meta.desc} />
      <meta property="og:image" content={meta.image} />
      <meta property="og:url" content={meta.url} />
      <meta name="twitter:card" content="summary" />
      <meta property="og:site_name" content={meta.title} />
      <meta name="twitter:image:alt" content={meta.imageAlt} />
      {meta.fbAppId && <meta property="fb:app_id" content={meta.fbAppId} />}
      {meta.twitterHandle && (
        <meta name="twitter:site" content={meta.twitterHandle} />
      )}
    </Fragment>
  );
};

// Import SEO tools from work :D
function MyApp({Component, pageProps}) {
  return (
    <Fragment>
      <Head>
        <SocialMeta meta={meta} />
        <meta charSet="utf-8" />
        <title>{meta.title}</title>
        <meta name="description" content={meta.desc} />
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
        <link
          href="./favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="./favicon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5"
        />
        <meta name="theme-color" content="#FFFFFF" />
        <link rel="manifest" href="./manifest.webmanifest" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700&display=auto"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Mono&display=auto"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />
    </Fragment>
  );
}

export default MyApp;
