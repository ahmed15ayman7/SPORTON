
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  email: 'email',
  phone: 'phone',
  password: 'password',
  role: 'role',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  lastLogin: 'lastLogin',
  name: 'name',
  image: 'image',
  country: 'country',
  city: 'city',
  language: 'language'
};

exports.Prisma.PlayerScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  dateOfBirth: 'dateOfBirth',
  height: 'height',
  weight: 'weight',
  position: 'position',
  foot: 'foot',
  jerseyNumber: 'jerseyNumber',
  facilityId: 'facilityId',
  marketValue: 'marketValue',
  currentTeamId: 'currentTeamId'
};

exports.Prisma.CoachScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  specialization: 'specialization',
  experience: 'experience',
  methodology: 'methodology'
};

exports.Prisma.ClubScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  foundedYear: 'foundedYear',
  stadium: 'stadium',
  colors: 'colors'
};

exports.Prisma.AgentScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  license: 'license',
  agency: 'agency'
};

exports.Prisma.ScoutScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  specialization: 'specialization',
  regions: 'regions'
};

exports.Prisma.CompanyScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  type: 'type',
  registrationNo: 'registrationNo',
  website: 'website'
};

exports.Prisma.SkillScalarFieldEnum = {
  id: 'id',
  name: 'name',
  userId: 'userId'
};

exports.Prisma.AchievementScalarFieldEnum = {
  id: 'id',
  title: 'title',
  details: 'details',
  date: 'date',
  userId: 'userId'
};

exports.Prisma.JobScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  companyId: 'companyId'
};

exports.Prisma.JobApplicationScalarFieldEnum = {
  id: 'id',
  jobId: 'jobId',
  applicantId: 'applicantId',
  status: 'status'
};

exports.Prisma.MatchScalarFieldEnum = {
  id: 'id',
  teamA: 'teamA',
  teamB: 'teamB',
  date: 'date',
  location: 'location'
};

exports.Prisma.FriendshipScalarFieldEnum = {
  id: 'id',
  userAId: 'userAId',
  userBId: 'userBId',
  status: 'status',
  createdAt: 'createdAt'
};

exports.Prisma.BlockListScalarFieldEnum = {
  id: 'id',
  blockerId: 'blockerId',
  blockedId: 'blockedId',
  createdAt: 'createdAt'
};

exports.Prisma.PostScalarFieldEnum = {
  id: 'id',
  text: 'text',
  image: 'image',
  video: 'video',
  isAchievement: 'isAchievement',
  authorId: 'authorId',
  createdAt: 'createdAt'
};

exports.Prisma.ReactionScalarFieldEnum = {
  id: 'id',
  emoji: 'emoji',
  userId: 'userId',
  postId: 'postId'
};

exports.Prisma.MessageScalarFieldEnum = {
  id: 'id',
  content: 'content',
  mediaUrl: 'mediaUrl',
  senderId: 'senderId',
  recipientId: 'recipientId',
  timestamp: 'timestamp',
  isRead: 'isRead'
};

exports.Prisma.RoomScalarFieldEnum = {
  id: 'id',
  name: 'name',
  createdAt: 'createdAt'
};

exports.Prisma.RoomUserScalarFieldEnum = {
  id: 'id',
  roomId: 'roomId',
  userId: 'userId'
};

exports.Prisma.TrainingScalarFieldEnum = {
  id: 'id',
  title: 'title',
  coachId: 'coachId',
  date: 'date',
  location: 'location',
  description: 'description',
  capacity: 'capacity',
  level: 'level',
  price: 'price',
  requirements: 'requirements',
  equipment: 'equipment'
};

exports.Prisma.TrainingVideoScalarFieldEnum = {
  id: 'id',
  trainingId: 'trainingId',
  url: 'url',
  title: 'title',
  description: 'description'
};

exports.Prisma.StatisticScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  matchesPlayed: 'matchesPlayed',
  goals: 'goals',
  assists: 'assists'
};

exports.Prisma.SponsorshipScalarFieldEnum = {
  id: 'id',
  sponsorId: 'sponsorId',
  athleteId: 'athleteId',
  details: 'details'
};

exports.Prisma.CertificateScalarFieldEnum = {
  id: 'id',
  title: 'title',
  issuer: 'issuer',
  issueDate: 'issueDate',
  expiryDate: 'expiryDate',
  description: 'description',
  verified: 'verified',
  userId: 'userId'
};

exports.Prisma.ExperienceScalarFieldEnum = {
  id: 'id',
  title: 'title',
  organization: 'organization',
  location: 'location',
  startDate: 'startDate',
  endDate: 'endDate',
  current: 'current',
  description: 'description',
  achievements: 'achievements',
  userId: 'userId'
};

exports.Prisma.EducationScalarFieldEnum = {
  id: 'id',
  institution: 'institution',
  degree: 'degree',
  field: 'field',
  startDate: 'startDate',
  endDate: 'endDate',
  grade: 'grade',
  activities: 'activities',
  userId: 'userId'
};

