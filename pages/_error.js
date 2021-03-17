import Para from '@/components/typo/para'
import Title from '@/components/typo/title'
import Content from '@/components/content'

const Error = ({ error }) => {
  error || (error = {})
  const status = error.status || null
  return (
    <Content>
      <Title>
        Ошибка <b>{status}</b>
      </Title>
      <Para>
        <a href="/">Вернуться на главную</a>
      </Para>
    </Content>
  )
}

export default Error
