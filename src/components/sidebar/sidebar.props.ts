import { Pages } from '../../models/pages'
import { MarkdownDocSection } from '../markdown-doc/markdown-doc-section'

export interface SidebarProps {
  goSection: (section: MarkdownDocSection, title: string) => void
  cbSetPage: (page: Pages) => void
}
