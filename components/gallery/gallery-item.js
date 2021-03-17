import ResponsiveImage from '@/components/common/responsive-image'
import classnames from 'classnames'

const GalleryItem = props => (
  <div
    key={props.id}
    onClick={() => props.onClick(props)}
    className={classnames('gallery', { empty: !props.cover_url })}
  >
    <div className="title">{props.name}</div>
    <div className="mask" />
    <div className="cover">
      <ResponsiveImage cover autoWidth src={props.cover_url} />
    </div>
    <style jsx>{`
      .gallery {
        height: 100%;
        cursor: pointer;
        overflow: hidden;
        border-radius: 5px;
        box-sizing: border-box;
        position: relative;
      }
      .gallery:hover:not(.empty) .mask,
      .gallery:hover:not(.empty) .title {
        opacity: 0;
      }
      .title {
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        text-align: center;
        padding: 1rem;
        text-transform: uppercase;
        color: white;
        font-weight: bold;
        z-index: 2;
        transition: 0.35s;
      }
      .cover {
        height: 100%;
      }
      .mask {
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        position: absolute;
        background: var(--color1);
        opacity: 0.5;
        z-index: 1;
        transition: 0.25s;
      }
    `}</style>
  </div>
)

GalleryItem.defaultProps = {
  onClick() {}
}

export default GalleryItem
