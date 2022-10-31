import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'
import { SequelizeModule, getModelToken } from '@nestjs/sequelize'
import { UserRegister } from '../src/application/entities'

describe('UserRegisterController', () => {
  let app: INestApplication
  let userId: number
  let userRegisterModel: typeof UserRegister

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        SequelizeModule.forFeature([UserRegister]),
        AppModule
      ],
    }).compile()

    app = moduleFixture.createNestApplication()
    userRegisterModel = moduleFixture.get(getModelToken(UserRegister))
    await userRegisterModel.truncate()
    await app.init()
  })

  afterAll(done => done())

  it('/user-registers (POST)', () => {
    return request(app.getHttpServer())
      .post('/user-registers')
      .send({
        userId: 1,
        registerId: 'abcdef-123456-xxxx',
        ipAddress: '115.33.114.89'
      })
      .then(response => {
        expect(response.body).toBeTruthy()
        expect(response.statusCode).toBe(200)

        userId = response.body.userId
      })
  })

  it('/user-registers/user-id/{user-id} (GET)', () => {
    return request(app.getHttpServer())
        .get(`/user-registers/user-id/${userId}`)
        .then(response => {
            expect(response.statusCode).toBe(200)
            expect(response.body).toBeTruthy()
        })
  })

  it('/user-registers/user-id/{user-id} (PATCH)', () => {
    return request(app.getHttpServer())
        .patch(`/user-registers/user-id/${userId}`)
        .send({
            email: 'alfed3@email.com',
            password: '12344564',
            name: 'Alfed3'
        })
        .then(response => {
            expect(response.statusCode).toBe(200)
        })
  })

  it('/user-registers/user-id/{user-id} (DELETE)', () => {
    return request(app.getHttpServer())
        .delete(`/user-registers/user-id/${userId}`)
        .then(response => {
            expect(response.statusCode).toBe(200)
        })
  })
})
