import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ContactMessagesService } from './contact-messages.service.js';
import { CreateContactMessageDto, UpdateContactMessageDto } from './dto/contact-message.dto.js';

@ApiTags('contact-messages')
@Controller('contact-messages')
export class ContactMessagesController {
  constructor(private readonly service: ContactMessagesService) {}
  @Get() findAll() { return this.service.findAll(); }
  @Get(':id') findOne(@Param('id', ParseIntPipe) id: number) { return this.service.findOne(id); }
  @Post() create(@Body() dto: CreateContactMessageDto) { return this.service.create(dto); }
  @Patch(':id') update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateContactMessageDto) { return this.service.update(id, dto); }
  @Delete(':id') remove(@Param('id', ParseIntPipe) id: number) { return this.service.remove(id); }
}