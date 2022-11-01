import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'
import { SequelizeModule, getModelToken } from '@nestjs/sequelize'
import { UserContact } from '../src/application/entities'

describe('UserContactController', () => {
  let app: INestApplication
  let userId: number
  let id: number
  let userContactModel: typeof UserContact

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        SequelizeModule.forFeature([UserContact]),
        AppModule
      ],
    }).compile()

    app = moduleFixture.createNestApplication()
    userContactModel = moduleFixture.get(getModelToken(UserContact))
    await userContactModel.truncate()
    await app.init()
  })

  afterAll(done => done())

  it('/user-contacts (POST)', () => {
    return request(app.getHttpServer())
      .post('/user-contacts')
      .send({
        userId: 1,
        contactId: 2,
        displayFirstName: 'Alfed',
        displayLastName: 'Alinan'
      })
      .then(response => {
        expect(response.body).toBeTruthy()
        expect(response.statusCode).toBe(200)

        userId = response.body.userId
        id = response.body.id
      })
  })

  it('/user-contacts/:user_id (GET)', () => {
    userId = 1
    
    return request(app.getHttpServer())
      .get(`/user-contacts/${userId}`)
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body).toBeTruthy()
        expect(response.body.id).toBeTruthy()
      })
  })

  it('/user-contacts/:user_id/:contact_id (GET)', () => {
    userId = 1
    let contactId = 2

    return request(app.getHttpServer())
      .get(`/user-contacts/${userId}/${contactId}`)
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body).toBeTruthy()
        expect(response.body.hasOwnProperty('id')).toBeTruthy()
      })
  })

  it('/user-contacts/:id (PATCH)', () => {
    return request(app.getHttpServer())
      .patch(`/user-contacts/${id}`)
      .send({
        userId: 1,
        contactId: 2,
        displayFirstName: 'Alfeds',
        displayLastName: 'Alinans'
      })
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body).toBeTruthy()
        expect(typeof response.body[0]).toBe('number')
      })
  })

  it('/user-contacts/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete(`/user-contacts/${id}`)
      .then(response => {
        console.log(response.body)
        expect(response.statusCode).toBe(200)
        expect(response.body).toBeTruthy()
      })
  })
})
