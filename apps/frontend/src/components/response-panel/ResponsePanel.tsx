import { Button, Checkbox } from 'antd';
import { type FC, useEffect, useState, useMemo } from 'react';
import useWebSocket from 'react-use-websocket';
import { getRepositoryFiles } from '@/api';
import styles from './ResponsePanel.module.css';
import Markdown, { Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { ResponsePanelProps } from '@/types/props/response-panel.props';
import { ApiUrl } from '@repo/types';
import remarkMath from "remark-math"
import CodeBlock from '@/components/code-block/CodeBlock';
import { mergeClasses } from '@/utils/merge-classes';

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
    setMessageHistory('');
    sendMessage(JSON.stringify(selectedFiles));
  };

  const markdownComponents = useMemo((): Components => ({
    h3: ({ children }) => <h3 className={styles.heading}>{children}</h3>,
    p: ({ children }) => <p className={styles.text}>{children}</p>,
    ul: ({ children }) => <ul className={styles.text}>{children}</ul>,
    code: ({ className, children }) => <CodeBlock className={className}>{children}</CodeBlock>,
  }), []);

  return (
    <div className={mergeClasses(className, styles['response-panel'])}>
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
      <div className={styles['message-panel']}>
        {!!messageHistory && <div className={styles.message}>
          <Markdown
            remarkPlugins={[remarkGfm, remarkMath]}
            components={markdownComponents}
          >
            {`${messageHistory}`}
          </Markdown>
        </div>}
      </div>
    </div>
  );
};

export default ResponsePanel;
