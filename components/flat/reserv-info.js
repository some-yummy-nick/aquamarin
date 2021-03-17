import dayjs from '@/dayjs'

const ReserveInfo = props => (
  <div className="reserv-info">
    <div className="title">Прошу Вас забронировать</div>
    <table className="info">
      <tr>
        <td className="underline w8" />
        <td className="separator" />
        <td className="underline" />
      </tr>
      <tr>
        <td className="subtitle">ФИО</td>
        <td className="separator" />
        <td className="subtitle">подпись</td>
      </tr>
    </table>
    <table className="info">
      <tr>
        <td className="separator">
          <div className="checkbox" />
        </td>
        <td className="subtitle w3">Нет агентства недвижимости</td>
        <td className="underline w4" />
        <td className="separator" />
        <td className="underline" />
      </tr>
      <tr>
        <td className="separator" />
        <td className="subtitle" />
        <td className="subtitle">Агентство недвижимости</td>
        <td className="separator" />
        <td className="subtitle">Агент</td>
      </tr>
    </table>
    <table className="info">
      <tr>
        <td className="underline w3">{dayjs().format('DD.MM.YYYY')}</td>
        <td className="separator" />
        <td className="underline w3" />
        <td className="separator" />
        <td className="underline" />
      </tr>
      <tr>
        <td className="subtitle">Дата</td>
        <td className="separator" />
        <td className="subtitle">Номер телефона</td>
        <td className="separator" />
        <td className="subtitle">Примечание</td>
      </tr>
    </table>
    <style jsx>{`
      .reserv-info {
        margin-bottom: 5px;
      }
      .info {
        width: 100%;
      }
      .w3 {
        width: 25%;
      }
      .w4 {
        width: 33%;
      }
      .w6 {
        width: 50%;
      }
      .w8 {
        width: 66%;
      }
      .underline {
        height: 0.7cm;
        border-bottom: 1px solid #000000;
      }
      .title {
        font-size: 14px;
        font-weight: 500;
      }
      .subtitle {
        font-size: 8px;
        text-transform: uppercase;
        font-weight: 600;
      }
      .separator {
        border: none;
        width: 20px;
      }
      .checkbox {
        border: 1px solid #000000;
        width: 15px;
        height: 15px;
      }
    `}</style>
  </div>
)

export default ReserveInfo
