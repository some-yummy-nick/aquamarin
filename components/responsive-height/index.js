export default function({ width, height }) {
  return function(Component) {
    return function(props) {
      const [newHeight, setNewHeight] = React.useState(height)

      React.useEffect(() => {
        const setHeight = () => {
          const nh = (window.innerWidth * height) / width
          setNewHeight(nh)
        }

        setHeight()

        window.addEventListener('resize', setHeight)
        return () => window.removeEventListener('resize', setHeight)
      }, [])

      return <Component {...props} height={newHeight} />
    }
  }
}
