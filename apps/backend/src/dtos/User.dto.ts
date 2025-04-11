import { ApiProperty } from "@nestjs/swagger";
import { PostEntity } from "./Post.entity";
import { MessageEntity } from "./Message.entity";
import { NotificationEntity } from "./Notification.entity";
import { PlayerEntity } from "./Player.entity";
import { CoachEntity } from "./Coach.entity";
import { ClubEntity } from "./Club.entity";
import { AgentEntity } from "./Agent.entity";
import { ScoutEntity } from "./Scout.entity";
import { CompanyEntity } from "./Company.entity";
import { SkillEntity } from "./Skill.entity";
import { AchievementEntity } from "./Achievement.entity";
import { JobEntity } from "./Job.entity";
import { JobApplicationEntity } from "./JobApplication.entity";
import { MatchEntity } from "./Match.entity";
import { FriendshipEntity } from "./Friendship.entity";
import { ReviewEntity } from "./Review.entity";
import { BlockListEntity } from "./BlockList.entity";
import { TrainingEntity } from "./Training.entity";
import { SponsorshipEntity } from "./Sponsorship.entity";
import { ReactionEntity } from "./Reaction.entity";
import { RoomUserEntity } from "./RoomUser.entity";
import { StatisticEntity } from "./Statistic.entity";
import { CertificateEntity } from "./Certificate.entity";
import { ExperienceEntity } from "./Experience.entity";
import { EducationEntity } from "./Education.entity";
import { TeamEntity } from "./Team.entity";
import { TeamMemberEntity } from "./TeamMember.entity";
import { EndorsementEntity } from "./Endorsement.entity";
import { AvailabilityEntity } from "./Availability.entity";
import { CommentEntity } from "./Comment.entity";
import { EventSponsorEntity } from "./EventSponsor.entity";
import { PerformanceReportEntity } from "./PerformanceReport.entity";
import { SubscriptionEntity } from "./Subscription.entity";
import { PaymentEntity } from "./Payment.entity";
import { ReportEntity } from "./Report.entity";
import { CompetitionParticipantEntity } from "./CompetitionParticipant.entity";
import { UserBehaviorEntity } from "./UserBehavior.entity";
import { TrainingReviewEntity } from "./TrainingReview.entity";
import { UserSegmentEntity } from "./UserSegment.entity";
import { ProductReviewEntity } from "./ProductReview.entity";
import { OrderEntity } from "./Order.entity";
import { AddressEntity } from "./Address.entity";
import { AthleteMetricsEntity } from "./AthleteMetrics.entity";
import { ArticleEntity } from "./Article.entity";
import { AdvertisementEntity } from "./Advertisement.entity";
import { EventEntity } from "./Event.entity";
import { EventParticipantEntity } from "./EventParticipant.entity";
import { ProfessionalAchievementEntity } from "./ProfessionalAchievement.entity";
import { SocialMediaEntity } from "./SocialMedia.entity";
import { NotificationSettingsEntity } from "./NotificationSettings.entity";
import { ProductEntity } from "./Product.entity";
import {
  Role,
  UserStatus,
  Post,
  Message,
  Notification,
  Player,
  Coach,
  Club,
  Agent,
  Scout,
  Company,
  Skill,
  Achievement,
  Job,
  JobApplication,
  Match,
  Friendship,
  Review,
  BlockList,
  Training,
  Sponsorship,
  Reaction,
  RoomUser,
  Statistic,
  Certificate,
  Experience,
  Education,
  Team,
  TeamMember,
  Endorsement,
  Availability,
  Comment,
  EventSponsor,
  PerformanceReport,
  Subscription,
  Payment,
  Report,
  CompetitionParticipant,
  UserBehavior,
  TrainingReview,
  UserSegment,
  ProductReview,
  Order,
  Address,
  AthleteMetrics,
  Article,
  Advertisement,
  Event,
  EventParticipant,
  ProfessionalAchievement,
  SocialMedia,
  NotificationSettings,
  Product,
} from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for User
export class UserDto {
  @ApiProperty({ type: "number" })
  // Field: id, Type: number
  @Column()
  id: number;

  @ApiProperty({ type: "string" })
  // Field: email, Type: string
  @Column()
  email: string;

  @ApiProperty({ type: "string" })
  // Field: phone, Type: string
  @Column()
  phone: string;

  @ApiProperty({ type: "string" })
  // Field: password, Type: string
  @Column()
  password: string;

  @ApiProperty({ enum: Role })
  // Field: role, Type: Role
  @Column()
  role: Role;

  @ApiProperty({ enum: UserStatus })
  // Field: status, Type: UserStatus
  @Column()
  status: UserStatus;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: updatedAt, Type: Date
  @Column()
  updatedAt: Date;

  @ApiProperty({ type: "string", format: "date-time", nullable: true })
  // Field: lastLogin, Type: Date
  @Column()
  lastLogin?: Date;

