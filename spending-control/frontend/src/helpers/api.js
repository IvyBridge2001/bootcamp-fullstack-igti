import axios from 'axios'

class API {
  constructor() {
    this.port = process.env.REACT_APP_PORT || 3001
    this.api = axios.create({
      baseURL: `http://localhost:${this.port}`
    })
  }

  async index(yearMonth) {
    const { data } = await this.api.get(`/index/${yearMonth}`)

    return data
  }

  async distinctYearsMonths() {
    const { data } = await this.api.get(`/distinct-years-months`)

    return data
  }

  async create(transaction) {
    const { data } = await this.api.post('/', transaction)

    return data
  }

  async update(transaction) {
    const { data } = await this.api.put('/', transaction)

    return data
  }

  async delete(id) {
    const { data } = await this.api.delete(`/${id}`)

    return data
  }
}

export default API
