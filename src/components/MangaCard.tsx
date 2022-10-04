import { useState } from 'react'
import { Link } from 'react-router-dom'
import { IManga } from '../models/models'
import { Skeleton } from '@mui/material'


export default function MangaCard({ manga }: { manga: IManga }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <Link to={`manga/${manga.Id}`}>
      <div
        className="flex-col text-center rounded-lg border-2 border-white justify-center"
        key={manga.Id}>
        <div className=''>
          {!loaded && (<Skeleton variant={'rectangular'} style={{width:'99%', aspectRatio:'4 / 3'}} />)}
          <img
            src={manga.preview_url}
            alt=""
            className="w-[99%] rounded-lg p-1"
            onLoad={()=>{setLoaded(true)}}
          />
        </div>

        <h2 className="truncate text-md font-bold text-white">{manga.title}</h2>
        <p className="truncate text-sm text-white">{manga.authors}</p>
      </div>
    </Link>
  )
}
