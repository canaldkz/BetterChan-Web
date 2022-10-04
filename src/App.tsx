import { Route, Routes } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { HomePage } from './pages/HomePage'
import { MangaPage } from './pages/MangaPage'
import { ViewerPage } from './pages/ViewerPage'
import { createContext } from 'react'
import {createTheme, ThemeProvider} from "@mui/material"


const mytheme = createTheme({
  palette: {
    mode:"dark"
  }
})

function App() {

  return (
    <ThemeProvider theme={mytheme}>
      <div className="bg-[url(img/bg.jpg)] bg-no-repeat bg-fixed sticky top-0 bottom-0 bg-cover h-full">
        <Navbar />
        <Routes>
          <Route
            path="*"
            element={
              <div className="flex justify-center h-screen">
                <h1 className="text-red-700 font-bold pt-10">Page not found</h1>
              </div>
            }
          ></Route>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/:page" element={<HomePage />}></Route>
          <Route path="/manga/:id" element={<MangaPage />}></Route>
          <Route path="/read/:id" element={<ViewerPage />}></Route>
        </Routes>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
