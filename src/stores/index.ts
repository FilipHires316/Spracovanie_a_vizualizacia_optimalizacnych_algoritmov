import {defineStore} from '#q-app/wrappers'
import {createPinia} from 'pinia'

declare module 'pinia' {
}

export default defineStore((/* { ssrContext } */) => {
  return createPinia()
})
