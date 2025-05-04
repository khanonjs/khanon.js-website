import { MarkdownDocSection } from '../markdown-doc/markdown-doc-section'

export interface SidebarProps {
  tabPath: string
  docPath: string
  hashtag: string
  goSection: (section: MarkdownDocSection, title: string) => void
}
