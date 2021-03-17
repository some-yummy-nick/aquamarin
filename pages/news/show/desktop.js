import Page from '@/components/page'
import Content from '@/components/content'
import Button from '@/components/button'
import GalleryLight from '@/components/gallery/gallery-light'
import dateformat from 'dateformat'
import { Router } from '@/routes'
import { parseDate } from '@/helpers'

const Show = ({ news }) => {
  const humanDate = dateformat(
    new Date(...parseDate(news.published_at)),
    'd.mm.yyyy'
  )
  const images = news.files.map(photo => photo.url)
  return (
    <Page footer={true}>
      <Content>
        <div className="header flex items-center">
          <div className="flex-none">
            {/* <Button leftIcon={<LeftArrowAlt />} link> */}
            {/*   Предыдущая */}
            {/* </Button> */}
          </div>
          <div className="back-wrap flex justify-center flex-auto">
            <Button onClick={() => Router.pushRoute('news')} link large>
              Все новости
            </Button>
          </div>
          <div className="flex-none">
            {/* <Button rightIcon={<RightArrowAlt />} link> */}
            {/*   Следующая */}
            {/* </Button> */}
          </div>
        </div>
        <div className="news-body flex">
          {news.picture_url && (
            <div className="flex-none">
              <img
                className="news-image"
                src={news.picture_url}
                width="424"
                alt=""
              />
            </div>
          )}
          <div className="flex-auto">
            <div className="date">{humanDate}</div>
            <div className="name">{news.name}</div>
            <div className="body">
              <div dangerouslySetInnerHTML={{ __html: news.body }} />
              {images.length > 0 && (
                <div className="gallery-news-wrap">
                  <GalleryLight images={images} showPager={true} />
                </div>
              )}
            </div>
            {news.law_text && <div className="law_text">{news.law_text}</div>}
          </div>
        </div>
        <style jsx>{`
          .news-body {
            margin-top: 15px;
            padding-top: 25px;
          }
          .news-image {
            display: block;
            margin-right: 25px;
          }
          .date {
            font-size: 14px;
            font-weight: 400;
            color: var(--color9);
          }
          .name {
            margin: 12px 0 15px 0;
            font-weight: 500;
            font-size: 36px;
            line-height: 110%;
            text-transform: uppercase;
            color: #000;
            font-family: var(--heading-font);
          }
          .body {
            font-size: 14px;
            line-height: 150%;
          }
          .law_text {
            margin-top: 20px;
            font-size: 12px;
            color: #cccccc;
          }
          .gallery-news-wrap {
            width: 100%;
            height: 400px;
          }
          .gallery-news-wrap :global(.slide-inner) {
            background-size: contain;
            background-repeat: no-repeat;
          }
          .gallery-news-wrap :global(.controls .prev svg path) {
            fill: black;
          }
          .gallery-news-wrap :global(.controls .next svg path) {
            fill: black;
          }
          .news-body :global(img) {
            max-width: 100%;
          }
          .news-body :global(figure.image) {
            margin-left: 0;
            margin-right: 0;
          }
          .news-body .news-image {
            max-width: 424px;
          }
        `}</style>
      </Content>
    </Page>
  )
}

export default Show