exports.Prisma.TeamScalarFieldEnum = {
  id: 'id',
  name: 'name',
  sport: 'sport',
  location: 'location',
  description: 'description',
  logo: 'logo',
  achievements: 'achievements'
};

exports.Prisma.TeamMemberScalarFieldEnum = {
  id: 'id',
  teamId: 'teamId',
  userId: 'userId',
  role: 'role',
  startDate: 'startDate',
  endDate: 'endDate',
  current: 'current'
};

exports.Prisma.EndorsementScalarFieldEnum = {
  id: 'id',
  skill: 'skill',
  endorserId: 'endorserId',
  recipientId: 'recipientId',
  createdAt: 'createdAt'
};

exports.Prisma.AvailabilityScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  status: 'status',
  fromDate: 'fromDate',
  toDate: 'toDate',
  notes: 'notes'
};

exports.Prisma.AthleteMetricsScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  height: 'height',
  weight: 'weight',
  speed: 'speed',
  strength: 'strength',
  endurance: 'endurance',
  flexibility: 'flexibility',
  lastUpdated: 'lastUpdated'
};

exports.Prisma.ArticleScalarFieldEnum = {
  id: 'id',
  title: 'title',
  content: 'content',
  authorId: 'authorId',
  tags: 'tags',
  thumbnail: 'thumbnail',
  views: 'views',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CategoryScalarFieldEnum = {
  id: 'id',
  name: 'name'
};

exports.Prisma.CommentScalarFieldEnum = {
  id: 'id',
  content: 'content',
  authorId: 'authorId',
  articleId: 'articleId',
  createdAt: 'createdAt'
};

exports.Prisma.AdvertisementScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  image: 'image',
  url: 'url',
  sponsorId: 'sponsorId',
  startDate: 'startDate',
  endDate: 'endDate',
  targetSports: 'targetSports',
  targetRoles: 'targetRoles',
  clicks: 'clicks',
  impressions: 'impressions',
  budget: 'budget',
  status: 'status',
  targetLocation: 'targetLocation',
  targetAge: 'targetAge',
  campaignId: 'campaignId',
  keywords: 'keywords',
  maxBudgetPerDay: 'maxBudgetPerDay',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AdAnalyticsScalarFieldEnum = {
  id: 'id',
  adId: 'adId',
  conversions: 'conversions',
  ctr: 'ctr',
  engagement: 'engagement',
  reach: 'reach'
};

exports.Prisma.EventScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  sport: 'sport',
  startDate: 'startDate',
  endDate: 'endDate',
  location: 'location',
  organizerId: 'organizerId',
  maxParticipants: 'maxParticipants',
  registrationDeadline: 'registrationDeadline',
  price: 'price',
  status: 'status',
  requirements: 'requirements',
  facilities: 'facilities',
  rules: 'rules'
};

exports.Prisma.EventAgendaScalarFieldEnum = {
  id: 'id',
  eventId: 'eventId',
  title: 'title',
  startTime: 'startTime',
  endTime: 'endTime',
  location: 'location',
  speaker: 'speaker'
};

exports.Prisma.PrizeScalarFieldEnum = {
  id: 'id',
  eventId: 'eventId',
  rank: 'rank',
  amount: 'amount',
  description: 'description'
};

exports.Prisma.EventParticipantScalarFieldEnum = {
  id: 'id',
  eventId: 'eventId',
  userId: 'userId',
  status: 'status',
  registeredAt: 'registeredAt'
};

exports.Prisma.EventSponsorScalarFieldEnum = {
  id: 'id',
  eventId: 'eventId',
  sponsorId: 'sponsorId',
  sponsorshipType: 'sponsorshipType',
  amount: 'amount'
};

exports.Prisma.ReviewScalarFieldEnum = {
  id: 'id',
  reviewerId: 'reviewerId',
  reviewedId: 'reviewedId',
  rating: 'rating',
  comment: 'comment',
  createdAt: 'createdAt'
};

exports.Prisma.ProfessionalAchievementScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  title: 'title',
  organization: 'organization',
  date: 'date',
  proof: 'proof',
  verified: 'verified'
};

exports.Prisma.SocialMediaScalarFieldEnum = {
  id: 'id',
  platform: 'platform',
  url: 'url',
  userId: 'userId'
};

exports.Prisma.NotificationSettingsScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  emailEnabled: 'emailEnabled',
  pushEnabled: 'pushEnabled',
  smsEnabled: 'smsEnabled',
  messageNotifications: 'messageNotifications',
  transferNotifications: 'transferNotifications',
  matchNotifications: 'matchNotifications',
  trainingNotifications: 'trainingNotifications',
  newsNotifications: 'newsNotifications',
  contractNotifications: 'contractNotifications',
  quietHoursStart: 'quietHoursStart',
  quietHoursEnd: 'quietHoursEnd',
  timezone: 'timezone'
};

exports.Prisma.NotificationTemplateScalarFieldEnum = {
  id: 'id',
  type: 'type',
  title: 'title',
  content: 'content',
  variables: 'variables',
  language: 'language',
  isActive: 'isActive'
};

