import React from 'react'
import Page from '@/components/page'
import Content from '@/components/content'
import Title from '@/components/typo/title'
import GalleryLight from '@/components/gallery/gallery-light'
import CloseButton from '@/components/button/close'
import { Router } from '@/routes'

class Show extends React.Component {
  render() {
    const images = this.props.current.photos.map(photo => photo.url)
    // console.log(this.props.current)
    return (
      <Page footer={false}>
        <Content flexible paddingless>
          <div
            className="flex flex-column"
            style={{ flex: 1, position: 'relative' }}
          >
            <div className="wrap-title">
              <Title>{this.props.current.name}</Title>
            </div>
            <div className="flex flex-auto" style={{ position: 'relative' }}>
              <div className="gallery-wrap">
                <GalleryLight
                  images={images}
                  showPager={true}
                  showControlsMask={true}
                />
                <div className="wrap-close">
                  <CloseButton
                    onClick={() => Router.pushRoute('gallery')}
                    color="white"
                    hoverColor="#aac800"
                  />
                </div>
              </div>
            </div>
          </div>
        </Content>
        <style jsx>{`
          .gallery-wrap {
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            position: absolute;
            display: flex;
          }
          .wrap-close {
            top: 40px;
            right: 50px;
            position: absolute;
            & :global(svg) {
            }
          }
          .wrap-title {
            top: 30px;
            left: 50px;
            z-index: 100;
            position: absolute;
            :global(h1) {
              color: white;
            }
          }
        `}</style>
      </Page>
    )
  }
}

export default Show
