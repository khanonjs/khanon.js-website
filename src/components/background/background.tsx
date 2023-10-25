import React from 'react'

import { BackgroundPosition } from '../../models/background-position'
import styles from './background.module.scss'

export class Background extends React.Component {
  elementShape: HTMLDivElement

  refShape(element: HTMLDivElement) {
    if (element) {
      this.elementShape = element
    }
  }

  setPosition(position: BackgroundPosition) {
    if (this.elementShape) {
      switch (position) {
        case BackgroundPosition.UP:
          this.elementShape.style['clip-path'] = 'ellipse(150% 100% at 50% 150%)'
          break
        case BackgroundPosition.DOWN:
          this.elementShape.style['clip-path'] = 'ellipse(150% 100% at 50% 200%)'
          break
      }
    }
  }

  render() {
    return (
      <div className={styles['container']}>
        <div
          className={styles['shape']}
          ref={this.refShape.bind(this)}
        />
      </div>
    )
  }
}
