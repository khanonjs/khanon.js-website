import React from 'react'

import { Background } from '../../components/background/background'
import { Header } from '../../components/header/header'
import { Logo } from '../../components/logo/logo'
import { MainButtons } from '../../components/main-buttons/main-buttons'
import styles from './main-page.module.scss'

export class MainPage extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Background />
        <Logo />
        <MainButtons />
      </>
    )
  }
}
