import { defineStore } from 'pinia'
import { authDataServices } from 'src/services/AuthDataService'
import { LocalStorage, SessionStorage } from 'quasar'
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
    setLocalStorage (payload: any) {
      LocalStorage.set('user', JSON.stringify(payload.user))
      LocalStorage.set('access_token', payload.token)
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
    deleteLocalStorage () {
      this.user = {}
      this.token = ''
      LocalStorage.remove('user')
      LocalStorage.remove('access_token')
      this.router.push('/login')
    }
  }
})
