import FooterDesktop from './desktop'
import FooterPhablet from './phablet'

export const DeveloperLink = ({ developer_link, developer_name } = {}) => (
  <>
    {developer_name &&
      (developer_link ? (
        <a href={developer_link}>{developer_name}</a>
      ) : (
        <span>{developer_name}</span>
      ))}
  </>
)

export { FooterDesktop, FooterPhablet }
export default FooterDesktop
