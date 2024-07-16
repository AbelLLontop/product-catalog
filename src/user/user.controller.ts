import { Controller, Get, Param, Put } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put(':id/assign-role/:roleId')
  async assignRole(
    @Param('id') userId: number,
    @Param('roleId') roleId: number,
  ) {
    return this.userService.assignRol(userId, roleId);
  }
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }
}
