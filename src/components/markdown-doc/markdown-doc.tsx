import 'highlight.js/scss/tomorrow-night-blue.scss'

// import 'highlight.js/scss/atom-one-dark-reasonable.scss'
// import 'highlight.js/scss/github.scss'
// import 'highlight.js/scss/intellij-light.scss'
// import 'highlight.js/scss/night-owl.scss'
// import 'highlight.js/scss/qtcreator-light.scss'
// import 'highlight.js/scss/stackoverflow-light.scss'
// import 'highlight.js/scss/tomorrow-night-blue.scss'
// import 'highlight.js/scss/vs.scss'
// import 'highlight.js/scss/xcode.scss'
// import hljs from 'highlight.js'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import json from 'highlight.js/lib/languages/json'
import typescript from 'highlight.js/lib/languages/typescript'
import xml from 'highlight.js/lib/languages/xml'
import React from 'react'
import { ChevronRight } from 'react-feather'
import ReactMarkdown from 'react-markdown'

import { ElementStyle } from '../../classes/element-style'
import { MarkdownDocSection } from './markdown-doc-section'
import { MarkdownDocStates } from './markdown-doc-states'
import styles from './markdown-doc.module.scss'
import { MarkdownDocProps } from './markdown-doc.props'

interface SummaryItem {
  name: string
  top: number
  element: HTMLDivElement | null
}

export class MarkdownDoc extends React.Component<MarkdownDocProps, MarkdownDocStates> {
  private keyId = -1
  private renderedSections: JSX.Element[]
  private elementSections: HTMLDivElement
  private elementMarkdownContainer: HTMLDivElement
  private elementSummarySelector: HTMLDivElement
  private summaryItems: SummaryItem[]
  private hlSummaryItem: SummaryItem | undefined
  private hlSummaryTop: number
  private hlSummaryHeight: number = 0
  private attrSummaryHighlight = 'highlight'

  constructor(props: MarkdownDocProps) {
    super(props)
    const section = this.props.documents[this.props.initialSectionId]
    this.state = {
      sectionName: section.section,
      currentDoc: section.docs[this.props.initialItemId].markdown
    }
    hljs.registerLanguage('json', json)
    hljs.registerLanguage('javascript', javascript)
    hljs.registerLanguage('typescript', typescript)
    hljs.registerLanguage('xml', xml)
    this.renderedSections = this.props.documents.map((section, index) => this.renderSection(section, index))
    this.summaryItems = []
  }

  popKey() {
    this.keyId++
    return this.keyId
  }

  refSections(element: HTMLDivElement) {
    if (element) {
      this.elementSections = element
    }
  }

  refMarkdownContainer(element: HTMLDivElement) {
    if (element) {
      this.elementMarkdownContainer = element
      if (this.summaryItems.length === 0) {
        const headers = this.elementMarkdownContainer.getElementsByTagName('h1')
        for (const h1 of headers) {
          this.summaryItems.push({
            name: h1.innerText,
            top: h1.getBoundingClientRect().top,
            element: null
          })
        }
        this.forceUpdate()
      }
    }
  }

  refSummaryItem(element: HTMLDivElement) {
    if (element) {
      const summaryItem = this.summaryItems.find(summaryItem => summaryItem.name === element.innerText)
      if (summaryItem) {
        summaryItem.element = element
        if (summaryItem.element.getAttribute(this.attrSummaryHighlight) !== null) {
          this.hlSummaryItem = summaryItem
          this.updateSummarySelector(true)
        }
      }
    }
  }

  refSummarySelector(element: HTMLDivElement) {
    if (element) {
      this.elementSummarySelector = element
      this.elementSummarySelector.style.opacity = '0'
      this.updateSummarySelector(true)
    }
  }

  componentDidMount() {
    hljs.highlightAll()
  }

