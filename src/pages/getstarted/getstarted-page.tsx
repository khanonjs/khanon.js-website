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
                { title: 'Before starting a new game', markdown: Docs.get('getstarted-2') },
                { title: 'What\'s coming up?', markdown: Docs.get('getstarted-1') },
              ]
            },
            {
              section: 'Creating a new game',
              docs: [
                { title: 'Starting a new project', markdown: Docs.get('getstarted-5') },
                { title: 'Installing dependencies', markdown: Docs.get('getstarted-6') },
                { title: 'Creating a new application', markdown: Docs.get('getstarted-6') },
                { title: 'Deploying to a server', markdown: Docs.get('getstarted-6') },
              ]
            },
            {
              section: 'Application flow',
              docs: [
                { title: 'Overview', markdown: Docs.get('getstarted-5') },
                { title: 'Using the App interface', markdown: Docs.get('getstarted-5') },
                { title: 'Using the KJS object', markdown: Docs.get('getstarted-6') },
                { title: 'App states', markdown: Docs.get('getstarted-5') },
              ]
            },
            {
              section: 'Scenes',
              docs: [
                { title: 'Overview', markdown: Docs.get('getstarted-5') },
                { title: 'Creating a new Scene', markdown: Docs.get('getstarted-5') },
                { title: 'Using the Scene interface', markdown: Docs.get('getstarted-6') },
                { title: 'Scene states', markdown: Docs.get('getstarted-6') },
                { title: 'Defining the camera', markdown: Docs.get('getstarted-5') },
                { title: 'Scene actions', markdown: Docs.get('getstarted-6') },
              ]
            },
            {
              section: 'Sprites',
              docs: [
                { title: 'Overview', markdown: Docs.get('getstarted-5') },
                { title: 'Sprite as class decorator', markdown: Docs.get('getstarted-5') },
                { title: 'Sprite as property decorator', markdown: Docs.get('getstarted-6') },
                { title: 'Using the Sprite interface', markdown: Docs.get('getstarted-6') },
                { title: 'Spawning and destroying sprites', markdown: Docs.get('getstarted-6') },
              ]
            },
            {
              section: 'Meshes',
              docs: [
                { title: 'Overview', markdown: Docs.get('getstarted-5') },
                { title: 'Mesh as class decorator', markdown: Docs.get('getstarted-5') },
                { title: 'Mesh as property decorator', markdown: Docs.get('getstarted-6') },
                { title: 'Using the Mesh interface', markdown: Docs.get('getstarted-6') },
                { title: 'Spawning and destroying meshes', markdown: Docs.get('getstarted-6') },
              ]
            },
            {
              section: 'SceneMaps',
              docs: [
                { title: 'Overview', markdown: Docs.get('getstarted-5') },
                { title: 'Sprite maps', markdown: Docs.get('getstarted-5') },
                { title: 'Mesh maps', markdown: Docs.get('getstarted-6') },
              ]
            },
            {
              section: 'Actors',
              docs: [
                { title: 'Overview', markdown: Docs.get('getstarted-5') },
                { title: 'Creating a new actor', markdown: Docs.get('getstarted-5') },
                { title: 'Using the Actor interface', markdown: Docs.get('getstarted-6') },
                { title: 'Actor states', markdown: Docs.get('getstarted-6') },
                { title: 'Actor actions', markdown: Docs.get('getstarted-6') },
                { title: 'Spawning and destroying actors', markdown: Docs.get('getstarted-6') },
              ]
            },
            {
              section: 'Particles',
              docs: [
                { title: 'Overview', markdown: Docs.get('getstarted-5') },
                { title: 'Creating particles', markdown: Docs.get('getstarted-5') },
                { title: 'Using the Particle interface', markdown: Docs.get('getstarted-6') },
                { title: 'Spawning particles', markdown: Docs.get('getstarted-6') },
              ]
            },
            {
              section: 'Notifications',
              docs: [
                { title: 'Overview', markdown: Docs.get('getstarted-5') },
                { title: 'Receiving notifications', markdown: Docs.get('getstarted-5') },
                { title: 'Sending notifications', markdown: Docs.get('getstarted-6') },
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
                { title: 'getstarted-6', markdown: Docs.get('getstarted-6') },
              ]
            },
          ]}
        />
      </div>
    )
  }
}
