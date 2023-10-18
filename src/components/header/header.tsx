import React from 'react'
import { ChevronDown } from 'react-feather'

import { ElementStyle } from '../../classes/element-style'
import { Pages } from '../../models/pages'
import styles from './header.module.scss'
import { HeaderProps } from './header.props'

export class Header extends React.Component<HeaderProps> {
  handleHome() {
    this.props.cbSetPage(Pages.MAIN)
  }

  handleAPIDoc() {
    console.log('aki API DOC')
  }

  handleGetStarted() {
    this.props.cbSetPage(Pages.GET_STARTED)
  }

  handleTutorials() {
    this.props.cbSetPage(Pages.TUTORIALS)
  }

  render() {
    return (
      <div className={styles['header-container']}>
        <div
          className={styles['header-home']}
          onClick={this.handleHome.bind(this)}
        >
          <div className={ElementStyle.getClass(styles, ['header-home-k', 'font-luckiestguy-regular'])}>
            K
          </div>
        </div>
        <div className={styles['header-bar']}>
          <div className={styles['header-button']}>
            <div
              className={ElementStyle.getClass(styles, ['header-button-text', 'font-roadgeek-regular'])}
              onClick={this.handleAPIDoc.bind(this)}
            >
              API Reference
            </div>
          </div>
          <div className={styles['header-button']}>
            <div
              className={ElementStyle.getClass(styles, ['header-button-text', 'font-roadgeek-regular'])}
              onClick={this.handleGetStarted.bind(this)}
            >
              Get started
            </div>
          </div>
          <div className={styles['header-button']}>
            <div
              className={ElementStyle.getClass(styles, ['header-button-text', 'font-roadgeek-regular'])}
              onClick={this.handleTutorials.bind(this)}
            >
              Tutorials
            </div>
          </div>
        </div>
      </div>
    )
  }
}
