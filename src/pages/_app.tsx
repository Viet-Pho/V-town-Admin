import React, {useEffect} from 'react';
import {AppProps} from 'next/app';
import Head from 'next/head';
import CssBaseline from '@mui/material/CssBaseline';
import {CacheProvider} from '@emotion/react';
import createEmotionCache from '../createEmotionCache';
import AppContextProvider from '../@crema/utility/AppContextProvider';
import {Provider} from 'react-redux';
import AppThemeProvider from '../@crema/utility/AppThemeProvider';
import AppStyleProvider from '../@crema/utility/AppStyleProvider';
import AppLocaleProvider from '../@crema/utility/AppLocaleProvider';
import FirebaseAuthProvider from '../@crema/services/auth/firebase/FirebaseAuthProvider';
import JWTAuthProvider from '../@crema/services/auth/jwt-auth/JWTAuthProvider';
import AuthRoutes from '../@crema/utility/AuthRoutes';
import {useStore} from '../redux/store'; // Client-side cache, shared for the whole session of the user in the browser.
import {EmotionCache} from '@emotion/cache';
import '../@crema/services/index';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../../public/assets/styles/index.css';
import '../shared/vendors/index.css';
import ExchangePointDialog from '../modules/dashboards/ExchangePoint/ExchangePointDialog';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
  }: any = props;
  const store = useStore(pageProps.initialReduxState);

  const [openExchangeDialog, setOpenExchangeDialog] = React.useState(false);

  const openExchangePointDialog = (event) => {
    if (event.key === 'F8') {
      setOpenExchangeDialog(true);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', openExchangePointDialog);

    return () => {
      window.removeEventListener('keydown', openExchangePointDialog);
    };
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Vtown Admin</title>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <AppContextProvider>
        <Provider store={store}>
          <AppThemeProvider>
            <AppStyleProvider>
              <AppLocaleProvider>
                <JWTAuthProvider>
                  <AuthRoutes>
                    <CssBaseline />
                    <ExchangePointDialog
                      open={openExchangeDialog}
                      onClose={() => setOpenExchangeDialog(false)}
                    />
                    <Component {...pageProps} />
                  </AuthRoutes>
                </JWTAuthProvider>
              </AppLocaleProvider>
            </AppStyleProvider>
          </AppThemeProvider>
        </Provider>
      </AppContextProvider>
    </CacheProvider>
  );
}
