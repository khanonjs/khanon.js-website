import { MarkdownDocSection } from '../markdown-doc/markdown-doc-section'

export interface SidebarProps {
  docPath: string
  goSection: (section: MarkdownDocSection, title: string) => void
}
