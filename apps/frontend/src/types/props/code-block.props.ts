import { ComponentProps, ReactNode } from 'react'

export interface CodeBlockProps
  extends Pick<ComponentProps<'div'>, 'className'> {
  children: ReactNode
}
