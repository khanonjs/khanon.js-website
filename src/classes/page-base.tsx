import React from 'react'

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
        style={{
          transition: '0.15s',
          opacity: 0
        }}
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
