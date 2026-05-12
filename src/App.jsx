import Topbar from './Header/Topbar'
import Home from './Comopnents/Home'
import Footer from './Comopnents/Footer'
import Blog  from './Comopnents/Blog'
import Service from "./Comopnents/Service"
import { Outlet } from "react-router-dom"
import Portfolio from "./Comopnents/Portfolio"
import SmoothScroll from './Comopnents/SmoothScroll'
import MobileToolbar from './Header/MobileToolbar'

const App = () => {
  return (
    <SmoothScroll>
      <div className="bg-[var(--bg-primary)] transition-colors duration-500">
        <Topbar />
        <main className="relative z-10">
          <Outlet />
        </main>
        <MobileToolbar />
        <Footer />
      </div>
    </SmoothScroll>
  )
}

export default App
