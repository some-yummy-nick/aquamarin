import Content from '@/components/content'
import Title from '@/components/typo/title'
import dateformat from 'dateformat'
import GalleryLight from '@/components/gallery/gallery-light'
import { PagePhablet } from '@/components/page'
import { parseDate } from '@/helpers'

const Show = ({ news }) => {
  const humanDate = dateformat(
    new Date(...parseDate(news.published_at)),
    'd.mm.yyyy'
  )
  const images = news.files.map(photo => photo.url)

  return (
    <PagePhablet>
      <Content>
        <div className="news-body">
          <div className="flex-auto">
            <Title>{news.name}</Title>
            <div className="date">{humanDate}</div>
            <div className="body">
              <div dangerouslySetInnerHTML={{ __html: news.body }} />
            </div>
            <div className="flex-none">
              {images.length ? (
                <div className="gallery-news-wrap">
                  <GalleryLight images={images} showPager={true} />
                </div>
              ) : news.picture_url ? (
                <img
                  className="news-image"
                  src={news.picture_url}
                  width="424"
                  alt=""
                />
              ) : null}
              {news.law_text && <div className="law_text">{news.law_text}</div>}
            </div>
          </div>
        </div>
        <style jsx>{`
          .news-body {
          }
          .news-image {
            width: 100%;
            display: block;
            margin: 8px 0;
          }
          .date {
            font-size: 14px;
            font-weight: 400;
            color: var(--color9);
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
            height: 300px;
          }
          .gallery-news-wrap :global(.slide-inner) {
            background-size: contain;
            background-repeat: no-repeat;
          }
          .news-body :global(img) {
            max-width: 100%;
          }
          .news-body :global(figure.image) {
            margin-left: 0;
            margin-right: 0;
          }
        `}</style>
      </Content>
    </PagePhablet>
  )
}

export default Show