  @ApiProperty({ type: "string" })
  // Field: name, Type: string
  @Column()
  name: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: image, Type: string
  @Column()
  image?: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: country, Type: string
  @Column()
  country?: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: city, Type: string
  @Column()
  city?: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: language, Type: string
  @Column()
  language?: string;

  @ApiProperty({ type: PostEntity })
  // Field: posts, Type: Post[]
  @Column()
  posts: Post[];

  @ApiProperty({ type: MessageEntity })
  // Field: messages, Type: Message[]
  @Column()
  messages: Message[];

  @ApiProperty({ type: NotificationEntity })
  // Field: notifications, Type: Notification[]
  @Column()
  notifications: Notification[];

  @ApiProperty({ type: PlayerEntity, nullable: true })
  // Field: playerProfile, Type: Player
  @Column()
  playerProfile?: Player;

  @ApiProperty({ type: CoachEntity, nullable: true })
  // Field: coachProfile, Type: Coach
  @Column()
  coachProfile?: Coach;

  @ApiProperty({ type: ClubEntity, nullable: true })
  // Field: clubProfile, Type: Club
  @Column()
  clubProfile?: Club;

  @ApiProperty({ type: AgentEntity, nullable: true })
  // Field: agentProfile, Type: Agent
  @Column()
  agentProfile?: Agent;

  @ApiProperty({ type: ScoutEntity, nullable: true })
  // Field: scoutProfile, Type: Scout
  @Column()
  scoutProfile?: Scout;

  @ApiProperty({ type: CompanyEntity, nullable: true })
  // Field: companyProfile, Type: Company
  @Column()
  companyProfile?: Company;

  @ApiProperty({ type: SkillEntity })
  // Field: Skill, Type: Skill[]
  @Column()
  Skill: Skill[];

  @ApiProperty({ type: AchievementEntity })
  // Field: Achievement, Type: Achievement[]
  @Column()
  Achievement: Achievement[];

  @ApiProperty({ type: JobEntity })
  // Field: Job, Type: Job[]
  @Column()
  Job: Job[];

  @ApiProperty({ type: JobApplicationEntity })
  // Field: JobApplication, Type: JobApplication[]
  @Column()
  JobApplication: JobApplication[];

  @ApiProperty({ type: MatchEntity })
  // Field: Match, Type: Match[]
  @Column()
  Match: Match[];

  @ApiProperty({ type: FriendshipEntity })
  // Field: Friendship, Type: Friendship[]
  @Column()
  Friendship: Friendship[];

  @ApiProperty({ type: FriendshipEntity })
  // Field: FriendshipB, Type: Friendship[]
  @Column()
  FriendshipB: Friendship[];

  @ApiProperty({ type: ReviewEntity })
  // Field: givenReviews, Type: Review[]
  @Column()
  givenReviews: Review[];

  @ApiProperty({ type: ReviewEntity })
  // Field: receivedReviews, Type: Review[]
  @Column()
  receivedReviews: Review[];

  @ApiProperty({ type: BlockListEntity })
  // Field: blockList, Type: BlockList[]
  @Column()
  blockList: BlockList[];

  @ApiProperty({ type: BlockListEntity })
  // Field: blockedList, Type: BlockList[]
  @Column()
  blockedList: BlockList[];

  @ApiProperty({ type: TrainingEntity })
  // Field: trainings, Type: Training[]
  @Column()
  trainings: Training[];

  @ApiProperty({ type: SponsorshipEntity })
  // Field: sponsorships, Type: Sponsorship[]
  @Column()
  sponsorships: Sponsorship[];

  @ApiProperty({ type: ReactionEntity })
  // Field: Reaction, Type: Reaction[]
  @Column()
  Reaction: Reaction[];

  @ApiProperty({ type: MessageEntity })
  // Field: Message, Type: Message[]
  @Column()
  Message: Message[];

  @ApiProperty({ type: MessageEntity })
  // Field: ReceivedMessages, Type: Message[]
  @Column()
  ReceivedMessages: Message[];

  @ApiProperty({ type: RoomUserEntity })
  // Field: RoomUser, Type: RoomUser[]
  @Column()
  RoomUser: RoomUser[];

  @ApiProperty({ type: TrainingEntity })
  // Field: TrainingPlayer, Type: Training[]
  @Column()
  TrainingPlayer: Training[];

  @ApiProperty({ type: StatisticEntity })
  // Field: Statistic, Type: Statistic[]
  @Column()
  Statistic: Statistic[];

  @ApiProperty({ type: CertificateEntity })
  // Field: Certificate, Type: Certificate[]
  @Column()
  Certificate: Certificate[];

  @ApiProperty({ type: ExperienceEntity })
  // Field: Experience, Type: Experience[]
  @Column()
  Experience: Experience[];

  @ApiProperty({ type: EducationEntity })
  // Field: Education, Type: Education[]
  @Column()
  Education: Education[];

  @ApiProperty({ type: TeamEntity })
  // Field: Team, Type: Team[]
  @Column()
  Team: Team[];

