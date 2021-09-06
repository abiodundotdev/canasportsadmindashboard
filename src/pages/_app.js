//import '../styles/globals.css'
//import '../styles/searbox.css'

import 'bootstrap/dist/css/bootstrap.css'
import '../styles/main.css'
import '../styles/all.css'
import '../styles/theme1.css'
import '../styles/Calendar.css'
import '../styles/DatePicker.css'
import 'react-toastify/dist/ReactToastify.css';
import NextNProgress from 'nextjs-progressbar'
import {SWRConfig} from 'swr'
import User from '../services/User'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import authReducer from '../services/redux/reducers'

function MyApp({ Component, pageProps }) {
  const store = createStore(authReducer)
  return (
  <> 

  {
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  }
<Provider store={store}>
 <NextNProgress color="#A42"
  startPosition={0.3}
  stopDelayMs={100}
  height="3" />

<SWRConfig value={{fetcher : (url) => User.getServerData(url).then( (response) => response.data)}}>
  <Component {...pageProps} />
</SWRConfig>
</Provider>
  </>
    )
}

export default MyApp
