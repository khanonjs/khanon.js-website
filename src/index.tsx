import './index.scss'

import ReactDOM from 'react-dom/client'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes
} from 'react-router'

import AppWrapper from './App'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <BrowserRouter>
    <Routes>
      {/* <Route  // 8a8f
        path='/api-docs'
        element={<Navigate to='https://external-api-docs-url.com' replace />}
      /> */}
      <Route path='/*' element={<AppWrapper />} />
    </Routes>
  </BrowserRouter>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
