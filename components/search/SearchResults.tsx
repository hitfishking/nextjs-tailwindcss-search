import * as React from 'react'
// 子组件props的types在父组件中定义，子组件import进来即可.
import { Result_Props as Props } from './SearchFrame'

export const SearchResult: React.FC<Props> = ({ results }) => {
  return (
        <div className="grid grid-flow-col grid-rows-3 gap-4 justify-evenly">
					{(
						results.map((element) => (
								<div key={element._id} className="rounded-lg bg-white shadow-lg">
									<div className="px-6 py-4">
										<h3 className="text-lg font-semibold text-gray-800">{element._source.title}</h3>
										<p className="text-gray-600"> {element._source.year}</p>
										<p className="text-gray-600"> {element._source.info.plot}</p>
										<p className="text-gray-600"> {element._source.info.directors}</p>
										<div className="text-brand-dark hover:text-brand font-semibold text-sm mt-4">
												Rating {element._source.info.rating} / 10
										</div>
									</div>
								</div>
						))
					)}
        </div>

  )
}
