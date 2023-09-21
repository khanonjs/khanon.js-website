import React from 'react'
import {
  Camera,
  ChevronDown
} from 'react-feather'

import { ElementStyle } from '../../classes/element-style'
import styles from './header.module.scss'

export class Header extends React.Component {
  render() {
    return (
      <div className={styles['header-container']}>
        <div className={styles['header-home']}>
          <div className={ElementStyle.getClass(styles, ['header-home-k', 'font-luckiestguy-regular'])}>
            K
          </div>
          <div className={ElementStyle.getClass(styles, ['header-home-js', 'font-roadgeek-regular'])}>
            .js
          </div>
        </div>
        <div className={styles['header-documentation']}>
          <div className={ElementStyle.getClass(styles, ['header-documentation-text', 'font-roadgeek-regular'])}>
            DOCUMENTATION
          </div>
          <ChevronDown className={styles['header-documentation-down']} color='black' size={48} />
        </div>
      </div>
    )
  }
}
