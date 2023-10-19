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
import styles from './markdown-doc.module.scss'
import { MarkdownDocProps } from './markdown-doc.props'

export class MarkdownDoc extends React.Component<MarkdownDocProps> {
  componentDidMount() {
    hljs.registerLanguage('json', json)
    hljs.registerLanguage('javascript', javascript)
    hljs.registerLanguage('typescript', typescript)
    hljs.registerLanguage('xml', xml)
    hljs.initHighlightingOnLoad()
  }

  render() {
    return (
      <div className={ElementStyle.getClass(styles, ['container', 'font-roadgeek-regular'])}>
        <div className={styles['header']}>
          GET STARTED
        </div>
        <div className={ElementStyle.getClass(styles, ['content', ''])}>
          <div className={styles['leftmenu-container']}>
            hola
          </div>
          <div className={styles['markdown-container']}>
            <ReactMarkdown>
              {this.props.markdownText}
            </ReactMarkdown>
            <div style={{ height: '15em' }} />
          </div>
          <div className={styles['rightsummary-container']}>
            adios
          </div>
        </div>
      </div>
    )
  }
}
