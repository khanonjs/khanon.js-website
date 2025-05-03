import { Docs } from '../../classes/docs'
import { ElementStyle } from '../../classes/element-style'
import { MarkdownHelper } from '../../classes/markdown-helper'
import { PageBase } from '../../classes/page-base'
import { DocSections } from '../../components/doc-sections/doc-sections'
import { MarkdownDoc } from '../../components/markdown-doc/markdown-doc'
import { MarkdownDocSection } from '../../components/markdown-doc/markdown-doc-section'
import styles from './docs-page.module.scss'
import { DocsPageProps } from './docs-page.props'

export class DocsPage extends PageBase<DocsPageProps> {
  elementMarkdown: MarkdownDoc
  elementHeaderTitle: HTMLDivElement

  refMarkdown(element: MarkdownDoc) {
    if (element) {
      this.elementMarkdown = element
    }
  }

  refHeaderTitle(element: HTMLDivElement) {
    if (element) {
      this.elementHeaderTitle = element
    }
  }

  goSection(section: MarkdownDocSection, title: string) {
    if (this.elementHeaderTitle) {
      this.elementHeaderTitle.innerText = MarkdownHelper.getSectionTitle(section.section)
    }
    this.elementMarkdown?.goSection(section, title)
  }

  renderPage() {
    let section: MarkdownDocSection | undefined
    this.props.documents.forEach((_section) => {
      _section.docs.forEach((item) => {
        if (item.file === this.props.docPath) {
          section = _section
        }
      })
    })
    // console.log('aki DocsPage currentLocation', this.props.currentLocation.pathname)
    // console.log('aki DocsPage file', this.props.docPath)
    // console.log('aki DocsPage this.props.sectionId', this.props.sectionId)
    // console.log('aki DocsPage this.props.itemId', this.props.itemId)
    // console.log('aki rendering docs page A', section.docs[this.props.itemId].file)
    console.log('aki renderPage A', section)
    console.log('aki renderPage B', this.props.docPath)
    const doc = section ? Docs.get(/*section.docs[this.props.itemId].file*/this.props.docPath) : ''
    if (this.elementMarkdown && section) {
      console.log('aki renderPage C', doc)
      this.elementMarkdown.setMarkdown(doc)
      console.log('aki renderPage D', this.elementMarkdown.currentMarkdown)
    }
    return (
      <div className={styles['docs-page-container']}>
        <div className={ElementStyle.getClass(styles, ['container', 'font-docfont-regular'])}>
          <div className={styles['header']}>
            <div
              ref={this.refHeaderTitle.bind(this)}
              className={styles['header-text']}
            >
              {MarkdownHelper.getSectionTitle(section?.section ?? '')}
            </div>
          </div>
          <div className={ElementStyle.getClass(styles, ['content', ''])}>
            <div
              className={ElementStyle.getClass(styles, ['sections-container', 'rsp-hide-sections-container'])}
            >
              <DocSections
                docPath={this.props.docPath}
                switchSection={this.goSection.bind(this)}
                initialSectionId={this.props.sectionId}
                initialItemId={this.props.itemId}
                documents={this.props.documents}
              />
            </div>
            <MarkdownDoc
              ref={this.refMarkdown.bind(this)}
              currentMarkdown={doc}
            />
          </div>
        </div>
      </div>
    )
  }
}
