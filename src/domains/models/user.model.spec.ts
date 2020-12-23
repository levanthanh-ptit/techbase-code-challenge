import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { IUser, Role, User } from './user.model';

describe('User', () => {
  let userRepository: UserRepository;

  beforeEach(() => {
    userRepository = User;
  });

  describe('create', () => {
    it('should create correctly', async () => {
      const date = new Date();
      const result: IUser = {
        id: 1,
        email: '1',
        name: '1',
        role: Role.User,
        hashPassword: '1',
        createdAt: date,
        updatedAt: date,
      };
      const mockStaticFunc = jest.fn();
      mockStaticFunc.mockReturnValue(result);
      userRepository.create = mockStaticFunc;

      expect(
        await userRepository.create({
          email: result.email,
          name: result.name,
          role: result.role,
          hashPassword: result.hashPassword,
        }),
      ).toBe(result);
    });
  });
});
