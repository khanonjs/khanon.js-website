import React from 'react'
import { ExternalLink } from 'react-feather'

import { ElementStyle } from '../../classes/element-style'
import {
  getStartedDocs,
  tutorialsDocs
} from '../../doc-definitions'
import { DocSections } from '../doc-sections/doc-sections'
import { MarkdownDocSection } from '../markdown-doc/markdown-doc-section'
import styles from './sidebar.module.scss'
import { SidebarProps } from './sidebar.props'

export class Sidebar extends React.Component<SidebarProps> {
  elementBackground: HTMLDivElement
  elementSidebarContainer: HTMLDivElement

  // Document properties
  documents: MarkdownDocSection[] | undefined
  storageSectionIdTag: string
  storageItemIdTag: string

  refBackground(element: HTMLDivElement) {
    if (element) {
      this.elementBackground = element
    }
  }

  refSidebarContainer(element: HTMLDivElement) {
    if (element) {
      this.elementSidebarContainer = element
    }
  }

  handleClose() {
    this.close()
  }

  handleGetStarted() {
    this.props.navigate('/getstarted')
    this.close()
  }

  handleTutorials() {
    this.props.navigate('/tutorials')
    this.close()
  }

  handleAPIDoc() {
    window.open('api-docs/index.html', '_blank', 'noreferrer')
    this.close()
  }

  setDocumentProperties(documents: MarkdownDocSection[]) {
    this.documents = documents
    setTimeout(() => {
      this.forceUpdate()
    }, 1)
  }

  resetDocumentProperties() {
    this.documents = undefined
    setTimeout(() => {
      this.forceUpdate()
    }, 1)
  }

  open() {
    if (this.elementSidebarContainer) {
      this.elementBackground.setAttribute('open', '')
      this.elementSidebarContainer.setAttribute('open', '')
    }
  }

  close() {
    if (this.elementSidebarContainer) {
      this.elementBackground.removeAttribute('open')
      this.elementSidebarContainer.removeAttribute('open')
    }
  }

  goSection(section: MarkdownDocSection, title: string) {
    this.close()
  }

  render() {
    return (
      <div
        ref={this.refBackground.bind(this)}
        className={ElementStyle.getClass(styles, ['sidebar-background', 'rsp-show-sidebar'])}
      >
        <div
          className={styles['sidebar-background-button']}
          onClick={this.handleClose.bind(this)}
        />
        <div
          ref={this.refSidebarContainer.bind(this)}
          className={styles['sidebar-container']}
        >
          <div className={styles['sidebar-header-container']}>
            <div
              className={ElementStyle.getClassCondition(styles, [{ class: 'sidebar-header-button' }, { class: 'selected', condition: this.documents === getStartedDocs }])}
              onClick={this.handleGetStarted.bind(this)}
            >
              <div className={styles['sidebar-header-button-text']}>
                Docs
              </div>
            </div>
            <div
              className={ElementStyle.getClassCondition(styles, [{ class: 'sidebar-header-button' }, { class: 'selected', condition: this.documents === tutorialsDocs }])}
              onClick={this.handleTutorials.bind(this)}
            >
              <div className={styles['sidebar-header-button-text']}>
                Tutorials
              </div>
            </div>
            <div
              className={styles['sidebar-header-button']}
              onClick={this.handleAPIDoc.bind(this)}
            >
              <div className={styles['sidebar-header-button-text']}>
                API Reference
              </div>
              <div className={styles['sidebar-header-button-icon-containar']}>
                <ExternalLink
                  className={styles['sidebar-header-button-icon']}
                  size={23}
                />
              </div>
            </div>
          </div>
          <hr className={styles['sidebar-sections-divider']} />
          <div
            className={styles['sidebar-sections-container']}
          >
            {this.documents !== undefined && (
              <DocSections
                docPath={this.props.docPath}
                switchSection={this.goSection.bind(this)}
                documents={this.documents}
              />
            )}
            <div style={{ height: '10vh' }} />
          </div>
        </div>
      </div>
    )
  }
}
