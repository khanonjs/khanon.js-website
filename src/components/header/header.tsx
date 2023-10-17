import React from 'react'
import { ChevronDown } from 'react-feather'

import { ElementStyle } from '../../classes/element-style'
import { Pages } from '../../models/pages'
import styles from './header.module.scss'
import { HeaderProps } from './header.props'

export class Header extends React.Component<HeaderProps> {
  private elementDropdown: HTMLDivElement
  private elementDocIcon: HTMLDivElement

  refDropdown(element: HTMLDivElement) {
    if (element) {
      this.elementDropdown = element
    }
  }

  refDocIcon(element: HTMLDivElement) {
    if (element) {
      this.elementDocIcon = element
    }
  }

  handleHome() {
    this.props.cbSetPage(Pages.MAIN)
  }

  handleOpenDocumentation() {
    this.elementDropdown.style.height = '10em'
    this.elementDocIcon.style.rotate = '-180deg'
  }

  handleCloseDocumentation() {
    this.elementDropdown.style.height = '0%'
    this.elementDocIcon.style.rotate = '0deg'
  }

  handleAPIDoc() {
    console.log('aki API DOC')
  }

  handleGetStarted() {
    this.props.cbSetPage(Pages.GET_STARTED)
  }

  handleTutorials() {
    console.log('aki TUTORIALS')
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
        <div className={styles['header-documentation']}>
          <div
            className={styles['header-documentation-button']}
            onMouseEnter={this.handleOpenDocumentation.bind(this)}
            onMouseLeave={this.handleCloseDocumentation.bind(this)}
          >
            <div className={ElementStyle.getClass(styles, ['header-documentation-button-text', 'font-roadgeek-regular'])}>
              DOCUMENTATION
            </div>
            <div
              ref={this.refDocIcon.bind(this)}
              className={styles['header-documentation-button-icon-containar']}
            >
              <ChevronDown
                className={styles['header-documentation-button-icon']}
                color='black'
                size={48}
              />
            </div>
          </div>
          <div
            ref={this.refDropdown.bind(this)}
            className={styles['header-documentation-dropdown']}
            onMouseEnter={this.handleOpenDocumentation.bind(this)}
            onMouseLeave={this.handleCloseDocumentation.bind(this)}
          >
            <div className={styles['header-documentation-dropdown-container']}>
              <div
                className={ElementStyle.getClass(styles, ['header-documentation-dropdown-item', 'font-roadgeek-regular'])}
                onClick={this.handleAPIDoc.bind(this)}
              >API Reference
              </div>
              <div
                className={ElementStyle.getClass(styles, ['header-documentation-dropdown-item', 'font-roadgeek-regular'])}
                onClick={this.handleGetStarted.bind(this)}
              >Get started
              </div>
              <div
                className={ElementStyle.getClass(styles, ['header-documentation-dropdown-item', 'font-roadgeek-regular'])}
                onClick={this.handleTutorials.bind(this)}
              >Tutorials
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
