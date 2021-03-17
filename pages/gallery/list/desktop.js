import React, { Suspense, lazy } from 'react'
import Spinner from '@/components/spinner'
import NoSSR from 'react-no-ssr'

const Gallery = React.lazy(() => import('./gallery'))

export default props => {
  return (
    <NoSSR>
      <Suspense fallback={<Spinner center color1 />}>
        <Gallery images={props.gallery} />
      </Suspense>
    </NoSSR>
  )
}
