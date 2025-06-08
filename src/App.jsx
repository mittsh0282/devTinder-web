import { useState } from 'react'
import NavBar from './NavBar'
import { BrowserRouter, Route, Routes } from 'react-router'
import Login from './components/Login'
import { Provider } from 'react-redux'
import appStore from './utils/appStore'
import Feed from './components/Feed'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Feed />} >
              <Route path="/login" element={<Login />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
