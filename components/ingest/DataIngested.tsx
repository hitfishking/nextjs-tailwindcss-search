import * as React from 'react'

type Props = {
	docCount: number
}

export const DataIngested: React.FC<Props> = (props) => {
// export function DataIngested (props) {
  return (
        <div className="text-center text-2xl">
            <p className="break-all tracking-normal max-w-xl leading-loose">
                🎉 You've ingested <span className="animate-bounce text-red-800 font-bold">{props.docCount}</span> documents into Elasticsearch!
                <a href="/search" className="inline-block px-5 py-3 rounded-lg shadow-lg bg-blue-450 text-white tracking-wider font-semibold text-lg">Search 🔍</a>
            </p>
        </div>
  )
}
