import { MarkdownDocSection } from './markdown-doc-section'

export interface MarkdownDocProps {
  initialSectionId: number
  storeSectionId: (sectionId: string) => void
  initialItemId: number
  storeItemId: (ItemId: string) => void
  documents: MarkdownDocSection[]
}