exports.Prisma.NotificationLogScalarFieldEnum = {
  id: 'id',
  notificationId: 'notificationId',
  status: 'status',
  channel: 'channel',
  attempts: 'attempts',
  error: 'error',
  sentAt: 'sentAt'
};

exports.Prisma.NotificationGroupScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  createdAt: 'createdAt'
};

exports.Prisma.NotificationActionScalarFieldEnum = {
  id: 'id',
  notificationId: 'notificationId',
  actionType: 'actionType',
  actionUrl: 'actionUrl',
  buttonText: 'buttonText',
  completed: 'completed',
  completedAt: 'completedAt'
};

exports.Prisma.NotificationScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  type: 'type',
  title: 'title',
  content: 'content',
  data: 'data',
  isRead: 'isRead',
  isArchived: 'isArchived',
  createdAt: 'createdAt',
  readAt: 'readAt',
  priority: 'priority',
  senderId: 'senderId',
  expiresAt: 'expiresAt'
};

exports.Prisma.CompetitionScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  sport: 'sport',
  startDate: 'startDate',
  endDate: 'endDate',
  format: 'format',
  rules: 'rules',
  status: 'status'
};

exports.Prisma.PerformanceReportScalarFieldEnum = {
  id: 'id',
  athleteId: 'athleteId',
  date: 'date',
  metrics: 'metrics',
  analysis: 'analysis',
  recommendations: 'recommendations',
  coachId: 'coachId'
};

exports.Prisma.SubscriptionScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  plan: 'plan',
  startDate: 'startDate',
  endDate: 'endDate',
  status: 'status',
  features: 'features'
};

exports.Prisma.PaymentScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  amount: 'amount',
  type: 'type',
  status: 'status',
  date: 'date',
  description: 'description'
};

exports.Prisma.ReportScalarFieldEnum = {
  id: 'id',
  reporterId: 'reporterId',
  reportedId: 'reportedId',
  type: 'type',
  description: 'description',
  status: 'status',
  createdAt: 'createdAt'
};

exports.Prisma.CampaignScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  startDate: 'startDate',
  endDate: 'endDate',
  budget: 'budget',
  status: 'status'
};

exports.Prisma.CampaignAnalyticsScalarFieldEnum = {
  id: 'id',
  campaignId: 'campaignId',
  totalReach: 'totalReach',
  engagement: 'engagement',
  conversions: 'conversions',
  roi: 'roi'
};

exports.Prisma.EventCategoryScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description'
};

exports.Prisma.EventImageScalarFieldEnum = {
  id: 'id',
  eventId: 'eventId',
  url: 'url',
  description: 'description',
  isMain: 'isMain'
};

exports.Prisma.StreamingInfoScalarFieldEnum = {
  id: 'id',
  eventId: 'eventId',
  platform: 'platform',
  url: 'url',
  startTime: 'startTime',
  endTime: 'endTime',
  isLive: 'isLive'
};

exports.Prisma.TrainingReviewScalarFieldEnum = {
  id: 'id',
  trainingId: 'trainingId',
  reviewerId: 'reviewerId',
  rating: 'rating',
  comment: 'comment',
  createdAt: 'createdAt'
};

exports.Prisma.TrainingCategoryScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description'
};

exports.Prisma.CompetitionParticipantScalarFieldEnum = {
  id: 'id',
  competitionId: 'competitionId',
  participantId: 'participantId',
  status: 'status',
  rank: 'rank',
  score: 'score'
};

exports.Prisma.CompetitionRoundScalarFieldEnum = {
  id: 'id',
  competitionId: 'competitionId',
  roundNumber: 'roundNumber',
  startDate: 'startDate',
  endDate: 'endDate',
  status: 'status'
};

exports.Prisma.UserBehaviorScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  interactionType: 'interactionType',
  contentType: 'contentType',
  contentId: 'contentId',
  timestamp: 'timestamp',
  timeSpent: 'timeSpent',
  score: 'score',
  sessionDuration: 'sessionDuration',
  deviceInfo: 'deviceInfo',
  location: 'location',
  timeOfDay: 'timeOfDay',
  dayOfWeek: 'dayOfWeek',
  isPositive: 'isPositive'
};

