import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { GetRoomFilterDto } from './dto/get-room-filter.dto';
import { Room } from './room.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { RoomsService } from './rooms.service';

@Controller('rooms')
@UseGuards(AuthGuard())
export class RoomsController {
  constructor(private roomsService: RoomsService) {}

  @Get()
  getRooms(
    @Query(ValidationPipe) filterDto: GetRoomFilterDto,
    @GetUser() user: User,
  ): Promise<Room[]> {
    return this.roomsService.getRooms(filterDto, user);
  }

  @Get('/:id')
  getRoomById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Room> {
    return this.roomsService.getRoomById(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createRoom(
    @Body() createRoomDto: CreateRoomDto,
    @GetUser() user: User,
  ): Promise<Room> {
    return this.roomsService.createRoom(createRoomDto, user);
  }

  @Delete('/:id')
  deleteRoom(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.roomsService.deleteRoom(id, user);
  }

  //   @Patch('/:id/update')
  //   updateMaterial(
  //     @Param('id', ParseIntPipe) id: number,
  //     @Body('name') name: string,
  //     @Body('description') description: string,
  //     @Body('salesCost') salesCost: string,
  //     @Body('purchaseCost') purchaseCost: string,
  //     @Body('installCost') installCost: string,
  //     @Body('category') category: string,
  //     @Body('measurement') measurement: string,
  //     @Body('active', MaterialActiveValidationPipe) active: MaterialStatus,
  //     @GetUser() user: User,
  //   ): Promise<Material> {
  //     return this.materialsService.updateMaterial(
  //       id,
  //       name,
  //       description,
  //       salesCost,
  //       purchaseCost,
  //       installCost,
  //       category,
  //       measurement,
  //       active,
  //       user,
  //     );
  //   }
}
