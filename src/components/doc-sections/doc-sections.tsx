import React from 'react'
import { ChevronRight } from 'react-feather'
import { NavLink } from 'react-router'

import { MarkdownDocSection } from '../markdown-doc/markdown-doc-section'
import styles from './doc-sections.module.scss'
import { DocSectionsProps } from './doc-sections.props'

export class DocSections extends React.Component<DocSectionsProps> {
  private keyId = -1
  private renderedSections: JSX.Element[]
  private openedSections: Set<number> = new Set()

  popKey() {
    this.keyId++
    return this.keyId
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

  renderSectionItem(title: string, section: MarkdownDocSection, path: string): JSX.Element {
    return (
      <NavLink
        to={`/${section.sectionPath}/${path}`}
        key={this.popKey()}
      >
        <div
          className={styles['section-item']}
          {...{ 'section': section, 'title': title, '_selected': this.props.docPath === path ? '' : undefined }}
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
          {section.docs.map((doc, ix) => this.renderSectionItem(doc.title, section, doc.file))}
        </div>
      </div>
    )
  }

  render() {
    this.renderedSections = this.props.documents.map((section, index) => this.renderSection(section, index))
    return (
      <div>
        {this.renderedSections}
      </div>
    )
  }
}
