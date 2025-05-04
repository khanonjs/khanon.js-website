import './App.scss'

import React from 'react'
import {
  Location,
  NavigateFunction,
  Route,
  Routes,
  useLocation,
  useNavigate
} from 'react-router'

import kLoading from './assets/k-loading.svg'
import { Docs } from './classes/docs'
import { PageBase } from './classes/page-base'
import { Background } from './components/background/background'
// import { Footer } from './components/footer/footer'
import { Header } from './components/header/header'
import { MarkdownDocSection } from './components/markdown-doc/markdown-doc-section'
import { Sidebar } from './components/sidebar/sidebar'
import {
  getStartedDocs,
  tutorialsDocs
} from './doc-definitions'
import { BackgroundPosition } from './models/background-position'
import { DocsPage } from './pages/docs-page/docs-page'
import { MainPage } from './pages/main/main-page'

const AppWrapper = () => {
  const location = useLocation()
  const navigate = useNavigate()

  return <App currentLocation={location} navigate={navigate} />
}

export default AppWrapper

class App extends React.Component<{currentLocation: Location, navigate: NavigateFunction}> {
  private elementBackground: Background
  private elementCurrentPage: PageBase
  private elementSidebar: Sidebar
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

  refSidebar(element: Sidebar) {
    if (element) {
      this.elementSidebar = element
    }
  }

  handleSidebarGoSection(section: MarkdownDocSection, title: string) {
    // if (this.elementCurrentPage && (this.page === Pages.GET_STARTED || this.page === Pages.TUTORIALS)) { // 8a8f
    //   (this.elementCurrentPage as DocsPage).goSection(section, title)
    // }
  }

  openSidebar() {
    this.elementSidebar.open()
  }

  getDocNavigationInfo() {
    const base = this.props.currentLocation.pathname.split('/')
    const tabPath = base[1]
    const docPath = base[2]
    const hashtag = this.props.currentLocation.hash
    return {
      tabPath,
      docPath,
      hashtag
    }
  }

  render() {
    const navigationInfo = this.getDocNavigationInfo()
    if (!Docs.loaded) {
      setTimeout(() => this.forceUpdate(), 10)
    }
    return (
      <div className='App'>
        <Header
          openSidebar={this.openSidebar.bind(this)}
        />
        <Background ref={this.refBackground.bind(this)} />
        <Routes>
          <Route
            path='/*'
            element={
              <MainPage />
            }
          />
          <Route
            path='getstarted/*'
            element={
              <DocsPage
                navigate={this.props.navigate}
                tabPath={navigationInfo.tabPath}
                docPath={navigationInfo.docPath}
                hashtag={navigationInfo.hashtag}
                sectionId={0}
                itemId={0}
                documents={getStartedDocs}
              />
            }
          />
          <Route
            path='tutorials/*'
            element={
              <DocsPage
                navigate={this.props.navigate}
                tabPath={navigationInfo.tabPath}
                docPath={navigationInfo.docPath}
                hashtag={navigationInfo.hashtag}
                sectionId={0}
                itemId={0}
                documents={tutorialsDocs}
              />
            }
          />
        </Routes>
        <Sidebar
          tabPath={navigationInfo.tabPath}
          docPath={navigationInfo.docPath}
          hashtag={navigationInfo.hashtag}
          ref={this.refSidebar.bind(this)}
          goSection={this.handleSidebarGoSection.bind(this)}
        />
        {/* <Footer /> */}
        {!Docs.loaded && (<div className='loading-background' />)}
      </div>
    )
  }
}
