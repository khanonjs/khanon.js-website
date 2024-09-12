import { Docs } from '../../classes/docs'
import { PageBase } from '../../classes/page-base'
import { MarkdownDoc } from '../../components/markdown-doc/markdown-doc'
import styles from './tutorials-page.module.scss'

export class TutorialsPage extends PageBase {
  sectionId: number
  itemId: number

  constructor(props) {
    super(props)
    this.sectionId = Number(localStorage.getItem('tutorials_SectionId') ?? 0)
    this.itemId = Number(localStorage.getItem('tutorials_ItemId') ?? 0)
  }

  storeSectionId(sectionId: string) {
    localStorage.setItem('tutorials_SectionId', sectionId)
  }

  storeItemId(itemId: string) {
    localStorage.setItem('tutorials_ItemId', itemId)
  }

  renderPage() {
    return (
      <div className={styles['tutorials-page']}>
        <MarkdownDoc
          initialSectionId={this.sectionId}
          storeSectionId={this.storeSectionId.bind(this)}
          initialItemId={this.itemId}
          storeItemId={this.storeItemId.bind(this)}
          documents={[
            {
              section: 'Tutorials 1',
              docs: [
                { title: 'TUTO', markdown: Docs.get('tutorials') }
              ]
            }
          ]}
        />
      </div>
    )
  }
}
