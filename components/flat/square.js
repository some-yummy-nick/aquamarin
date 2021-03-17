export default ({ square }) => (
  <div className="square">
    {square} м
    <small>
      <sup>2</sup>
    </small>
    <style jsx>{`
      .square {
        font-size: 30px;
        font-weight: 500;
        position: relative;
        color: var(--color9);
        :global(.is-mobile) {
        }
      }
    `}</style>
  </div>
)
