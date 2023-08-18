import { defineStore } from 'pinia'
import { authDataServices } from 'src/services/AuthDataService'
import { CapacitorCookies } from '@capacitor/core'
export const useAuthStore = defineStore('auth', {
  state: () => ({
    counter: 0,
    user: {},
    token: ''
  }),

  getters: {
    isAuth: state => state.token !== '',
    getUser: state => state.user
  },

  actions: {
    setUser (payload: any) {
      this.user = payload.user
      this.token = payload.token
    },
    async setLocalStorage (payload: any) {
      // /* Cookies */
      await CapacitorCookies.setCookie({
        key: 'user',
        value: payload.user
      })
      await CapacitorCookies.setCookie({
        key: 'access_token',
        value: payload.token
      })
    },
    async setLocalStorageWithTime (payload: any) {
      /* Cookies */
      await CapacitorCookies.setCookie({
        key: 'user',
        value: payload.user,
        expires: '100'
      })
      await CapacitorCookies.setCookie({
        key: 'access_token',
        value: payload.token,
        expires: '100'
      })
    },
    login (payload: any) {
      this.setUser(payload)
      this.setLocalStorage(payload)
      this.router.push('/perfil')
    },
    loginWithCookies (payload: any) {
      this.setUser(payload)
      this.setLocalStorageWithTime(payload)
      this.router.push('/perfil')
    },
    async logout () {
      try {
        await authDataServices.logout()
        this.deleteLocalStorage()
      } catch (error) {
        console.log(error)
      }
    },
    async deleteLocalStorage () {
      this.user = {}
      this.token = ''
      await CapacitorCookies.clearAllCookies()
      this.router.push('/login')
    }
  }
})
