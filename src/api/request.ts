import { VueRouter } from 'vue-router/types/router'

export class AuthRequestManager {
  router: VueRouter | undefined
  readonly baseUrl: string

  constructor (router: VueRouter | undefined) {
    this.router = router
    this.baseUrl = 'http://localhost:4567/api/v1'
  }

  async go (path: string, options?: any): Promise<Response | null> {
    try {
      const res = await fetch(`${this.baseUrl}/${path}`, options)
      if (res.status == 401) await this.router?.replace('/')
      return res
    } catch (e) {
      await this.router?.replace('/')
      return null
    }
  }
}
