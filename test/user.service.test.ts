import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken, SequelizeModule } from '@nestjs/sequelize'
import { UserService } from '../src/application/services';
import { User } from '../src/application/entities';
import { AppModule } from '../src/app.module';

describe('UserService', () => {
  let service: UserService
  let id: number
  let userModel: typeof User

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        SequelizeModule.forFeature([User]),
        AppModule
      ],
      providers: [
        UserService
      ]
    }).compile()

    service = module.get(UserService)
    userModel = module.get<typeof User>(getModelToken(User))
    await userModel.truncate()
  })

  afterAll(done => {
    done()
  })

  it('Create User', async () => {
    const user = await service.create({
      username: 'alfed.alinan',
      email: 'alfed.alinan@gmail.com',
      password: 'someKindOfPassword'
    })
    
    id = user.id

    expect(user).toBeTruthy()
    expect(user.hasOwnProperty('id')).toBe(true)
    expect(user.hasOwnProperty('username')).toBe(true)
    expect(user.hasOwnProperty('email')).toBe(true)
  })

  it('Get All User', async () => {
    const users = await service.findAll()
    expect(users.length).toBeGreaterThanOrEqual(1)
  })

  it('Find User By Id', async() => {
    const user = await service.findOne(id)
    expect(typeof user).toBe('object')
    expect(user.hasOwnProperty('id')).toBe(true)
    expect(user.hasOwnProperty('username')).toBe(true)
    expect(user.hasOwnProperty('email')).toBe(true)
  })

  it('Update User', async() => {
    const result = await service.update(id, {
      username: 'alfed.alinan2',
      email: 'alfed.alinan2@gmail.com',
      password: 'someKindOfPassword2'
    })

    expect(result).toBeTruthy()
  })

  it('Delete User', async () => {
    const result = await service.remove(id)

    expect(result).toBeTruthy()
  })
});