  @ApiProperty({ type: TeamMemberEntity })
  // Field: TeamMember, Type: TeamMember[]
  @Column()
  TeamMember: TeamMember[];

  @ApiProperty({ type: EndorsementEntity })
  // Field: Endorsement, Type: Endorsement[]
  @Column()
  Endorsement: Endorsement[];

  @ApiProperty({ type: AvailabilityEntity })
  // Field: Availability, Type: Availability[]
  @Column()
  Availability: Availability[];

  @ApiProperty({ type: SponsorshipEntity })
  // Field: SponsorshipAthlete, Type: Sponsorship[]
  @Column()
  SponsorshipAthlete: Sponsorship[];

  @ApiProperty({ type: CommentEntity })
  // Field: Comment, Type: Comment[]
  @Column()
  Comment: Comment[];

  @ApiProperty({ type: EventSponsorEntity })
  // Field: EventSponsor, Type: EventSponsor[]
  @Column()
  EventSponsor: EventSponsor[];

  @ApiProperty({ type: PerformanceReportEntity })
  // Field: PerformanceReport, Type: PerformanceReport[]
  @Column()
  PerformanceReport: PerformanceReport[];

  @ApiProperty({ type: PerformanceReportEntity })
  // Field: PerformanceReportCoach, Type: PerformanceReport[]
  @Column()
  PerformanceReportCoach: PerformanceReport[];

  @ApiProperty({ type: SubscriptionEntity })
  // Field: Subscription, Type: Subscription[]
  @Column()
  Subscription: Subscription[];

  @ApiProperty({ type: PaymentEntity })
  // Field: Payment, Type: Payment[]
  @Column()
  Payment: Payment[];

  @ApiProperty({ type: ReportEntity })
  // Field: Report, Type: Report[]
  @Column()
  Report: Report[];

  @ApiProperty({ type: ReportEntity })
  // Field: Reported, Type: Report[]
  @Column()
  Reported: Report[];

  @ApiProperty({ type: CompetitionParticipantEntity })
  // Field: CompetitionParticipant, Type: CompetitionParticipant[]
  @Column()
  CompetitionParticipant: CompetitionParticipant[];

  @ApiProperty({ type: UserBehaviorEntity })
  // Field: UserBehavior, Type: UserBehavior[]
  @Column()
  UserBehavior: UserBehavior[];

  @ApiProperty({ type: TrainingReviewEntity })
  // Field: TrainingReview, Type: TrainingReview[]
  @Column()
  TrainingReview: TrainingReview[];

  @ApiProperty({ type: UserSegmentEntity })
  // Field: UserSegment, Type: UserSegment[]
  @Column()
  UserSegment: UserSegment[];

  @ApiProperty({ type: ProductReviewEntity })
  // Field: ProductReview, Type: ProductReview[]
  @Column()
  ProductReview: ProductReview[];

  @ApiProperty({ type: OrderEntity })
  // Field: Order, Type: Order[]
  @Column()
  Order: Order[];

  @ApiProperty({ type: AddressEntity })
  // Field: Address, Type: Address[]
  @Column()
  Address: Address[];

  @ApiProperty({ type: EndorsementEntity })
  // Field: ReceivedEndorsement, Type: Endorsement[]
  @Column()
  ReceivedEndorsement: Endorsement[];

  @ApiProperty({ type: AthleteMetricsEntity })
  // Field: AthleteMetrics, Type: AthleteMetrics[]
  @Column()
  AthleteMetrics: AthleteMetrics[];

  @ApiProperty({ type: ArticleEntity })
  // Field: Article, Type: Article[]
  @Column()
  Article: Article[];

  @ApiProperty({ type: AdvertisementEntity })
  // Field: Advertisement, Type: Advertisement[]
  @Column()
  Advertisement: Advertisement[];

  @ApiProperty({ type: EventEntity })
  // Field: Event, Type: Event[]
  @Column()
  Event: Event[];

  @ApiProperty({ type: EventParticipantEntity })
  // Field: EventParticipant, Type: EventParticipant[]
  @Column()
  EventParticipant: EventParticipant[];

  @ApiProperty({ type: ProfessionalAchievementEntity })
  // Field: ProfessionalAchievement, Type: ProfessionalAchievement[]
  @Column()
  ProfessionalAchievement: ProfessionalAchievement[];

  @ApiProperty({ type: SocialMediaEntity })
  // Field: SocialMedia, Type: SocialMedia[]
  @Column()
  SocialMedia: SocialMedia[];

  @ApiProperty({ type: NotificationSettingsEntity })
  // Field: NotificationSettings, Type: NotificationSettings[]
  @Column()
  NotificationSettings: NotificationSettings[];

  @ApiProperty({ type: NotificationEntity })
  // Field: Notification, Type: Notification[]
  @Column()
  Notification: Notification[];

  @ApiProperty({ type: ProductEntity })
  // Field: Product, Type: Product[]
  @Column()
  Product: Product[];
}
