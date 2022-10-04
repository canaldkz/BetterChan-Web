import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDebounce } from '../hooks/debounce'
import { useSearchMangaQuery } from '../store/henchan/henchan.api'
import {GrClose} from "react-icons/gr"

export default function SearchBar() {
  const [searchFocus, setSearchFocus] = useState(false)
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 500)
  const { isError, isLoading, data } = useSearchMangaQuery(debouncedQuery, {
    skip: debouncedQuery.length < 3,
  })

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Поиск.."
        value={query}
        className="rounded-full py-2 px-4 w-[30rem] h-[3rem]"
        onChange={(e) => {
          setQuery(e.target.value)
        }}
        onFocus={(e) => {setSearchFocus(true)}}
        onBlur={(e) => {{setTimeout(() => (setSearchFocus(false)), 300)}}}
      />
      <button className="ml-[-30px]" onClick={(e) => {setQuery('')}}><GrClose/></button>
      {(debouncedQuery.length > 3 && searchFocus) && (
        <div className="absolute flex-column top-[3.5rem] right-0 left-0 max-h-[30rem] bg-white shadow-sm shadow-black rounded-sm overflow-x-hidden">
          {isLoading && (<h1>Поиск...</h1>)}
          {isError && (<h1>Ошибка</h1>)}
          {data?.length! > 0 ? (
            data!.map((manga) => (
              <Link to={`manga/${manga.Id}`}>
                <div
                  className="flex p-1 hover:bg-sky-600 max-h-[6rem] max-w-[30rem]"
                  key={manga.Id}
                >
                  <img
                    src={manga.preview_url}
                    alt={manga.title}
                    className="w-[3rem] h-[4rem]"
                  />
                  <div className="flex-1 ml-3">
                    <h2 className="truncate font-bold text-md">{manga.title}</h2>
                    <p className="truncate text-sm font-light">{manga.authors}</p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="flex justify-center p-1 max-h-[6rem] max-w-[30rem]">
              <h2 className="text-gray-500">Ничего не найдено..</h2>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
