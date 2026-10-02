import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactMessage } from './entities/contact-message.entity.js';
import { NewsletterSubscription } from './entities/newsletter-subscription.entity.js';
import { VolunteerApplication } from './entities/volunteer-application.entity.js';
import { ContactMessagesController } from './contact-messages.controller.js';
import { NewsletterSubscriptionsController } from './newsletter-subscriptions.controller.js';
import { VolunteerApplicationsController } from './volunteer-applications.controller.js';
import { ContactMessagesService } from './contact-messages.service.js';
import { NewsletterSubscriptionsService } from './newsletter-subscriptions.service.js';
import { VolunteerApplicationsService } from './volunteer-applications.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([ContactMessage, NewsletterSubscription, VolunteerApplication])],
  controllers: [ContactMessagesController, NewsletterSubscriptionsController, VolunteerApplicationsController],
  providers: [ContactMessagesService, NewsletterSubscriptionsService, VolunteerApplicationsService],
})
export class SubmissionsModule {}