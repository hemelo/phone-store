import React from 'react';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';

import { Layout, AlreadyVisited } from '../components';
import { AppContext } from '../context/AppContext';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import '../styles/globals.css';

const theme = {
    colors: {
        primary: `#f9d62e`,
        secondary: `#ff4e50`,
    },
    text: {
        primary: `black`
    }
}

const GlobalStyle = createGlobalStyle`
    ::-webkit-scrollbar-track {
        background-color: transparent !important;
    }

    ::-webkit-scrollbar {
        width: 7px;
        background-color: transparent !important;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 12px;
        background-color:${theme.colors.secondary};
    }

    .modal {
        background-color:${theme.colors.secondary};

        @media screen and (max-width:1280px) {
            right: 10rem; 
            left: 10rem;
        }

        @media screen and (max-width:1400px) {
            right: 16rem; 
            left: 16rem;
        }
    }
`

export default function MyApp({ Component, pageProps, router }) {
    return (
        <AppContext>
            <GlobalStyle />
            <ThemeProvider theme={theme}>
                <AlreadyVisited />
                <AnimatePresence exitBeforeEnter>
                    <Layout key={router.route}>
                        <Toaster />
                        <Component {...pageProps}  />
                    </Layout>
                </AnimatePresence>
            </ThemeProvider>
        </AppContext>
    )
}
