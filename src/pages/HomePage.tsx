import { createContext, useContext, useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import FilterBox from '../components/FilterBox'
import MangaCard from '../components/MangaCard'
import { IManga } from '../models/models'
import { useGetMangasFilteredQuery } from '../store/henchan/henchan.api'

import { Pagination } from '@mui/material'

export function HomePage() {
  const itemsPerPage = 20
  const [thisOffset, setThisOffset] = useState(0)
  const [pageCount, setPageCount] = useState(0)
  const [filter, setFilter] = useState({})
  const { isLoading, isError, data } = useGetMangasFilteredQuery(
    { filter: filter, offset: thisOffset },
    {
      refetchOnFocus: true,
    }
  )

  useEffect(() => {
    setPageCount(Math.ceil(data?.manga_count! / itemsPerPage))
  }, [data])

  const pagination = (
    <Pagination
      count={pageCount}
      onChange={(e, page) => {
        setThisOffset(page * itemsPerPage)
      }}
      className={'mx-auto w-5'}
    />
  )

  return (
    <>
      <div className="flex justify-center py-5 mx-auto h-100% w-[vw] gap-10">
        {isLoading && (
          <h1 className="text-green-700 font-bold text-3xl text-center h-screen">
            LOADING
          </h1>
        )}
        {isError && (
          <h1 className="text-red-700 font-bold text-3xl text-center h-screen">
            SERVER ERROR
          </h1>
        )}
        {data?.items.length ? (
          <>
            <div className={"sticky top-[110px]"}>{pagination}</div>

            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 w-[70%]">
              {data?.items.map((manga: IManga) => (
                <MangaCard manga={manga} key={manga.Id} />
              ))}
            </div>
          </>
        ) : (
          <div className="m-auto">
            <h1 className="text-white font-bold text-xl">Ничего не найдено</h1>
          </div>
        )}
        <FilterBox setFilter={setFilter} />
      </div>
    </>
  )
}
