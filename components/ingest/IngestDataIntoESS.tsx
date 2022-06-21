/* eslint-disable no-mixed-spaces-and-tabs */
import * as React from 'react'

export const IngestDataIntoESS = () => {
  const ingestData = async (event) => {
    event.preventDefault()
    const res = await fetch('/api/ingestData', {
      method: 'POST'
    })
    await res.json()
  }

  return (
		<div>
			<p className="text-center">You're connected to Elastic Cloud! Hit below button to ingest sample data.</p>
			<div className="text-center pt-2">
				<a href="javascript:void(0)" onClick={ingestData} className="inline-block px-5 py-3 rounded-lg shadow-lg bg-poppy text-black tracking-wider font-semibold text-sm">
					Ingest!
			  </a>
				{ /* props.ingestData
				  ? <a href="javascript:void(0)" onClick={props.ingestData} className="inline-block px-5 py-3 rounded-lg shadow-lg bg-poppy text-black tracking-wider font-semibold text-sm">
							Ingest!
			  		</a>
				  :	<a href="/api/ingestData" className="inline-block px-5 py-3 rounded-lg shadow-lg bg-poppy text-black tracking-wider font-semibold text-sm">
							Ingest!
						</a>
				*/}
				{/* <a>的两中写法：用href，用onClick；<a href='#' onClick={props.ingestData}> */}
			</div>
		</div>
  )
}