exports.Prisma.EngagementMetricsScalarFieldEnum = {
  id: 'id',
  contentId: 'contentId',
  contentType: 'contentType',
  viewCount: 'viewCount',
  avgTimeSpent: 'avgTimeSpent',
  engagementRate: 'engagementRate',
  bounceRate: 'bounceRate',
  peakHours: 'peakHours',
  demographics: 'demographics',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ContentAnalyticsScalarFieldEnum = {
  id: 'id',
  contentType: 'contentType',
  contentId: 'contentId',
  keywords: 'keywords',
  topics: 'topics',
  engagement: 'engagement',
  relevanceScore: 'relevanceScore',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AdTargetingScalarFieldEnum = {
  id: 'id',
  adId: 'adId',
  targetInterests: 'targetInterests',
  targetBehaviors: 'targetBehaviors',
  demographicData: 'demographicData',
  locationData: 'locationData',
  timeTargeting: 'timeTargeting',
  performanceScore: 'performanceScore',
  optimizationRules: 'optimizationRules',
  bidStrategy: 'bidStrategy',
  budget: 'budget',
  minPerformanceScore: 'minPerformanceScore',
  blacklist: 'blacklist',
  customRules: 'customRules',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.TargetingPerformanceScalarFieldEnum = {
  id: 'id',
  targetingId: 'targetingId',
  segmentId: 'segmentId',
  performance: 'performance',
  cost: 'cost',
  roi: 'roi',
  date: 'date'
};

exports.Prisma.TargetAudienceScalarFieldEnum = {
  id: 'id',
  analyticsId: 'analyticsId',
  sport: 'sport',
  role: 'role',
  ageRange: 'ageRange',
  gender: 'gender',
  interests: 'interests',
  weight: 'weight'
};

exports.Prisma.ContentScoreScalarFieldEnum = {
  id: 'id',
  contentId: 'contentId',
  contentType: 'contentType',
  userSegment: 'userSegment',
  relevanceScore: 'relevanceScore',
  freshness: 'freshness',
  quality: 'quality',
  engagement: 'engagement',
  finalScore: 'finalScore',
  lastCalculated: 'lastCalculated'
};

exports.Prisma.UserSegmentScalarFieldEnum = {
  id: 'id',
  name: 'name',
  criteria: 'criteria',
  priority: 'priority'
};

exports.Prisma.ABTestScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  startDate: 'startDate',
  endDate: 'endDate',
  status: 'status',
  metrics: 'metrics',
  winner: 'winner'
};

exports.Prisma.TestVariantScalarFieldEnum = {
  id: 'id',
  testId: 'testId',
  name: 'name',
  configuration: 'configuration',
  performance: 'performance'
};

exports.Prisma.OptimizationLogScalarFieldEnum = {
  id: 'id',
  date: 'date',
  type: 'type',
  changes: 'changes',
  impact: 'impact',
  metrics: 'metrics'
};

exports.Prisma.ProductScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  price: 'price',
  categoryId: 'categoryId',
  brand: 'brand',
  sport: 'sport',
  inStock: 'inStock',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  specifications: 'specifications',
  weight: 'weight',
  featured: 'featured'
};

exports.Prisma.ProductCategoryScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  image: 'image',
  parentId: 'parentId'
};

exports.Prisma.ProductImageScalarFieldEnum = {
  id: 'id',
  productId: 'productId',
  url: 'url',
  isMain: 'isMain',
  order: 'order'
};

exports.Prisma.ProductVariantScalarFieldEnum = {
  id: 'id',
  productId: 'productId',
  size: 'size',
  color: 'color',
  sku: 'sku',
  price: 'price',
  inStock: 'inStock'
};

exports.Prisma.ProductReviewScalarFieldEnum = {
  id: 'id',
  productId: 'productId',
  userId: 'userId',
  rating: 'rating',
  comment: 'comment',
  images: 'images',
  createdAt: 'createdAt',
  verified: 'verified'
};

exports.Prisma.DiscountScalarFieldEnum = {
  id: 'id',
  productId: 'productId',
  percentage: 'percentage',
  startDate: 'startDate',
  endDate: 'endDate',
  active: 'active'
};

exports.Prisma.OrderScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  status: 'status',
  totalAmount: 'totalAmount',
  addressId: 'addressId',
  paymentStatus: 'paymentStatus',
  paymentMethod: 'paymentMethod',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  trackingNumber: 'trackingNumber',
  notes: 'notes'
};

exports.Prisma.OrderItemScalarFieldEnum = {
  id: 'id',
  orderId: 'orderId',
  productId: 'productId',
  quantity: 'quantity',
  price: 'price',
  variantId: 'variantId'
};

exports.Prisma.AddressScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  name: 'name',
  street: 'street',
  city: 'city',
  state: 'state',
  country: 'country',
  zipCode: 'zipCode',
  phone: 'phone',
  isDefault: 'isDefault'
};

exports.Prisma.PlayerStatisticsScalarFieldEnum = {
  id: 'id',
  playerId: 'playerId',
  matches: 'matches',
  goals: 'goals',
  assists: 'assists',
  yellowCards: 'yellowCards',
  redCards: 'redCards',
  minutesPlayed: 'minutesPlayed',
  passAccuracy: 'passAccuracy',
  shotAccuracy: 'shotAccuracy',
  tackles: 'tackles',
  season: 'season'
};

exports.Prisma.CoachingHistoryScalarFieldEnum = {
  id: 'id',
  coachId: 'coachId',
  clubId: 'clubId',
  startDate: 'startDate',
  endDate: 'endDate',
  position: 'position',
  achievements: 'achievements'
};

