import './App.scss'

import React from 'react'

import { ReferenceCollector } from './classes/reference-collector'
import { MainPage } from './pages/main/main-page'

export class App extends React.Component {
  private refElements = new ReferenceCollector()

  render() {
    return (
      <div className='App'>
        <MainPage />
      </div>
    )
  }
}
