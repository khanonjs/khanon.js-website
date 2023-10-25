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
  private renderedSections: JSX.Element[]
  private elementSections: HTMLDivElement
  private elementMarkdownContainer: HTMLDivElement
  private keyId = -1
  private summaryItems: SummaryItem[]
  private hlSummaryItem: SummaryItem

  constructor(props: MarkdownDocProps) {
    super(props)
    const section = this.props.documents[0]
    this.state = {
      sectionName: section.section,
      currentDoc: section.docs[0].markdown
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
      }
    }
  }

  componentDidMount() {
    hljs.highlightAll()
  }

  componentDidUpdate() {
    hljs.highlightAll()
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
        this.setState({ currentDoc: markdown as string })
        this.elementMarkdownContainer.style.opacity = '1'
        this.elementMarkdownContainer.scrollTop = 0
      }, 300)

    }
  }

  handleMarkdownScroll(event: React.UIEvent) {
    const markdownContainer = (event.target as HTMLDivElement)
    let hlSummaryItem: SummaryItem = this.summaryItems[0]
    if (markdownContainer.scrollTop > markdownContainer.scrollHeight - (event.target as HTMLDivElement).clientHeight - 10) {
      hlSummaryItem = this.summaryItems[this.summaryItems.length - 1]
    } else {
      this.summaryItems.forEach(summaryItem => {
        if (summaryItem.top < markdownContainer.scrollTop + this.summaryItems[0].top) {
          hlSummaryItem = summaryItem
        }
      })
    }
    if (this.hlSummaryItem !== hlSummaryItem) {
      if (this.hlSummaryItem) {
        this.hlSummaryItem.element?.removeAttribute('highlight')
      }
      this.hlSummaryItem = hlSummaryItem
      this.hlSummaryItem.element?.setAttribute('highlight', '')
    }
  }

  renderSectionItem(title: string, section: string, isFirst: boolean): JSX.Element {
    return (
      <div
        key={this.popKey()}
        className={styles['section-item']}
        onClick={this.handleItemClick.bind(this)}
        {...{ 'section': section, 'title': title }}
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
        {...{ 'open': index === 0 }}
      >
        <div
          className={styles['section-title']}
          onClick={this.handleSectionClick.bind(this)}
        >
          {section.section}
        </div>
        <div className={styles['section-items-container']}>
          {section.docs.map((doc, ix) => this.renderSectionItem(doc.title, section.section, index === 0 && ix === 0))}
        </div>
      </div>
    )
  }

  renderSummary(): JSX.Element {
    return (
      <>
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
      <div className={ElementStyle.getClass(styles, ['container', 'font-roadgeek-regular'])}>
        <div className={styles['header']}>
          {this.state.sectionName}
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
            <div style={{ height: '50vh' }} />  {/* 8a8f Add footer things? */}
          </div>
          <div className={styles['summary-container']}>
            {this.renderSummary()}
          </div>
        </div>
      </div>
    )
  }
}
