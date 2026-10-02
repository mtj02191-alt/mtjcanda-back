import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NewsletterSubscriptionsService } from './newsletter-subscriptions.service.js';
import { CreateNewsletterSubscriptionDto, UpdateNewsletterSubscriptionDto } from './dto/newsletter-subscription.dto.js';

@ApiTags('newsletter-subscriptions')
@Controller('newsletter-subscriptions')
export class NewsletterSubscriptionsController {
  constructor(private readonly service: NewsletterSubscriptionsService) {}
  @Get() findAll() { return this.service.findAll(); }
  @Get(':id') findOne(@Param('id', ParseIntPipe) id: number) { return this.service.findOne(id); }
  @Post() create(@Body() dto: CreateNewsletterSubscriptionDto) { return this.service.create(dto); }
  @Patch(':id') update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateNewsletterSubscriptionDto) { return this.service.update(id, dto); }
  @Delete(':id') remove(@Param('id', ParseIntPipe) id: number) { return this.service.remove(id); }
}