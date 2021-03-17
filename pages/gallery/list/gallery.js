import Page from '@/components/page'
import Title from '@/components/typo/title'
import Content from '@/components/content'
import StackGrid, { transitions, easings } from 'react-stack-grid'
import { Router } from '@/routes'

const transition = transitions.scaleDown

const Gallery = props => {
  return (
    <Page>
      <Content>
        <Title>Галерея</Title>
        <StackGrid
          monitorImagesLoaded
          columnWidth={'33.33%'}
          duration={600}
          gutterWidth={20}
          gutterHeight={20}
          easing={easings.cubicOut}
          appearDelay={160}
          appear={transition.appear}
          appeared={transition.appeared}
          enter={transition.enter}
          entered={transition.entered}
          leaved={transition.leaved}
        >
          {props.images.map(obj => (
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
        </StackGrid>
      </Content>
      <style jsx>{`
        .title-wrap {
          text-align: center;
        }
        img {
          width: 100%;
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
          font-size: 20px;
          text-transform: uppercase;
          color: white;
          position: absolute;
          left: 25px;
          right: 25px;
          bottom: 25px;
        }
        figure {
          cursor: pointer;
          overflow: hidden;
          &:hover img {
            transform: scale(1.1);
          }
          &:hover figcaption {
            color: var(--color1);
          }
        }
        .mask {
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0) 50.65%,
            rgba(0, 0, 0, 0.7) 100%
          );
          position: absolute;
        }
      `}</style>
    </Page>
  )
}

export default Gallery
