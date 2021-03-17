import React from 'react'
import Title from '@/components/typo/title'
import Content from '@/components/content'
import { Router } from '@/routes'
import { NewsItemPhablet } from '@/components/news/item'
import { PagePhablet } from '@/components/page'

class News extends React.Component {
  render() {
    const { news } = this.props
    const total = news.length - 1
    return (
      <PagePhablet>
        <Content auto dbp>
          <Title>Новости</Title>
        </Content>
        <Content dtp>
          {news.map((news, index) => (
            <div key={news.id}>
              <NewsItemPhablet
                {...news}
                onClick={() =>
                  Router.pushRoute('showNews', {
                    id: news.id
                  })
                }
              />
              <br />
              <br />
            </div>
          ))}
        </Content>
        <style jsx>{`
          @import 'mixins/r.scss';
        `}</style>
      </PagePhablet>
    )
  }
}

export default News
