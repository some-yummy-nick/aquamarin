import React from 'react'
import GalleryLight from '@/components/gallery/gallery-light'
import ButtonClose from '@/components/button/close'
import { Router } from '@/routes'
import { PagePhablet } from '@/components/page'

class Show extends React.Component {
  render() {
    const { current } = this.props
    const images = current.photos.map(photo => photo.url)
    return (
      <PagePhablet footer={false}>
        <div className="gallery-wrap">
          <GalleryLight images={images} showPager={true} />
        </div>
        <div className="close-wrap">
          <ButtonClose
            onClick={() => {
              Router.pushRoute('gallery')
            }}
          />
        </div>
        <style jsx>{`
          .gallery-wrap {
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            position: fixed;
          }
          .close-wrap {
            top: 20px;
            right: 24px;
            position: absolute;
          }
        `}</style>
      </PagePhablet>
    )
  }
}

export default Show
