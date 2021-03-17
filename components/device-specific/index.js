import { UserAgent } from '@quentin-sommer/react-useragent'
export default ({
  component: Component,
  desktop: Desktop,
  phablet: Phablet,
  ...props
} = {}) =>
  Component ? (
    <>
      <UserAgent mobile>
        <Component.Phablet {...props} />
      </UserAgent>
      <UserAgent tablet>
        <Component.Desktop {...props} />
      </UserAgent>
      <UserAgent computer>
        <Component.Desktop {...props} />
      </UserAgent>
    </>
  ) : (
    <>
      <UserAgent mobile>
        <Phablet {...props} />
      </UserAgent>
      <UserAgent tablet>
        <Desktop {...props} />
      </UserAgent>
      <UserAgent computer>
        <Desktop {...props} />
      </UserAgent>
    </>
  )
