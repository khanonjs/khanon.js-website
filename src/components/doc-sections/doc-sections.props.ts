import { MarkdownDocSection } from '../markdown-doc/markdown-doc-section'

export interface DocSectionsProps {
  switchSection: (section: MarkdownDocSection, title: string) => void
  initialSectionId: number
  storeSectionId: (sectionId: string) => void
  initialItemId: number
  storeItemId: (ItemId: string) => void
  documents: MarkdownDocSection[]
}
