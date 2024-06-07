import 'scss/reset.scss';
import 'scss/global.scss';
import Head from 'next/head';
import store from '../redux/store';
import { Provider } from 'react-redux';

export default function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <title>Rafał Jagielski</title>
        <meta name='description' content='Rafał Jagielski - Web Developer specializing in Vue.js and React. Explore my portfolio to see my latest projects, skills, and experience in creating dynamic and responsive web applications.' />
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}
