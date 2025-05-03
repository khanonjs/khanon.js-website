import { MarkdownDocSection } from '../markdown-doc/markdown-doc-section'

export interface DocSectionsProps {
  docPath: string
  switchSection: (section: MarkdownDocSection, title: string) => void
  initialSectionId: number // 8a8f es necesario?
  initialItemId: number
  documents: MarkdownDocSection[]
}
