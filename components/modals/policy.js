import withColors from '@/components/hocs/with-colors'

const Policy = props =>
  // prettier-ignore
  <div className="policy">
    Нажимая кнопку отправить, вы <br/> принимаете наши{' '}
    <a target="_blank" href="/policy/soglasie">Условия использования</a> <br/> и {' '}
    <a target="_blank" href="/policy">Политику конфиденциальности</a>
    <style jsx>{`
      .policy {
        font-size: 11px;
        font-weight: 400;
        padding-left: 30px;
        line-height: 130%;
        color: white;
        :global(a) {
          color: white;
          text-decoration: none;
        }
      }
    `}</style>
  </div>

export default withColors(Policy)
