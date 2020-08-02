import React, { Fragment } from 'react';
import 'normalize.css';
import Head from 'next/head';
import '../styles/globals.scss';

// Import SEO tools from work :D
function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />
    </Fragment>
  );
}

export default MyApp;
