import './App.scss'

import React from 'react'

import { Docs } from './classes/docs'
import { PageBase } from './classes/page-base'
import { Background } from './components/background/background'
// import { Footer } from './components/footer/footer'
import { Header } from './components/header/header'
import { Sidebar } from './components/sidebar/sidebar'
import {
  getStartedDocs,
  tutorialsDocs
} from './doc-definitions'
import { BackgroundPosition } from './models/background-position'
import { Pages } from './models/pages'
import { DocsPage } from './pages/docs-page/docs-page'
import { MainPage } from './pages/main/main-page'

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
      case Pages.TUTORIALS:
        const sectionTag = this.page === Pages.GET_STARTED ? 'getstarted_SectionId' : 'tutorials_SectionId'
        const itemTag = this.page === Pages.GET_STARTED ? 'getstarted_ItemId' : 'tutorials_ItemId'
        const documents = this.page === Pages.GET_STARTED ? getStartedDocs : tutorialsDocs
        return (
          <DocsPage
            storageSectionIdTag={sectionTag}
            storageItemIdTag={itemTag}
            documents={documents}
            ref={this.refCurrentPage.bind(this)}
          />
        )
    }
  }

  render() {
    return (
      <div className='App'>
        <Header cbSetPage={this.setPage.bind(this)} />
        {(this.page !== Pages.MAIN) && this.renderPage()}
        <Background ref={this.refBackground.bind(this)} />
        {(this.page === Pages.MAIN) && this.renderPage()}
        <Sidebar cbSetPage={this.setPage.bind(this)} />
        {/* <Footer /> */}
      </div>
    )
  }
}
