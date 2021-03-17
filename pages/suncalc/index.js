import { Router } from '@/routes'
import { useEffect } from 'react'

export default () => {
  useEffect(() => {
    const navigateBack = () => Router.pushRoute('genplan')
    window.addEventListener('message', navigateBack)
    return () => window.removeEventListener('message', navigateBack)
  }, [])

  return (
    <>
      <iframe src="/static/sun.html" frameBorder="0" />
      <style jsx>{`
        iframe {
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: 0;
          display: block;
          position: absolute;
        }
      `}</style>
    </>
  )
}
