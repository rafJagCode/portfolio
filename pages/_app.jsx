import 'scss/reset.scss';
import 'scss/global.scss';
import Head from 'next/head';
import store from '../redux/store';
import { Provider } from 'react-redux';

export default function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <title>Portfolio</title>
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}
