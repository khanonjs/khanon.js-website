import React from 'react'

import { Logger } from '../../classes/logger/logger'
import { PageBase } from '../../classes/page-base'
import { Logo } from '../../components/logo/logo'
import { MainButtons } from '../../components/main-buttons/main-buttons'
import styles from './main-page.module.scss'
import { MainPageProps } from './main-page.props'

export class MainPage extends PageBase<MainPageProps> {
  private docGetStarted: string

  componentDidMount() {
    if (this.docGetStarted === undefined) {
      const mdUrl = './docs/getstarted.md'
      fetch(mdUrl)
        .then((res) => {
          res.text()
            .then((text) => {
              this.docGetStarted = text
              this.forceUpdate()
            })
            .catch(error => Logger.info(`GetStarted page error, couldn't load '${mdUrl}':`, Logger.strFromData(error))
            )
        })
        .catch(error => Logger.info(`GetStarted page error, couldn't load '${mdUrl}':`, Logger.strFromData(error))
        )
    }
  }

  renderPage() {
    return (
      <div className={styles['main-page']}>
        <Logo />
        <MainButtons
          cbSetPage={this.props.cbSetPage}
        />
      </div>
    )
  }
}
