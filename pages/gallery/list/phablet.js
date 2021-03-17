import { PagePhablet } from '@/components/page'
import Content from '@/components/content'
import Title from '@/components/typo/title'
import { Router } from '@/routes'

const Gallery = props => {
  const images = props.gallery
  return (
    <PagePhablet>
      <Content dbp>
        <Title>Галерея</Title>
      </Content>
      <div>
        {images.map(obj => (
          <figure
            key={obj.cover_url}
            className="image"
            onClick={() => {
              Router.pushRoute('showGallery', { id: obj.id })
            }}
          >
            <img src={obj.cover_url} alt={obj.name} />
            <div className="mask" />
            <figcaption>{obj.name}</figcaption>
          </figure>
        ))}
      </div>
      <style jsx>{`
        img {
          max-width: 100%;
          height: auto;
          vertical-align: top;
          transition: 0.35s;
        }
        .image {
          display: block;
          margin: 0;
          position: relative;
        }
        figcaption {
          font-weight: 500;
          font-size: 18px;
          line-height: 24px;
          text-transform: uppercase;
          color: white;
          position: absolute;
          left: 20px;
          right: 15px;
          bottom: 15px;
        }
        figure {
          cursor: pointer;
          overflow: hidden;
          &:hover img {
            transform: scale(1.1);
          }
        }
        figure + figure {
          margin-top: 10px;
        }
        .mask {
          left: 0;
          right: 0;
          bottom: 0;
          height: 100px;
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 0.8) 100%
          );
          position: absolute;
        }
      `}</style>
    </PagePhablet>
  )
}

export default Gallery
