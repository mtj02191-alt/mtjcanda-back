import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createObserveModule } from '@nestjs/observe';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ContactMessage } from './submissions/entities/contact-message.entity.js';
import { NewsletterSubscription } from './submissions/entities/newsletter-subscription.entity.js';
import { VolunteerApplication } from './submissions/entities/volunteer-application.entity.js';
import { DonationIntent } from './donations/entities/donation-intent.entity.js';
import { DonationReminder } from './donations/entities/donation-reminder.entity.js';
import { DonationComment } from './donations/entities/donation-comment.entity.js';
import { DonationReport } from './donations/entities/donation-report.entity.js';
import { DonationPopupModule } from './donations/donation-popup.module.js';
import { SubmissionsModule } from './submissions/submissions.module.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres' as const,
        host: configService.getOrThrow<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.getOrThrow<string>('DB_USERNAME'),
        password: configService.getOrThrow<string>('DB_PASSWORD'),
        database: configService.getOrThrow<string>('DB_NAME'),
        entities: [ContactMessage, NewsletterSubscription, VolunteerApplication, DonationIntent, DonationReminder, DonationComment, DonationReport],
        synchronize: configService.get('DB_SYNCHRONIZE', 'false') === 'true',
      }),
    }),
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
    ObserveModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        appKey: configService.get<string>('OBSERVE_APP_KEY', ''),
        appSecret: configService.get<string>('OBSERVE_APP_SECRET', ''),
        serviceId: 'mtj-ca-back',
      }),
    }),
    SubmissionsModule,
    DonationPopupModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
