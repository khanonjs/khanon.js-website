import './App.scss'

import React from 'react'

import { Docs } from './classes/docs'
import { PageBase } from './classes/page-base'
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
  private elementCurrentPage: PageBase
  private transitioning = false

  constructor(props) {
    super(props)
    Docs.loadDocs()
  }

  refBackground(element: Background) {
    if (element) {
      this.elementBackground = element
    }
  }

  refCurrentPage(element: any) {
    if (element) {
      if (!this.elementCurrentPage) {
        (element as PageBase).fadeIn()
      }
      this.elementCurrentPage = element
    }
  }

  setPage(page: Pages) {
    if (this.transitioning ||
        page === this.page ||
        (page === Pages.GET_STARTED && !Docs.docGetStarted)) {
      return
    }
    this.transitioning = true

    if (this.elementCurrentPage) {
      this.elementCurrentPage.fadeOut()
    }

    this.page = page

    if (this.elementBackground) {
      switch (this.page) {
        case Pages.MAIN:
          this.elementBackground.setPosition(BackgroundPosition.UP)
          break
        case Pages.GET_STARTED:
          this.elementBackground.setPosition(BackgroundPosition.DOWN)
          break
      }
    }

    setTimeout(() => {
      this.forceUpdate()
      this.transitioning = false
      setTimeout(() => {
        this.elementCurrentPage.fadeIn()
      }, 1)
    }, 150)
  }

  renderPage(): JSX.Element {
    switch(this.page) {
      case Pages.MAIN:
        return (
          <MainPage
            ref={this.refCurrentPage.bind(this)}
            cbSetPage={this.setPage.bind(this)}
          />
        )
      case Pages.GET_STARTED:
        return <GetStartedPage ref={this.refCurrentPage.bind(this)} />
    }
  }

  render() {
    return (
      <div className='App'>
        {(this.page !== Pages.MAIN) && this.renderPage()}
        <Background ref={this.refBackground.bind(this)} />
        {(this.page === Pages.MAIN) && this.renderPage()}
        <Header cbSetPage={this.setPage.bind(this)} />
        <Footer />
      </div>
    )
  }
}
