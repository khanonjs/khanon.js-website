import { MarkdownDocSection } from '../../components/markdown-doc/markdown-doc-section'

export interface DocsPageProps {
  sectionId: number
  itemId: number
  storageSectionIdTag: string
  storageItemIdTag: string
  documents: MarkdownDocSection[]
}
