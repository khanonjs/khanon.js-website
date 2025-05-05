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
  lastPath: Map<string, string> = new Map()

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
      this.elementHeaderTitle.innerText = MarkdownHelper.getSectionTitle(section.section, title)
    }
    this.elementMarkdown?.goSection(section, title)
  }

  renderPage() {
    if (!this.props.docPath) {
      const lastPath = this.lastPath.get(this.props.tabPath)
      setTimeout(() => {
        if (lastPath) {
          this.props.navigate(lastPath, { replace: true })
        } else {
          this.props.navigate(this.props.documents[0].docs[0].file, { replace: true })
        }
      }, 1)
    } else {
      this.lastPath.set(this.props.tabPath, this.props.docPath)
    }
    let section: MarkdownDocSection | undefined
    this.props.documents.forEach((_section) => {
      _section.docs.forEach((item) => {
        if (item.file === this.props.docPath) {
          section = _section
        }
      })
    })
    const doc = section ? Docs.get(this.props.docPath) : ''
    if (this.elementMarkdown && section) {
      this.elementMarkdown.setMarkdown(doc)
    }
    return (
      <div className={styles['docs-page-container']}>
        <div className={ElementStyle.getClass(styles, ['container', 'font-docfont-regular'])}>
          <div className={styles['header']}>
            <div
              ref={this.refHeaderTitle.bind(this)}
              className={ElementStyle.getClass(styles, ['header-text', 'rsp-header-text'])}
            >
              {MarkdownHelper.getSectionTitle(section?.section ?? '', section?.docs.find(doc => doc.file === this.props.docPath)?.title ?? '')}
            </div>
          </div>
          <div className={ElementStyle.getClass(styles, ['content', ''])}>
            <div
              className={ElementStyle.getClass(styles, ['sections-container', 'rsp-hide-sections-container'])}
            >
              <DocSections
                docPath={this.props.docPath}
                switchSection={this.goSection.bind(this)}
                documents={this.props.documents}
              />
            </div>
            <MarkdownDoc
              ref={this.refMarkdown.bind(this)}
              currentMarkdown={doc}
              hashtag={this.props.hashtag}
            />
          </div>
        </div>
      </div>
    )
  }
}
