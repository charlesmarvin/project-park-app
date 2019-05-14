import App from './App.svelte'

const app = new App({
  target: document.body,
  props: {
    env: 'DEV'
  }
})

export default app
