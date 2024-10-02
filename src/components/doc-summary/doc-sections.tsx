import React from 'react'
import { ChevronRight } from 'react-feather'

import { MarkdownDocSection } from '../markdown-doc/markdown-doc-section'
import styles from './doc-sections.module.scss'
import { DocSectionsProps } from './doc-sections.props'

export class DocSections extends React.Component<DocSectionsProps> {
  private keyId = -1
  private renderedSections: JSX.Element[]
  private elementSections: HTMLDivElement

  popKey() {
    this.keyId++
    return this.keyId
  }

  refSections(element: HTMLDivElement) {
    if (element) {
      this.elementSections = element
    }
  }

  handleSectionClick(event: React.MouseEvent) {
    const element = (event.target as HTMLDivElement).parentNode as HTMLDivElement
    if (element.hasAttribute('open')) {
      element.removeAttribute('open')
    } else {
      element.setAttribute('open', '')
    }
  }

  handleItemClick(event: React.MouseEvent) {
    const element = event.target as HTMLDivElement
    const sectionId = element.getAttribute('_sectionid')
    const ItemId = element.getAttribute('_itemid')
    if (sectionId) {
      this.props.storeSectionId(sectionId)
    }
    if (ItemId) {
      this.props.storeItemId(ItemId)
    }
    if (element.getAttribute('_selected') === null) {
      const selectedElement = this.elementSections?.querySelectorAll('[_selected]')[0]
      selectedElement?.removeAttribute('_selected')
      element.setAttribute('_selected', '')
      const section = this.props.documents.find(doc => doc.section === element.getAttribute('section'))
      const title = element.getAttribute('title')
      if (section && title) {
        this.props.switchSection(section, title)
      }
    }
  }

  renderSectionItem(title: string, section: string, isFirst: boolean, sectionId: number, itemId: number): JSX.Element {
    return (
      <div
        key={this.popKey()}
        className={styles['section-item']}
        onClick={this.handleItemClick.bind(this)}
        {...{ 'section': section, 'title': title, '_sectionid': sectionId, '_itemid': itemId }}
        {...( isFirst && { _selected: '' })}
      >{title}
      </div>
    )
  }

  renderSection(section: MarkdownDocSection, index: number): JSX.Element {
    return (
      <div
        key={this.popKey()}
        className={styles['section-block']}
        {...{ 'open': index === this.props.initialSectionId }}
      >
        <div
          className={styles['section-title']}
          onClick={this.handleSectionClick.bind(this)}
          {...{ '_sectionid': index }}
        >
          {section.section}
          <div className={styles['section-title-icon-containar']}>
            <ChevronRight
              className={styles['section-title-icon']}
              size={30}
            />
          </div>
        </div>
        <div className={styles['section-items-container']}>
          {section.docs.map((doc, ix) => this.renderSectionItem(doc.title, section.section, index === this.props.initialSectionId && ix === this.props.initialItemId, index, ix))}
        </div>
      </div>
    )
  }

  render() {
    this.renderedSections = this.props.documents.map((section, index) => this.renderSection(section, index))
    return (
      <div
        ref={this.refSections.bind(this)}
      >
        {this.renderedSections}
      </div>
    )
  }
}
