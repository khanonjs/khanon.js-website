import { Docs } from '../../classes/docs'
import { PageBase } from '../../classes/page-base'
import { MarkdownDoc } from '../../components/markdown-doc/markdown-doc'
import styles from './tutorials-page.module.scss'

export class TutorialsPage extends PageBase {
  renderPage() {
    return (
      <div className={styles['tutorials-page']}>
        <MarkdownDoc
          markdownText={Docs.docGetStarted}
          leftMenu
          rightSummary
        />
      </div>
    )
  }
}
