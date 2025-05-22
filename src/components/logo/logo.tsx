import React from 'react'

import { ElementStyle } from '../../classes/element-style'
import styles from './logo.module.scss'

export class Logo extends React.Component {
  render() {
    return (
      <div className={ElementStyle.getClass(styles, ['logo-container', 'rsp-logo-container'])}>
        <div className={ElementStyle.getClass(styles, ['logo-header', 'font-luckiestguy-regular'])}>KHANON</div>
        <div className={ElementStyle.getClass(styles, ['logo-footer', 'font-roadgeek-regular', 'rsp-logo-footer'])}>A typescript games framework extending Babylon.js</div>
      </div>
    )
  }
}
