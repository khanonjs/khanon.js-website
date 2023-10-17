import './App.scss'

import React from 'react'

import { ReferenceCollector } from './classes/reference-collector'
import { Background } from './components/background/background'
import { Footer } from './components/footer/footer'
import { Header } from './components/header/header'
import { BackgroundPosition } from './models/background-position'
import { Pages } from './models/pages'
import { GetStartedPage } from './pages/getstarted/getstarted-page'
import { MainPage } from './pages/main/main-page'

export class App extends React.Component {
  private page: Pages = Pages.MAIN
  private elementBackground: Background

  refBackground(element: Background) {
    if (element) {
      this.elementBackground = element
    }
  }

  setPage(page: Pages) {
    this.page = page
    switch (this.page) {
      case Pages.MAIN:
        this.elementBackground.setPosition(BackgroundPosition.UP)
        break
      case Pages.GET_STARTED:
        this.elementBackground.setPosition(BackgroundPosition.DOWN)
        break
    }
    this.forceUpdate()
  }

  renderPage(): JSX.Element {
    switch(this.page) {
      case Pages.MAIN:
        return (
          <MainPage
            cbSetPage={this.setPage.bind(this)}
          />
        )
      case Pages.GET_STARTED:
        return <GetStartedPage />
    }
  }

  render() {
    return (
      <div className='App'>
        <Background ref={this.refBackground.bind(this)} />
        <Footer />
        <Header
          cbSetPage={this.setPage.bind(this)}
        />
        {this.renderPage()}
      </div>
    )
  }
}
