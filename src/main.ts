import { mount } from 'svelte'
import './app.css'
import App from './App.svelte'
import { init } from './lib/core/stores/themeStore'

if (
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches
) {
  document.documentElement.classList.add('dark');
}

init();

const app = mount(App, {
  target: document.getElementById('app') as HTMLElement,
})

export default app
