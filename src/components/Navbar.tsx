import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'

export function Navbar() {
  return (
    <nav className="flex justify-between items-center h-[80px] w-[vw] p-3 font-bold sticky top-0 backdrop-blur-md bg-sky-900/50 z-50">
      <Link to="/">
        <h1 className="text-xl text-sky-600 hover:text-sky-50">BetterChan</h1>
      </Link>
      <SearchBar />
      <div className="flex justify-between gap-3">
        <a
          className="text-white hover:text-sky-600"
          href="https://y.hentaichan.live/"
        >
          HenChan
        </a>
        <p className="text-white hover:text-sky-600">
          Alpha ver0.2
        </p>
      </div>
    </nav>
  )
}
