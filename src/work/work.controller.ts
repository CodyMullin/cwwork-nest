import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { WorkService } from './work.service';
import { User } from '../auth/user.entity';
import { Work } from './work.entity';
import { Post, ValidationPipe } from '@nestjs/common';
import { CreateWorkDto } from './dto/create-work.dto';

@Controller('work')
@UseGuards(AuthGuard())
export class WorkController {
  constructor(private workService: WorkService) {}

  @Get()
  getWork(
    @GetUser()
    user: User,
  ): Promise<Work[]> {
    return this.workService.getWorks(user);
  }

  @Get('/:id')
  getWorkById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Work> {
    return this.workService.getWorkById(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createWork(
    @Body() createWorkDto: CreateWorkDto,
    @GetUser() user: User,
  ): Promise<Work> {
    return this.workService.createWork(createWorkDto, user);
  }

  @Delete('/:id')
  deleteWork(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.workService.deleteWork(id, user);
  }
}
