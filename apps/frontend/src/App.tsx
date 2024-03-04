import { FC } from 'react';
import { ConfigProvider } from 'antd';

import Layout from '@/components/layout/Layout';
import ResponsePanel from '@/components/response-panel/ResponsePanel';
import AIConfigForm from '@/components/ai-config-form/AIConfigForm';

import './App.css';

/* TODO:
  - Display form to provide required data (api key, open ai model)
  - If provided display input to select project directory
  - If provided display button to get files with changes
  - Display list of files with changes and button to process them
*/
const App: FC = () => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            colorPrimary: '#0F1924',
            algorithm: true, // Enable algorithm
          }
        },
      }}
    >
      <Layout>
        <AIConfigForm />
        <ResponsePanel />
      </Layout>
    </ConfigProvider>
  );
}

export default App;
