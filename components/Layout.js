import { TopBanner } from './TopBanner'

const Layout = props => {


  return (
    <div>

      <div className="top-banner">
        <TopBanner />
      </div>
      <div className="layout" >
        <div className='content'>
          { props.children }
        </div>

      </div>

      <style jsx global>{ `
      html {
        box-sizing: border-box;
      }

      *,
      *:before,
      *:after {
        box-sizing: inherit;
      }

      body {
        margin: 0;
        padding: 0;
        font-size: 16px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
          Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
          'Segoe UI Symbol';
        background: rgba(0, 0, 0, 0.05);
      }
      .top-banner {
        background: '#fff',
        boxShadow: '0 0 2px #ccc',
      }

      .fab {
        position: fixed;
        bottom: 40px;
        right: 100px;
      }

      input,
      textarea {
        font-size: 16px;
      }

      button {
        cursor: pointer;
      }
      
      p {
        margin: 0px;
      }
    `}</style>
    </div>
  )
}

export default Layout
