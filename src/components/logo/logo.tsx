import React from 'react'

import { ElementStyle } from '../../classes/element-style'
import styles from './logo.module.scss'

export class Logo extends React.Component {
  render() {
    return (
      <div className={ElementStyle.getClass(styles, ['logo-container', 'rsp-logo-container'])}>
        <div className={ElementStyle.getClass(styles, ['logo-header', 'font-luckiestguy-regular'])}>KHANON</div>
        <div className={ElementStyle.getClass(styles, ['logo-footer', 'font-roadgeek-regular'])}>A typescript game engine extending Babylon.js (BETA)</div>
      </div>
    )
  }
}
