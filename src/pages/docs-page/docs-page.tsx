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

  storeSectionId(sectionId: string) {
    localStorage.setItem(this.props.storageSectionIdTag, sectionId)
  }

  storeItemId(itemId: string) {
    localStorage.setItem(this.props.storageItemIdTag, itemId)
  }

  goSection(section: MarkdownDocSection, title: string) {
    if (this.elementHeaderTitle) {
      this.elementHeaderTitle.innerText = MarkdownHelper.getSectionTitle(section.section, title)
    }
    this.elementMarkdown?.goSection(section, title)
  }

  renderPage() {
    const section = this.props.documents[this.props.sectionId]
    if (this.elementMarkdown) {
      this.elementMarkdown.setMarkdown(Docs.get(section.docs[this.props.itemId].file))
    }
    return (
      <div className={styles['docs-page-container']}>
        <div className={ElementStyle.getClass(styles, ['container', 'font-docfont-regular'])}>
          <div className={styles['header']}>
            <div
              ref={this.refHeaderTitle.bind(this)}
              className={styles['header-text']}
            >
              {MarkdownHelper.getSectionTitle(section.section, section.docs[this.props.itemId].title)}
            </div>
          </div>
          <div className={ElementStyle.getClass(styles, ['content', ''])}>
            <div
              className={ElementStyle.getClass(styles, ['sections-container', 'rsp-hide-sections-container'])}
            >
              <DocSections
                switchSection={this.goSection.bind(this)}
                initialSectionId={this.props.sectionId}
                initialItemId={this.props.itemId}
                storeSectionId={this.storeSectionId.bind(this)}
                storeItemId={this.storeItemId.bind(this)}
                documents={this.props.documents}
              />
            </div>
            <MarkdownDoc
              ref={this.refMarkdown.bind(this)}
              currentMarkdown={Docs.get(section.docs[this.props.itemId].file)}
            />
          </div>
        </div>
      </div>
    )
  }
}
