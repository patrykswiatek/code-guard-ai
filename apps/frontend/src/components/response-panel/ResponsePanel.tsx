import { Button } from 'antd';
import { type FC, useEffect, useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

import styles from './ResponsePanel.module.css';

import type { ResponsePanelProps } from '@/types/props/response-panel.props';

const WS_URL = 'ws://127.0.0.1:4000';

const ResponsePanel: FC<ResponsePanelProps> = ({ className }) => {
  const [messageHistory, setMessageHistory] = useState<MessageEvent[]>([]);

  const { lastMessage, readyState } = useWebSocket(WS_URL);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  useEffect(() => {
    if (!lastMessage) return;

    setMessageHistory((prev) => [...prev, lastMessage]);
  }, [lastMessage, setMessageHistory]);


  return <div className={`${className} ${styles['response-panel']}`}>
     <Button type="primary">Button</Button>
      <h1>
        The WebSocket is currently {connectionStatus}
        <ul>
          {messageHistory.map(({ data }, i) => (
            <span key={i}>{data}</span>
          ))}
        </ul>
      </h1>
  </div>;
};

export default ResponsePanel;
