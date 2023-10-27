import { defineStore } from 'pinia'
import { authDataServices } from 'src/services/AuthDataService'
import { Plugins } from '@capacitor/core'

const { Storage } = Plugins

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
      await Storage.set({
        key: 'user',
        value: JSON.stringify(payload.user)
      })

      await Storage.set({
        key: 'access_token',
        value: payload.token
      })
    },
    async setLocalStorageWithTime (payload: any) {
      /* Cookies */
      await Storage.set({
        key: 'user',
        value: JSON.stringify(payload.user)
      })

      await Storage.set({
        key: 'access_token',
        value: payload.token
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
      await Storage.clear()
      this.router.push('/login')
    }
  }
})
