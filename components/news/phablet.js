import { parseDate } from '@/helpers'
import dateformat from 'dateformat'
import dayjs from '@/dayjs'

const Item = props => {
  const humanDate = dateformat(
    new Date(...parseDate(props.published_at)),
    'd.mm.yyyy'
  )
  return (
    <div onClick={() => props.onClick(props)} key={props.id} className="news">
      <div className="image">
        <img src={props.picture_url} width="212" />
      </div>
      <div className="news-body">
        <div className="date">{humanDate}</div>
        <div className="name">{props.name}</div>
        <div className="notice">{props.annotation}</div>
        <div className="law-text">
          <small>{props.law_text}</small>
        </div>
      </div>
      <style jsx>{`
        .news {
        }
        .date {
          font-weight: 400;
          font-size: 14px;
          color: var(--color9);
        }
        .name {
          margin: 8px 0;
          font-weight: 500;
          font-size: 18px;
          color: #000000;
          line-height: 130%;
          text-transform: uppercase;
        }
        .notice {
          font-weight: 400;
          font-size: 14px;
          line-height: 130%;
          color: #646464;
        }
        img {
          width: 100%;
          display: block;
          margin-bottom: 8px;
        }
      `}</style>
    </div>
  )
}

export default Item
