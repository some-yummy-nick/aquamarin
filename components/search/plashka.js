const Plashka = ({ rooms, square }) => (
  <div className="plashka">
    <div className="highlight">
      {square} м
      <small>
        <sup>2</sup>
      </small>
    </div>
    {rooms > 0 && <div className="desc">{rooms}Х комнатная</div>}
    <style jsx>{`
      .plashka {
        font-size: 20px;
        font-weight: 500;
        text-align: center;
        color: var(--color1);
      }
      .highlight {
      }
      .desc {
        font-size: 16px;
        font-weight: 400;
        margin-top: 6px;
        color: #000;
      }
    `}</style>
  </div>
)

Plashka.defaultProps = {
  rooms: 0,
  square: 0
}

export default Plashka
