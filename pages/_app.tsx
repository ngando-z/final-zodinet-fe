import 'antd/dist/antd.css';
import '@/styles/globals.scss';
import { AppPropsWithLayout } from '../models';
import { EmptyLayout } from '@/components/layout';
import React, { useEffect } from 'react';
import { store } from './../app/store';
import { Provider } from 'react-redux';
import AppContent from '@/components/AppContent';

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout;

  const [showChild, setShowChild] = React.useState(false);

  // Wait until after client-side hydration to show
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    // You can show some kind of placeholder UI here
    return null;
  }

  return (
    <Provider store={store}>
      <AppContent>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppContent>
    </Provider>
  );
}

export default MyApp;
