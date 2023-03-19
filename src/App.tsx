import React, { useState } from 'react'
import './App.css'
import { Routing } from './Routing';
import theme from './utils/theme';
import { ThemeProvider } from '@mui/material';
import { Layout } from './shared/components/Layout';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Layout>
            <Routing />
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
    )
}

export default App
