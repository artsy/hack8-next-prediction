import { Theme } from '@artsy/palette'
import '../styles.css'

export default function App({ Component, pageProps }) {
  return (
    <Theme>
      <Component {...pageProps} />
    </Theme>
  )
}
