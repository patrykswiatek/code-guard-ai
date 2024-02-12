import { ComponentProps, ReactNode } from 'react'

export interface LayoutProps extends Pick<ComponentProps<'div'>, 'className'> {
  children: ReactNode
}
