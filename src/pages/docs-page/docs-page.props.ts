import { NavigateFunction } from 'react-router'

import { MarkdownDocSection } from '../../components/markdown-doc/markdown-doc-section'

export interface DocsPageProps {
  tabPath: string
  docPath: string
  hashtag: string
  navigate: NavigateFunction
  documents: MarkdownDocSection[]
}
