export default ({ flat, mebelShown }) => {
  return (
    <div className="render">
      {mebelShown ? (
        <img className="mebel" src={flat.plan_type.render_view_url} />
      ) : (
        <img className="empty" src={flat.plan_type.render_plan_url} />
      )}
      <style jsx>{`
        .render {
          img {
            width: 100%;
            height: 100%;
            display: block;
          }
        }
      `}</style>
    </div>
  )
}
