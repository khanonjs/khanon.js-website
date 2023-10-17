import React from 'react'

import githubButton from '../../assets/github-button.png'
import playCircle from '../../assets/play-circle.svg'
import { ElementStyle } from '../../classes/element-style'
import { Pages } from '../../models/pages'
import styles from './main-buttons.module.scss'
import { MainButtonsProps } from './main-buttons.props'

export class MainButtons extends React.Component<MainButtonsProps> {
  handleGetStarted() {
    this.props.cbSetPage(Pages.GET_STARTED)
  }

  render() {
    return (
      <div className={styles['main-buttons-container']}>
        <div className={styles['main-buttons-play']}>
          <img
            src={playCircle}
            className={styles['main-buttons-play-icon']}
          />
          <div className={ElementStyle.getClass(styles, ['main-buttons-play-text', 'font-roadgeek-regular'])}>PLAY DEMOS</div>
        </div>
        <div
          className={styles['main-buttons-getstarted']}
          onClick={this.handleGetStarted.bind(this)}
        >
          <div className={ElementStyle.getClass(styles, ['main-buttons-getstarted-text', 'font-roadgeek-regular'])}>GET STARTED
          </div>
        </div>
        <div className={styles['main-buttons-github']}>
          <img
            src={githubButton}
            className={styles['main-buttons-github-img']}
          />
        </div>
      </div>
    )
  }
}
