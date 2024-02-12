import type { FC } from 'react';

import styles from './Layout.module.css';

import { LayoutProps } from '@/types/props/layout.props';

const Layout: FC<LayoutProps> = ({ className, children }) => {
  return <div className={`${className} ${styles['layout']}`}>{children}</div>;
};

export default Layout;
