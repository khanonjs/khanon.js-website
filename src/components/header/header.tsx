import React from 'react'
import {
  ExternalLink,
  Menu
} from 'react-feather'
import { NavLink } from 'react-router'

import githubLogo from '../../assets/github-logo-gray.png'
import HomeLogo from '../../assets/K-home-logo.svg'
import xLogo from '../../assets/x-logo-gray.png'
import { ElementStyle } from '../../classes/element-style'
import styles from './header.module.scss'
import { HeaderProps } from './header.props'

export class Header extends React.Component<HeaderProps> {
  handleAPIDoc() {
    window.open('api-docs/index.html', '_blank', 'noreferrer')
  }

  handleSidebar() {
    this.props.openSidebar()
  }

  handleGithub() {
    window.open('https://github.com/khanonjs/khanon.js', '_blank', 'noreferrer')
  }

  handleX() {
    window.open('https://x.com/Khanonjs', '_blank', 'noreferrer')
  }

  render() {
    // setTimeout(() => this.handleGetStarted(), 300) // 8a8f COMMENT TO PUBLISH, uncomment to document
    // setTimeout(() => this.handleTutorials(), 300) // 8a8f COMMENT TO PUBLISH, uncomment to document
    return (
      <div className={ElementStyle.getClass(styles, ['header-container', 'rsp-header-container'])}>
        <div
          className={ElementStyle.getClass(styles, ['header-burguer', 'rsp-click-burguer'])}
          onClick={this.handleSidebar.bind(this)}
        >
          <Menu
            className={ElementStyle.getClass(styles, ['header-burguer-icon', 'rsp-show-burguer'])}
            size={30}
          />
        </div>
        <NavLink
          to='/'
          className={ElementStyle.getClass(styles, ['header-home', 'rsp-center-home'])}
        >
          <img src={HomeLogo} className={styles['header-home-K']} />
        </NavLink>
        <div className={ElementStyle.getClass(styles, ['header-buttons-bar', 'rsp-hide-buttons-bar'])}>
          <NavLink
            to='/getstarted'
            className={styles['header-button']}
          >
            <div className={ElementStyle.getClass(styles, ['header-button-text', 'font-roadgeek-regular'])}>
              Docs
            </div>
          </NavLink>
          <NavLink
            to='/tutorials'
            className={styles['header-button']}
          >
            <div className={ElementStyle.getClass(styles, ['header-button-text', 'font-roadgeek-regular'])}>
              Tutorials
            </div>
          </NavLink>
          <div
            className={styles['header-button']}
            onClick={this.handleAPIDoc.bind(this)}
          >
            <div
              className={ElementStyle.getClass(styles, ['header-button-text', 'font-roadgeek-regular'])}
            >
              API Reference
            </div>
            <div className={styles['header-button-icon-containar']}>
              <ExternalLink
                className={styles['header-button-icon']}
                size={30}
              />
            </div>
          </div>
        </div>
        <div className={ElementStyle.getClass(styles, ['header-right-icons-container', 'rsp-shrink-margin'])}>
          <div
            className={styles['header-github']}
            onClick={this.handleGithub.bind(this)}
          >
            <img src={githubLogo} />
          </div>
          <div
            className={ElementStyle.getClass(styles, ['header-x', 'rsp-header-x-right'])}
            onClick={this.handleX.bind(this)}
          >
            <img src={xLogo} />
          </div>
        </div>
      </div>
    )
  }
}
