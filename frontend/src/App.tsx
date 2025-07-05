import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router';
import Layout from './components/layout/Layout';
import './styles/globals.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <AppRouter />
      </Layout>
    </BrowserRouter>
  );
};

export default App;