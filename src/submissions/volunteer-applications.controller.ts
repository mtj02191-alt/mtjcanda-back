import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { VolunteerApplicationsService } from './volunteer-applications.service.js';
import { CreateVolunteerApplicationDto, UpdateVolunteerApplicationDto } from './dto/volunteer-application.dto.js';

@ApiTags('volunteer-applications')
@Controller('volunteer-applications')
export class VolunteerApplicationsController {
  constructor(private readonly service: VolunteerApplicationsService) {}
  @Get() findAll() { return this.service.findAll(); }
  @Get(':id') findOne(@Param('id', ParseIntPipe) id: number) { return this.service.findOne(id); }
  @Post() create(@Body() dto: CreateVolunteerApplicationDto) { return this.service.create(dto); }
  @Patch(':id') update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateVolunteerApplicationDto) { return this.service.update(id, dto); }
  @Delete(':id') remove(@Param('id', ParseIntPipe) id: number) { return this.service.remove(id); }
}