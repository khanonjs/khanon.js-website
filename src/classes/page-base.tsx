import React from 'react'

import styles from './page-base.module.scss'

export abstract class PageBase<P = any> extends React.Component<P> {
  private elementContainer: HTMLDivElement

  abstract renderPage(): JSX.Element

  fadeIn() {
    this.elementContainer.style.opacity = '1'
  }

  fadeOut() {
    this.elementContainer.style.opacity = '0'
  }

  render() {
    return (
      <div
        ref={this.refContainer.bind(this)}
        className={styles['page-base']}
      >
        {this.renderPage()}
      </div>
    )
  }

  private refContainer(element: HTMLDivElement) {
    if (element) {
      this.elementContainer = element
    }
  }
}
