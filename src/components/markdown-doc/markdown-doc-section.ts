export interface MarkdownDocSection {
  section: string
  sectionPath: string,
  docs: {
    title: string
    file: string
  }[]
}
