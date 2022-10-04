export interface IManga {
  Id: string
  url: string
  title: string
  series: string
  date: Date
  pages: number
  preview_url: string
  page_urls?: string[]
  authors: string[]
  translators: string[]
  tags: string[]
  private: boolean
}


export interface ApiResponse {
  items: IManga[]
  offset?: number
  manga_count?: number
}

export interface ApiRequest {
  offset: number
  filter: Filter
}

export interface DiscoveryResponse {
  tags: string[]
  series: string[]
  authors: string[]
}

export interface Filter {
  tags?: string[] | null
  series?: string | null
  author?: string | null
}

export interface FilterValue {
  type:  FilterType
  value?: any
}

export enum FilterType {
  tags,
  series,
  author,
  empty
}