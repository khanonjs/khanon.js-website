import React from 'react'

import { Background } from '../../components/background/background'
import { Logo } from '../../components/logo/logo'
import styles from './main-page.module.scss'

export class MainPage extends React.Component {
  render() {
    return (
      <>
        <Logo />
        <Background />
      </>
    )
  }
}
