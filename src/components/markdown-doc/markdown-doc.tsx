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

import { Docs } from '../../classes/docs'
import { ElementStyle } from '../../classes/element-style'
import { MarkdownDocSection } from './markdown-doc-section'
import styles from './markdown-doc.module.scss'
import { MarkdownDocProps } from './markdown-doc.props'
import { MarkdownDocsStates } from './markdown-doc.states'

interface SummaryItem {
  name: string
  top: number
  element: HTMLDivElement | null
}

// TODO use hash symbol to jump to different sections
// TODO add title for file name to code blocks
export class MarkdownDoc extends React.Component<MarkdownDocProps, MarkdownDocsStates> {
  currentMarkdown: string
  private elementMarkdownContainer: HTMLDivElement
  private elementSummarySelector: HTMLDivElement
  private summaryItems: SummaryItem[]
  private hlSummaryItem: SummaryItem | undefined
  private hlSummaryTop: number
  private hlSummaryHeight: number = 0
  private attrSummaryHighlight = 'highlight'

  constructor(props: MarkdownDocProps) {
    super(props)
    hljs.configure({
      ignoreUnescapedHTML: true
    })
    hljs.registerLanguage('json', json)
    hljs.registerLanguage('javascript', javascript)
    hljs.registerLanguage('typescript', typescript)
    hljs.registerLanguage('xml', xml)
    this.currentMarkdown = this.props.currentMarkdown
    this.state = {
      currentMarkdown: this.currentMarkdown
    }
    this.summaryItems = []
  }

  refMarkdownContainer(element: HTMLDivElement) {
    if (element) {
      this.elementMarkdownContainer = element
      const headers = this.elementMarkdownContainer.getElementsByTagName('h1')
      if (this.summaryItems.length === 0 && headers.length > 0) {
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
    this.fixMarkdown()
  }

  componentDidUpdate() {
    this.fixMarkdown()
  }

  fixMarkdown() {
    // Remove 'data-highlighted' or highlight library won't work properly
    this.elementMarkdownContainer?.querySelectorAll('[data-highlighted]')?.forEach(element => {
      element.removeAttribute('data-highlighted')
    })
    hljs.highlightAll()

    // Makes all links open in a new tab
    Array.from(document.links)
      .filter(link => this.elementMarkdownContainer?.contains(link))
      .forEach(link => link.target = '_blank')
  }

  handleMarkdownScroll(event: React.UIEvent) {
    const markdownContainer = (event.target as HTMLDivElement)
    const top = markdownContainer.scrollTop + 100
    let hlSummaryItem: SummaryItem = this.summaryItems[0]
    this.hlSummaryHeight = 0
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

    if (this.hlSummaryItem !== hlSummaryItem) {
      if (this.hlSummaryItem) {
        this.hlSummaryItem.element?.removeAttribute(this.attrSummaryHighlight)
      }
      this.hlSummaryItem = hlSummaryItem
      this.hlSummaryItem.element?.setAttribute(this.attrSummaryHighlight, '')
      this.updateSummarySelector()
    }
  }

  setMarkdown(markdown: string) {
    this.elementMarkdownContainer.style.opacity = '0'
    this.summaryItems = []
    this.hlSummaryItem = undefined
    this.elementMarkdownContainer.style.opacity = '1'
    this.elementMarkdownContainer.scrollTop = 0
    this.currentMarkdown = markdown
  }

  updateSummarySelector(resetHeight?: boolean) {
    if (resetHeight) {
      this.hlSummaryHeight = 0
    }
    if (this.summaryItems.length > 0 && this.summaryItems[0].element) {
      const rect = this.summaryItems[0].element.getBoundingClientRect()
      this.hlSummaryTop = 0 + rect.height + 48
    }
    if (this.hlSummaryTop) {
      this.elementSummarySelector.style.top = `${this.hlSummaryTop + this.hlSummaryHeight}px`
      this.elementSummarySelector.style.opacity = '1'
    }
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

  goSection(section: MarkdownDocSection, title: string) {
    const markdown = Docs.get(section?.docs.find(doc => doc.title === title)?.file as any)
    this.setMarkdown(markdown)
    this.setState({ currentMarkdown: this.currentMarkdown })
  }

  render() {
    return (
      <>
        <div
          ref={this.refMarkdownContainer.bind(this)}
          className={ElementStyle.getClass(styles, ['markdown-container', 'rsp-stretch-markdown-container'])}
          onScroll={this.handleMarkdownScroll.bind(this)}
        >
          <ReactMarkdown>
            {this.currentMarkdown ?? ''}
          </ReactMarkdown>
          <div style={{ height: '65vh' }} />
          {/* <div style={{ height: '10em', backgroundColor: 'rgb(0, 66, 107)' }} /> */}
          {/* In case footer is needed in the future */}
        </div>
        <div className={ElementStyle.getClass(styles, ['summary-container', 'rsp-hide-summary-container'])}>
          {this.renderSummary()}
        </div>
      </>
    )
  }
}
