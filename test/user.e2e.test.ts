import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { User } from './../src/application/entities';
import { Repository } from 'typeorm';

describe('UserController', () => {
  let app: INestApplication
  let id: number
  let userRepository: Repository<User>

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forFeature([User]),
        AppModule
      ],
    }).compile()

    app = moduleFixture.createNestApplication()
    userRepository = moduleFixture.get(getRepositoryToken(User))
    await userRepository.clear()
    await app.init()
  })

  afterAll(done => done())

  it('/users (POST)', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({
        email: 'alfed@email.com',
        password: '1234',
        name: 'Alfed'
      })
      .then(response => {
        expect(response.body).toBeTruthy()
        expect(response.statusCode).toBe(200)

        id = response.body.id
      })
  })

  it('/users (GET)', () => {
    return request(app.getHttpServer())
        .get('/users')
        .then(response => {
            expect(response.body.length).toBeGreaterThanOrEqual(1)
            expect(response.statusCode).toBe(200)
        })
  })

  it('/users/{id} (GET)', () => {
    return request(app.getHttpServer())
        .get(`/users/${id}`)
        .then(response => {
            expect(response.statusCode).toBe(200)
            expect(response.body).toBeTruthy()
        })
  })

  it('/users/{id} (PATCH)', () => {
    return request(app.getHttpServer())
        .patch(`/users/${id}`)
        .send({
            email: 'alfed3@email.com',
            password: '12344564',
            name: 'Alfed3'
        })
        .then(response => {
            expect(response.body.affected).toBe(1)
            expect(response.statusCode).toBe(200)
        })
  })

  it('/users/{id} (DELETE)', () => {
    return request(app.getHttpServer())
        .delete(`/users/${id}`)
        .then(response => {
            expect(response.body.affected).toBe(1)
            expect(response.statusCode).toBe(200)
        })
  })
})
