import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken, SequelizeModule } from '@nestjs/sequelize'
import { UserContactService } from '../src/application/services';
import { User, UserContact } from '../src/application/entities';
import { AppModule } from '../src/app.module';

describe('UserContactService', () => {
  let service: UserContactService
  let userId: number
  let userContactModel: typeof UserContact

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        SequelizeModule.forFeature([User, UserContact]),
        AppModule
      ],
      providers: [
        UserContactService
      ]
    }).compile()

    service = module.get(UserContactService)
    userContactModel = module.get<typeof UserContact>(getModelToken(UserContact))
    await userContactModel.truncate()
  })

  afterAll(done => {
    done()
  })

  it('Create User Contact', async () => {
    const userContact = await service.create({
        userId: 1,
        contactId: 2,
        displayFirstName: 'Alfed',
        displayLastName: 'Alinan'
    })
    
    userId = userContact.userId

    expect(userContact).toBeTruthy()
    expect(userContact.hasOwnProperty('id')).toBe(true)
    expect(typeof userContact.id).toBe('number')
  })
  
  it('List Contacts By User Id', async () => {
    let userId = 1
    const user = await service.getByUserId(userId)

    expect(user).toBeTruthy()
    expect(typeof user.id).toBe('number')
  })

  it('Get Single Contact By User ID and Contact ID', async () => {
    let userId = 1
    let contactId = 2
    const userContact = await service.getOne(userId, contactId)

    expect(userContact).toBeTruthy()
    expect(userContact.id).toBeTruthy()
  })

  it('Update Contact', async () => {
    let id = 1
    const updated = await service.update(id, {
        contactId: 2,
        userId: id,
        displayFirstName: 'Alfeda',
        displayLastName: 'Alinana'
    })

    expect(updated).toBeTruthy()
    expect(updated.length).toBeGreaterThanOrEqual(1)
  })

  it('Remove Contact', async () => {
    let id = 1
    const removed = await service.remove(id)

    expect(removed).toBeTruthy()
    expect(typeof removed).toBe('number')
  })
});
