import Spinner from '@/components/spinner'
import dynamic from 'next/dynamic'
import themes from '@/enums/themes'
import { PagePhablet } from '@/components/page'
import { ThemeContext } from '@/components/context/theme'

const GenplanLeaflet = dynamic(() => import('@/components/genplan/leaflet'), {
  loading: () => <Spinner center color2 />,
  ssr: false
})

const Genplan = props => (
  <ThemeContext.Provider value={themes.transparent}>
    <PagePhablet footer={false} theme="transparent">
      <div className="genplan">
        <GenplanLeaflet
          {...props}
          showZoomControl={false}
          center={{
            lon: -45,
            lat: +60
          }}
        />
        <div className="mask" />
      </div>
      <style jsx>{`
        @import 'mixins/r';
        .genplan {
          @extend %fix-container;
        }
        .mask {
          top: 0;
          right: 0;
          left: 0;
          height: 175px;
          z-index: 500;
          position: absolute;
          pointer-events: none;
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.7) 0%,
            rgba(0, 0, 0, 0) 100%,
            rgba(0, 0, 0, 0.0510417) 100%
          );
        }
      `}</style>
    </PagePhablet>
  </ThemeContext.Provider>
)

export default Genplan
