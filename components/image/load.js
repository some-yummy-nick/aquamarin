const Load = ({ image, onLoad = () => {} }) => {
  return (
    <img
      className="image"
      ref={img => {
        if (img) {
          const update = () => onLoad()
          img.onload = update
          if (img.complete) {
            setTimeout(update, 0)
          }
        }
      }}
      src={image}
    />
  )
}

export default Load
