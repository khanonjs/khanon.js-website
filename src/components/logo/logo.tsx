import React from 'react'

import { ElementStyle } from '../../classes/element-style'
import styles from './logo.module.scss'

export class Logo extends React.Component {
  render() {
    return (
      <div className={styles['logo-container']}>
        <div className={ElementStyle.getClass(styles, ['logo-header', 'font-luckiestguy-regular'])}>KHANON</div>
        <div className={ElementStyle.getClass(styles, ['logo-footer', 'font-roadgeek-regular'])}>A typescript game engine extending Babylon.js</div>
        <div className={ElementStyle.getClass(styles, ['logo-footer-wip', 'font-roadgeek-regular'])}>Khanon.js is currently work in progress, it will be released soon</div>
      </div>
    )
  }
}
