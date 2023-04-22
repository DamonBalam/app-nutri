import { defineStore } from 'pinia'
import { authDataServices } from 'src/services/AuthDataServices'
import { LocalStorage } from 'quasar'
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
    async login (payload: any) {
      try {
        const res = await authDataServices.login(
          payload.email,
          payload.password
        )
        this.setUser(res.data)
        this.setLocalStorage(res.data)
        this.router.push('/perfil')
      } catch (error) {
        console.log(error)
      }
    },
    async logout () {
      try {
        await authDataServices.logout()
        this.user = {}
        this.token = ''
        LocalStorage.remove('user')
        LocalStorage.remove('access_token')
        this.router.push('/login')
      } catch (error) {
        console.log(error)
      }
    }
  }
})
