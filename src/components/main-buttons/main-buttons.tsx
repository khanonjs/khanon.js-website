import React from 'react'

import githubButton from '../../assets/github-button-gray.png'
import playCircle from '../../assets/play-circle.svg'
import { ElementStyle } from '../../classes/element-style'
import { Pages } from '../../models/pages'
import styles from './main-buttons.module.scss'
import { MainButtonsProps } from './main-buttons.props'

export class MainButtons extends React.Component<MainButtonsProps> {
  handlePlayDemos() {
    // this.props.cbSetPage(Pages.GET_STARTED)
  }

  handleGetStarted() {
    this.props.cbSetPage(Pages.GET_STARTED)
  }

  handleGithub() {
    window.open('https://github.com/khanonjs/khanon.js', '_blank', 'noreferrer')
  }

  render() {
    return (
      <div className={ElementStyle.getClass(styles, ['main-buttons-container', 'rsp-main-buttons-container'])}>
        <div
          className={ElementStyle.getClass(styles, ['main-buttons-play', 'rsp-main-buttons-play'])}
          onClick={this.handlePlayDemos.bind(this)}
        >
          <img
            src={playCircle}
            className={ElementStyle.getClass(styles, ['main-buttons-play-icon', 'rsp-main-buttons-play-icon'])}
          />
          <div className={ElementStyle.getClass(styles, ['main-buttons-play-text', 'rsp-main-buttons-play-text', 'font-roadgeek-regular'])}>PLAY DEMOS</div>
        </div>
        <div
          className={ElementStyle.getClass(styles, ['main-buttons-getstarted', 'rsp-main-buttons-getstarted'])}
          onClick={this.handleGetStarted.bind(this)}
        >
          <div className={ElementStyle.getClass(styles, ['main-buttons-getstarted-text', 'rsp-main-buttons-getstarted-text', 'font-roadgeek-regular'])}>GET STARTED
          </div>
        </div>
        <div
          className={ElementStyle.getClass(styles, ['main-buttons-github', 'rsp-main-buttons-github'])}
          onClick={this.handleGithub.bind(this)}
        >
          <img
            src={githubButton}
            className={styles['main-buttons-github-img']}
          />
        </div>
      </div>
    )
  }
}
