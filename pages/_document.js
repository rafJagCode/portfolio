import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html className='dark'>
        <Head>
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='true' />
          <link href='https://fonts.googleapis.com/css2?family=Saira:wght@300;500;800&family=VT323&display=swap' rel='stylesheet' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
