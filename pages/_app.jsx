import 'scss/reset.scss';
import 'scss/global.scss';
import Head from 'next/head';
import store from '../redux/store';
import { Provider } from 'react-redux';
import { useEffect, useState } from 'react';

export default function MyApp({ Component, pageProps }) {
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    setPageLoading(false);
  }, []);

  return pageLoading ? (
    <div>Loading</div>
  ) : (
    <Provider store={store}>
      <Head>
        <title>Portfolio</title>
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}
