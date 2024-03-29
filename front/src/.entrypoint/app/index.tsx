import '../../styles/tailbase.css'
import '../../styles/tailwind.css'
import '../../styles/index.css'
import '../../assets/preloader.css'

import { LocalToken } from '@strum/common'
import Root from './Root'
import { URLs } from '../../config/url'
import { initializeTokenLink } from '../../apollo'
import { render } from 'react-dom'
import { updateTokenByAuthenticate } from '../../controllers/account'

// import * as Amplitude from '@amplitude/node';


// export const amplitute = Amplitude.init('fd71c6df841abfa0074fdbc08efe8d4b');

function renderApp() {
  render(<Root />, document.getElementById('app'))

  if ((module as any).hot) {
    (module as any).hot.accept('./Root', () => {
      // eslint-disable-next-line global-require
      const NextRoot = require('./Root').default
      render(
        <NextRoot />,
        document.getElementById('app'),
      )
    })
  }
}


const closeSlash = () => {
  const preloader: HTMLElement | null = document.getElementById('preloader')
  preloader && preloader.remove()
}

const entry = async () => {
  await updateTokenByAuthenticate()
  initializeTokenLink()

  closeSlash()
  console.log('Initialized 😽')
  renderApp()
  console.log('Render started 😽 :)')
}

// Here is the entry point of this application
entry()


// amplitute.logEvent({
//   event_type: 'Node.js Event',
//   user_id: 'datamonster@gmail.com',
//   location_lat: 37.77,
//   location_lng: -122.39,
//   ip: '127.0.0.1',
//   event_properties: {
//     keyString: 'valueString',
//     keyInt: 11,
//     keyBool: true
//   }
// });