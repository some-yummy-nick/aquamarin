import emitter from '@/emitter'
import { PagePhablet } from '@/components/page'
import { setDangerousHtml } from '@/helpers'

export default ({ rawHtmlPage, ...props }) => {
  const [loaded, setLoaded] = React.useState(false)
  React.useEffect(() => {
    const listener = emitter.addListener('onUniPageLoad', () => setLoaded(true))
    return () => listener.remove()
  }, [])
  return (
    <PagePhablet footer={true}>
      <div className="page" style={{ opacity: +loaded }}>
        {global.window ? (
          <div ref={setDangerousHtml.bind(null, rawHtmlPage)} />
        ) : null}
      </div>
      <style jsx>{`
        .page :global(.ex-service-company-hero),
        .page :global(.ex-service-company-principles) {
          min-height: calc(100vh - 89px);
        }
      `}</style>
    </PagePhablet>
  )
}
