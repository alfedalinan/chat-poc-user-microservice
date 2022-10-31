import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken, SequelizeModule } from '@nestjs/sequelize'
import { UserRegisterService } from '../src/application/services';
import { UserRegister } from '../src/application/entities';
import { AppModule } from '../src/app.module';

describe('UserRegisterService', () => {
  let service: UserRegisterService
  let id: number
  let userId: number
  let userRegisterModel: typeof UserRegister

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        SequelizeModule.forFeature([UserRegister]),
        AppModule
      ],
      providers: [
        UserRegisterService
      ]
    }).compile()

    service = module.get(UserRegisterService)
    userRegisterModel = module.get<typeof UserRegister>(getModelToken(UserRegister))
    await userRegisterModel.truncate()
  })

  afterAll(done => {
    done()
  })

  it('Create User Register', async () => {
    const userRegister = await service.create({
      userId: 1,
      registerId: 'abcdef-123456-xxxx',
      ipAddress: '115.33.114.89'
    })
    
    id = userRegister.id
    userId = userRegister.userId

    expect(userRegister).toBeTruthy()
    expect(userRegister.hasOwnProperty('id')).toBe(true)
    expect(userRegister.hasOwnProperty('registerId')).toBe(true)
    expect(userRegister.hasOwnProperty('userId')).toBe(true)
  })

  it('Get User Register by User ID', async () => {
    const userRegister = await service.getByUserId(userId)

    expect(userRegister.userId).toBeTruthy()
    expect(userRegister.registerId).toBeTruthy()
  })

  it('Update User Register by User ID', async () => {
    const userRegister = {
      registerId: 'abcdef-123456-xxxy'
    }

    const updated = await service.updateByUserId(userId, userRegister)

    expect(updated.length).toBeGreaterThanOrEqual(0)
    expect(typeof updated[0]).toBe('number')
  })

  it('Remove User by User ID', async () => {
    const removed = await service.removeByUserId(userId)

    expect(removed).toBeTruthy()
    expect(typeof removed).toBe('number')
  })

});
