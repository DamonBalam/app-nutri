import { defineStore } from 'pinia'
import { authDataServices } from 'src/services/AuthDataService'
import { Cookies } from 'quasar'
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
      /* Cookies */
      Cookies.set('user', payload.user)
      Cookies.set('access_token', payload.token)
    },
    setLocalStorageWithTime (payload: any) {
      /* Cookies */
      Cookies.set('user', payload.user, {
        expires: 100
      })
      Cookies.set('access_token', payload.token, {
        expires: 100
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
    deleteLocalStorage () {
      this.user = {}
      this.token = ''
      Cookies.remove('user')
      Cookies.remove('access_token')
      this.router.push('/login')
    }
  }
})
