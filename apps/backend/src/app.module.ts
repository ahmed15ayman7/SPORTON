import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { WebsocketModule } from './websocket/websocket.module';
import { CartModule } from './modules/cart/cart.module';
import { ScoutingReportModule } from './modules/scouting-report/scouting-report.module';
import { RoomsModule } from './modules/rooms/rooms.module';
import { MaintenanceScheduleModule } from './modules/maintenance-schedule/maintenance-schedule.module';
import { EventSponsorsModule } from './modules/event-sponsors/event-sponsors.module';
import { EventImagesModule } from './modules/event-images/event-images.module';
import { CertificatesModule } from './modules/certificates/certificates.module';
import { CampaignAnalyticsModule } from './modules/campaign-analytics/campaign-analytics.module';
import { AgentsModule } from './modules/agents/agents.module';
import { PlayersModule } from './modules/players/players.module';
import { FriendshipsModule } from './modules/friendships/friendships.module';
import { ContentScoreModule } from './modules/content-score/content-score.module';
import { ContentAnalyticsModule } from './modules/content-analytics/content-analytics.module';
import { AdAnalyticsModule } from './modules/ad-analytics/ad-analytics.module';
import { AdvertisementsModule } from './modules/advertisements/advertisements.module';
import { AdTargetingModule } from './modules/ad-targeting/ad-targeting.module';
import { AthleteMetricsModule } from './modules/athlete-metrics/athlete-metrics.module';
import { TrainingScheduleModule } from './modules/training-schedule/training-schedule.module';
import { PlayerDiscoveryModule } from './modules/player-discovery/player-discovery.module';
import { CommissionModule } from './modules/commission/commission.module';
import { TransferModule } from './modules/transfer/transfer.module';
import { AgentClientModule } from './modules/agent-client/agent-client.module';
import { TournamentModule } from './modules/tournament/tournament.module';
import { TeamCategoryModule } from './modules/team-category/team-category.module';
import { FacilityModule } from './modules/facility/facility.module';
import { LicenseModule } from './modules/license/license.module';
import { InjuryModule } from './modules/injury/injury.module';
import { ContractModule } from './modules/contract/contract.module';
import { CoachingHistoryModule } from './modules/coaching-history/coaching-history.module';
import { PlayerStatisticsModule } from './modules/player-statistics/player-statistics.module';
import { AddressModule } from './modules/address/address.module';
import { StreamingInfoModule } from './modules/streaming-info/streaming-info.module';
import { NotificationActionModule } from './modules/notification-action/notification-action.module';
import { NotificationGroupModule } from './modules/notification-group/notification-group.module';
import { NotificationLogModule } from './modules/notification-log/notification-log.module';
import { NotificationTemplateModule } from './modules/notification-template/notification-template.module';
import { NotificationSettingsModule } from './modules/notification-settings/notification-settings.module';
import { SocialMediaModule } from './modules/social-media/social-media.module';
import { ProfessionalAchievementModule } from './modules/professional-achievement/professional-achievement.module';
// import { CouponModule } from './modules/coupon/coupon.module';
// import { WishlistModule } from './modules/wishlist/wishlist.module';
import { ReviewModule } from './modules/review/review.module';
import { NotificationModule } from './modules/notification/notification.module';
// import { RefundModule } from './modules/refund/refund.module';
// import { ShippingModule } from './modules/shipping/shipping.module';
import { OrderItemModule } from './modules/order-item/order-item.module';
import { OrderModule } from './modules/order/order.module';
import { DiscountModule } from './modules/discount/discount.module';
import { ProductReviewModule } from './modules/product-review/product-review.module';
import { ProductVariantModule } from './modules/product-variant/product-variant.module';
import { ProductImageModule } from './modules/product-image/product-image.module';
import { ProductCategoryModule } from './modules/product-category/product-category.module';
import { ProductModule } from './modules/product/product.module';
import { OptimizationLogModule } from './modules/optimization-log/optimization-log.module';
import { ABTestModule } from './modules/ab-test/ab-test.module';
import { UserSegmentModule } from './modules/user-segment/user-segment.module';
import { TargetingPerformanceModule } from './modules/targeting-performance/targeting-performance.module';
import { EngagementMetricsModule } from './modules/engagement-metrics/engagement-metrics.module';
import { UserBehaviorsModule } from './modules/user-behaviors/user-behaviors.module';
import { ReportsModule } from './modules/reports/reports.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { SubscriptionsModule } from './modules/subscriptions/subscriptions.module';
import { PerformanceReportsModule } from './modules/performance-reports/performance-reports.module';
import { CompetitionsModule } from './modules/competitions/competitions.module';
import { CompetitionRoundsModule } from './modules/competition-rounds/competition-rounds.module';
import { CompetitionParticipantsModule } from './modules/competition-participants/competition-participants.module';
import { TrainingCategoriesModule } from './modules/training-categories/training-categories.module';
import { TrainingReviewsModule } from './modules/training-reviews/training-reviews.module';
import { EventParticipantsModule } from './modules/event-participants/event-participants.module';
import { PrizesModule } from './modules/prizes/prizes.module';
import { EventAgendaModule } from './modules/event-agenda/event-agenda.module';
import { EventCategoriesModule } from './modules/event-categories/event-categories.module';
import { CampaignsModule } from './modules/campaigns/campaigns.module';
import { CommentsModule } from './modules/comments/comments.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ArticlesModule } from './modules/articles/articles.module';
import { AvailabilitiesModule } from './modules/availabilities/availabilities.module';
import { EndorsementsModule } from './modules/endorsements/endorsements.module';
import { TeamMembersModule } from './modules/team-members/team-members.module';
import { TeamsModule } from './modules/teams/teams.module';
import { EducationModule } from './modules/education/education.module';
import { ExperiencesModule } from './modules/experiences/experiences.module';
import { SponsorshipsModule } from './modules/sponsorships/sponsorships.module';
import { StatisticsModule } from './modules/statistics/statistics.module';
import { TrainingVideosModule } from './modules/training-videos/training-videos.module';
import { TrainingsModule } from './modules/trainings/trainings.module';
import { RoomUsersModule } from './modules/room-users/room-users.module';
import { MessagesModule } from './modules/messages/messages.module';
import { ReactionsModule } from './modules/reactions/reactions.module';
import { PostsModule } from './modules/posts/posts.module';
import { BlockListsModule } from './modules/block-lists/block-lists.module';
import { MatchesModule } from './modules/matches/matches.module';
import { JobApplicationsModule } from './modules/job-applications/job-applications.module';
import { JobsModule } from './modules/jobs/jobs.module';
import { AchievementsModule } from './modules/achievements/achievements.module';
import { SkillsModule } from './modules/skills/skills.module';
import { CompaniesModule } from './modules/companies/companies.module';
import { ScoutsModule } from './modules/scouts/scouts.module';
import { ClubsModule } from './modules/clubs/clubs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([{
      ttl: 60,
      limit: 10,
    }]),
    PrismaModule,
    AuthModule,
    UsersModule,
    WebsocketModule,
    CartModule,
    ScoutingReportModule,
    RoomsModule,
    MaintenanceScheduleModule,
    EventSponsorsModule,
    EventImagesModule,
    CertificatesModule,
    CampaignAnalyticsModule,
    AgentsModule,
    PlayersModule,
    FriendshipsModule,
    ContentScoreModule,
    ContentAnalyticsModule,
    AdAnalyticsModule,
    AdvertisementsModule,
    AdTargetingModule,
    AthleteMetricsModule,
    TrainingScheduleModule,
    PlayerDiscoveryModule,
    CommissionModule,
    TransferModule,
    AgentClientModule,
    TournamentModule,
    TeamCategoryModule,
    FacilityModule,
    LicenseModule,
    InjuryModule,
    ContractModule,
    CoachingHistoryModule,
    PlayerStatisticsModule,
    AddressModule,
    StreamingInfoModule,
    NotificationActionModule,
    NotificationGroupModule,
    NotificationLogModule,
    NotificationTemplateModule,
    NotificationSettingsModule,
    SocialMediaModule,
    ProfessionalAchievementModule,
    // CouponModule,
    // WishlistModule,
    ReviewModule,
    NotificationModule,
    // RefundModule,
    // ShippingModule,
    OrderItemModule,
    OrderModule,
    DiscountModule,
    ProductReviewModule,
    ProductVariantModule,
    ProductImageModule,
    ProductCategoryModule,
    ProductModule,
    OptimizationLogModule,
    ABTestModule,
    UserSegmentModule,
    TargetingPerformanceModule,
    EngagementMetricsModule,
    UserBehaviorsModule,
    ReportsModule,
    PaymentsModule,
    SubscriptionsModule,
    PerformanceReportsModule,
    CompetitionsModule,
    CompetitionRoundsModule,
    CompetitionParticipantsModule,
    TrainingCategoriesModule,
    TrainingReviewsModule,
    EventParticipantsModule,
    PrizesModule,
    EventAgendaModule,
    EventCategoriesModule,
    CampaignsModule,
    CommentsModule,
    CategoriesModule,
    ArticlesModule,
    AvailabilitiesModule,
    EndorsementsModule,
    TeamMembersModule,
    TeamsModule,
    EducationModule,
    ExperiencesModule,
    SponsorshipsModule,
    StatisticsModule,
    TrainingVideosModule,
    TrainingsModule,
    RoomUsersModule,
    MessagesModule,
    ReactionsModule,
    PostsModule,
    BlockListsModule,
    MatchesModule,
    JobApplicationsModule,
    JobsModule,
    AchievementsModule,
    SkillsModule,
    CompaniesModule,
    ScoutsModule,
    ClubsModule,
  ],
})
export class AppModule { }
