import request from 'supertest'
import path from 'path'

import App from '../../src/app'
import createToken from '../../src/app/utils/createToken'

let id = ''
const user = {
  _id: '630e1e6157e846fe74e8a0c6'
}
const token = { authorization: `Bearer ${createToken(user)}` }

describe('Routes of product', () => {
  test('route create', async () => {
    const response = await request(App).post('/api/v1/product').send({
      title: 'Azites, Óleos e Vinagres',
      description: 'Óleo de Soja Soya Garrafa 900ml',
      department: 'Congelados',
      brand: 'Soya',
      price: 100.1,
      qtd_stock: 6,
      bar_codes: '9999999999999'
    }).set(token)

    id = response.body._id

    expect(response.status).toBe(201)
  })

  test('route getAll', async () => {
    const response = await request(App).get('/api/v1/product')
      .set(token)

    expect(response.status).toBe(200)
  })

  test('route getById', async () => { // Id
    const response = await request(App).get(`/api/v1/product/${id}`)
      .set(token)

    expect(response.status).toBe(200)
  })

  test('route getByLowStock', async () => {
    const response = await request(App).get('/api/v1/product/low_stock')
      .set(token)

    expect(response.status).toBe(200)
  })

  test('route UpdatePut', async () => { // Id
    const response = await request(App).put(`/api/v1/product/${id}`).send({
      title: 'Água Sanitária',
      description: 'Água Sanitária frasco 1 Litro - Super Candida',
      department: 'Produtos de Limpeza',
      brand: 'Super Candida',
      price: 100.1,
      qtd_stock: 1
    }).set(token)

    expect(response.status).toBe(200)
  })

  test('route UpdatePatch', async () => { // Id
    const response = await request(App).patch(`/api/v1/product/${id}`).send(
      {
        title: 'Beterraba',
        description: 'Beterraba  por kg - Dois Cunhados',
        department: 'Hortifruti',
        brand: 'Dois Cunhados'
      }
    ).set(token)

    expect(response.status).toBe(200)
  })

  test('route getMarketPlace', async () => {
    const response = await request(App).get(`/api/v1/product/marketplace/${id}`)
      .set(token)

    expect(response.status).toBe(200)
  })

  test('route deleteById', async () => { // Id
    const response = await request(App).delete(`/api/v1/product/${id}`)
      .set(token)

    expect(response.status).toBe(204)
  })

  test('route createWithCsv', async () => {
    const response = await request(App).post('/api/v1/product/csv')
      .set(token)
      .attach('csv', path.join(__dirname, '/csv.csv'))

    expect(response.status).toBe(201)
  })
})
