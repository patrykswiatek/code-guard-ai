import { FC, useEffect, useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

import './App.css';

const WS_URL = 'ws://127.0.0.1:4000';

const App: FC = () => {
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

  return (
    <h1 className="text-3xl font-bold">
      The WebSocket is currently {connectionStatus}
      <ul>
        {messageHistory.map(({ data }, i) => (
          <span key={i}>{data}</span>
        ))}
      </ul>
    </h1>
  );
}

export default App;
