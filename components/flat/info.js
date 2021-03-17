const FlatInfo = props => (
  <div className="flat-info">
    <div>
      <div className="body">
        {props.flat.typology_name && (
          <div className="row flex items-end">
            <div className="val val-small">{props.flat.typology_name}</div>
          </div>
        )}
        {props.flat.square && (
          <div className="row flex items-end">
            <div className="key">общая Площадь</div>
            <div className="val">
              {props.flat.square} м<sup>2</sup>
            </div>
          </div>
        )}
        {props.flat.square_living && (
          <div className="row flex items-end">
            <div className="key">жилая Площадь</div>
            <div className="val">
              {props.flat.square_living} м<sup>2</sup>
            </div>
          </div>
        )}
        {props.flat.cost && (
          <div className="row flex items-end">
            <div className="key">Стоимость</div>
            <div className="val">{props.flat.cost} ₽</div>
          </div>
        )}
      </div>
    </div>
    <style jsx>{`
      .row {
        margin: 0.15rem 0;
      }
      .key {
        color: #a6a6b3;
        font-size: 10px;
        font-weight: 500;
        padding-right: 10px;
        padding-bottom: 2px;
        text-transform: uppercase;
      }
      .val {
        font-size: 18px;
        font-weight: 500;
      }
      .val-small {
        font-size: 15px;
        font-weight: 400;
      }
      sup {
        position: absolute;
      }
    `}</style>
  </div>
)

FlatInfo.defaultProps = {
  flat: {}
}

export default FlatInfo
