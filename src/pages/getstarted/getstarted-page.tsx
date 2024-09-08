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
                { title: 'What is Khanon.js?', markdown: Docs.get('0-what-is-khanon-js') },
                { title: 'Installing Khanon.js', markdown: Docs.get('0-installing-khanon-js') },
                { title: 'Before starting a new game', markdown: Docs.get('0-before-starting') },
                { title: 'What\'s coming up?', markdown: Docs.get('0-whats-coming-up') },
              ]
            },
            {
              section: 'Creating a new game',
              docs: [
                { title: 'Starting a new project', markdown: Docs.get('1-starting-new-project') },
                { title: 'Creating a new application', markdown: Docs.get('1-creating-new-application') },
                { title: 'Deploying to a server', markdown: Docs.get('1-deploying-to-server') },
              ]
            },
            {
              section: 'Application flow',
              docs: [
                { title: 'Overview', markdown: Docs.get('2-overview') },
                { title: 'Using the App interface', markdown: Docs.get('2-using-app-instance') },
                { title: 'Using the KJS object', markdown: Docs.get('2-using-kjs-object') },
                { title: 'App states', markdown: Docs.get('2-app-states') },
              ]
            },
            {
              section: 'Scenes',
              docs: [
                { title: 'Overview', markdown: Docs.get('3-overview') },
                { title: 'Creating a new Scene', markdown: Docs.get('3-creating-new-scene') },
                { title: 'Using the Scene interface', markdown: Docs.get('3-using-scene-interface') },
                { title: 'Scene states', markdown: Docs.get('3-scene-states') },
                { title: 'Defining the camera', markdown: Docs.get('3-defining-the-camera') },
                { title: 'Scene actions', markdown: Docs.get('3-scene-actions') },
              ]
            },
            {
              section: 'Sprites',
              docs: [
                { title: 'Overview', markdown: Docs.get('4-overview') },
                { title: 'Sprite as class decorator', markdown: Docs.get('4-sprite-class-decorator') },
                { title: 'Sprite as property decorator', markdown: Docs.get('4-sprite-property-decorator') },
                { title: 'Using the Sprite interface', markdown: Docs.get('4-using-sprite-interface') },
                { title: 'Spawning and destroying sprites', markdown: Docs.get('4-spawning-destroying-sprites') },
              ]
            },
            {
              section: 'Meshes',
              docs: [
                { title: 'Overview', markdown: Docs.get('5-overview') },
                { title: 'Mesh as class decorator', markdown: Docs.get('5-mesh-class-decorator') },
                { title: 'Mesh as property decorator', markdown: Docs.get('5-mesh-property-decorator') },
                { title: 'Using the Mesh interface', markdown: Docs.get('5-using-mesh-interface') },
                { title: 'Spawning and destroying meshes', markdown: Docs.get('5-spawning-destroying-meshes') },
              ]
            },
            {
              section: 'SceneMaps',
              docs: [
                { title: 'Overview', markdown: Docs.get('6-overview') },
                { title: 'Sprite maps', markdown: Docs.get('6-sprite-maps') },
                { title: 'Mesh maps', markdown: Docs.get('6-mesh-maps') },
              ]
            },
            {
              section: 'Actors',
              docs: [
                { title: 'Overview', markdown: Docs.get('7-overview') },
                { title: 'Creating a new actor', markdown: Docs.get('7-creating-new-actor') },
                { title: 'Using the Actor interface', markdown: Docs.get('7-using-actor-interface') },
                { title: 'Actor states', markdown: Docs.get('7-actor-states') },
                { title: 'Actor actions', markdown: Docs.get('7-actor-actions') },
                { title: 'Spawning and destroying actors', markdown: Docs.get('7-spawning-destroying-actors') },
              ]
            },
            {
              section: 'Particles',
              docs: [
                { title: 'Overview', markdown: Docs.get('8-overview') },
                { title: 'Creating particles', markdown: Docs.get('8-creating-particles') },
                { title: 'Using the Particle interface', markdown: Docs.get('8-using-particle-interface') },
                { title: 'Spawning particles', markdown: Docs.get('8-spawning-particles') },
              ]
            },
            {
              section: 'Notifications',
              docs: [
                { title: 'Overview', markdown: Docs.get('9-overview') },
                { title: 'Receiving notifications', markdown: Docs.get('9-receiving-notifications') },
                { title: 'Sending notifications', markdown: Docs.get('9-sending-notifications') },
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
