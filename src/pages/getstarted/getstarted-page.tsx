import { Docs } from '../../classes/docs'
import { PageBase } from '../../classes/page-base'
import { MarkdownDoc } from '../../components/markdown-doc/markdown-doc'
import styles from './getstarted-page.module.scss'

export class GetStartedPage extends PageBase {
  renderPage() {
    return (
      <div className={styles['getstarted-page']}>
        <MarkdownDoc
          documents={[
            {
              section: 'Section 1',
              docs: [
                { title: 'getstarted-0', markdown: Docs.get('getstarted-0') },
                { title: 'getstarted-1', markdown: Docs.get('getstarted-1') },
                { title: 'getstarted-2', markdown: Docs.get('getstarted-2') }
              ]
            },
            {
              section: 'Section 2',
              docs: [
                { title: 'getstarted-3', markdown: Docs.get('getstarted-3') },
                { title: 'getstarted-4', markdown: Docs.get('getstarted-4') }
              ]
            },
            {
              section: 'Section 3',
              docs: [
                { title: 'getstarted-5', markdown: Docs.get('getstarted-5') },
                { title: 'getstarted-6', markdown: Docs.get('getstarted-6') }
              ]
            }
          ]}
        />
      </div>
    )
  }
}
