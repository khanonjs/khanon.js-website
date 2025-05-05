import { NavigateFunction } from 'react-router'

import { MarkdownDocSection } from '../markdown-doc/markdown-doc-section'

export interface SidebarProps {
  tabPath: string
  docPath: string
  hashtag: string
  navigate: NavigateFunction
}
