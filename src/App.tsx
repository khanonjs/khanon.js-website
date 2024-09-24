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
import { TutorialsPage } from './pages/tutorials/tutorials-page'

// 8a8f add react router to docs, tutorials and markdown headings
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
        !Docs.loaded) {
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
        default:
          this.elementBackground.setPosition(BackgroundPosition.DOWN)
          break
      }
    }

    setTimeout(() => {
      this.forceUpdate()
      this.transitioning = false
      setTimeout(() => {
        this.elementCurrentPage.fadeIn()
      }, 150)
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
      case Pages.TUTORIALS:
        return <TutorialsPage ref={this.refCurrentPage.bind(this)} />
    }
  }

  render() {
    return (
      <div className='App'>
        <Header cbSetPage={this.setPage.bind(this)} />
        {(this.page !== Pages.MAIN) && this.renderPage()}
        {/* <Background ref={this.refBackground.bind(this)} /> */}
        {(this.page === Pages.MAIN) && this.renderPage()}
        {/* <Footer /> */}
      </div>
    )
  }
}