exports.Prisma.ContractScalarFieldEnum = {
  id: 'id',
  playerId: 'playerId',
  clubId: 'clubId',
  startDate: 'startDate',
  endDate: 'endDate',
  salary: 'salary',
  currency: 'currency',
  bonuses: 'bonuses',
  buyoutClause: 'buyoutClause',
  status: 'status',
  documents: 'documents',
  agentId: 'agentId',
  terms: 'terms',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.InjuryScalarFieldEnum = {
  id: 'id',
  playerId: 'playerId',
  type: 'type',
  startDate: 'startDate',
  endDate: 'endDate',
  description: 'description',
  severity: 'severity',
  treatment: 'treatment',
  medicalReport: 'medicalReport',
  status: 'status',
  doctor: 'doctor'
};

exports.Prisma.LicenseScalarFieldEnum = {
  id: 'id',
  coachId: 'coachId',
  name: 'name',
  issuedBy: 'issuedBy',
  issueDate: 'issueDate',
  expiryDate: 'expiryDate',
  level: 'level',
  certificate: 'certificate',
  verified: 'verified'
};

exports.Prisma.FacilityScalarFieldEnum = {
  id: 'id',
  clubId: 'clubId',
  name: 'name',
  type: 'type',
  capacity: 'capacity',
  location: 'location',
  description: 'description',
  images: 'images',
  icon: 'icon',
  status: 'status'
};

exports.Prisma.TeamCategoryScalarFieldEnum = {
  id: 'id',
  clubId: 'clubId',
  name: 'name',
  ageGroup: 'ageGroup',
  minAge: 'minAge',
  maxAge: 'maxAge',
  coachId: 'coachId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.TournamentScalarFieldEnum = {
  id: 'id',
  name: 'name',
  organizerId: 'organizerId',
  startDate: 'startDate',
  endDate: 'endDate',
  type: 'type',
  prizes: 'prizes',
  rules: 'rules',
  status: 'status'
};

exports.Prisma.AgentClientScalarFieldEnum = {
  id: 'id',
  agentId: 'agentId',
  playerId: 'playerId',
  startDate: 'startDate',
  endDate: 'endDate',
  contract: 'contract',
  commission: 'commission',
  status: 'status'
};

exports.Prisma.TransferScalarFieldEnum = {
  id: 'id',
  playerId: 'playerId',
  fromClubId: 'fromClubId',
  toClubId: 'toClubId',
  agentId: 'agentId',
  date: 'date',
  fee: 'fee',
  currency: 'currency',
  type: 'type',
  contractId: 'contractId',
  status: 'status'
};

exports.Prisma.CommissionScalarFieldEnum = {
  id: 'id',
  agentId: 'agentId',
  transferId: 'transferId',
  amount: 'amount',
  percentage: 'percentage',
  currency: 'currency',
  paymentDate: 'paymentDate',
  status: 'status'
};

exports.Prisma.ScoutingReportScalarFieldEnum = {
  id: 'id',
  scoutId: 'scoutId',
  playerId: 'playerId',
  date: 'date',
  matchId: 'matchId',
  technicalEvaluation: 'technicalEvaluation',
  physicalEvaluation: 'physicalEvaluation',
  mentalEvaluation: 'mentalEvaluation',
  potential: 'potential',
  recommendation: 'recommendation',
  videos: 'videos',
  notes: 'notes'
};

exports.Prisma.PlayerDiscoveryScalarFieldEnum = {
  id: 'id',
  scoutId: 'scoutId',
  playerId: 'playerId',
  date: 'date',
  location: 'location',
  context: 'context',
  initialReport: 'initialReport',
  status: 'status',
  outcome: 'outcome'
};

exports.Prisma.MaintenanceScheduleScalarFieldEnum = {
  id: 'id',
  facilityId: 'facilityId',
  startDate: 'startDate',
  endDate: 'endDate',
  type: 'type',
  description: 'description',
  cost: 'cost',
  status: 'status'
};

exports.Prisma.TrainingScheduleScalarFieldEnum = {
  id: 'id',
  teamId: 'teamId',
  dayOfWeek: 'dayOfWeek',
  startTime: 'startTime',
  endTime: 'endTime',
  location: 'location',
  status: 'status',
  type: 'type',
  coachId: 'coachId',
  facilityId: 'facilityId'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};
exports.Role = exports.$Enums.Role = {
  PLAYER: 'PLAYER',
  COACH: 'COACH',
  AGENT: 'AGENT',
  CLUB: 'CLUB',
  COMPANY: 'COMPANY',
  SCOUT: 'SCOUT',
  TRAINER: 'TRAINER'
};

exports.UserStatus = exports.$Enums.UserStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  SUSPENDED: 'SUSPENDED',
  BANNED: 'BANNED',
  PENDING: 'PENDING'
};

exports.Foot = exports.$Enums.Foot = {
  RIGHT: 'RIGHT',
  LEFT: 'LEFT',
  BOTH: 'BOTH'
};

exports.CompanyType = exports.$Enums.CompanyType = {
  SPORTSWEAR: 'SPORTSWEAR',
  EQUIPMENT: 'EQUIPMENT',
  NUTRITION: 'NUTRITION',
  MEDIA: 'MEDIA',
  OTHER: 'OTHER'
};

