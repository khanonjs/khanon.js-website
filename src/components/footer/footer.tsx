import React from 'react'

import emailIcon from '../../assets/email-icon.png'
import xLogo from '../../assets/x-logo.png'
import styles from './footer.module.scss'

export class Footer extends React.Component {
  render() {
    return (
      <div className={styles['footer-container']}>
        <div className={styles['footer-mail']}>
          <img src={emailIcon} />
        </div>
        <div className={styles['footer-x']}>
          <img src={xLogo} />
        </div>
      </div>
    )
  }
}
