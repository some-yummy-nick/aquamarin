import Title from '@/components/typo/title'
import Content from '@/components/content'
import NewsItem from '@/components/news/item'
import Page from '@/components/page'
import { Component } from 'react'
import { Router } from '@/routes'

class News extends Component {
  render() {
    const { news } = this.props
    return (
      <Page>
        <Content auto dbp>
          <Title>Новости</Title>
        </Content>
        <div className="row">
          {news.map(news => (
            <div key={news.id} className="col">
              <NewsItem
                {...news}
                onClick={() =>
                  Router.pushRoute('showNews', {
                    id: news.id
                  })
                }
              />
            </div>
          ))}
        </div>
        <style jsx>{`
          @import 'mixins/r.scss';
          .row {
            display: flex;
            flex-wrap: wrap;
            padding: 0 0 20px 50px;
          }
          .col {
            width: 50%;
            padding-bottom: 30px;
          }
        `}</style>
      </Page>
    )
  }
}

export default News
