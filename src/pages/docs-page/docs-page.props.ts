import { MarkdownDocSection } from '../../components/markdown-doc/markdown-doc-section'

export interface DocsPageProps {
  storageSectionIdTag: string
  storageItemIdTag: string
  documents: MarkdownDocSection[]
}
