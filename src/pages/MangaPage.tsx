import { useGetMangaQuery } from '../store/henchan/henchan.api'
import { useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import { useEffect, useState } from 'react'

import {Pagination} from '@mui/material'

export function MangaPage() {
  let params = useParams()
  const { data } = useGetMangaQuery(params.id!)
  const [activePage, setActivePage] = useState(0)
  const [pageLoading, setPageLoading] = useState(true)

  const pagination2 = (
    <Pagination count={data?.page_urls!.length || 0} page={activePage+1} onChange={(e, page)=> {setActivePage(page-1)}}/>
  )

  return (
    <div className="h-full select-none">
      {data && (
        <>
        <div className="flex justify-center gap-3 w-[80%] mx-auto h-auto mt-5">
          <img src={data.preview_url} alt={data.title} className="aspect-[4 / 3] h-[60%]"/>
          <div className='flex flex-col justify-between text-white text-center divide-y-4 w-[50%] h-[60%]'>
            <h1 className="font-bold text-center m-auto">{data.title}</h1>
            <h2>{data.authors}</h2>
            <h2>{data.date.toString()}</h2>
            <ul className="columns-2">
              {data.tags.map((tag) => (
                <li>{tag}</li>
              ))}
            </ul>
            
            {/* <Link to={"/view"} className='w-[100%] h-[10%] bg-red-500'> ЧИТАТЬ </Link> */}
            <a target={"_blank"} rel={'noreferrer'} href={`https://y.hentaichan.live/online/${data.url}`}>Читать на Henchan</a>           
          </div>
        </div>
        <div className='w-[60%] mx-auto'>
          {pagination2}
        {/* TODO Переделать этот кошмар */}
            <img src={data?.page_urls![activePage]} alt="Page" className={pageLoading ? 'blur-sm' : 'cursor-pointer' } onLoadStart={()=>{setPageLoading(true)}} onLoad={()=>{setPageLoading(false)}} onClick={()=>{setActivePage((prev)=>(prev+1))}}/>
        </div>
        </>
      )}
    </div>
  )
}
