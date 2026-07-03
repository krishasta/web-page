import Topbar from './Header/Topbar'
import Home from './Comopnents/Home'
import Footer from './Comopnents/Footer'
import Blog  from './Comopnents/Blog'
import Service from "./Comopnents/Service"
import { Outlet, useLocation } from "react-router-dom"
import Portfolio from "./Comopnents/Portfolio"
import SmoothScroll from './Comopnents/SmoothScroll'
import MobileToolbar from './Header/MobileToolbar'

const App = () => {
  const location = useLocation();
  const showPageBackground = location.pathname !== '/';

  return (
    <SmoothScroll>
      <div className={`transition-colors duration-500 ${showPageBackground ? 'page-background' : 'bg-[var(--bg-primary)]'}`}>
        <Topbar />
        <main className="relative z-10 transition-colors duration-500">
          <Outlet />
        </main>
        <MobileToolbar />
        <Footer />
      </div>
    </SmoothScroll>
  )
}

export default App
