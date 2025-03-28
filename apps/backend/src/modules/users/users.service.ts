import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService extends BaseService<User> {
    constructor(prisma: PrismaService) {
        super(prisma, 'user');
    }

    protected getSearchFields(): string[] {
        return ['name', 'email', 'phone'];
    }

    protected getIncludeFields(): object {
        return {
            playerProfile: true,
            coachProfile: true,
            clubProfile: true,
            agentProfile: true,
            scoutProfile: true,
            companyProfile: true,
            Skill: true,
            Achievement: true,
            Job: true,
            JobApplication: true,
            Match: true,
            Friendship: true,
            FriendshipB: true,
            givenReviews: true,
            receivedReviews: true,
            blockList: true,
            blockedList: true,
            trainings: true,
            sponsorships: true,
            Reaction: true,
            Message: true,
            ReceivedMessages: true,
            RoomUser: true,
            TrainingPlayer: true,
            Statistic: true,
            Certificate: true,
            Experience: true,
            Education: true,
            Team: true,
            TeamMember: true,
            Endorsement: true,
            Availability: true,
            SponsorshipAthlete: true,
            Comment: true,
            EventSponsor: true,
            PerformanceReport: true,
            PerformanceReportCoach: true,
            Subscription: true,
            Payment: true,
            Report: true,
            Reported: true,
            CompetitionParticipant: true,
            UserBehavior: true,
            TrainingReview: true,
            UserSegment: true,
            ProductReview: true,
            Order: true,
            Address: true,
            ReceivedEndorsement: true,
            AthleteMetrics: true,
            Article: true,
            Advertisement: true,
            Event: true,
            EventParticipant: true,
            ProfessionalAchievement: true,
            SocialMedia: true,
            NotificationSettings: true,
            Notification: true,
            Product: true,
        };
    }

    async create(data: any): Promise<User> {
        // التحقق من وجود البريد الإلكتروني
        const existingEmail = await this.prisma.user.findUnique({
            where: { email: data.email },
        });
        if (existingEmail) {
            throw new ConflictException('البريد الإلكتروني مستخدم بالفعل');
        }

        // التحقق من وجود رقم الهاتف
        const existingPhone = await this.prisma.user.findUnique({
            where: { phone: data.phone },
        });
        if (existingPhone) {
            throw new ConflictException('رقم الهاتف مستخدم بالفعل');
        }

        // تشفير كلمة المرور
        const hashedPassword = await bcrypt.hash(data.password, 10);
        data.password = hashedPassword;

        return super.create(data);
    }

    async update(id: number, data: any): Promise<User> {
        // إذا تم تحديث البريد الإلكتروني
        if (data.email) {
            const existingEmail = await this.prisma.user.findFirst({
                where: {
                    email: data.email,
                    NOT: { id },
                },
            });
            if (existingEmail) {
                throw new ConflictException('البريد الإلكتروني مستخدم بالفعل');
            }
        }

        // إذا تم تحديث رقم الهاتف
        if (data.phone) {
            const existingPhone = await this.prisma.user.findFirst({
                where: {
                    phone: data.phone,
                    NOT: { id },
                },
            });
            if (existingPhone) {
                throw new ConflictException('رقم الهاتف مستخدم بالفعل');
            }
        }

        // إذا تم تحديث كلمة المرور
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }

        return super.update(id, data);
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            throw new NotFoundException('المستخدم غير موجود');
        }
        return user;
    }

    async findByPhone(phone: string): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: { phone },
        });
        if (!user) {
            throw new NotFoundException('المستخدم غير موجود');
        }
        return user;
    }

    async updateLastLogin(id: number): Promise<User> {
        return this.prisma.user.update({
            where: { id },
            data: { lastLogin: new Date() },
        });
    }

    async getUserProfile(id: number): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: this.getIncludeFields(),
        });
        if (!user) {
            throw new NotFoundException('المستخدم غير موجود');
        }
        return user;
    }

    async getUserFriends(id: number): Promise<User[]> {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: {
                Friendship: {
                    where: { status: 'accepted' },
                    include: { userB: true },
                },
                FriendshipB: {
                    where: { status: 'accepted' },
                    include: { userA: true },
                },
            },
        });

        if (!user) {
            throw new NotFoundException('المستخدم غير موجود');
        }

        const friends = [
            ...user.Friendship.map((f) => f.userB),
            ...user.FriendshipB.map((f) => f.userA),
        ];

        return friends;
    }

    async getUserBlockedUsers(id: number): Promise<User[]> {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: {
                blockList: {
                    include: { blocked: true },
                },
                blockedList: {
                    include: { blocker: true },
                },
            },
        });

        if (!user) {
            throw new NotFoundException('المستخدم غير موجود');
        }

        const blockedUsers = [
            ...user.blockList.map((b) => b.blocked),
            ...user.blockedList.map((b) => b.blocker),
        ];

        return blockedUsers;
    }

    async getUserNotifications(id: number): Promise<any[]> {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: {
                Notification: {
                    orderBy: { createdAt: 'desc' },
                    include: {
                        action: true,
                    },
                },
            },
        });

        if (!user) {
            throw new NotFoundException('المستخدم غير موجود');
        }

        return user.Notification;
    }

    async getUserOrders(id: number): Promise<any[]> {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: {
                Order: {
                    orderBy: { createdAt: 'desc' },
                    include: {
                        items: {
                            include: {
                                product: true,
                                variant: true,
                            },
                        },
                    },
                },
            },
        });

        if (!user) {
            throw new NotFoundException('المستخدم غير موجود');
        }

        return user.Order;
    }

    async getUserAddresses(id: number): Promise<any[]> {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: {
                Address: true,
            },
        });

        if (!user) {
            throw new NotFoundException('المستخدم غير موجود');
        }

        return user.Address;
    }

    async getUserMetrics(id: number): Promise<any> {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: {
                AthleteMetrics: true,
            },
        });

        if (!user) {
            throw new NotFoundException('المستخدم غير موجود');
        }

        return user.AthleteMetrics;
    }

    async getUserSocialMedia(id: number): Promise<any[]> {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: {
                SocialMedia: true,
            },
        });

        if (!user) {
            throw new NotFoundException('المستخدم غير موجود');
        }

        return user.SocialMedia;
    }

    async getUserProfessionalAchievements(id: number): Promise<any[]> {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: {
                ProfessionalAchievement: true,
            },
        });

        if (!user) {
            throw new NotFoundException('المستخدم غير موجود');
        }

        return user.ProfessionalAchievement;
    }
} 