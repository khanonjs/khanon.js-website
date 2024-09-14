import { PageBase } from '../../classes/page-base'
import { MarkdownDoc } from '../../components/markdown-doc/markdown-doc'
import { getStartedDocs } from '../../doc-definitions'
import styles from './getstarted-page.module.scss'

export class GetStartedPage extends PageBase {
  sectionId: number
  itemId: number

  constructor(props) {
    super(props)
    this.sectionId = Number(localStorage.getItem('getstarted_SectionId') ?? 0)
    this.itemId = Number(localStorage.getItem('getstarted_ItemId') ?? 0)
  }

  storeSectionId(sectionId: string) {
    localStorage.setItem('getstarted_SectionId', sectionId)
  }

  storeItemId(itemId: string) {
    localStorage.setItem('getstarted_ItemId', itemId)
  }

  renderPage() {
    return (
      <div className={styles['getstarted-page']}>
        <MarkdownDoc
          initialSectionId={this.sectionId}
          storeSectionId={this.storeSectionId.bind(this)}
          initialItemId={this.itemId}
          storeItemId={this.storeItemId.bind(this)}
          documents={getStartedDocs}
        />
      </div>
    )
  }
}
