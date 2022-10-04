import React, { useReducer, useState } from 'react'
import { Filter, FilterValue, FilterType } from '../models/models'
import {
  useDiscoveryQuery,
  useGetMangasFilteredQuery,
} from '../store/henchan/henchan.api'
import {
  Button,
  Autocomplete,
  TextField,
  Select,
  MenuItem,
  Box,
  Chip,
  OutlinedInput,
  InputLabel,
  Input
} from '@mui/material'

const updateFilter = (state: Filter, filter: FilterValue) => {
  switch (filter.type) {
    case FilterType.author:
      return { ...state, author: filter.value }
    case FilterType.series:
      return { ...state, series: filter.value }
    case FilterType.tags:
      const newTags = filter.value
      return { ...state, tags: newTags }
    case FilterType.empty:
      return filterInit
    default:
      console.log('Unhandled FilterType')
      return state
  }
}

const filterInit = {
  tags: [],
  series: null,
  author: null,
}

export default function FilterBox({ setFilter }: { setFilter: any }) {
  const { data } = useDiscoveryQuery({})
  const [filterState, dispatch] = useReducer(updateFilter, filterInit)

  return (
    <div className="flex flex-col justify-evenly text-center border-2 border-white w-72 h-[560px] rounded-xl sticky top-[100px]">
      {data && (
        <>
          <Select
            multiple
            value={filterState.tags!}
            onChange={(e) => {
              const {
                target: { value: tags },
              } = e
              dispatch({
                type: FilterType.tags,
                value: typeof tags === 'string' ? tags.split(',') : tags,
              })
            }}
            input={<OutlinedInput style={{width: "100%"}} label={"Теги"}/>}
            renderValue={() => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {filterState.tags?.map((tag: string) => (
                  <Chip key={tag} label={tag} />
                ))}
              </Box>
            )}
            MenuProps={{style:{height:"50%"}}}>
            {data.tags.map((tag) => (
              <MenuItem key={tag} value={tag}>
                {tag}
              </MenuItem>
            ))}
          </Select>

          <Autocomplete
            options={data.series}
            renderInput={(params) => <TextField value={filterState.series} {...params} label={'Серия'} />}
            onInputChange={(e, newInput) => {
              dispatch({
                type: FilterType.series,
                value: newInput,
              })
            }}
          />

          <Autocomplete
            options={data.authors}
            renderInput={(params) => <TextField value={filterState.author} {...params} label={'Автор'} />}
            onInputChange={(e, newInput) => {
              dispatch({
                type: FilterType.author,
                value: newInput,
              })
            }}
          />

          <label htmlFor="dates" className="mt-5 text-xl text-white">
            Выберите дату:
          </label>
          <div id="dates" className="grid grid-cols-1 gap-2">
            <input type="date" />
            <input type="date" />
          </div>

          <Button
            variant={'outlined'}
            onClick={(e) => {
              setFilter(filterState)
            }}>
            ПОИСК
          </Button>

          <Button
            variant={'outlined'}
            onClick={(e) => {
              {dispatch({type:FilterType.empty}); setFilter(filterInit)}
            }}>
            СБРОСИТЬ
          </Button>
        </>
      )}
    </div>
  )
}
