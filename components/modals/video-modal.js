import { Router } from '@/routes'

import Button from '@/components/button'
import CloseButton from '@/components/close-btn'

const Video = props => (
  <div className="video" style={{ width: props.width }}>
    <div className="head flex items-center">
      <div className="flex-auto">
        <div className="title">{props.title}</div>
      </div>
      <CloseButton small onClick={props.requestClose} />
    </div>
    <div>
      <div className="stream">
        <iframe
          width="640"
          height="360"
          allow="autoplay"
          className="iframe"
          allowFullScreen={true}
          mozallowfullscreen="true"
          webkitallowfullscreen="true"
          src={props.dataSource}
        />
      </div>
    </div>
    <div className="footer flex items-center">
      <div className="flex-auto">
        {/*<div className="name">камера на литеры 2а, 2б</div>*/}
      </div>
      <Button
        flat
        iconRight
        icon="/static/images/icons/arrow-right.svg"
        onClick={() => {
          Router.pushRoute('history')
          props.requestClose()
        }}
      >
        ход строительства
      </Button>
    </div>
    <style jsx>{`
      .video {
        padding: 1.5rem;
        background: white;
      }
      .title {
        font-size: 18px;
        font-weight: 500;
        padding-right: 2rem;
        color: var(--color1);
        text-transform: uppercase;
      }
      .name {
        font-size: 12px;
        font-weight: 500;
        padding-right: 2rem;
        color: var(--color4);
        text-transform: uppercase;
      }
      .stream {
        margin: 1rem 0;
        position: relative;
      }
      .iframe {
        border: 0;
      }
    `}</style>
  </div>
)

export default Video
