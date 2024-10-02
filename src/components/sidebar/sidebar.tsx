import React from 'react'
import { ExternalLink } from 'react-feather'

import { ElementStyle } from '../../classes/element-style'
import { Pages } from '../../models/pages'
import styles from './sidebar.module.scss'
import { SidebarProps } from './sidebar.props'

export class Sidebar extends React.Component<SidebarProps> {
  handleClose() {
    console.log('aki close')
  }

  handleGetStarted() {
    this.props.cbSetPage(Pages.GET_STARTED)
  }

  handleTutorials() {
    this.props.cbSetPage(Pages.TUTORIALS)
  }

  handleAPIDoc() {
    window.open('api-docs/index.html', '_blank', 'noreferrer')
  }

  render() {
    return (
      <div className={ElementStyle.getClass(styles, ['sidebar-background', 'rsp-show-sidebar'])}>
        <div
          className={styles['sidebar-background-button']}
          onClick={this.handleClose.bind(this)}
        />
        <div className={styles['sidebar-container']}>
          <div className={styles['sidebar-header-container']}>
            <div
              className={styles['sidebar-header-button']}
              onClick={this.handleAPIDoc.bind(this)}
            >
              <div className={styles['sidebar-header-button-text']}>
                API Reference
              </div>
              <div className={styles['sidebar-header-button-icon-containar']}>
                <ExternalLink
                  className={styles['sidebar-header-button-icon']}
                  size={23}
                />
              </div>
            </div>
            <div
              className={styles['sidebar-header-button']}
              onClick={this.handleGetStarted.bind(this)}
            >
              <div className={styles['sidebar-header-button-text']}>
                Docs
              </div>
            </div>
            <div
              className={styles['sidebar-header-button']}
              onClick={this.handleTutorials.bind(this)}
            >
              <div className={styles['sidebar-header-button-text']}>
                Tutorials
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