exports.TrainingLevel = exports.$Enums.TrainingLevel = {
  BEGINNER: 'BEGINNER',
  INTERMEDIATE: 'INTERMEDIATE',
  ADVANCED: 'ADVANCED',
  PROFESSIONAL: 'PROFESSIONAL'
};

exports.Sport = exports.$Enums.Sport = {
  FOOTBALL: 'FOOTBALL',
  RUNNING: 'RUNNING',
  TENNIS: 'TENNIS',
  BASKETBALL: 'BASKETBALL',
  SWIMMING: 'SWIMMING',
  KARATE: 'KARATE',
  DIVING: 'DIVING',
  FITNESS: 'FITNESS',
  HORSE_RIDING: 'HORSE_RIDING',
  CYCLING: 'CYCLING',
  SKATING: 'SKATING',
  HANDBALL: 'HANDBALL',
  GOLF: 'GOLF',
  HOCKEY: 'HOCKEY',
  CHESS: 'CHESS',
  KUNG_FU: 'KUNG_FU',
  BOXING: 'BOXING',
  BOWLING: 'BOWLING'
};

exports.AvailabilityStatus = exports.$Enums.AvailabilityStatus = {
  AVAILABLE: 'AVAILABLE',
  NOT_AVAILABLE: 'NOT_AVAILABLE',
  OPEN_TO_OFFERS: 'OPEN_TO_OFFERS',
  CONTRACT_ENDING: 'CONTRACT_ENDING'
};

exports.AdStatus = exports.$Enums.AdStatus = {
  ACTIVE: 'ACTIVE',
  PAUSED: 'PAUSED',
  COMPLETED: 'COMPLETED',
  PENDING_REVIEW: 'PENDING_REVIEW'
};

exports.AgeRange = exports.$Enums.AgeRange = {
  UNDER_18: 'UNDER_18',
  AGE_18_24: 'AGE_18_24',
  AGE_25_34: 'AGE_25_34',
  AGE_35_44: 'AGE_35_44',
  AGE_45_PLUS: 'AGE_45_PLUS'
};

