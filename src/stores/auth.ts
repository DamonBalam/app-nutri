import { defineStore } from 'pinia'
import { authDataServices } from 'src/services/AuthDataService'
import { Preferences } from '@capacitor/preferences'
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
      await Preferences.set({
        key: 'user',
        value: JSON.stringify(payload.user)
      })
      await Preferences.set({
        key: 'access_token',
        value: JSON.stringify(payload.token)
      })
    },
    login (payload: any) {
      this.setUser(payload)
      this.setLocalStorage(payload)
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
      this.router.push('/login')
      await Preferences.remove({ key: 'user' })
      await Preferences.remove({ key: 'access_token' })
    }
  }
})
