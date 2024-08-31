import { Docs } from '../../classes/docs'
import { PageBase } from '../../classes/page-base'
import { MarkdownDoc } from '../../components/markdown-doc/markdown-doc'
import styles from './getstarted-page.module.scss'

export class GetStartedPage extends PageBase {
  sectionId: number
  itemId: number

  componentWillMount(): void {
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
      <div className={styles['getstarted-page']}>
        <MarkdownDoc
          initialSectionId={this.sectionId}
          storeSectionId={this.storeSectionId.bind(this)}
          initialItemId={this.itemId}
          storeItemId={this.storeItemId.bind(this)}
          documents={[
            {
              section: 'Get started',
              docs: [
                { title: 'What is Khanon.js?', markdown: Docs.get('getstarted-0') },
                { title: 'Installing Khanon.js', markdown: Docs.get('getstarted-0') },
                { title: 'What\'s coming up?', markdown: Docs.get('getstarted-1') },
                { title: 'Before starting a new game', markdown: Docs.get('getstarted-2') },
              ]
            },
            {
              section: 'Creating a new game',
              docs: [
                { title: 'Starting a new project', markdown: Docs.get('getstarted-5') },
                { title: 'Installing dependencies', markdown: Docs.get('getstarted-6') },
                { title: 'Creating a new application', markdown: Docs.get('getstarted-6') },
              ]
            },
            {
              section: 'Application flow',
              docs: [
                { title: 'getstarted-5', markdown: Docs.get('getstarted-5') },
                { title: 'KJS object', markdown: Docs.get('getstarted-6') }
              ]
            },
            {
              section: 'Scenes',
              docs: [
                { title: 'getstarted-5', markdown: Docs.get('getstarted-5') },
                { title: 'getstarted-6', markdown: Docs.get('getstarted-6') }
              ]
            },
            {
              section: 'Sprites',
              docs: [
                { title: 'getstarted-5', markdown: Docs.get('getstarted-5') },
                { title: 'getstarted-6', markdown: Docs.get('getstarted-6') }
              ]
            },
            {
              section: 'Meshes',
              docs: [
                { title: 'getstarted-5', markdown: Docs.get('getstarted-5') },
                { title: 'getstarted-6', markdown: Docs.get('getstarted-6') }
              ]
            },
            {
              section: 'SceneMaps',
              docs: [
                { title: 'getstarted-5', markdown: Docs.get('getstarted-5') },
                { title: 'getstarted-6', markdown: Docs.get('getstarted-6') }
              ]
            },
            {
              section: 'Actors',
              docs: [
                { title: 'getstarted-5', markdown: Docs.get('getstarted-5') },
                { title: 'getstarted-6', markdown: Docs.get('getstarted-6') }
              ]
            },
            {
              section: 'Particles',
              docs: [
                { title: 'getstarted-5', markdown: Docs.get('getstarted-5') },
                { title: 'getstarted-6', markdown: Docs.get('getstarted-6') }
              ]
            },
            {
              section: 'Notifications',
              docs: [
                { title: 'getstarted-5', markdown: Docs.get('getstarted-5') },
                { title: 'getstarted-6', markdown: Docs.get('getstarted-6') }
              ]
            },
            {
              section: 'Examples REMOVE ME',
              docs: [
                { title: 'getstarted-0', markdown: Docs.get('getstarted-0') },
                { title: 'getstarted-1', markdown: Docs.get('getstarted-1') },
                { title: 'getstarted-2', markdown: Docs.get('getstarted-2') },
                { title: 'getstarted-3', markdown: Docs.get('getstarted-3') },
                { title: 'getstarted-4', markdown: Docs.get('getstarted-4') },
                { title: 'getstarted-5', markdown: Docs.get('getstarted-5') },
                { title: 'getstarted-6', markdown: Docs.get('getstarted-6') }
              ]
            },
          ]}
        />
      </div>
    )
  }
}
