export default ({ children }) => (
  <div className="label">
    {children}
    <style jsx>{`
      .label {
        margin: 3px 0;
        color: #646464;
        font-size: 14px;
        text-transform: uppercase;
      }
    `}</style>
  </div>
)
