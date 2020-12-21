import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseArrayPipe,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiParam,
  ApiOkResponse,
} from '@nestjs/swagger';
import { Op, Order, WhereOptions } from 'sequelize';

import {
  UserRepository,
  UserRepositoryBindingKey,
} from '../../infrastructure/repositories/user.repository';
import { Role, User } from '../../domains/models/user.model';
import { AccountService } from '../services/account.service';
import { AccountTokenService, Auth } from '../services/authentication';
import {
  BasicLogin,
  UserCreator,
  UserPublicData,
  UserWithToken,
} from '../dtos/user.dtos';
import { CurrentUser } from '../services/current-user.decorator';
import { ApiArrayParam, ApiFilterEnhance, FilterOrder } from '../utils/swagger';

@Controller('user')
@ApiTags('user')
@ApiBearerAuth()
export class UserController {
  constructor(
    @Inject(UserRepositoryBindingKey)
    private userRepository: UserRepository,
    private accountService: AccountService,
    private accountTokenService: AccountTokenService,
  ) {}

  @Post('')
  @ApiBody({
    type: UserCreator,
  })
  @ApiCreatedResponse({
    type: UserWithToken,
  })
  async create(@Body() body: UserCreator): Promise<User> {
    if (await this.accountService.checkUserExisted(body))
      throw new HttpException('account_existed', HttpStatus.BAD_REQUEST);
    const user = await this.accountService.buildUser(body);
    return user.save();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/basic-sign-up')
  @ApiBody({
    type: UserCreator,
  })
  @ApiCreatedResponse({
    type: UserWithToken,
  })
  async signup(@Body() body: UserCreator): Promise<UserWithToken> {
    if (await this.accountService.checkUserExisted(body))
      throw new HttpException('account_existed', HttpStatus.BAD_REQUEST);
    const user = await (
      await this.accountService.buildUser({
        ...body,
        role: Role.User,
      })
    ).save();
    const token = this.accountTokenService.generateToken({
      id: user.id,
    });
    return {
      ...user.getUserPublicData(),
      token,
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/basic-sign-in')
  @ApiBody({
    type: BasicLogin,
  })
  @ApiCreatedResponse({
    type: UserWithToken,
  })
  async signIn(
    @Body() { email, password }: BasicLogin,
  ): Promise<UserWithToken> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });
    if (!this.accountService.verifiedPassword(user, password)) {
      throw new HttpException('wrong_password', HttpStatus.BAD_REQUEST);
    }
    const token = this.accountTokenService.generateToken({
      id: user.id,
    });
    return {
      ...user.getUserPublicData(),
      token,
    };
  }

  @Get()
  @ApiFilterEnhance(User)
  @ApiOkResponse({
    type: UserPublicData,
    isArray: true,
  })
  findAll(
    @Query('where')
    where?: WhereOptions,
    @Query('limit')
    limit = 5,
    @Query('offset')
    offset = 0,
    @FilterOrder()
    order?: Order,
  ) {
    return this.userRepository.findAll({ where, limit, offset, order });
  }

  @Auth('AUTHENTICATED')
  @Get('/me')
  @ApiOkResponse({
    type: UserPublicData,
  })
  async findMy(@CurrentUser() currentUser: User): Promise<UserPublicData> {
    const user = await this.userRepository.findOne({
      where: { id: currentUser.id },
    });
    return user;
  }

  @Auth('AUTHENTICATED')
  @Get('/:id')
  @ApiArrayParam({
    name: 'id',
    type: 'number',
  })
  @ApiOkResponse({
    type: UserPublicData,
  })
  async findById(
    @Param(
      'id',
      new ParseArrayPipe({
        items: Number,
      }),
    )
    ids: number[],
  ): Promise<User[]> {
    const user = await this.userRepository.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    });
    return user;
  }

  @Auth('AUTHENTICATED')
  @Patch('/me')
  @ApiParam({
    name: 'id',
    type: String,
  })
  @ApiOkResponse({
    type: UserPublicData,
  })
  async updateMe(
    @CurrentUser() currentUser: User,
    @Param('id') qId: number | 'me',
  ): Promise<UserPublicData> {
    const id = qId === 'me' ? currentUser.id : qId;
    const user = await this.userRepository.findOne({
      where: { id },
    });
    return user.getUserPublicData();
  }
}
