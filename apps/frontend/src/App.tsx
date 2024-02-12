import { FC } from 'react';

import Layout from '@/components/layout/Layout';
import ResponsePanel from '@/components/response-panel/ResponsePanel';

import './App.css';

const App: FC = () => {
  return <Layout><ResponsePanel /></Layout>;
}

export default App;