exports.EventStatus = exports.$Enums.EventStatus = {
  UPCOMING: 'UPCOMING',
  ONGOING: 'ONGOING',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

exports.ParticipationStatus = exports.$Enums.ParticipationStatus = {
  REGISTERED: 'REGISTERED',
  CONFIRMED: 'CONFIRMED',
  WAITLISTED: 'WAITLISTED',
  CANCELLED: 'CANCELLED'
};

exports.NotificationType = exports.$Enums.NotificationType = {
  MESSAGE: 'MESSAGE',
  TRANSFER_OFFER: 'TRANSFER_OFFER',
  MATCH_UPDATE: 'MATCH_UPDATE',
  TRAINING_SCHEDULE: 'TRAINING_SCHEDULE',
  CONTRACT_UPDATE: 'CONTRACT_UPDATE',
  INJURY_UPDATE: 'INJURY_UPDATE',
  TEAM_NEWS: 'TEAM_NEWS',
  ACHIEVEMENT: 'ACHIEVEMENT',
  SYSTEM: 'SYSTEM',
  REMINDER: 'REMINDER',
  PAYMENT: 'PAYMENT',
  DOCUMENT: 'DOCUMENT',
  OTHER: 'OTHER'
};

exports.DeliveryStatus = exports.$Enums.DeliveryStatus = {
  PENDING: 'PENDING',
  SENT: 'SENT',
  DELIVERED: 'DELIVERED',
  FAILED: 'FAILED',
  BLOCKED: 'BLOCKED'
};

exports.NotificationChannel = exports.$Enums.NotificationChannel = {
  EMAIL: 'EMAIL',
  PUSH: 'PUSH',
  SMS: 'SMS',
  IN_APP: 'IN_APP'
};

exports.ActionType = exports.$Enums.ActionType = {
  VIEW: 'VIEW',
  ACCEPT: 'ACCEPT',
  REJECT: 'REJECT',
  REPLY: 'REPLY',
  CONFIRM: 'CONFIRM',
  REVIEW: 'REVIEW',
  PAY: 'PAY',
  OTHER: 'OTHER'
};

exports.Priority = exports.$Enums.Priority = {
  LOW: 'LOW',
  NORMAL: 'NORMAL',
  HIGH: 'HIGH',
  URGENT: 'URGENT'
};

exports.CompetitionFormat = exports.$Enums.CompetitionFormat = {
  KNOCKOUT: 'KNOCKOUT',
  LEAGUE: 'LEAGUE',
  GROUP_STAGE: 'GROUP_STAGE',
  HYBRID: 'HYBRID'
};

exports.CompetitionStatus = exports.$Enums.CompetitionStatus = {
  REGISTRATION: 'REGISTRATION',
  ONGOING: 'ONGOING',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

exports.PlanType = exports.$Enums.PlanType = {
  FREE: 'FREE',
  BASIC: 'BASIC',
  PREMIUM: 'PREMIUM',
  PROFESSIONAL: 'PROFESSIONAL'
};

exports.SubscriptionStatus = exports.$Enums.SubscriptionStatus = {
  ACTIVE: 'ACTIVE',
  EXPIRED: 'EXPIRED',
  CANCELLED: 'CANCELLED',
  PENDING: 'PENDING'
};

exports.PaymentType = exports.$Enums.PaymentType = {
  SUBSCRIPTION: 'SUBSCRIPTION',
  EVENT: 'EVENT',
  TRAINING: 'TRAINING',
  ADVERTISEMENT: 'ADVERTISEMENT',
  SPONSORSHIP: 'SPONSORSHIP'
};

exports.PaymentStatus = exports.$Enums.PaymentStatus = {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  REFUNDED: 'REFUNDED'
};

exports.ReportType = exports.$Enums.ReportType = {
  HARASSMENT: 'HARASSMENT',
  SPAM: 'SPAM',
  FAKE_ACCOUNT: 'FAKE_ACCOUNT',
  INAPPROPRIATE: 'INAPPROPRIATE',
  SCAM: 'SCAM'
};

exports.ReportStatus = exports.$Enums.ReportStatus = {
  PENDING: 'PENDING',
  INVESTIGATING: 'INVESTIGATING',
  RESOLVED: 'RESOLVED',
  DISMISSED: 'DISMISSED'
};

exports.CampaignStatus = exports.$Enums.CampaignStatus = {
  DRAFT: 'DRAFT',
  ACTIVE: 'ACTIVE',
  PAUSED: 'PAUSED',
  COMPLETED: 'COMPLETED'
};

exports.RoundStatus = exports.$Enums.RoundStatus = {
  UPCOMING: 'UPCOMING',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

exports.InteractionType = exports.$Enums.InteractionType = {
  VIEW: 'VIEW',
  LIKE: 'LIKE',
  COMMENT: 'COMMENT',
  SHARE: 'SHARE',
  CLICK: 'CLICK',
  SAVE: 'SAVE',
  HIDE: 'HIDE',
  REPORT: 'REPORT'
};

exports.ContentType = exports.$Enums.ContentType = {
  POST: 'POST',
  AD: 'AD',
  EVENT: 'EVENT',
  ARTICLE: 'ARTICLE',
  TRAINING: 'TRAINING',
  JOB: 'JOB'
};

exports.Gender = exports.$Enums.Gender = {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
  OTHER: 'OTHER'
};

exports.TestStatus = exports.$Enums.TestStatus = {
  DRAFT: 'DRAFT',
  RUNNING: 'RUNNING',
  COMPLETED: 'COMPLETED',
  ANALYZED: 'ANALYZED'
};

exports.ProductStatus = exports.$Enums.ProductStatus = {
  ACTIVE: 'ACTIVE',
  OUT_OF_STOCK: 'OUT_OF_STOCK',
  DISCONTINUED: 'DISCONTINUED',
  COMING_SOON: 'COMING_SOON'
};

exports.OrderStatus = exports.$Enums.OrderStatus = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  PROCESSING: 'PROCESSING',
  SHIPPED: 'SHIPPED',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED',
  RETURNED: 'RETURNED'
};

exports.PaymentMethod = exports.$Enums.PaymentMethod = {
  CREDIT_CARD: 'CREDIT_CARD',
  DEBIT_CARD: 'DEBIT_CARD',
  BANK_TRANSFER: 'BANK_TRANSFER',
  CASH_ON_DELIVERY: 'CASH_ON_DELIVERY',
  WALLET: 'WALLET'
};

exports.ContractStatus = exports.$Enums.ContractStatus = {
  ACTIVE: 'ACTIVE',
  EXPIRED: 'EXPIRED',
  TERMINATED: 'TERMINATED',
  PENDING: 'PENDING'
};

exports.InjurySeverity = exports.$Enums.InjurySeverity = {
  MINOR: 'MINOR',
  MODERATE: 'MODERATE',
  SEVERE: 'SEVERE',
  CRITICAL: 'CRITICAL'
};

exports.InjuryStatus = exports.$Enums.InjuryStatus = {
  ACTIVE: 'ACTIVE',
  RECOVERING: 'RECOVERING',
  RECOVERED: 'RECOVERED'
};

exports.FacilityType = exports.$Enums.FacilityType = {
  STADIUM: 'STADIUM',
  TRAINING_GROUND: 'TRAINING_GROUND',
  GYM: 'GYM',
  MEDICAL_CENTER: 'MEDICAL_CENTER',
  ACADEMY: 'ACADEMY',
  OTHER: 'OTHER'
};

exports.FacilityStatus = exports.$Enums.FacilityStatus = {
  ACTIVE: 'ACTIVE',
  UNDER_MAINTENANCE: 'UNDER_MAINTENANCE',
  INACTIVE: 'INACTIVE'
};

exports.TournamentType = exports.$Enums.TournamentType = {
  LEAGUE: 'LEAGUE',
  CUP: 'CUP',
  FRIENDLY: 'FRIENDLY',
  INTERNATIONAL: 'INTERNATIONAL'
};

exports.TournamentStatus = exports.$Enums.TournamentStatus = {
  UPCOMING: 'UPCOMING',
  ONGOING: 'ONGOING',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

exports.ClientStatus = exports.$Enums.ClientStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  TERMINATED: 'TERMINATED'
};

exports.TransferType = exports.$Enums.TransferType = {
  PERMANENT: 'PERMANENT',
  LOAN: 'LOAN',
  FREE_AGENT: 'FREE_AGENT',
  YOUTH_PROMOTION: 'YOUTH_PROMOTION'
};

exports.TransferStatus = exports.$Enums.TransferStatus = {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

exports.DiscoveryStatus = exports.$Enums.DiscoveryStatus = {
  PENDING: 'PENDING',
  EVALUATING: 'EVALUATING',
  SIGNED: 'SIGNED',
  REJECTED: 'REJECTED'
};

exports.TrainingScheduleStatus = exports.$Enums.TrainingScheduleStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  CANCELLED: 'CANCELLED'
};

exports.Prisma.ModelName = {
  User: 'User',
  Player: 'Player',
  Coach: 'Coach',
  Club: 'Club',
  Agent: 'Agent',
  Scout: 'Scout',
  Company: 'Company',
  Skill: 'Skill',
  Achievement: 'Achievement',
  Job: 'Job',
  JobApplication: 'JobApplication',
  Match: 'Match',
  Friendship: 'Friendship',
  BlockList: 'BlockList',
  Post: 'Post',
  Reaction: 'Reaction',
  Message: 'Message',
  Room: 'Room',
  RoomUser: 'RoomUser',
  Training: 'Training',
  TrainingVideo: 'TrainingVideo',
  Statistic: 'Statistic',
  Sponsorship: 'Sponsorship',
  Certificate: 'Certificate',
  Experience: 'Experience',
  Education: 'Education',
  Team: 'Team',
  TeamMember: 'TeamMember',
  Endorsement: 'Endorsement',
  Availability: 'Availability',
  AthleteMetrics: 'AthleteMetrics',
  Article: 'Article',
  Category: 'Category',
  Comment: 'Comment',
  Advertisement: 'Advertisement',
  AdAnalytics: 'AdAnalytics',
  Event: 'Event',
  EventAgenda: 'EventAgenda',
  Prize: 'Prize',
  EventParticipant: 'EventParticipant',
  EventSponsor: 'EventSponsor',
  Review: 'Review',
  ProfessionalAchievement: 'ProfessionalAchievement',
  SocialMedia: 'SocialMedia',
  NotificationSettings: 'NotificationSettings',
  NotificationTemplate: 'NotificationTemplate',
  NotificationLog: 'NotificationLog',
  NotificationGroup: 'NotificationGroup',
  NotificationAction: 'NotificationAction',
  Notification: 'Notification',
  Competition: 'Competition',
  PerformanceReport: 'PerformanceReport',
  Subscription: 'Subscription',
  Payment: 'Payment',
  Report: 'Report',
  Campaign: 'Campaign',
  CampaignAnalytics: 'CampaignAnalytics',
  EventCategory: 'EventCategory',
  EventImage: 'EventImage',
  StreamingInfo: 'StreamingInfo',
  TrainingReview: 'TrainingReview',
  TrainingCategory: 'TrainingCategory',
  CompetitionParticipant: 'CompetitionParticipant',
  CompetitionRound: 'CompetitionRound',
  UserBehavior: 'UserBehavior',
  EngagementMetrics: 'EngagementMetrics',
  ContentAnalytics: 'ContentAnalytics',
  AdTargeting: 'AdTargeting',
  TargetingPerformance: 'TargetingPerformance',
  TargetAudience: 'TargetAudience',
  ContentScore: 'ContentScore',
  UserSegment: 'UserSegment',
  ABTest: 'ABTest',
  TestVariant: 'TestVariant',
  OptimizationLog: 'OptimizationLog',
  Product: 'Product',
  ProductCategory: 'ProductCategory',
  ProductImage: 'ProductImage',
  ProductVariant: 'ProductVariant',
  ProductReview: 'ProductReview',
  Discount: 'Discount',
  Order: 'Order',
  OrderItem: 'OrderItem',
  Address: 'Address',
  PlayerStatistics: 'PlayerStatistics',
  CoachingHistory: 'CoachingHistory',
  Contract: 'Contract',
  Injury: 'Injury',
  License: 'License',
  Facility: 'Facility',
  TeamCategory: 'TeamCategory',
  Tournament: 'Tournament',
  AgentClient: 'AgentClient',
  Transfer: 'Transfer',
  Commission: 'Commission',
  ScoutingReport: 'ScoutingReport',
  PlayerDiscovery: 'PlayerDiscovery',
  MaintenanceSchedule: 'MaintenanceSchedule',
  TrainingSchedule: 'TrainingSchedule'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
