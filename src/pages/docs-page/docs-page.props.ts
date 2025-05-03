import { MarkdownDocSection } from '../../components/markdown-doc/markdown-doc-section'

export interface DocsPageProps {
  docPath: string
  sectionId: number // 8a8f
  itemId: number // 8a8f
  // storageSectionIdTag: string
  // storageItemIdTag: string
  documents: MarkdownDocSection[]
}
