import React from 'react'
import ReactMarkdown from 'react-markdown'

import styles from './markdown-doc.module.scss'
import { MarkdownDocProps } from './markdown-doc.props'

export class MarkdownDoc extends React.Component<MarkdownDocProps> {
  render() {
    return (
      <div className={styles['container']}>
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
    )
  }
}
