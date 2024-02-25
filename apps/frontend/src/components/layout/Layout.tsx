import type { FC } from 'react';

import styles from './Layout.module.css';

import { LayoutProps } from '@/types/props/layout.props';
import { mergeClasses } from '@/utils/merge-classes';

const Layout: FC<LayoutProps> = ({ className, children }) => {
  return <div className={mergeClasses(className, styles['layout'])}>{children}</div>;
};

export default Layout;
