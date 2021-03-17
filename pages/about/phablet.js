import { PagePhablet } from '@/components/page'
import { setDangerousHtml } from '@/helpers'

export default ({ rawHtmlPage, ...props }) => {
  return (
    <PagePhablet footer={true}>
      <div className="page">
        {global.window ? (
          <div ref={setDangerousHtml.bind(null, rawHtmlPage)} />
        ) : null}
        <style jsx>{`
          .page {
            overflow-x: hidden;
          }
          .page :global(.ex-about-beseda-heading-with-gradient) {
            -webkit-text-fill-color: #ce775b;
            color: #ce775b;
            background: none;
            animation: none;
          }
          .page :global(.ex-about-beseda-hero-action) {
            display: none;
          }
          .page :global(.ex-developer-hero) {
            min-height: calc(100vh - 90px);
          }
          .page :global(.ex-about-beseda-hero-t2-logo) {
            width: 408px;
            height: 145px;
            transform: scale(0.5);
            obkect-fit: constan;
          }
          .page :global(.ex-about-beseda-nav-itm) {
            font-size: 18;
            font-weight: 400;
          }
          .page :global(.ex-about-beseda-heading) {
            line-height: 110%;
            font-weight: 500;
            font-size: 24px;
            text-align: left;
          }
          .page :global(.ex-about-beseda-hero-inner) {
            line-height: 150%;
            text-align: left;
            font-weight: 400;
            font-size: 14px;
            color: black;
          }
          .page :global(.ex-about-beseda-advantages-txt) {
            line-height: 150%;
            text-align: left;
            font-weight: 400;
            font-size: 14px;
            color: black;
          }
          .page :global(.ex-about-beseda-wrap-vert) {
            margin: 0;
            margin-bottom: 40px;
          }
          .page :global(.ex-about-beseda-nav) {
            margin-bottom: 40px;
          }
          .page :global(.ex-about-beseda-render-slider) {
            margin-bottom: 40px;
          }
          .page :global(.ex-about-beseda-nums-t1) {
            font-weight: 500;
          }
          .page :global(.ex-about-beseda-nums-t2) {
            font-weight: 500;
          }
          .page :global(.ex-about-beseda-prev),
          .page :global(.ex-about-beseda-next) {
            width: 58px;
            height: 58px;
          }
          .page :global(.ex-about-beseda-prev) {
            background: url(/static/branding/ex-prev.svg);
            transform: scale(0.5);
            bottom: 0;
            top: auto;
            left: calc(50% - 48px);
          }
          .page :global(.ex-about-beseda-next) {
            background: url(/static/branding/ex-next.svg);
            transform: scale(0.5);
            bottom: 0;
            top: auto;
            right: calc(50% - 48px);
          }
          .page :global(.ex-about-beseda-render-slider-t1) {
            line-height: 110%;
            font-weight: 500;
            font-size: 24px;
            text-align: left;
            color: #ce775b;
          }
          .page :global(.ex-about-beseda-render-slider-t2) {
            line-height: 150%;
            text-align: left;
            font-weight: 400;
            font-size: 14px;
            color: black;
          }
          .page :global(.ex-about-beseda-render-slider-desc) {
            border: 0;
            padding-bottom: 50px;
          }
          .page :global(.ex-about-beseda-wrap-last) {
            margin: 0;
          }
          .page :global(.complex_logo) {
            max-width: 100%;
          }
        `}</style>
      </div>
    </PagePhablet>
  )
}
