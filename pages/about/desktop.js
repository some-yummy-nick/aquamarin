import Page from '@/components/page'
import { setDangerousHtml } from '@/helpers'

export default ({ rawHtmlPage, ...props }) => {
  return (
    <Page footer={true}>
      <div className="page">
        {global.window ? (
          <div ref={setDangerousHtml.bind(null, rawHtmlPage)} />
        ) : null}
        <style jsx>{`
          .page :global(.ex-about-beseda-nav) {
            background: white;
            backdrop-filter: none;
          }
          .page :global(.ex-about-beseda-hero-action) {
            display: none;
          }
          .page :global(.ex-about-beseda-advantages-txt) {
            padding-right: 50px;
          }
          .page :global(.ex-about-beseda-heading-with-gradient) {
            -webkit-text-fill-color: #ce775b;
            color: #ce775b;
            background: none;
            animation: none;
          }
          .page :global(.ex-about-beseda-hero-text),
          .page :global(.ex-about-beseda-advantages-txt) {
            font-weight: 400;
          }
          .page :global(.complex_logo) {
            max-width: 100%;
          }
        `}</style>
      </div>
    </Page>
  )
}
