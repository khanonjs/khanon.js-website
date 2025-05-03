import React from 'react'
import { ChevronRight } from 'react-feather'
import { NavLink } from 'react-router'

import { MarkdownDocSection } from '../markdown-doc/markdown-doc-section'
import styles from './doc-sections.module.scss'
import { DocSectionsProps } from './doc-sections.props'

export class DocSections extends React.Component<DocSectionsProps> {
  private keyId = -1
  private renderedSections: JSX.Element[]
  private elementSections: HTMLDivElement
  private openedSections: Set<number> = new Set()

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
      this.openedSections.delete(Number(element.getAttribute('_sectionid')))
    } else {
      element.setAttribute('open', '')
      this.openedSections.add(Number(element.getAttribute('_sectionid')))
    }
  }

  /*handleSectionClick(event: React.MouseEvent) {
    const element = (event.target as HTMLDivElement).parentNode as HTMLDivElement
    if (element.hasAttribute('open')) {
      element.removeAttribute('open')
    } else {
      element.setAttribute('open', '')
    }
  }*/

  handleItemClick(event: React.MouseEvent) {
    // console.log('aki handleItemClick A')
    const element = event.target as HTMLDivElement
    if (element.getAttribute('_selected') === null) {
      // console.log('aki handleItemClick B', element)
      const selectedElement = this.elementSections?.querySelectorAll('[_selected]')[0]
      selectedElement?.removeAttribute('_selected')
      element.setAttribute('_selected', '')
      const section = this.props.documents.find(doc => doc.section === element.getAttribute('section'))
      const title = element.getAttribute('title')
      // console.log('aki handleItemClick C', section, title)
      if (section && title) {
        this.props.switchSection(section, title)
      }
    }
  }

  renderSectionItem(title: string, section: MarkdownDocSection, path: string, isFirst: boolean, sectionId: number, itemId: number): JSX.Element {
    return (
      <NavLink
        to={`/${section.sectionPath}/${path}`}
        key={this.popKey()}
      >
        <div
          className={styles['section-item']}
          // onClick={this.handleItemClick.bind(this)}
          {...{ 'section': section, 'title': title, '_selected': this.props.docPath === path ? '' : undefined }}
          // {...{ 'section': section, 'title': title, '_sectionid': sectionId, '_itemid': itemId }}  // 8a8f
          // {...( isFirst && { _selected: '' })} // 8a8f
        >{title}
        </div>
      </NavLink>
    )
  }

  renderSection(section: MarkdownDocSection, index: number): JSX.Element {
    const selected = section.docs.find(doc => doc.file === this.props.docPath)
    if (selected) {
      this.openedSections.add(index)
    }
    return (
      <div
        key={this.popKey()}
        className={styles['section-block']}
        {...{ '_sectionid': index, 'open': this.openedSections.has(index) }}
      >
        <div
          className={styles['section-title']}
          onClick={this.handleSectionClick.bind(this)}
          {...{ '_sectionid': index, '_selected': selected ? '' : undefined }}
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
          {section.docs.map((doc, ix) => this.renderSectionItem(doc.title, section, doc.file, index === this.props.initialSectionId && ix === this.props.initialItemId, index, ix))}
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
