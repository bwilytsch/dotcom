import Document, {Html, Head, Main, NextScript} from 'next/document';
import {Fragment} from 'react';
import {ServerStyleSheet} from 'styled-components';

const GA = ({id}) => {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
        
        ga('create', '${id}', 'auto');
        ga('send', 'pageview');`,
      }}
    />
  );
};

const ASYNCGA = ({id}) => {
  return (
    <Fragment>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
        ga('create', '${id}', 'auto');
        ga('send', 'pageview');`,
        }}
      />
      <script async src="https://www.google-analytics.com/analytics.js" />
    </Fragment>
  );
};

const GTAHead = ({id}) => {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${id}');
        `,
      }}
    />
  );
};

const GTABody = ({id}) => {
  return (
    <noscript
      dangerouslySetInnerHTML={{
        __html: `<iframe
        src="https://www.googletagmanager.com/ns.html?id=${id}"
        height="0"
        width="0"
        style="display:none;visibility:hidden"/>
        `,
      }}
    />
  );
};

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
  render() {
    return (
      <Html lang="en">
        <Head>
          <ASYNCGA id="UA-283964-1" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
