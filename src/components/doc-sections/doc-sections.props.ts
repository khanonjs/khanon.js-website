import { MarkdownDocSection } from '../markdown-doc/markdown-doc-section'

export interface DocSectionsProps {
  docPath: string
  switchSection: (section: MarkdownDocSection, title: string) => void
  documents: MarkdownDocSection[]
}
