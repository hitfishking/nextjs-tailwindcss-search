import * as React from 'react'
import { IMovie } from '../../types'
import { SearchBar } from './SearchBar'
import { SearchResult } from './SearchResults'

// 子组件props的types在父组件中定义，子组件只需要import父组件提供的types即可。
export type Input_Props = {
	textInput: React.MutableRefObject<HTMLInputElement>;
	searchQuery: (event) => void;
}

export type Result_Props = {
	results: IMovie[]
}

type Props = Input_Props & Result_Props

export const SearchFrame: React.FC<Props> = (props) => {
  const results = props.results
  return (
			<div>
				<SearchBar textInput={props.textInput} searchQuery={props.searchQuery} />
				<SearchResult results={results}/>
			</div>
  )
}
