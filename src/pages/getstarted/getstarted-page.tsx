import { Docs } from '../../classes/docs'
import { PageBase } from '../../classes/page-base'
import { MarkdownDoc } from '../../components/markdown-doc/markdown-doc'
import styles from './getstarted-page.module.scss'

export class GetStartedPage extends PageBase {
  renderPage() {
    return (
      <div className={styles['getstarted-page']}>
        <MarkdownDoc
          markdownText={Docs.docGetStarted}
          leftMenu
          rightSummary
        />
      </div>
    )
  }
}
