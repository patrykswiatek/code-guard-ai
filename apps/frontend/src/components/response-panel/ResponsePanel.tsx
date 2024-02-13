import { Button, Checkbox } from 'antd';
import { type FC, useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import { getRepositoryFiles } from '@/api';
import styles from './ResponsePanel.module.css';

import type { ResponsePanelProps } from '@/types/props/response-panel.props';
import { ApiUrl } from '@repo/types';

const WS_URL = `ws://localhost:4000${ApiUrl.RepositoryProcessChanges}`;

const ResponsePanel: FC<ResponsePanelProps> = ({ className }) => {
  const [messageHistory, setMessageHistory] = useState<string>('');

  const [filesToSelect, setFilesToSelect] = useState<{ id: string; label: string; value: string }[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])

  const { sendMessage, lastMessage } = useWebSocket(WS_URL);

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(JSON.parse(lastMessage.data)));
    }
  }, [lastMessage, setMessageHistory]);

  const handleClick = async () => {
    const { data } = await getRepositoryFiles();
    const defaultSelectedFiles = data.map(({ value }: typeof filesToSelect[number]) => value);

    setSelectedFiles(defaultSelectedFiles);
    setFilesToSelect(data);
  };

  const onSubmit = () => {
    sendMessage(JSON.stringify(selectedFiles));
  };

  return (
    <div className={`${className ?? ''} ${styles['response-panel']}`}>
      <div className={styles['button-wrapper']}>
        <Button className={styles.button} type="primary" onClick={handleClick}>Get files</Button>
        {filesToSelect?.length ?
          <Button
            className={styles.button}
            type="primary"
            onClick={onSubmit}
          >
            Process files
          </Button> : null}
      </div>
      {filesToSelect?.length ?
          <Checkbox.Group
            className={styles.checkboxes}
            options={filesToSelect}
            value={selectedFiles}
            onChange={setSelectedFiles}
          /> : null}
        <div className={styles['message-panel']}>{messageHistory}</div>
    </div>
  );
};

export default ResponsePanel;