  componentDidUpdate() {
    hljs.highlightAll()
    // Makes all links open in a new tab
    Array.from(document.links)
      .filter(link => this.elementMarkdownContainer.contains(link))
      .forEach(link => link.target = '_blank')
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
      const markdown = section?.docs.find(doc => doc.title === element.getAttribute('title'))?.markdown
      this.elementMarkdownContainer.style.opacity = '0'
      this.setState({ sectionName: section?.section as string })
      setTimeout(() => {
        this.summaryItems = []
        this.hlSummaryItem = undefined
        this.setState({ currentDoc: markdown as string })
        this.elementMarkdownContainer.style.opacity = '1'
        this.elementMarkdownContainer.scrollTop = 0
      }, 0)

    }
  }

  handleMarkdownScroll(event: React.UIEvent) {
    const markdownContainer = (event.target as HTMLDivElement)
    const top = markdownContainer.scrollTop + 120
    let hlSummaryItem: SummaryItem = this.summaryItems[0]
    this.hlSummaryHeight = 0
    if (top > markdownContainer.scrollHeight - (event.target as HTMLDivElement).clientHeight - 10) {
      hlSummaryItem = this.summaryItems[this.summaryItems.length - 1]
      this.summaryItems.forEach((summaryItem, index) => {
        if (summaryItem.element && index > 0) {
          this.hlSummaryHeight += summaryItem.element.getBoundingClientRect().height
        }
      })
    } else {
      let gotIt = false
      this.summaryItems.forEach((summaryItem, index) => {
        if (summaryItem.top < top + this.summaryItems[0].top) {
          hlSummaryItem = summaryItem
        } else {
          gotIt = true
        }
        if (summaryItem.element && index > 0 && !gotIt) {
          this.hlSummaryHeight += summaryItem.element.getBoundingClientRect().height
        }
      })
    }
    if (this.hlSummaryItem !== hlSummaryItem) {
      if (this.hlSummaryItem) {
        this.hlSummaryItem.element?.removeAttribute(this.attrSummaryHighlight)
      }
      this.hlSummaryItem = hlSummaryItem
      this.hlSummaryItem.element?.setAttribute(this.attrSummaryHighlight, '')
      this.updateSummarySelector()
    }
  }

  updateSummarySelector(resetHeight?: boolean) {
    if (resetHeight) {
      this.hlSummaryHeight = 0
    }
    if (this.summaryItems[0].element) {
      const rect = this.summaryItems[0].element.getBoundingClientRect()
      this.hlSummaryTop = rect.top + rect.height - 97
    }
    if (this.hlSummaryTop) {
      this.elementSummarySelector.style.top = `${this.hlSummaryTop + this.hlSummaryHeight}px`
      this.elementSummarySelector.style.opacity = '1'
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

  renderSummary(): JSX.Element {
    return (
      <>
        <div
          ref={this.refSummarySelector.bind(this)}
          className={styles['summary-selector']}
        />
        {this.summaryItems?.map((summaryItem, index) => (
          <div
            ref={this.refSummaryItem.bind(this)}
            key={index}
            className={styles['summary-item']}
            {...( index === 0 && { highlight: '' })}
          >
            {summaryItem.name}
          </div>
        ))}
      </>
    )
  }

  render() {
    return (
      <div className={ElementStyle.getClass(styles, ['container', 'font-docfont-regular'])}>
        <div className={styles['header']}>
          <div className={styles['header-text']}>
            {this.state.sectionName}
          </div>
        </div>
        <div className={ElementStyle.getClass(styles, ['content', ''])}>
          <div
            ref={this.refSections.bind(this)}
            className={styles['sections-container']}
          >
            {this.renderedSections}
          </div>
          <div
            ref={this.refMarkdownContainer.bind(this)}
            className={styles['markdown-container']}
            onScroll={this.handleMarkdownScroll.bind(this)}
          >
            <ReactMarkdown>
              {this.state.currentDoc ?? ''}
            </ReactMarkdown>
            <div style={{ height: '40vh' }} />
            {/* <div style={{ height: '10em', backgroundColor: 'rgb(0, 66, 107)' }} /> */}
            {/* In case footer is needed int he future */}
          </div>
          <div className={styles['summary-container']}>
            {this.renderSummary()}
          </div>
        </div>
      </div>
    )
  }
}
