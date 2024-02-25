import { useState, type FC } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism"

import type { CodeBlockProps } from '@/types/props/code-block.props';
import { Button } from 'antd';

import styles from './CodeBlock.module.css';
import { mergeClasses } from '@/utils/merge-classes';
import { CopyOutlined } from '@ant-design/icons';

const CodeBlock: FC<CodeBlockProps> = ({ className, children }) => {
  const [copySuccessText, setCopySuccessText] = useState('');

  const language = /language-(\w+)/.exec(className || '')?.[1];

  const copyText = () => {
    navigator.clipboard.writeText(String(children));
    setCopySuccessText('Copied!');
    setTimeout(() => setCopySuccessText(''), 2000);
  };

  return language ? (
    <div className={styles['highlighted-code']}>
      <div className={styles['highlighted-code-heading']}>
        {language}
        {copySuccessText ?
          (<span className={styles['copy-text']}>{copySuccessText}</span>) :
          (<Button
            className={styles['copy-button']}
            type="primary"
            shape="round"
            size="small"
            icon={<CopyOutlined className={styles['copy-button-icon']} />}
            onClick={copyText}
          />)
        }
      </div>
      <SyntaxHighlighter
        PreTag="div"
        children={String(children).replace(/\n$/, '')}
        language={language}
        style={oneDark}
        codeTagProps={{ style: { fontSize: "14px" } }}
      />
    </div>
  ) : (
    <code className={mergeClasses(className, styles.code)}>
      {children}
    </code>
  );
  };

export default CodeBlock;
