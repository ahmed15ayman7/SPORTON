import { User, UserBehavior, UserStatus, } from '@prisma/client';
/**
* توثيق نقاط النهاية API
* هذا الملف يحتوي على توثيق كامل لجميع نقاط النهاية API في النظام
*/

// تعريف الأنواع الأساسية
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface ApiEndpoint {
    method: HttpMethod;
    path: string;
    description: string;
    parameters?: {
        path?: Record<string, string>;
        query?: Record<string, string>;
        body?: Record<string, any>;
    };
    response?: any;
    example?: {
        request?: any;
        response?: any;
    };
}

// تعريف الكلاس الرئيسي للـ API
export class ApiClient {
    private static baseURL: string = 'http://localhost:3000';

    /**
     * تكوين المعاملات للروابط
     * @param params المعاملات المراد إضافتها للرابط
     * @returns رابط مع المعاملات المضافة
     */
    private static configureParams(params?: Record<string, any>): string {
        if (!params) return '';
        return Object.entries(params)
            .filter(([_, value]) => value !== undefined && value !== null)
            .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
            .join('&');
    }

    /**
     * التسجيل والدخول
     */
    static auth = {
        /**
         * التسجيل
         */
        signup: (data: User) => ({
            method: 'POST',
            path: '/auth/signup',
            description: 'التسجيل',
            parameters: {
                body: data
            }
        }),
        /**
         * الدخول
         */
        login: (data: { email: string, password: string }) => ({
            method: 'POST',
            path: '/auth/login',
            description: 'الدخول',
            parameters: {
                body: data
            }
        }),
        /**
         * الخروج
         */
        logout: () => ({
            method: 'POST',
            path: '/auth/logout',
            description: 'الخروج'
        }),
        /**
         * التحقق من التوكن
         */
        verifyToken: () => ({
            method: 'POST',
            path: '/auth/verify-token',
            description: 'التحقق من التوكن'
        }),
        /**
         * التحقق من البريد الإلكتروني
         * @example
         * const data = {
         *   code: "123456"
         * };
         * await ApiClient.auth.verifyEmail(data);
         */
        verifyPhone: (data: { code: string }) => ({
            method: 'POST',
            path: '/auth/verify-phone',
            description: 'التحقق من الهاتف',
            parameters: {
                body: data
            }
        }),
        /**
         * إعادة تعيين كلمة المرور
         */
        resetPassword: (data: { email: string, newPassword: string, oldPassword: string }) => ({
            method: 'POST',
            path: '/auth/reset-password',
            description: 'إعادة تعيين كلمة المرور',
            parameters: {
                body: data
            }
        })

    };
    /**
     * المستخدم 
     */
    static user = {
        /**
         * إضافة مستخدم جديد
         * @example
         * const data = {
         *   name: "أحمد محمد",
         *   email: "ahmed@example.com",
         *   password: "password123"
         * };
         * await ApiClient.user.create(data);
         */
        create: (data: User) => ({
            method: 'POST',
            path: '/user',
            description: 'إضافة مستخدم جديد',
            parameters: {
                body: data
            }
        }),
        /**
         * الحصول على جميع المستخدمين
         * @example
         * const users = await ApiClient.user.findAll();
         */
        findAll: () => ({
            method: 'GET',
            path: '/user',
            description: 'الحصول على جميع المستخدمين'
        }),
        /**
         * الحصول على مستخدم بالايدي
         * @example
         * const user = await ApiClient.user.findOne("123");
         */
        findOne: (id: string) => ({
            method: 'GET',
            path: `/user/${id}`,
            description: 'الحصول على مستخدم بالايدي',
            parameters: {
                path: { id }
            }
        }),
        /**
         * تحديث معلومات المستخدم
         * @example
         * const data = {
         *   name: "أحمد محمد",
         *   email: "ahmed@example.com"
         * };
         * await ApiClient.user.update("123", data);
         */
        update: (id: string, data: User) => ({
            method: 'PUT',
            path: `/user/${id}`,
            description: 'تحديث معلومات المستخدم',
            parameters: {
                path: { id },
                body: data
            }
        }),
        /**
         * حذف مستخدم بالايدي
         * @example
         * await ApiClient.user.delete("123");
         */
        delete: (id: string) => ({
            method: 'DELETE',
            path: `/user/${id}`,
            description: 'حذف مستخدم بالايدي',
            parameters: {
                path: { id }
            }
        })
    };
    /**
     * تجربة A/B
     */
    static abTest = {
        /**
         * إضافة تجربة A/B جديدة
         * @example
         * const data = {
         *   name: "تجربة تصميم جديد",
         *   description: "اختبار تصميم جديد للصفحة الرئيسية",
         *   variants: ["A", "B"]
         * };
         * await ApiClient.abTest.create(data);
         */
        create: (data: any) => ({
            method: 'POST',
            path: '/ab-test',
            description: 'إضافة تجربة A/B جديدة',
            parameters: {
                body: data
            }
        }),

        /**
         * الحصول على جميع تجارب A/B
         * @example
         * await ApiClient.abTest.findAll({ search: "تصميم" });
         */
        findAll: (params?: { search?: string }) => ({
            method: 'GET',
            path: `/ab-test?${this.configureParams(params)}`,
            description: 'الحصول على جميع تجارب A/B'
        }),

        /**
         * الحصول على تفاصيل تجربة A/B معينة
         * @example
         * await ApiClient.abTest.findOne("123");
         */
        findOne: (id: string) => ({
            method: 'GET',
            path: `/ab-test/${id}`,
            description: 'الحصول على تفاصيل تجربة A/B معينة',
            parameters: {
                path: { id }
            }
        }),

        /**
         * الحصول على جميع المتغيرات لتجربة A/B معينة
         * @example
         * await ApiClient.abTest.getTestVariants("123");
         */
        getTestVariants: (id: string) => ({
            method: 'GET',
            path: `/ab-test/${id}/variants`,
            description: 'الحصول على جميع المتغيرات لتجربة A/B معينة',
            parameters: {
                path: { id }
            }
        }),

        /**
         * الحصول على جميع المقاييس لتجربة A/B معينة
         * @example
         * await ApiClient.abTest.getTestMetrics("123");
         */
        getTestMetrics: (id: string) => ({
            method: 'GET',
            path: `/ab-test/${id}/metrics`,
            description: 'الحصول على جميع المقاييس لتجربة A/B معينة',
            parameters: {
                path: { id }
            }
        }),

        /**
         * الحصول على النسخة الفائزة لتجربة A/B معينة
         * @example
         * await ApiClient.abTest.getTestWinner("123");
         */
        getTestWinner: (id: string) => ({
            method: 'GET',
            path: `/ab-test/${id}/winner`,
            description: 'الحصول على النسخة الفائزة لتجربة A/B معينة',
            parameters: {
                path: { id }
            }
        }),

        /**
         * تحديث بيانات تجربة A/B معينة
         * @example
         * const data = {
         *   name: "تجربة تصميم محدثة",
         *   description: "وصف محدث للتجربة"
         * };
         * await ApiClient.abTest.update("123", data);
         */
        update: (id: string, data: any) => ({
            method: 'PATCH',
            path: `/ab-test/${id}`,
            description: 'تحديث بيانات تجربة A/B معينة',
            parameters: {
                path: { id },
                body: data
            }
        }),

        /**
         * حذف تجربة A/B معينة
         * @example
         * await ApiClient.abTest.remove("123");
         */
        remove: (id: string) => ({
            method: 'DELETE',
            path: `/ab-test/${id}`,
            description: 'حذف تجربة A/B معينة',
            parameters: {
                path: { id }
            }
        })
    };

    /**
     * تحليلات الإعلانات
     */
    static adAnalytics = {
        /**
         * إنشاء تحليلات إعلان جديد
         * @example
         * const data = {
         *   adId: "123",
         *   impressions: 0,
         *   clicks: 0,
         *   conversions: 0
         * };
         * await ApiClient.adAnalytics.create(data);
         */
        create: (data: any) => ({
            method: 'POST',
            path: '/ad-analytics',
            description: 'إنشاء تحليلات إعلان جديد',
            parameters: {
                body: data
            }
        }),

        /**
         * الحصول على جميع تحليلات الإعلانات
         * @example
         * await ApiClient.adAnalytics.findAll({ search: "إعلان" });
         */
        findAll: (params?: { search?: string }) => ({
            method: 'GET',
            path: `/ad-analytics?${this.configureParams(params)}`,
            description: 'الحصول على جميع تحليلات الإعلانات'
        }),

        /**
         * الحصول على تفاصيل تحليلات الإعلان
         * @example
         * await ApiClient.adAnalytics.getAdAnalyticsProfile("123");
         */
        getAdAnalyticsProfile: (id: string) => ({
            method: 'GET',
            path: `/ad-analytics/profile/${id}`,
            description: 'الحصول على تفاصيل تحليلات الإعلان',
            parameters: {
                path: { id }
            }
        }),

        /**
         * الحصول على تحليلات إعلان معين
         * @example
         * await ApiClient.adAnalytics.getAdAnalytics("123");
         */
        getAdAnalytics: (adId: string) => ({
            method: 'GET',
            path: `/ad-analytics/ad/${adId}`,
            description: 'الحصول على تحليلات إعلان معين',
            parameters: {
                path: { adId }
            }
        }),

        /**
         * زيادة عدد التحويلات
         * @example
         * await ApiClient.adAnalytics.incrementConversions("123");
         */
        incrementConversions: (id: string) => ({
            method: 'POST',
            path: `/ad-analytics/${id}/conversion`,
            description: 'زيادة عدد التحويلات',
            parameters: {
                path: { id }
            }
        }),

        /**
         * تحديث معدل النقر
         * @example
         * await ApiClient.adAnalytics.updateCTR("123", 0.05);
         */
        updateCTR: (id: string, ctr: number) => ({
            method: 'PATCH',
            path: `/ad-analytics/${id}/ctr`,
            description: 'تحديث معدل النقر',
            parameters: {
                path: { id },
                body: { ctr }
            }
        }),

        /**
         * تحديث معدل التفاعل
         * @example
         * await ApiClient.adAnalytics.updateEngagement("123", 0.08);
         */
        updateEngagement: (id: string, engagement: number) => ({
            method: 'PATCH',
            path: `/ad-analytics/${id}/engagement`,
            description: 'تحديث معدل التفاعل',
            parameters: {
                path: { id },
                body: { engagement }
            }
        }),

        /**
         * زيادة عدد الوصول
         * @example
         * await ApiClient.adAnalytics.incrementReach("123");
         */
        incrementReach: (id: string) => ({
            method: 'POST',
            path: `/ad-analytics/${id}/reach`,
            description: 'زيادة عدد الوصول',
            parameters: {
                path: { id }
            }
        }),

        /**
         * تحديث تحليلات الإعلان
         * @example
         * const data = {
         *   impressions: 1000,
         *   clicks: 50,
         *   conversions: 5
         * };
         * await ApiClient.adAnalytics.update("123", data);
         */
        update: (id: string, data: any) => ({
            method: 'PATCH',
            path: `/ad-analytics/${id}`,
            description: 'تحديث تحليلات الإعلان',
            parameters: {
                path: { id },
                body: data
            }
        }),

        /**
         * حذف تحليلات الإعلان
         * @example
         * await ApiClient.adAnalytics.remove("123");
         */
        remove: (id: string) => ({
            method: 'DELETE',
            path: `/ad-analytics/${id}`,
            description: 'حذف تحليلات الإعلان',
            parameters: {
                path: { id }
            }
        })
    };

    /**
     * استهداف الإعلانات
     */
    static adTargeting = {
        /**
         * إضافة استهداف إعلان جديد
         * @example
         * const data = {
         *   adId: "123",
         *   interests: ["رياضة", "لياقة بدنية"],
         *   behaviors: ["مشاهدة مباريات", "شراء معدات رياضية"]
         * };
         * await ApiClient.adTargeting.create(data);
         */
        create: (data: any) => ({
            method: 'POST',
            path: '/ad-targeting',
            description: 'إضافة استهداف إعلان جديد',
            parameters: {
                body: data
            }
        }),

        /**
         * الحصول على جميع استهدافات الإعلانات
         * @example
         * await ApiClient.adTargeting.findAll({ search: "رياضة" });
         */
        findAll: (params?: { search?: string }) => ({
            method: 'GET',
            path: `/ad-targeting?${this.configureParams(params)}`,
            description: 'الحصول على جميع استهدافات الإعلانات'
        }),

        /**
         * الحصول على تفاصيل استهداف إعلان معين
         * @example
         * await ApiClient.adTargeting.findOne("123");
         */
        findOne: (id: string) => ({
            method: 'GET',
            path: `/ad-targeting/${id}`,
            description: 'الحصول على تفاصيل استهداف إعلان معين',
            parameters: {
                path: { id }
            }
        }),

        /**
         * الحصول على جميع استهدافات الإعلانات لإعلان معين
         * @example
         * await ApiClient.adTargeting.getAdTargeting("123");
         */
        getAdTargeting: (adId: string) => ({
            method: 'GET',
            path: `/ad-targeting/ad/${adId}`,
            description: 'الحصول على جميع استهدافات الإعلانات لإعلان معين',
            parameters: {
                path: { adId }
            }
        }),

        /**
         * الحصول على جميع استهدافات الإعلانات حسب الاهتمامات
         * @example
         * await ApiClient.adTargeting.getTargetingByInterests(["رياضة", "لياقة بدنية"]);
         */
        getTargetingByInterests: (interests: string[]) => ({
            method: 'GET',
            path: `/ad-targeting/interests?interests=${interests.join(',')}`,
            description: 'الحصول على جميع استهدافات الإعلانات حسب الاهتمامات',
            parameters: {
                query: { interests: interests.join(',') }
            }
        }),

        /**
         * الحصول على جميع استهدافات الإعلانات حسب السلوكيات
         * @example
         * await ApiClient.adTargeting.getTargetingByBehaviors(["مشاهدة مباريات", "شراء معدات"]);
         */
        getTargetingByBehaviors: (behaviors: string[]) => ({
            method: 'GET',
            path: `/ad-targeting/behaviors?behaviors=${behaviors.join(',')}`,
            description: 'الحصول على جميع استهدافات الإعلانات حسب السلوكيات',
            parameters: {
                query: { behaviors: behaviors.join(',') }
            }
        }),

        /**
         * الحصول على أداء استهداف إعلان معين
         * @example
         * await ApiClient.adTargeting.getTargetingPerformance("123");
         */
        getTargetingPerformance: (id: string) => ({
            method: 'GET',
            path: `/ad-targeting/${id}/performance`,
            description: 'الحصول على أداء استهداف إعلان معين',
            parameters: {
                path: { id }
            }
        }),

        /**
         * تحديث بيانات استهداف إعلان معين
         * @example
         * const data = {
         *   interests: ["رياضة", "لياقة بدنية", "صحة"],
         *   behaviors: ["مشاهدة مباريات", "شراء معدات", "ممارسة رياضة"]
         * };
         * await ApiClient.adTargeting.update("123", data);
         */
        update: (id: string, data: any) => ({
            method: 'PATCH',
            path: `/ad-targeting/${id}`,
            description: 'تحديث بيانات استهداف إعلان معين',
            parameters: {
                path: { id },
                body: data
            }
        }),

        /**
         * حذف استهداف إعلان معين
         * @example
         * await ApiClient.adTargeting.remove("123");
         */
        remove: (id: string) => ({
            method: 'DELETE',
            path: `/ad-targeting/${id}`,
            description: 'حذف استهداف إعلان معين',
            parameters: {
                path: { id }
            }
        }),

        /**
         * تحسين استهداف الإعلان
         * @example
         * await ApiClient.adTargeting.optimizeTargeting("123");
         */
        optimizeTargeting: (id: string) => ({
            method: 'POST',
            path: `/ad-targeting/optimize/${id}`,
            description: 'تحسين استهداف الإعلان',
            parameters: {
                path: { id }
            }
        })
    };

    /**
     * الإعلانات
     */
    static advertisements = {
        /**
         * إنشاء إعلان جديد
         * @example
         * const data = {
         *   title: "إعلان عن منتج رياضي",
         *   description: "وصف المنتج الرياضي",
         *   sponsorId: "123",
         *   sport: "كرة القدم",
         *   role: "لاعب"
         * };
         * await ApiClient.advertisements.create(data);
         */
        create: (data: any) => ({
            method: 'POST',
            path: '/advertisements',
            description: 'إنشاء إعلان جديد',
            parameters: {
                body: data
            }
        }),

        /**
         * الحصول على جميع الإعلانات
         * @example
         * await ApiClient.advertisements.findAll({ search: "رياضة" });
         */
        findAll: (params?: { search?: string }) => ({
            method: 'GET',
            path: `/advertisements?${this.configureParams(params)}`,
            description: 'الحصول على جميع الإعلانات'
        }),

        /**
         * الحصول على تفاصيل الإعلان
         * @example
         * await ApiClient.advertisements.getAdvertisementProfile("123");
         */
        getAdvertisementProfile: (id: string) => ({
            method: 'GET',
            path: `/advertisements/profile/${id}`,
            description: 'الحصول على تفاصيل الإعلان',
            parameters: {
                path: { id }
            }
        }),

        /**
         * الحصول على إعلانات المعلن
         * @example
         * await ApiClient.advertisements.getSponsorAdvertisements("123");
         */
        getSponsorAdvertisements: (sponsorId: string) => ({
            method: 'GET',
            path: `/advertisements/sponsor/${sponsorId}`,
            description: 'الحصول على إعلانات المعلن',
            parameters: {
                path: { sponsorId }
            }
        }),

        /**
         * الحصول على الإعلانات النشطة
         * @example
         * await ApiClient.advertisements.getActiveAdvertisements();
         */
        getActiveAdvertisements: () => ({
            method: 'GET',
            path: '/advertisements/active',
            description: 'الحصول على الإعلانات النشطة'
        }),

        /**
         * الحصول على إعلانات رياضة معينة
         * @example
         * await ApiClient.advertisements.getAdvertisementsBySport("كرة القدم");
         */
        getAdvertisementsBySport: (sport: string) => ({
            method: 'GET',
            path: `/advertisements/sport/${sport}`,
            description: 'الحصول على إعلانات رياضة معينة',
            parameters: {
                path: { sport }
            }
        }),

        /**
         * الحصول على إعلانات دور معين
         * @example
         * await ApiClient.advertisements.getAdvertisementsByRole("لاعب");
         */
        getAdvertisementsByRole: (role: string) => ({
            method: 'GET',
            path: `/advertisements/role/${role}`,
            description: 'الحصول على إعلانات دور معين',
            parameters: {
                path: { role }
            }
        }),

        /**
         * زيادة عدد النقرات
         * @example
         * await ApiClient.advertisements.incrementClicks("123");
         */
        incrementClicks: (id: string) => ({
            method: 'POST',
            path: `/advertisements/${id}/click`,
            description: 'زيادة عدد النقرات',
            parameters: {
                path: { id }
            }
        }),

        /**
         * زيادة عدد المشاهدات
         * @example
         * await ApiClient.advertisements.incrementImpressions("123");
         */
        incrementImpressions: (id: string) => ({
            method: 'POST',
            path: `/advertisements/${id}/impression`,
            description: 'زيادة عدد المشاهدات',
            parameters: {
                path: { id }
            }
        }),

        /**
         * تحديث الإعلان
         * @example
         * const data = {
         *   title: "إعلان محدث",
         *   description: "وصف محدث للإعلان"
         * };
         * await ApiClient.advertisements.update("123", data);
         */
        update: (id: string, data: any) => ({
            method: 'PATCH',
            path: `/advertisements/${id}`,
            description: 'تحديث الإعلان',
            parameters: {
                path: { id },
                body: data
            }
        }),

        /**
         * حذف الإعلان
         * @example
         * await ApiClient.advertisements.remove("123");
         */
        remove: (id: string) => ({
            method: 'DELETE',
            path: `/advertisements/${id}`,
            description: 'حذف الإعلان',
            parameters: {
                path: { id }
            }
        })
    };

    /**
     * المقالات
     */
    static articles = {
        /**
         * إنشاء مقال جديد
         * @example
         * const data = {
         *   title: "عنوان المقال",
         *   content: "محتوى المقال",
         *   authorId: "123",
         *   categoryId: "456"
         * };
         * await ApiClient.articles.create(data);
         */
        create: (data: any) => ({
            method: 'POST',
            path: '/articles',
            description: 'إنشاء مقال جديد',
            parameters: {
                body: data
            }
        }),

        /**
         * الحصول على جميع المقالات
         * @example
         * await ApiClient.articles.findAll({ search: "رياضة" });
         */
        findAll: (params?: { search?: string }) => ({
            method: 'GET',
            path: `/articles?${this.configureParams(params)}`,
            description: 'الحصول على جميع المقالات'
        }),

        /**
         * الحصول على المقالات الأكثر مشاهدة
         * @example
         * await ApiClient.articles.getPopularArticles({ limit: 10 });
         */
        getPopularArticles: (params?: { limit?: number }) => ({
            method: 'GET',
            path: `/articles/popular?${this.configureParams(params)}`,
            description: 'الحصول على المقالات الأكثر مشاهدة'
        }),

        /**
         * الحصول على تفاصيل المقال
         * @example
         * await ApiClient.articles.getArticleProfile("123");
         */
        getArticleProfile: (id: string) => ({
            method: 'GET',
            path: `/articles/profile/${id}`,
            description: 'الحصول على تفاصيل المقال',
            parameters: {
                path: { id }
            }
        }),

        /**
         * الحصول على مقالات المستخدم
         * @example
         * await ApiClient.articles.getUserArticles("123");
         */
        getUserArticles: (userId: string) => ({
            method: 'GET',
            path: `/articles/user/${userId}`,
            description: 'الحصول على مقالات المستخدم',
            parameters: {
                path: { userId }
            }
        }),

        /**
         * الحصول على مقالات الفئة
         * @example
         * await ApiClient.articles.getCategoryArticles("123");
         */
        getCategoryArticles: (categoryId: string) => ({
            method: 'GET',
            path: `/articles/category/${categoryId}`,
            description: 'الحصول على مقالات الفئة',
            parameters: {
                path: { categoryId }
            }
        }),

        /**
         * تحديث المقال
         * @example
         * const data = {
         *   title: "عنوان محدث",
         *   content: "محتوى محدث"
         * };
         * await ApiClient.articles.update("123", data);
         */
        update: (id: string, data: any) => ({
            method: 'PATCH',
            path: `/articles/${id}`,
            description: 'تحديث المقال',
            parameters: {
                path: { id },
                body: data
            }
        }),

        /**
         * حذف المقال
         * @example
         * await ApiClient.articles.remove("123");
         */
        remove: (id: string) => ({
            method: 'DELETE',
            path: `/articles/${id}`,
            description: 'حذف المقال',
            parameters: {
                path: { id }
            }
        }),

        /**
         * زيادة عدد المشاهدات
         * @example
         * await ApiClient.articles.incrementViews("123");
         */
        incrementViews: (id: string) => ({
            method: 'POST',
            path: `/articles/${id}/view`,
            description: 'زيادة عدد المشاهدات',
            parameters: {
                path: { id }
            }
        })
    };

    /**
     * مقاييس الرياضيين
     */
    static athleteMetrics = {
        /**
         * الحصول على ملف مقاييس الرياضي مع جميع العلاقات
         * @example
         * await ApiClient.athleteMetrics.getAthleteMetricsProfile("123");
         */
        getAthleteMetricsProfile: (id: string) => ({
            method: 'GET',
            path: `/athlete-metrics/profile/${id}`,
            description: 'الحصول على ملف مقاييس الرياضي مع جميع العلاقات',
            parameters: {
                path: { id }
            }
        }),

        /**
         * الحصول على مقاييس الرياضي
         * @example
         * await ApiClient.athleteMetrics.getUserAthleteMetrics("123");
         */
        getUserAthleteMetrics: (userId: string) => ({
            method: 'GET',
            path: `/athlete-metrics/user/${userId}`,
            description: 'الحصول على مقاييس الرياضي',
            parameters: {
                path: { userId }
            }
        }),

        /**
         * الحصول على الرياضيين حسب نطاق الطول
         * @example
         * await ApiClient.athleteMetrics.getAthletesByHeightRange({ minHeight: 170, maxHeight: 190 });
         */
        getAthletesByHeightRange: (params: { minHeight: number; maxHeight: number }) => ({
            method: 'GET',
            path: `/athlete-metrics/height-range?${this.configureParams(params)}`,
            description: 'الحصول على الرياضيين حسب نطاق الطول'
        }),

        /**
         * الحصول على الرياضيين حسب نطاق الوزن
         * @example
         * await ApiClient.athleteMetrics.getAthletesByWeightRange({ minWeight: 70, maxWeight: 90 });
         */
        getAthletesByWeightRange: (params: { minWeight: number; maxWeight: number }) => ({
            method: 'GET',
            path: `/athlete-metrics/weight-range?${this.configureParams(params)}`,
            description: 'الحصول على الرياضيين حسب نطاق الوزن'
        }),

        /**
         * إنشاء مقاييس رياضي جديد
         * @example
         * const data = {
         *   userId: "123",
         *   height: 180,
         *   weight: 75,
         *   position: "مهاجم"
         * };
         * await ApiClient.athleteMetrics.create(data);
         */
        create: (data: any) => ({
            method: 'POST',
            path: '/athlete-metrics',
            description: 'إنشاء مقاييس رياضي جديد',
            parameters: {
                body: data
            }
        }),

        /**
         * تحديث مقاييس رياضي موجود
         * @example
         * const data = {
         *   height: 185,
         *   weight: 80,
         *   position: "وسط"
         * };
         * await ApiClient.athleteMetrics.update("123", data);
         */
        update: (id: string, data: any) => ({
            method: 'PUT',
            path: `/athlete-metrics/${id}`,
            description: 'تحديث مقاييس رياضي موجود',
            parameters: {
                path: { id },
                body: data
            }
        }),

        /**
         * تحديث مقاييس رياضي حسب معرف المستخدم
         * @example
         * const data = {
         *   height: 185,
         *   weight: 80,
         *   position: "وسط"
         * };
         * await ApiClient.athleteMetrics.updateAthleteMetrics("123", data);
         */
        updateAthleteMetrics: (userId: string, data: any) => ({
            method: 'PUT',
            path: `/athlete-metrics/user/${userId}`,
            description: 'تحديث مقاييس رياضي حسب معرف المستخدم',
            parameters: {
                path: { userId },
                body: data
            }
        })
    };

    /**
     * التوفر
     */
    static availabilities = {
        /**
         * الحصول على ملف التوفر مع جميع العلاقات
         * @example
         * await ApiClient.availabilities.getAvailabilityProfile("123");
         */
        getAvailabilityProfile: (id: string) => ({
            method: 'GET',
            path: `/availabilities/profile/${id}`,
            description: 'الحصول على ملف التوفر مع جميع العلاقات',
            parameters: {
                path: { id }
            }
        }),

        /**
         * الحصول على توفر المستخدم
         * @example
         * await ApiClient.availabilities.getUserAvailability("123");
         */
        getUserAvailability: (userId: string) => ({
            method: 'GET',
            path: `/availabilities/user/${userId}`,
            description: 'الحصول على توفر المستخدم',
            parameters: {
                path: { userId }
            }
        }),

        /**
         * الحصول على المستخدمين المتاحين
         * @example
         * await ApiClient.availabilities.getAvailableUsers();
         */
        getAvailableUsers: () => ({
            method: 'GET',
            path: '/availabilities/available',
            description: 'الحصول على المستخدمين المتاحين'
        }),

        /**
         * الحصول على المستخدمين حسب حالة التوفر
         * @example
         * await ApiClient.availabilities.getUsersByStatus("متاح");
         */
        getUsersByStatus: (status: string) => ({
            method: 'GET',
            path: `/availabilities/status/${status}`,
            description: 'الحصول على المستخدمين حسب حالة التوفر',
            parameters: {
                path: { status }
            }
        }),

        /**
         * إنشاء توفر جديد
         * @example
         * const data = {
         *   userId: "123",
         *   status: "متاح",
         *   startTime: "2024-03-28T10:00:00Z",
         *   endTime: "2024-03-28T18:00:00Z"
         * };
         * await ApiClient.availabilities.create(data);
         */
        create: (data: any) => ({
            method: 'POST',
            path: '/availabilities',
            description: 'إنشاء توفر جديد',
            parameters: {
                body: data
            }
        }),

        /**
         * تحديث توفر موجود
         * @example
         * const data = {
         *   status: "مشغول",
         *   startTime: "2024-03-28T14:00:00Z",
         *   endTime: "2024-03-28T22:00:00Z"
         * };
         * await ApiClient.availabilities.update("123", data);
         */
        update: (id: string, data: any) => ({
            method: 'PUT',
            path: `/availabilities/${id}`,
            description: 'تحديث توفر موجود',
            parameters: {
                path: { id },
                body: data
            }
        })
    };

    /**
     * التزكيات
     */
    static endorsements = {
        /**
         * الحصول على ملف التزكية مع جميع العلاقات
         * @example
         * await ApiClient.endorsements.getEndorsementProfile("123");
         */
        getEndorsementProfile: (id: string) => ({
            method: 'GET',
            path: `/endorsements/profile/${id}`,
            description: 'الحصول على ملف التزكية مع جميع العلاقات',
            parameters: {
                path: { id }
            }
        }),

        /**
         * الحصول على تزكيات المستخدم
         * @example
         * await ApiClient.endorsements.getUserEndorsements("123");
         */
        getUserEndorsements: (userId: string) => ({
            method: 'GET',
            path: `/endorsements/user/${userId}`,
            description: 'الحصول على تزكيات المستخدم',
            parameters: {
                path: { userId }
            }
        }),

        /**
         * الحصول على التزكيات التي قدمها المستخدم
         * @example
         * await ApiClient.endorsements.getUserGivenEndorsements("123");
         */
        getUserGivenEndorsements: (userId: string) => ({
            method: 'GET',
            path: `/endorsements/given/${userId}`,
            description: 'الحصول على التزكيات التي قدمها المستخدم',
            parameters: {
                path: { userId }
            }
        }),

        /**
         * الحصول على تزكيات لمهارة معينة
         * @example
         * await ApiClient.endorsements.getSkillEndorsements("كرة القدم");
         */
        getSkillEndorsements: (skill: string) => ({
            method: 'GET',
            path: `/endorsements/skill/${skill}`,
            description: 'الحصول على تزكيات لمهارة معينة',
            parameters: {
                path: { skill }
            }
        }),

        /**
         * إنشاء تزكية جديدة
         * @example
         * const data = {
         *   userId: "123",
         *   endorsedUserId: "456",
         *   skill: "كرة القدم",
         *   comment: "لاعب ممتاز"
         * };
         * await ApiClient.endorsements.create(data);
         */
        create: (data: any) => ({
            method: 'POST',
            path: '/endorsements',
            description: 'إنشاء تزكية جديدة',
            parameters: {
                body: data
            }
        }),

        /**
         * تحديث تزكية موجودة
         * @example
         * const data = {
         *   skill: "كرة القدم",
         *   comment: "لاعب ممتاز ومتميز"
         * };
         * await ApiClient.endorsements.update("123", data);
         */
        update: (id: string, data: any) => ({
            method: 'PUT',
            path: `/endorsements/${id}`,
            description: 'تحديث تزكية موجودة',
            parameters: {
                path: { id },
                body: data
            }
        })
    };

    /**
     * أعضاء الفريق
     */
    static teamMembers = {
        /**
         * الحصول على ملف عضو الفريق مع جميع العلاقات
         * @example
         * await ApiClient.teamMembers.getTeamMemberProfile("123");
         */
        getTeamMemberProfile: (id: string) => ({
            method: 'GET',
            path: `/team-members/profile/${id}`,
            description: 'الحصول على ملف عضو الفريق مع جميع العلاقات',
            parameters: {
                path: { id }
            }
        }),

        /**
         * الحصول على أعضاء الفريق
         * @example
         * await ApiClient.teamMembers.getTeamMembers("123");
         */
        getTeamMembers: (teamId: string) => ({
            method: 'GET',
            path: `/team-members/team/${teamId}`,
            description: 'الحصول على أعضاء الفريق',
            parameters: {
                path: { teamId }
            }
        }),

        /**
         * الحصول على عضوية الفرق للمستخدم
         * @example
         * await ApiClient.teamMembers.getUserTeamMemberships("123");
         */
        getUserTeamMemberships: (userId: string) => ({
            method: 'GET',
            path: `/team-members/user/${userId}`,
            description: 'الحصول على عضوية الفرق للمستخدم',
            parameters: {
                path: { userId }
            }
        }),

        /**
         * الحصول على عضوية الفرق الحالية للمستخدم
         * @example
         * await ApiClient.teamMembers.getCurrentTeamMemberships("123");
         */
        getCurrentTeamMemberships: (userId: string) => ({
            method: 'GET',
            path: `/team-members/current/${userId}`,
            description: 'الحصول على عضوية الفرق الحالية للمستخدم',
            parameters: {
                path: { userId }
            }
        }),

        /**
         * إنشاء عضو فريق جديد
         * @example
         * const data = {
         *   userId: "123",
         *   teamId: "456",
         *   role: "لاعب",
         *   startDate: "2024-03-28"
         * };
         * await ApiClient.teamMembers.create(data);
         */
        create: (data: any) => ({
            method: 'POST',
            path: '/team-members',
            description: 'إنشاء عضو فريق جديد',
            parameters: {
                body: data
            }
        }),

        /**
         * تحديث عضو فريق
         * @example
         * const data = {
         *   role: "كابتن",
         *   startDate: "2024-03-28",
         *   endDate: "2024-12-31"
         * };
         * await ApiClient.teamMembers.update("123", data);
         */
        update: (id: string, data: any) => ({
            method: 'PUT',
            path: `/team-members/${id}`,
            description: 'تحديث عضو فريق',
            parameters: {
                path: { id },
                body: data
            }
        })
    };

    /**
     * الفرق
     */
    static teams = {
        /**
         * الحصول على قائمة الفرق
         * @example
         * const teams = await ApiClient.teams.getAll();
         */
        getAll: () => ({
            method: 'GET',
            path: '/teams',
            description: 'الحصول على قائمة الفرق'
        }),

        /**
         * إنشاء فريق جديد
         * @example
         * const teamData = {
         *   name: "فريق النصر",
         *   description: "فريق كرة قدم محترف",
         *   sport: "كرة القدم",
         *   level: "محترف"
         * };
         * await ApiClient.teams.create(teamData);
         */
        create: (data: any) => ({
            method: 'POST',
            path: '/teams',
            description: 'إنشاء فريق جديد',
            parameters: {
                body: data
            }
        }),

        /**
         * تحديث معلومات الفريق
         * @example
         * const teamData = {
         *   name: "فريق النصر الرياضي",
         *   description: "فريق كرة قدم محترف في الدرجة الأولى"
         * };
         * await ApiClient.teams.update(1, teamData);
         */
        update: (id: number, data: any) => ({
            method: 'PUT',
            path: `/teams/${id}`,
            description: 'تحديث معلومات الفريق',
            parameters: {
                body: data
            }
        }),

        /**
         * حذف فريق
         * @example
         * await ApiClient.teams.delete(1);
         */
        delete: (id: number) => ({
            method: 'DELETE',
            path: `/teams/${id}`,
            description: 'حذف فريق'
        })
    };

    /**
     * التعليم
     */
    static education = {
        /**
         * الحصول على قائمة المؤهلات التعليمية
         * @example
         * const education = await ApiClient.education.getAll();
         */
        getAll: () => ({
            method: 'GET',
            path: '/education',
            description: 'الحصول على قائمة المؤهلات التعليمية'
        }),

        /**
         * إضافة مؤهل تعليمي جديد
         * @example
         * const educationData = {
         *   institution: "جامعة الرياض",
         *   degree: "بكالوريوس",
         *   field: "علوم الرياضة",
         *   startDate: "2020-09-01",
         *   endDate: "2024-06-30"
         * };
         * await ApiClient.education.create(educationData);
         */
        create: (data: any) => ({
            method: 'POST',
            path: '/education',
            description: 'إضافة مؤهل تعليمي جديد',
            parameters: {
                body: data
            }
        }),

        /**
         * تحديث مؤهل تعليمي
         * @example
         * const educationData = {
         *   institution: "جامعة الرياض الرياضية",
         *   degree: "بكالوريوس",
         *   field: "علوم الرياضة والتدريب"
         * };
         * await ApiClient.education.update(1, educationData);
         */
        update: (id: number, data: any) => ({
            method: 'PUT',
            path: `/education/${id}`,
            description: 'تحديث مؤهل تعليمي',
            parameters: {
                body: data
            }
        }),

        /**
         * حذف مؤهل تعليمي
         * @example
         * await ApiClient.education.delete(1);
         */
        delete: (id: number) => ({
            method: 'DELETE',
            path: `/education/${id}`,
            description: 'حذف مؤهل تعليمي'
        })
    };

    /**
     * الخبرات
     */
    static experiences = {
        /**
         * الحصول على ملف الخبرة مع جميع العلاقات
         * @example
         * await ApiClient.experiences.getExperienceProfile("123");
         */
        getExperienceProfile: (id: string) => ({
            method: 'GET',
            path: `/experiences/profile/${id}`,
            description: 'الحصول على ملف الخبرة مع جميع العلاقات',
            parameters: {
                path: { id }
            }
        }),

        /**
         * الحصول على خبرات المستخدم
         * @example
         * await ApiClient.experiences.getUserExperiences("123");
         */
        getUserExperiences: (userId: string) => ({
            method: 'GET',
            path: `/experiences/user/${userId}`,
            description: 'الحصول على خبرات المستخدم',
            parameters: {
                path: { userId }
            }
        }),

        /**
         * الحصول على الخبرات الحالية للمستخدم
         * @example
         * await ApiClient.experiences.getCurrentExperiences("123");
         */
        getCurrentExperiences: (userId: string) => ({
            method: 'GET',
            path: `/experiences/current/${userId}`,
            description: 'الحصول على الخبرات الحالية للمستخدم',
            parameters: {
                path: { userId }
            }
        }),

        /**
         * إنشاء خبرة جديدة
         * @example
         * const data = {
         *   userId: "123",
         *   company: "نادي النصر",
         *   position: "لاعب محترف",
         *   description: "لاعب في الفريق الأول",
         *   startDate: "2020-01-01",
         *   endDate: "2024-12-31"
         * };
         * await ApiClient.experiences.create(data);
         */
        create: (data: any) => ({
            method: 'POST',
            path: '/experiences',
            description: 'إنشاء خبرة جديدة',
            parameters: {
                body: data
            }
        }),

        /**
         * تحديث خبرة
         * @example
         * const data = {
         *   company: "نادي النصر الرياضي",
         *   position: "كابتن الفريق",
         *   description: "كابتن الفريق الأول"
         * };
         * await ApiClient.experiences.update("123", data);
         */
        update: (id: string, data: any) => ({
            method: 'PUT',
            path: `/experiences/${id}`,
            description: 'تحديث خبرة',
            parameters: {
                path: { id },
                body: data
            }
        })
    };

    /**
     * الشهادات
     */
    static certificates = {
        /**
         * الحصول على ملف الشهادة مع جميع العلاقات
         * @example
         * await ApiClient.certificates.getCertificateProfile("123");
         */
        getCertificateProfile: (id: string) => ({
            method: 'GET',
            path: `/certificates/profile/${id}`,
            description: 'الحصول على ملف الشهادة مع جميع العلاقات',
            parameters: {
                path: { id }
            }
        }),

        /**
         * الحصول على شهادات المستخدم
         * @example
         * await ApiClient.certificates.getUserCertificates("123");
         */
        getUserCertificates: (userId: string) => ({
            method: 'GET',
            path: `/certificates/user/${userId}`,
            description: 'الحصول على شهادات المستخدم',
            parameters: {
                path: { userId }
            }
        }),

        /**
         * الحصول على الشهادات المعتمدة للمستخدم
         * @example
         * await ApiClient.certificates.getVerifiedCertificates("123");
         */
        getVerifiedCertificates: (userId: string) => ({
            method: 'GET',
            path: `/certificates/verified/${userId}`,
            description: 'الحصول على الشهادات المعتمدة للمستخدم',
            parameters: {
                path: { userId }
            }
        }),

        /**
         * إنشاء شهادة جديدة
         * @example
         * const data = {
         *   userId: "123",
         *   title: "شهادة تدريبية",
         *   issuer: "مركز التدريب الرياضي",
         *   issueDate: "2024-03-28",
         *   expiryDate: "2025-03-28",
         *   certificateNumber: "CERT-123"
         * };
         * await ApiClient.certificates.create(data);
         */
        create: (data: any) => ({
            method: 'POST',
            path: '/certificates',
            description: 'إنشاء شهادة جديدة',
            parameters: {
                body: data
            }
        }),

        /**
         * تحديث شهادة
         * @example
         * const data = {
         *   title: "شهادة تدريبية متقدمة",
         *   expiryDate: "2026-03-28",
         *   status: "معتمدة"
         * };
         * await ApiClient.certificates.update("123", data);
         */
        update: (id: string, data: any) => ({
            method: 'PUT',
            path: `/certificates/${id}`,
            description: 'تحديث شهادة',
            parameters: {
                path: { id },
                body: data
            }
        })
    };

    /**
     * الرعايات
     */
    static sponsorships = {
        /**
         * الحصول على ملف الرعاية مع جميع العلاقات
         * @example
         * await ApiClient.sponsorships.getSponsorshipProfile("123");
         */
        getSponsorshipProfile: (id: string) => ({
            method: 'GET',
            path: `/sponsorships/profile/${id}`,
            description: 'الحصول على ملف الرعاية مع جميع العلاقات',
            parameters: {
                path: { id }
            }
        }),

        /**
         * الحصول على رعايات الراعي
         * @example
         * await ApiClient.sponsorships.getSponsorSponsorships("123");
         */
        getSponsorSponsorships: (sponsorId: string) => ({
            method: 'GET',
            path: `/sponsorships/sponsor/${sponsorId}`,
            description: 'الحصول على رعايات الراعي',
            parameters: {
                path: { sponsorId }
            }
        }),

        /**
         * الحصول على رعايات الرياضي
         * @example
         * await ApiClient.sponsorships.getAthleteSponsorships("123");
         */
        getAthleteSponsorships: (athleteId: string) => ({
            method: 'GET',
            path: `/sponsorships/athlete/${athleteId}`,
            description: 'الحصول على رعايات الرياضي',
            parameters: {
                path: { athleteId }
            }
        }),

        /**
         * إنشاء رعاية جديدة
         * @example
         * const data = {
         *   sponsorId: "123",
         *   athleteId: "456",
         *   type: "معدات رياضية",
         *   startDate: "2024-03-28",
         *   endDate: "2025-03-28",
         *   value: 10000
         * };
         * await ApiClient.sponsorships.create(data);
         */
        create: (data: any) => ({
            method: 'POST',
            path: '/sponsorships',
            description: 'إنشاء رعاية جديدة',
            parameters: {
                body: data
            }
        }),

        /**
         * تحديث رعاية
         * @example
         * const data = {
         *   type: "رعاية كاملة",
         *   endDate: "2026-03-28",
         *   value: 15000
         * };
         * await ApiClient.sponsorships.update("123", data);
         */
        update: (id: string, data: any) => ({
            method: 'PUT',
            path: `/sponsorships/${id}`,
            description: 'تحديث رعاية',
            parameters: {
                path: { id },
                body: data
            }
        })
    };

    /**
     * الإحصائيات
     */
    static statistics = {
        /**
         * الحصول على ملف الإحصائية مع جميع العلاقات
         * @example
         * await ApiClient.statistics.getStatisticProfile("123");
         */
        getStatisticProfile: (id: string) => ({
            method: 'GET',
            path: `/statistics/profile/${id}`,
            description: 'الحصول على ملف الإحصائية مع جميع العلاقات',
            parameters: {
                path: { id }
            }
        }),

        /**
         * الحصول على إحصائيات المستخدم
         * @example
         * await ApiClient.statistics.getUserStatistic("123");
         */
        getUserStatistic: (userId: string) => ({
            method: 'GET',
            path: `/statistics/user/${userId}`,
            description: 'الحصول على إحصائيات المستخدم',
            parameters: {
                path: { userId }
            }
        }),

        /**
         * تحديث إحصائيات المستخدم
         * @example
         * const data = {
         *   matchesPlayed: 50,
         *   goalsScored: 25,
         *   assists: 15,
         *   yellowCards: 3,
         *   redCards: 0
         * };
         * await ApiClient.statistics.updateUserStatistic("123", data);
         */
        updateUserStatistic: (userId: string, data: any) => ({
            method: 'PUT',
            path: `/statistics/user/${userId}`,
            description: 'تحديث إحصائيات المستخدم',
            parameters: {
                path: { userId },
                body: data
            }
        }),

        /**
         * إنشاء إحصائية جديدة
         * @example
         * const data = {
         *   userId: "123",
         *   matchesPlayed: 50,
         *   goalsScored: 25,
         *   assists: 15,
         *   yellowCards: 3,
         *   redCards: 0
         * };
         * await ApiClient.statistics.create(data);
         */
        create: (data: any) => ({
            method: 'POST',
            path: '/statistics',
            description: 'إنشاء إحصائية جديدة',
            parameters: {
                body: data
            }
        }),

        /**
         * تحديث إحصائية
         * @example
         * const data = {
         *   matchesPlayed: 55,
         *   goalsScored: 30,
         *   assists: 18
         * };
         * await ApiClient.statistics.update("123", data);
         */
        update: (id: string, data: any) => ({
            method: 'PUT',
            path: `/statistics/${id}`,
            description: 'تحديث إحصائية',
            parameters: {
                path: { id },
                body: data
            }
        })
    };

    /**
     * فيديوهات التدريب
     */
    static trainingVideos = {
        /**
         * الحصول على ملف فيديو التدريب مع جميع العلاقات
         * @example
         * await ApiClient.trainingVideos.getTrainingVideoProfile("123");
         */
        getTrainingVideoProfile: (id: string) => ({
            method: 'GET',
            path: `/training-videos/profile/${id}`,
            description: 'الحصول على ملف فيديو التدريب مع جميع العلاقات',
            parameters: {
                path: { id }
            }
        }),

        /**
         * الحصول على فيديوهات التدريب للمستخدم
         * @example
         * await ApiClient.trainingVideos.getUserTrainingVideos("123");
         */
        getUserTrainingVideos: (userId: string) => ({
            method: 'GET',
            path: `/training-videos/user/${userId}`,
            description: 'الحصول على فيديوهات التدريب للمستخدم',
            parameters: {
                path: { userId }
            }
        }),

        /**
         * إنشاء فيديو تدريبي جديد
         * @example
         * const data = {
         *   userId: "123",
         *   title: "تمرين التسديد",
         *   description: "تمرين تحسين مهارة التسديد",
         *   videoUrl: "https://example.com/video.mp4",
         *   duration: "00:10:00",
         *   category: "مهارات أساسية"
         * };
         * await ApiClient.trainingVideos.create(data);
         */
        create: (data: any) => ({
            method: 'POST',
            path: '/training-videos',
            description: 'إنشاء فيديو تدريبي جديد',
            parameters: {
                body: data
            }
        }),

        /**
         * تحديث فيديو تدريبي
         * @example
         * const data = {
         *   title: "تمرين التسديد المتقدم",
         *   description: "تمرين تحسين مهارة التسديد المتقدمة",
         *   duration: "00:15:00"
         * };
         * await ApiClient.trainingVideos.update("123", data);
         */
        update: (id: string, data: any) => ({
            method: 'PUT',
            path: `/training-videos/${id}`,
            description: 'تحديث فيديو تدريبي',
            parameters: {
                path: { id },
                body: data
            }
        })
    };

    /**
     * التدريبات
     */
    static trainings = {
        /**
         * الحصول على ملف التدريب مع جميع العلاقات
         * @example
         * await ApiClient.trainings.getTrainingProfile("123");
         */
        getTrainingProfile: (id: string) => ({
            method: 'GET',
            path: `/trainings/profile/${id}`,
            description: 'الحصول على ملف التدريب مع جميع العلاقات',
            parameters: {
                path: { id }
            }
        }),

        /**
         * الحصول على تدريبات المدرب
         * @example
         * await ApiClient.trainings.getCoachTrainings("123");
         */
        getCoachTrainings: (coachId: string) => ({
            method: 'GET',
            path: `/trainings/coach/${coachId}`,
            description: 'الحصول على تدريبات المدرب',
            parameters: {
                path: { coachId }
            }
        }),

        /**
         * الحصول على تدريبات اللاعب
         * @example
         * await ApiClient.trainings.getPlayerTrainings("123");
         */
        getPlayerTrainings: (playerId: string) => ({
            method: 'GET',
            path: `/trainings/player/${playerId}`,
            description: 'الحصول على تدريبات اللاعب',
            parameters: {
                path: { playerId }
            }
        }),

        /**
         * إضافة لاعب إلى التدريب
         * @example
         * await ApiClient.trainings.addPlayerToTraining("123", "456");
         */
        addPlayerToTraining: (trainingId: string, playerId: string) => ({
            method: 'POST',
            path: `/trainings/${trainingId}/players/${playerId}`,
            description: 'إضافة لاعب إلى التدريب',
            parameters: {
                path: { trainingId, playerId }
            }
        }),

        /**
         * إزالة لاعب من التدريب
         * @example
         * await ApiClient.trainings.removePlayerFromTraining("123", "456");
         */
        removePlayerFromTraining: (trainingId: string, playerId: string) => ({
            method: 'DELETE',
            path: `/trainings/${trainingId}/players/${playerId}`,
            description: 'إزالة لاعب من التدريب',
            parameters: {
                path: { trainingId, playerId }
            }
        }),

        /**
         * التحقق من وجود لاعب في التدريب
         * @example
         * await ApiClient.trainings.isPlayerInTraining("123", "456");
         */
        isPlayerInTraining: (trainingId: string, playerId: string) => ({
            method: 'GET',
            path: `/trainings/check/${trainingId}/players/${playerId}`,
            description: 'التحقق من وجود لاعب في التدريب',
            parameters: {
                path: { trainingId, playerId }
            }
        }),

        /**
         * إنشاء تدريب جديد
         * @example
         * const data = {
         *   coachId: "123",
         *   title: "تدريب التسديد",
         *   description: "تدريب تحسين مهارة التسديد",
         *   startTime: "2024-03-28T10:00:00Z",
         *   endTime: "2024-03-28T12:00:00Z",
         *   location: "ملعب النادي"
         * };
         * await ApiClient.trainings.create(data);
         */
        create: (data: any) => ({
            method: 'POST',
            path: '/trainings',
            description: 'إنشاء تدريب جديد',
            parameters: {
                body: data
            }
        }),

        /**
         * تحديث تدريب
         * @example
         * const data = {
         *   title: "تدريب التسديد المتقدم",
         *   description: "تدريب تحسين مهارة التسديد المتقدمة",
         *   startTime: "2024-03-28T14:00:00Z",
         *   endTime: "2024-03-28T16:00:00Z"
         * };
         * await ApiClient.trainings.update("123", data);
         */
        update: (id: string, data: any) => ({
            method: 'PUT',
            path: `/trainings/${id}`,
            description: 'تحديث تدريب',
            parameters: {
                path: { id },
                body: data
            }
        })
    };

    /**
     * مستخدمي الغرف
     */
    static roomUsers = {
        /**
         * الحصول على ملف مستخدم الغرفة مع جميع العلاقات
         * @example
         * await ApiClient.roomUsers.getRoomUserProfile("123");
         */
        getRoomUserProfile: (id: string) => ({
            method: 'GET',
            path: `/room-users/profile/${id}`,
            description: 'الحصول على ملف مستخدم الغرفة مع جميع العلاقات',
            parameters: {
                path: { id }
            }
        }),

        /**
         * الحصول على غرف المستخدم
         * @example
         * await ApiClient.roomUsers.getUserRoomUsers("123");
         */
        getUserRoomUsers: (userId: string) => ({
            method: 'GET',
            path: `/room-users/user/${userId}`,
            description: 'الحصول على غرف المستخدم',
            parameters: {
                path: { userId }
            }
        }),

        /**
         * الحصول على مستخدمي الغرفة
         * @example
         * await ApiClient.roomUsers.getRoomUsers("123");
         */
        getRoomUsers: (roomId: string) => ({
            method: 'GET',
            path: `/room-users/room/${roomId}`,
            description: 'الحصول على مستخدمي الغرفة',
            parameters: {
                path: { roomId }
            }
        }),

        /**
         * التحقق من وجود مستخدم في الغرفة
         * @example
         * await ApiClient.roomUsers.isUserInRoom("123", "456");
         */
        isUserInRoom: (roomId: string, userId: string) => ({
            method: 'GET',
            path: `/room-users/check/${roomId}/${userId}`,
            description: 'التحقق من وجود مستخدم في الغرفة',
            parameters: {
                path: { roomId, userId }
            }
        }),

        /**
         * إنشاء مستخدم غرفة جديد
         * @example
         * const data = {
         *   userId: "123",
         *   roomId: "456",
         *   role: "مشرف",
         *   joinedAt: "2024-03-28T10:00:00Z"
         * };
         * await ApiClient.roomUsers.create(data);
         */
        create: (data: any) => ({
            method: 'POST',
            path: '/room-users',
            description: 'إنشاء مستخدم غرفة جديد',
            parameters: {
                body: data
            }
        }),

        /**
         * تحديث مستخدم غرفة
         * @example
         * const data = {
         *   role: "مشرف رئيسي",
         *   lastActive: "2024-03-28T12:00:00Z"
         * };
         * await ApiClient.roomUsers.update("123", data);
         */
        update: (id: string, data: any) => ({
            method: 'PUT',
            path: `/room-users/${id}`,
            description: 'تحديث مستخدم غرفة',
            parameters: {
                path: { id },
                body: data
            }
        })
    };

    /**
     * الغرف
     */
    static rooms = {
        /**
         * الحصول على ملف الغرفة مع جميع العلاقات
         * @example
         * await ApiClient.rooms.getRoomProfile("123");
         */
        getRoomProfile: (id: string) => ({
            method: 'GET',
            path: `/rooms/profile/${id}`,
            description: 'الحصول على ملف الغرفة مع جميع العلاقات',
            parameters: {
                path: { id }
            }
        }),

        /**
         * الحصول على غرف المستخدم
         * @example
         * await ApiClient.rooms.getUserRooms("123");
         */
        getUserRooms: (userId: string) => ({
            method: 'GET',
            path: `/rooms/user/${userId}`,
            description: 'الحصول على غرف المستخدم',
            parameters: {
                path: { userId }
            }
        }),

        /**
         * إضافة مستخدم إلى الغرفة
         * @example
         * await ApiClient.rooms.addUserToRoom("123", "456");
         */
        addUserToRoom: (roomId: string, userId: string) => ({
            method: 'POST',
            path: `/rooms/${roomId}/users/${userId}`,
            description: 'إضافة مستخدم إلى الغرفة',
            parameters: {
                path: { roomId, userId }
            }
        }),

        /**
         * إزالة مستخدم من الغرفة
         * @example
         * await ApiClient.rooms.removeUserFromRoom("123", "456");
         */
        removeUserFromRoom: (roomId: string, userId: string) => ({
            method: 'DELETE',
            path: `/rooms/${roomId}/users/${userId}`,
            description: 'إزالة مستخدم من الغرفة',
            parameters: {
                path: { roomId, userId }
            }
        }),

        /**
         * إنشاء غرفة جديدة
         * @example
         * const data = {
         *   name: "غرفة الفريق",
         *   description: "غرفة للتواصل بين أعضاء الفريق",
         *   type: "خاص",
         *   createdBy: "123"
         * };
         * await ApiClient.rooms.create(data);
         */
        create: (data: any) => ({
            method: 'POST',
            path: '/rooms',
            description: 'إنشاء غرفة جديدة',
            parameters: {
                body: data
            }
        }),

        /**
         * تحديث غرفة
         * @example
         * const data = {
         *   name: "غرفة الفريق الرئيسية",
         *   description: "غرفة للتواصل بين أعضاء الفريق الرئيسيين"
         * };
         * await ApiClient.rooms.update("123", data);
         */
        update: (id: string, data: any) => ({
            method: 'PUT',
            path: `/rooms/${id}`,
            description: 'تحديث غرفة',
            parameters: {
                path: { id },
                body: data
            }
        })
    };

    /**
     * الرسائل
     */
    static messages = {
        /**
         * الحصول على ملف الرسالة مع جميع العلاقات
         * @example
         * await ApiClient.messages.getMessageProfile("123");
         */
        getMessageProfile: (id: string) => ({
            method: 'GET',
            path: `/messages/profile/${id}`,
            description: 'الحصول على ملف الرسالة مع جميع العلاقات',
            parameters: {
                path: { id }
            }
        }),

        /**
         * الحصول على الرسائل المرسلة من المستخدم
         * @example
         * await ApiClient.messages.getUserSentMessages("123");
         */
        getUserSentMessages: (userId: string) => ({
            method: 'GET',
            path: `/messages/sent/${userId}`,
            description: 'الحصول على الرسائل المرسلة من المستخدم',
            parameters: {
                path: { userId }
            }
        }),

        /**
         * الحصول على الرسائل المستلمة للمستخدم
         * @example
         * await ApiClient.messages.getUserReceivedMessages("123");
         */
        getUserReceivedMessages: (userId: string) => ({
            method: 'GET',
            path: `/messages/received/${userId}`,
            description: 'الحصول على الرسائل المستلمة للمستخدم',
            parameters: {
                path: { userId }
            }
        }),

        /**
         * الحصول على رسائل الغرفة
         * @example
         * await ApiClient.messages.getRoomMessages("123");
         */
        getRoomMessages: (roomId: string) => ({
            method: 'GET',
            path: `/messages/room/${roomId}`,
            description: 'الحصول على رسائل الغرفة',
            parameters: {
                path: { roomId }
            }
        }),

        /**
         * تحديد الرسالة كمقروءة
         * @example
         * await ApiClient.messages.markAsRead("123");
         */
        markAsRead: (id: string) => ({
            method: 'PUT',
            path: `/messages/${id}/read`,
            description: 'تحديد الرسالة كمقروءة',
            parameters: {
                path: { id }
            }
        }),

        /**
         * إنشاء رسالة جديدة
         * @example
         * const data = {
         *   senderId: "123",
         *   receiverId: "456",
         *   content: "مرحباً، كيف حالك؟",
         *   roomId: "789"
         * };
         * await ApiClient.messages.create(data);
         */
        create: (data: any) => ({
            method: 'POST',
            path: '/messages',
            description: 'إنشاء رسالة جديدة',
            parameters: {
                body: data
            }
        }),

        /**
         * تحديث رسالة
         * @example
         * const data = {
         *   content: "مرحباً، كيف حالك؟ أتمنى أن تكون بخير"
         * };
         * await ApiClient.messages.update("123", data);
         */
        update: (id: string, data: any) => ({
            method: 'PUT',
            path: `/messages/${id}`,
            description: 'تحديث رسالة',
            parameters: {
                path: { id },
                body: data
            }
        })
    };

    /**
     * التفاعلات
     */
    static reactions = {
        /**
         * الحصول على ملف التفاعل مع جميع العلاقات
         * @example
         * await ApiClient.reactions.getReactionProfile("123");
         */
        getReactionProfile: (id: string) => ({
            method: 'GET',
            path: `/reactions/profile/${id}`,
            description: 'الحصول على ملف التفاعل مع جميع العلاقات',
            parameters: {
                path: { id }
            }
        }),

        /**
         * الحصول على تفاعلات المستخدم
         * @example
         * await ApiClient.reactions.getUserReactions("123");
         */
        getUserReactions: (userId: string) => ({
            method: 'GET',
            path: `/reactions/user/${userId}`,
            description: 'الحصول على تفاعلات المستخدم',
            parameters: {
                path: { userId }
            }
        }),

        /**
         * الحصول على تفاعلات المنشور
         * @example
         * await ApiClient.reactions.getPostReactions("123");
         */
        getPostReactions: (postId: string) => ({
            method: 'GET',
            path: `/reactions/post/${postId}`,
            description: 'الحصول على تفاعلات المنشور',
            parameters: {
                path: { postId }
            }
        }),

        /**
         * إنشاء تفاعل جديد
         * @example
         * const data = {
         *   userId: "123",
         *   postId: "456",
         *   type: "إعجاب",
         *   createdAt: "2024-03-28T10:00:00Z"
         * };
         * await ApiClient.reactions.create(data);
         */
        create: (data: any) => ({
            method: 'POST',
            path: '/reactions',
            description: 'إنشاء تفاعل جديد',
            parameters: {
                body: data
            }
        }),

        /**
         * تحديث تفاعل
         * @example
         * const data = {
         *   type: "حب",
         *   updatedAt: "2024-03-28T12:00:00Z"
         * };
         * await ApiClient.reactions.update("123", data);
         */
        update: (id: string, data: any) => ({
            method: 'PUT',
            path: `/reactions/${id}`,
            description: 'تحديث تفاعل',
            parameters: {
                path: { id },
                body: data
            }
        })
    };

    /**
     * المنشورات
     */
    static posts = {
        /**
         * الحصول على ملف المنشور مع جميع العلاقات
         * @example
         * await ApiClient.posts.getPostProfile("123");
         */
        getPostProfile: (id: string) => ({
            method: 'GET',
            path: `/posts/profile/${id}`,
            description: 'الحصول على ملف المنشور مع جميع العلاقات',
            parameters: {
                path: { id }
            }
        }),

        /**
         * الحصول على منشورات المستخدم
         * @example
         * await ApiClient.posts.getUserPosts("123");
         */
        getUserPosts: (userId: string) => ({
            method: 'GET',
            path: `/posts/user/${userId}`,
            description: 'الحصول على منشورات المستخدم',
            parameters: {
                path: { userId }
            }
        }),

        /**
         * الحصول على منشورات الإنجازات
         * @example
         * await ApiClient.posts.getAchievementPosts();
         */
        getAchievementPosts: () => ({
            method: 'GET',
            path: '/posts/achievements',
            description: 'الحصول على منشورات الإنجازات',
            parameters: {}
        }),

        /**
         * إنشاء منشور جديد
         * @example
         * const data = {
         *   userId: "123",
         *   content: "منشور جديد",
         *   type: "عام",
         *   createdAt: "2024-03-28T10:00:00Z"
         * };
         * await ApiClient.posts.create(data);
         */
        create: (data: any) => ({
            method: 'POST',
            path: '/posts',
            description: 'إنشاء منشور جديد',
            parameters: {
                body: data
            }
        }),

        /**
         * تحديث منشور
         * @example
         * const data = {
         *   content: "محتوى المنشور المحدث",
         *   updatedAt: "2024-03-28T12:00:00Z"
         * };
         * await ApiClient.posts.update("123", data);
         */
        update: (id: string, data: any) => ({
            method: 'PUT',
            path: `/posts/${id}`,
            description: 'تحديث منشور',
            parameters: {
                path: { id },
                body: data
            }
        })
    };

    /**
     * قوائم الحظر
     */
    static blockLists = {
        /**
         * الحصول على ملف قائمة الحظر مع جميع العلاقات
         * @example
         * await ApiClient.blockLists.getBlockListProfile("123");
         */
        getBlockListProfile: (id: string) => ({
            method: 'GET',
            path: `/block-lists/profile/${id}`,
            description: 'الحصول على ملف قائمة الحظر مع جميع العلاقات',
            parameters: {
                path: { id }
            }
        }),

        /**
         * الحصول على قائمة حظر المستخدم
         * @example
         * await ApiClient.blockLists.getUserBlockList("123");
         */
        getUserBlockList: (userId: string) => ({
            method: 'GET',
            path: `/block-lists/user/${userId}`,
            description: 'الحصول على قائمة حظر المستخدم',
            parameters: {
                path: { userId }
            }
        }),

        /**
         * الحصول على المستخدمين المحظورين
         * @example
         * await ApiClient.blockLists.getBlockedUsers("123");
         */
        getBlockedUsers: (userId: string) => ({
            method: 'GET',
            path: `/block-lists/blocked/${userId}`,
            description: 'الحصول على المستخدمين المحظورين',
            parameters: {
                path: { userId }
            }
        }),

        /**
         * الحصول على المستخدمين الذين قاموا بالحظر
         * @example
         * await ApiClient.blockLists.getBlockedByUsers("123");
         */
        getBlockedByUsers: (userId: string) => ({
            method: 'GET',
            path: `/block-lists/blocked-by/${userId}`,
            description: 'الحصول على المستخدمين الذين قاموا بالحظر',
            parameters: {
                path: { userId }
            }
        }),

        /**
         * إنشاء قائمة حظر جديدة
         * @example
         * const data = {
         *   userId: "123",
         *   blockedUserId: "456",
         *   reason: "سلوك غير لائق",
         *   blockedAt: "2024-03-28T10:00:00Z"
         * };
         * await ApiClient.blockLists.create(data);
         */
        create: (data: any) => ({
            method: 'POST',
            path: '/block-lists',
            description: 'إنشاء قائمة حظر جديدة',
            parameters: {
                body: data
            }
        }),

        /**
         * تحديث قائمة حظر
         * @example
         * const data = {
         *   reason: "سبب جديد للحظر",
         *   updatedAt: "2024-03-28T12:00:00Z"
         * };
         * await ApiClient.blockLists.update("123", data);
         */
        update: (id: string, data: any) => ({
            method: 'PUT',
            path: `/block-lists/${id}`,
            description: 'تحديث قائمة حظر',
            parameters: {
                path: { id },
                body: data
            }
        })
    };

    /**
     * الصداقات
     */
    static friendships = {
        /**
         * الحصول على ملف الصداقة مع جميع العلاقات
         * @example
         * await ApiClient.friendships.getFriendshipProfile("123");
         */
        getFriendshipProfile: (id: string) => ({
            method: 'GET',
            path: `/friendships/profile/${id}`,
            description: 'الحصول على ملف الصداقة مع جميع العلاقات',
            parameters: {
                path: { id }
            }
        }),

        /**
         * الحصول على صداقات المستخدم
         * @example
         * await ApiClient.friendships.getUserFriendships("123");
         */
        getUserFriendships: (userId: string) => ({
            method: 'GET',
            path: `/friendships/user/${userId}`,
            description: 'الحصول على صداقات المستخدم',
            parameters: {
                path: { userId }
            }
        }),

        /**
         * الحصول على الصداقات المقبولة للمستخدم
         * @example
         * await ApiClient.friendships.getAcceptedFriendships("123");
         */
        getAcceptedFriendships: (userId: string) => ({
            method: 'GET',
            path: `/friendships/accepted/${userId}`,
            description: 'الحصول على الصداقات المقبولة للمستخدم',
            parameters: {
                path: { userId }
            }
        }),

        /**
         * إنشاء صداقة جديدة
         * @example
         * const data = {
         *   userId: "123",
         *   friendId: "456",
         *   status: "معلق",
         *   createdAt: "2024-03-28T10:00:00Z"
         * };
         * await ApiClient.friendships.create(data);
         */
        create: (data: any) => ({
            method: 'POST',
            path: '/friendships',
            description: 'إنشاء صداقة جديدة',
            parameters: {
                body: data
            }
        }),

        /**
         * تحديث صداقة
         * @example
         * const data = {
         *   status: "مقبول",
         *   updatedAt: "2024-03-28T12:00:00Z"
         * };
         * await ApiClient.friendships.update("123", data);
         */
        update: (id: string, data: any) => ({
            method: 'PUT',
            path: `/friendships/${id}`,
            description: 'تحديث صداقة',
            parameters: {
                path: { id },
                body: data
            }
        })
    };

    /**
     * جدول التدريب
     */
    static trainingSchedule = {
        /**
         * الحصول على قائمة جداول التدريب
         * @example
         * const schedules = await ApiClient.trainingSchedule.getAll();
         */
        getAll: () => ({
            method: 'GET',
            path: '/training-schedule',
            description: 'الحصول على قائمة جداول التدريب'
        }),

        /**
         * إنشاء جدول تدريب جديد
         * @example
         * const scheduleData = {
         *   teamId: 1,
         *   startDate: "2024-03-20",
         *   endDate: "2024-03-27",
         *   sessions: [
         *     {
         *       day: "الاثنين",
         *       time: "09:00",
         *       duration: 120,
         *       type: "تدريب بدني"
         *     }
         *   ]
         * };
         * await ApiClient.trainingSchedule.create(scheduleData);
         */
        create: (data: any) => ({
            method: 'POST',
            path: '/training-schedule',
            description: 'إنشاء جدول تدريب جديد',
            parameters: {
                body: data
            }
        }),

        /**
         * تحديث جدول تدريب
         * @example
         * const scheduleData = {
         *   sessions: [
         *     {
         *       day: "الاثنين",
         *       time: "10:00",
         *       duration: 90,
         *       type: "تدريب تكتيكي"
         *     }
         *   ]
         * };
         * await ApiClient.trainingSchedule.update(1, scheduleData);
         */
        update: (id: number, data: any) => ({
            method: 'PUT',
            path: `/training-schedule/${id}`,
            description: 'تحديث جدول تدريب',
            parameters: {
                body: data
            }
        }),

        /**
         * حذف جدول تدريب
         * @example
         * await ApiClient.trainingSchedule.delete(1);
         */
        delete: (id: number) => ({
            method: 'DELETE',
            path: `/training-schedule/${id}`,
            description: 'حذف جدول تدريب'
        })
    };

    /**
     * إدارة جدول الصيانة
     * يتيح إدارة جداول صيانة المرافق والمعدات
     * @example
     * // إنشاء جدول صيانة جديد
     * const maintenanceData = {
     *   facilityId: 1,
     *   equipmentId: 1,
     *   type: "صيانة دورية",
     *   startDate: "2024-03-25",
     *   endDate: "2024-03-26",
     *   description: "صيانة معدات التدريب"
     * };
     * await ApiClient.maintenanceSchedule.create(maintenanceData);
     */
    static maintenanceSchedule = {
        /**
         * الحصول على قائمة جداول الصيانة
         * @example
         * const schedules = await ApiClient.maintenanceSchedule.getAll();
         */
        getAll: () => ({
            method: 'GET',
            path: '/maintenance-schedule',
            description: 'الحصول على قائمة جداول الصيانة'
        }),

        /**
         * إنشاء جدول صيانة جديد
         * @example
         * const maintenanceData = {
         *   facilityId: 1,
         *   equipmentId: 1,
         *   type: "صيانة دورية",
         *   startDate: "2024-03-25",
         *   endDate: "2024-03-26",
         *   description: "صيانة معدات التدريب"
         * };
         * await ApiClient.maintenanceSchedule.create(maintenanceData);
         */
        create: (data: any) => ({
            method: 'POST',
            path: '/maintenance-schedule',
            description: 'إنشاء جدول صيانة جديد',
            parameters: {
                body: data
            }
        }),

        /**
         * تحديث جدول صيانة
         * @example
         * const maintenanceData = {
         *   endDate: "2024-03-27",
         *   description: "صيانة معدات التدريب - تحديث"
         * };
         * await ApiClient.maintenanceSchedule.update(1, maintenanceData);
         */
        update: (id: number, data: any) => ({
            method: 'PUT',
            path: `/maintenance-schedule/${id}`,
            description: 'تحديث جدول صيانة',
            parameters: {
                body: data
            }
        }),

        /**
         * حذف جدول صيانة
         * @example
         * await ApiClient.maintenanceSchedule.delete(1);
         */
        delete: (id: number) => ({
            method: 'DELETE',
            path: `/maintenance-schedule/${id}`,
            description: 'حذف جدول صيانة'
        })
    };

    /**
     * اكتشاف اللاعبين
     */
    static playerDiscovery = {
        /**
         * الحصول على قائمة اللاعبين المكتشفين
         * @example
         * const players = await ApiClient.playerDiscovery.getAll();
         */
        getAll: () => ({
            method: 'GET',
            path: '/player-discovery',
            description: 'الحصول على قائمة اللاعبين المكتشفين'
        }),

        /**
         * إضافة لاعب جديد للاكتشاف
         * @example
         * const playerData = {
         *   name: "أحمد محمد",
         *   age: 18,
         *   position: "مهاجم",
         *   currentTeam: "فريق الشباب",
         *   skills: ["سرعة", "تسديد", "مراوغة"],
         *   potential: "مرتفع"
         * };
         * await ApiClient.playerDiscovery.create(playerData);
         */
        create: (data: any) => ({
            method: 'POST',
            path: '/player-discovery',
            description: 'إضافة لاعب جديد للاكتشاف',
            parameters: {
                body: data
            }
        }),

        /**
         * تحديث معلومات لاعب
         * @example
         * const playerData = {
         *   skills: ["سرعة", "تسديد", "مراوغة", "تمرير"],
         *   potential: "ممتاز"
         * };
         * await ApiClient.playerDiscovery.update(1, playerData);
         */
        update: (id: number, data: any) => ({
            method: 'PUT',
            path: `/player-discovery/${id}`,
            description: 'تحديث معلومات لاعب',
            parameters: {
                body: data
            }
        }),

        /**
         * حذف لاعب من قائمة الاكتشاف
         * @example
         * await ApiClient.playerDiscovery.delete(1);
         */
        delete: (id: number) => ({
            method: 'DELETE',
            path: `/player-discovery/${id}`,
            description: 'حذف لاعب من قائمة الاكتشاف'
        })
    };

    /**
     * إدارة تقارير الكشافة
     * يتيح إدارة تقارير الكشافة وتقييم اللاعبين
     * @example
     * // إنشاء تقرير كشافة جديد
     * const reportData = {
     *   scoutId: 1,
     *   playerId: 1,
     *   matchId: 1,
     *   rating: 8.5,
     *   strengths: ["سرعة", "تسديد"],
     *   weaknesses: ["الدفاع"],
     *   notes: "لاعب واعد يحتاج لتطوير مهارات الدفاع"
     * };
     * await ApiClient.scoutingReport.create(reportData);
     */
    static scoutingReport = {
        /**
         * الحصول على قائمة تقارير الكشافة
         * @example
         * const reports = await ApiClient.scoutingReport.getAll();
         */
        getAll: () => ({
            method: 'GET',
            path: '/scouting-report',
            description: 'الحصول على قائمة تقارير الكشافة'
        }),

        /**
         * إنشاء تقرير كشافة جديد
         * @example
         * const reportData = {
         *   scoutId: 1,
         *   playerId: 1,
         *   matchId: 1,
         *   rating: 8.5,
         *   strengths: ["سرعة", "تسديد"],
         *   weaknesses: ["الدفاع"],
         *   notes: "لاعب واعد يحتاج لتطوير مهارات الدفاع"
         * };
         * await ApiClient.scoutingReport.create(reportData);
         */
        create: (data: any) => ({
            method: 'POST',
            path: '/scouting-report',
            description: 'إنشاء تقرير كشافة جديد',
            parameters: {
                body: data
            }
        }),

        /**
         * تحديث تقرير كشافة
         * @example
         * const reportData = {
         *   rating: 9.0,
         *   notes: "تحسن ملحوظ في مهارات الدفاع"
         * };
         * await ApiClient.scoutingReport.update(1, reportData);
         */
        update: (id: number, data: any) => ({
            method: 'PUT',
            path: `/scouting-report/${id}`,
            description: 'تحديث تقرير كشافة',
            parameters: {
                body: data
            }
        }),

        /**
         * حذف تقرير كشافة
         * @example
         * await ApiClient.scoutingReport.delete(1);
         */
        delete: (id: number) => ({
            method: 'DELETE',
            path: `/scouting-report/${id}`,
            description: 'حذف تقرير كشافة'
        })
    };

    /**
     * العمولة
     */
    static commission = {
        /**
         * الحصول على ملف العمولة مع جميع العلاقات
         * @example
         * await ApiClient.commission.getCommissionProfile("123");
         */
        getCommissionProfile: (id: string) => ({
            method: 'GET',
            path: `/commission/profile/${id}`,
            description: 'الحصول على ملف العمولة مع جميع العلاقات',
            parameters: {
                path: { id }
            }
        }),

        /**
         * الحصول على عمولات الوكيل
         * @example
         * await ApiClient.commission.getAgentCommissions("123");
         */
        getAgentCommissions: (agentId: string) => ({
            method: 'GET',
            path: `/commission/agent/${agentId}`,
            description: 'الحصول على عمولات الوكيل',
            parameters: {
                path: { agentId }
            }
        }),

        /**
         * الحصول على عمولات اللاعب
         * @example
         * await ApiClient.commission.getPlayerCommissions("123");
         */
        getPlayerCommissions: (playerId: string) => ({
            method: 'GET',
            path: `/commission/player/${playerId}`,
            description: 'الحصول على عمولات اللاعب',
            parameters: {
                path: { playerId }
            }
        }),

        /**
         * إنشاء عمولة جديدة
         * @example
         * const data = {
         *   agentId: "123",
         *   playerId: "456",
         *   amount: 1000,
         *   percentage: 10,
         *   type: "تحويل"
         * };
         * await ApiClient.commission.create(data);
         */
        create: (data: any) => ({
            method: 'POST',
            path: '/commission',
            description: 'إنشاء عمولة جديدة',
            parameters: {
                body: data
            }
        }),

        /**
         * تحديث عمولة
         * @example
         * const data = {
         *   amount: 1500,
         *   percentage: 15,
         *   status: "مدفوعة"
         * };
         * await ApiClient.commission.update("123", data);
         */
        update: (id: string, data: any) => ({
            method: 'PUT',
            path: `/commission/${id}`,
            description: 'تحديث عمولة',
            parameters: {
                path: { id },
                body: data
            }
        })
    };

    /**
     * التحويل
     */
    static transfer = {
        /**
         * الحصول على ملف التحويل مع جميع العلاقات
         * @example
         * await ApiClient.transfer.getTransferProfile("123");
         */
        getTransferProfile: (id: string) => ({
            method: 'GET',
            path: `/transfer/profile/${id}`,
            description: 'الحصول على ملف التحويل مع جميع العلاقات',
            parameters: {
                path: { id }
            }
        }),

        /**
         * الحصول على تحويلات اللاعب
         * @example
         * await ApiClient.transfer.getPlayerTransfers("123");
         */
        getPlayerTransfers: (playerId: string) => ({
            method: 'GET',
            path: `/transfer/player/${playerId}`,
            description: 'الحصول على تحويلات اللاعب',
            parameters: {
                path: { playerId }
            }
        }),

        /**
         * الحصول على تحويلات النادي
         * @example
         * await ApiClient.transfer.getClubTransfers("123");
         */
        getClubTransfers: (clubId: string) => ({
            method: 'GET',
            path: `/transfer/club/${clubId}`,
            description: 'الحصول على تحويلات النادي',
            parameters: {
                path: { clubId }
            }
        }),

        /**
         * إنشاء تحويل جديد
         * @example
         * const data = {
         *   playerId: "123",
         *   fromClubId: "456",
         *   toClubId: "789",
         *   amount: 1000000,
         *   transferDate: "2024-03-28"
         * };
         * await ApiClient.transfer.create(data);
         */
        create: (data: any) => ({
            method: 'POST',
            path: '/transfer',
            description: 'إنشاء تحويل جديد',
            parameters: {
                body: data
            }
        }),

        /**
         * تحديث تحويل
         * @example
         * const data = {
         *   amount: 1500000,
         *   transferDate: "2024-03-29",
         *   status: "مكتمل"
         * };
         * await ApiClient.transfer.update("123", data);
         */
        update: (id: string, data: any) => ({
            method: 'PUT',
            path: `/transfer/${id}`,
            description: 'تحديث تحويل',
            parameters: {
                path: { id },
                body: data
            }
        })
    };

    /**
     * الوكيل-العميل
     */
    static agentClient = {
        /**
         * الحصول على ملف العلاقة بين الوكيل والعميل مع جميع العلاقات
         * @example
         * await ApiClient.agentClient.getAgentClientProfile("123");
         */
        getAgentClientProfile: (id: string) => ({
            method: 'GET',
            path: `/agent-client/profile/${id}`,
            description: 'الحصول على ملف العلاقة بين الوكيل والعميل مع جميع العلاقات',
            parameters: {
                path: { id }
            }
        }),

        /**
         * الحصول على عملاء الوكيل
         * @example
         * await ApiClient.agentClient.getAgentClients("123");
         */
        getAgentClients: (agentId: string) => ({
            method: 'GET',
            path: `/agent-client/agent/${agentId}`,
            description: 'الحصول على عملاء الوكيل',
            parameters: {
                path: { agentId }
            }
        }),

        /**
         * إنشاء علاقة وكيل-عميل جديدة
         * @example
         * const data = {
         *   agentId: "123",
         *   clientId: "456",
         *   startDate: "2024-03-28",
         *   endDate: "2025-03-28",
         *   terms: "شروط العقد"
         * };
         * await ApiClient.agentClient.create(data);
         */
        create: (data: any) => ({
            method: 'POST',
            path: '/agent-client',
            description: 'إنشاء علاقة وكيل-عميل جديدة',
            parameters: {
                body: data
            }
        }),

        /**
         * تحديث علاقة وكيل-عميل
         * @example
         * const data = {
         *   endDate: "2026-03-28",
         *   terms: "شروط العقد المحدثة",
         *   status: "نشط"
         * };
         * await ApiClient.agentClient.update("123", data);
         */
        update: (id: string, data: any) => ({
            method: 'PUT',
            path: `/agent-client/${id}`,
            description: 'تحديث علاقة وكيل-عميل',
            parameters: {
                path: { id },
                body: data
            }
        })
    };

    /**
     * البطولات
     */
    static tournament = {
        getTournamentProfile: (id: string) => ({
            method: 'GET',
            path: `/tournament/profile/${id}`,
            description: 'الحصول على ملف البطولة مع جميع العلاقات',
            parameters: {
                path: { id }
            }
        }),

        getActiveTournaments: () => ({
            method: 'GET',
            path: '/tournament/active',
            description: 'الحصول على البطولات النشطة'
        }),

        getSportTournaments: (sport: string) => ({
            method: 'GET',
            path: `/tournament/sport/${sport}`,
            description: 'الحصول على البطولات حسب الرياضة',
            parameters: {
                path: { sport }
            }
        }),

        create: (data: any) => ({
            method: 'POST',
            path: '/tournament',
            description: 'إنشاء بطولة جديدة',
            parameters: {
                body: data
            }
        }),

        update: (id: string, data: any) => ({
            method: 'PUT',
            path: `/tournament/${id}`,
            description: 'تحديث بطولة',
            parameters: {
                path: { id },
                body: data
            }
        })
    };

    /**
     * فئات الفرق
     */
    static teamCategory = {
        getTeamCategoryProfile: (id: string) => ({
            method: 'GET',
            path: `/team-category/profile/${id}`,
            description: 'الحصول على ملف فئة الفريق مع جميع العلاقات',
            parameters: {
                path: { id }
            }
        }),

        getCategoryTeams: (categoryId: string) => ({
            method: 'GET',
            path: `/team-category/${categoryId}/teams`,
            description: 'الحصول على الفرق حسب الفئة',
            parameters: {
                path: { categoryId }
            }
        }),

        create: (data: any) => ({
            method: 'POST',
            path: '/team-category',
            description: 'إنشاء فئة فريق جديدة',
            parameters: {
                body: data
            }
        }),

        update: (id: string, data: any) => ({
            method: 'PUT',
            path: `/team-category/${id}`,
            description: 'تحديث فئة فريق',
            parameters: {
                path: { id },
                body: data
            }
        })
    };

    /**
     * المرافق
     */
    static facility = {
        getFacilityProfile: (id: string) => ({
            method: 'GET',
            path: `/facility/profile/${id}`,
            description: 'الحصول على ملف المرفق مع جميع العلاقات',
            parameters: {
                path: { id }
            }
        }),

        getFacilitiesByType: (type: string) => ({
            method: 'GET',
            path: `/facility/type/${type}`,
            description: 'الحصول على المرافق حسب النوع',
            parameters: {
                path: { type }
            }
        }),

        create: (data: any) => ({
            method: 'POST',
            path: '/facility',
            description: 'إنشاء مرفق جديد',
            parameters: {
                body: data
            }
        }),

        update: (id: string, data: any) => ({
            method: 'PUT',
            path: `/facility/${id}`,
            description: 'تحديث مرفق',
            parameters: {
                path: { id },
                body: data
            }
        })
    };

    /**
     * التراخيص
     */
    static license = {
        getLicenseProfile: (id: string) => ({
            method: 'GET',
            path: `/license/profile/${id}`,
            description: 'الحصول على ملف الترخيص مع جميع العلاقات',
            parameters: {
                path: { id }
            }
        }),

        getUserLicenses: (userId: string) => ({
            method: 'GET',
            path: `/license/user/${userId}`,
            description: 'الحصول على تراخيص المستخدم',
            parameters: {
                path: { userId }
            }
        }),

        create: (data: any) => ({
            method: 'POST',
            path: '/license',
            description: 'إنشاء ترخيص جديد',
            parameters: {
                body: data
            }
        }),

        update: (id: string, data: any) => ({
            method: 'PUT',
            path: `/license/${id}`,
            description: 'تحديث ترخيص',
            parameters: {
                path: { id },
                body: data
            }
        })
    };

    /**
     * الإصابات
     */
    static injury = {
        getInjuryProfile: (id: string) => ({
            method: 'GET',
            path: `/injury/profile/${id}`,
            description: 'الحصول على ملف الإصابة مع جميع العلاقات',
            parameters: {
                path: { id }
            }
        }),

        getPlayerInjuries: (playerId: string) => ({
            method: 'GET',
            path: `/injury/player/${playerId}`,
            description: 'الحصول على إصابات اللاعب',
            parameters: {
                path: { playerId }
            }
        }),

        getActiveInjuries: () => ({
            method: 'GET',
            path: '/injury/active',
            description: 'الحصول على الإصابات النشطة'
        }),

        create: (data: any) => ({
            method: 'POST',
            path: '/injury',
            description: 'إنشاء سجل إصابة جديد',
            parameters: {
                body: data
            }
        }),

        update: (id: string, data: any) => ({
            method: 'PUT',
            path: `/injury/${id}`,
            description: 'تحديث سجل إصابة',
            parameters: {
                path: { id },
                body: data
            }
        })
    };

    /**
     * العقود
     */
    static contract = {
        getContractProfile: (id: string) => ({
            method: 'GET',
            path: `/contract/profile/${id}`,
            description: 'الحصول على ملف العقد مع جميع العلاقات',
            parameters: {
                path: { id }
            }
        }),

        getPlayerContracts: (playerId: string) => ({
            method: 'GET',
            path: `/contract/player/${playerId}`,
            description: 'الحصول على عقود اللاعب',
            parameters: {
                path: { playerId }
            }
        }),

        getClubContracts: (clubId: string) => ({
            method: 'GET',
            path: `/contract/club/${clubId}`,
            description: 'الحصول على عقود النادي',
            parameters: {
                path: { clubId }
            }
        }),

        getActiveContracts: () => ({
            method: 'GET',
            path: '/contract/active',
            description: 'الحصول على العقود النشطة'
        }),

        create: (data: any) => ({
            method: 'POST',
            path: '/contract',
            description: 'إنشاء عقد جديد',
            parameters: {
                body: data
            }
        }),

        update: (id: string, data: any) => ({
            method: 'PUT',
            path: `/contract/${id}`,
            description: 'تحديث عقد',
            parameters: {
                path: { id },
                body: data
            }
        })
    };

    /**
     * تاريخ التدريب
     */
    static coachingHistory = {
        getCoachingHistoryProfile: (id: string) => ({
            method: 'GET',
            path: `/coaching-history/profile/${id}`,
            description: 'الحصول على ملف تاريخ التدريب مع جميع العلاقات',
            parameters: {
                path: { id }
            }
        }),

        getCoachHistory: (coachId: string) => ({
            method: 'GET',
            path: `/coaching-history/coach/${coachId}`,
            description: 'الحصول على تاريخ تدريب المدرب',
            parameters: {
                path: { coachId }
            }
        }),

        getPlayerHistory: (playerId: string) => ({
            method: 'GET',
            path: `/coaching-history/player/${playerId}`,
            description: 'الحصول على تاريخ تدريب اللاعب',
            parameters: {
                path: { playerId }
            }
        }),

        create: (data: any) => ({
            method: 'POST',
            path: '/coaching-history',
            description: 'إنشاء سجل تاريخ تدريب جديد',
            parameters: {
                body: data
            }
        }),

        update: (id: string, data: any) => ({
            method: 'PUT',
            path: `/coaching-history/${id}`,
            description: 'تحديث سجل تاريخ تدريب',
            parameters: {
                path: { id },
                body: data
            }
        })
    };

    /**
     * إحصائيات اللاعبين
     */
    static playerStatistics = {
        getPlayerStatisticsProfile: (id: string) => ({
            method: 'GET',
            path: `/player-statistics/profile/${id}`,
            description: 'الحصول على ملف إحصائيات اللاعب مع جميع العلاقات',
            parameters: {
                path: { id }
            }
        }),

        getPlayerStats: (playerId: string) => ({
            method: 'GET',
            path: `/player-statistics/player/${playerId}`,
            description: 'الحصول على إحصائيات اللاعب',
            parameters: {
                path: { playerId }
            }
        }),

        getSeasonStats: (seasonId: string) => ({
            method: 'GET',
            path: `/player-statistics/season/${seasonId}`,
            description: 'الحصول على إحصائيات الموسم',
            parameters: {
                path: { seasonId }
            }
        }),

        create: (data: any) => ({
            method: 'POST',
            path: '/player-statistics',
            description: 'إنشاء سجل إحصائيات لاعب جديد',
            parameters: {
                body: data
            }
        }),

        update: (id: string, data: any) => ({
            method: 'PUT',
            path: `/player-statistics/${id}`,
            description: 'تحديث سجل إحصائيات لاعب',
            parameters: {
                path: { id },
                body: data
            }
        })
    };

    /**
     * العنوان
     */
    static address = {
        getAddressProfile: (id: string) => ({
            method: 'GET',
            path: `/address/profile/${id}`,
            description: 'الحصول على ملف العنوان مع جميع العلاقات',
            parameters: {
                path: { id }
            }
        }),

        getUserAddresses: (userId: string) => ({
            method: 'GET',
            path: `/address/user/${userId}`,
            description: 'الحصول على عناوين المستخدم',
            parameters: {
                path: { userId }
            }
        }),

        getDefaultAddress: (userId: string) => ({
            method: 'GET',
            path: `/address/default/${userId}`,
            description: 'الحصول على العنوان الافتراضي للمستخدم',
            parameters: {
                path: { userId }
            }
        }),

        create: (data: any) => ({
            method: 'POST',
            path: '/address',
            description: 'إنشاء عنوان جديد',
            parameters: {
                body: data
            }
        }),

        update: (id: string, data: any) => ({
            method: 'PUT',
            path: `/address/${id}`,
            description: 'تحديث عنوان',
            parameters: {
                path: { id },
                body: data
            }
        })
    };

    /**
     * معلومات البث
     */
    static streamingInfo = {
        getStreamingInfoProfile: (id: string) => ({
            method: 'GET',
            path: `/streaming-info/profile/${id}`,
            description: 'الحصول على ملف معلومات البث مع جميع العلاقات',
            parameters: {
                path: { id }
            }
        }),

        getEventStreaming: (eventId: string) => ({
            method: 'GET',
            path: `/streaming-info/event/${eventId}`,
            description: 'الحصول على معلومات بث الحدث',
            parameters: {
                path: { eventId }
            }
        }),

        getActiveStreams: () => ({
            method: 'GET',
            path: '/streaming-info/active',
            description: 'الحصول على البث المباشر النشط'
        }),

        create: (data: any) => ({
            method: 'POST',
            path: '/streaming-info',
            description: 'إنشاء معلومات بث جديدة',
            parameters: {
                body: data
            }
        }),

        update: (id: string, data: any) => ({
            method: 'PUT',
            path: `/streaming-info/${id}`,
            description: 'تحديث معلومات البث',
            parameters: {
                path: { id },
                body: data
            }
        })
    };

    /**
     * إجراءات الإشعارات
     */
    static notificationAction = {
        getNotificationActionProfile: (id: string) => ({
            method: 'GET',
            path: `/notification-action/profile/${id}`,
            description: 'الحصول على ملف إجراء الإشعار مع جميع العلاقات',
            parameters: {
                path: { id }
            }
        }),

        getTemplateActions: (templateId: string) => ({
            method: 'GET',
            path: `/notification-action/template/${templateId}`,
            description: 'الحصول على إجراءات قالب الإشعار',
            parameters: {
                path: { templateId }
            }
        }),

        create: (data: any) => ({
            method: 'POST',
            path: '/notification-action',
            description: 'إنشاء إجراء إشعار جديد',
            parameters: {
                body: data
            }
        }),

        update: (id: string, data: any) => ({
            method: 'PUT',
            path: `/notification-action/${id}`,
            description: 'تحديث إجراء إشعار',
            parameters: {
                path: { id },
                body: data
            }
        })
    };

    /**
     * مجموعات الإشعارات
     */
    static notificationGroup = {
        getNotificationGroupProfile: (id: string) => ({
            method: 'GET',
            path: `/notification-group/profile/${id}`,
            description: 'الحصول على ملف مجموعة الإشعارات مع جميع العلاقات',
            parameters: {
                path: { id }
            }
        }),

        getUserGroups: (userId: string) => ({
            method: 'GET',
            path: `/notification-group/user/${userId}`,
            description: 'الحصول على مجموعات إشعارات المستخدم',
            parameters: {
                path: { userId }
            }
        }),

        create: (data: any) => ({
            method: 'POST',
            path: '/notification-group',
            description: 'إنشاء مجموعة إشعارات جديدة',
            parameters: {
                body: data
            }
        }),

        update: (id: string, data: any) => ({
            method: 'PUT',
            path: `/notification-group/${id}`,
            description: 'تحديث مجموعة إشعارات',
            parameters: {
                path: { id },
                body: data
            }
        })
    };

    /**
     * سجل الإشعارات
     */
    static notificationLog = {
        getNotificationLogProfile: (id: string) => ({
            method: 'GET',
            path: `/notification-log/profile/${id}`,
            description: 'الحصول على ملف سجل الإشعار مع جميع العلاقات',
            parameters: {
                path: { id }
            }
        }),

        getUserLogs: (userId: string) => ({
            method: 'GET',
            path: `/notification-log/user/${userId}`,
            description: 'الحصول على سجل إشعارات المستخدم',
            parameters: {
                path: { userId }
            }
        }),

        getUnreadLogs: (userId: string) => ({
            method: 'GET',
            path: `/notification-log/unread/${userId}`,
            description: 'الحصول على الإشعارات غير المقروءة للمستخدم',
            parameters: {
                path: { userId }
            }
        }),

        create: (data: any) => ({
            method: 'POST',
            path: '/notification-log',
            description: 'إنشاء سجل إشعار جديد',
            parameters: {
                body: data
            }
        }),

        update: (id: string, data: any) => ({
            method: 'PUT',
            path: `/notification-log/${id}`,
            description: 'تحديث سجل إشعار',
            parameters: {
                path: { id },
                body: data
            }
        })
    };

    /**
     * قوالب الإشعارات
     */
    static notificationTemplate = {
        getNotificationTemplateProfile: (id: string) => ({
            method: 'GET',
            path: `/notification-template/profile/${id}`,
            description: 'الحصول على ملف قالب الإشعار مع جميع العلاقات',
            parameters: {
                path: { id }
            }
        }),

        getTemplatesByType: (type: string) => ({
            method: 'GET',
            path: `/notification-template/type/${type}`,
            description: 'الحصول على قوالب الإشعارات حسب النوع',
            parameters: {
                path: { type }
            }
        }),

        getActiveTemplates: () => ({
            method: 'GET',
            path: '/notification-template/active',
            description: 'الحصول على قوالب الإشعارات النشطة'
        }),

        create: (data: any) => ({
            method: 'POST',
            path: '/notification-template',
            description: 'إنشاء قالب إشعار جديد',
            parameters: {
                body: data
            }
        }),

        update: (id: string, data: any) => ({
            method: 'PUT',
            path: `/notification-template/${id}`,
            description: 'تحديث قالب إشعار',
            parameters: {
                path: { id },
                body: data
            }
        })
    };

    /**
     * إعدادات الإشعارات
     */
    static notificationSettings = {
        getNotificationSettingsProfile: (id: string) => ({
            method: 'GET',
            path: `/notification-settings/profile/${id}`,
            description: 'الحصول على ملف إعدادات الإشعارات مع جميع العلاقات',
            parameters: {
                path: { id }
            }
        }),

        getUserSettings: (userId: string) => ({
            method: 'GET',
            path: `/notification-settings/user/${userId}`,
            description: 'الحصول على إعدادات إشعارات المستخدم',
            parameters: {
                path: { userId }
            }
        }),

        getDefaultSettings: () => ({
            method: 'GET',
            path: '/notification-settings/default',
            description: 'الحصول على إعدادات الإشعارات الافتراضية'
        }),

        create: (data: any) => ({
            method: 'POST',
            path: '/notification-settings',
            description: 'إنشاء إعدادات إشعارات جديدة',
            parameters: {
                body: data
            }
        }),

        update: (id: string, data: any) => ({
            method: 'PUT',
            path: `/notification-settings/${id}`,
            description: 'تحديث إعدادات إشعارات',
            parameters: {
                path: { id },
                body: data
            }
        })
    };

    /**
     * الوسائط الاجتماعية
     */
    static socialMedia = {
        getSocialMediaProfile: (id: string) => ({
            method: 'GET',
            path: `/social-media/profile/${id}`,
            description: 'الحصول على ملف الوسائط الاجتماعية مع جميع العلاقات',
            parameters: {
                path: { id }
            }
        }),

        getUserSocialMedia: (userId: string) => ({
            method: 'GET',
            path: `/social-media/user/${userId}`,
            description: 'الحصول على حسابات الوسائط الاجتماعية للمستخدم',
            parameters: {
                path: { userId }
            }
        }),

        getPlatformAccounts: (platform: string) => ({
            method: 'GET',
            path: `/social-media/platform/${platform}`,
            description: 'الحصول على حسابات منصة وسائط اجتماعية محددة',
            parameters: {
                path: { platform }
            }
        }),

        create: (data: any) => ({
            method: 'POST',
            path: '/social-media',
            description: 'إنشاء حساب وسائط اجتماعية جديد',
            parameters: {
                body: data
            }
        }),

        update: (id: string, data: any) => ({
            method: 'PUT',
            path: `/social-media/${id}`,
            description: 'تحديث حساب وسائط اجتماعية',
            parameters: {
                path: { id },
                body: data
            }
        })
    };

    /**
     * الإنجازات المهنية
     */
    static professionalAchievement = {
        getProfessionalAchievementProfile: (id: string) => ({
            method: 'GET',
            path: `/professional-achievement/profile/${id}`,
            description: 'الحصول على ملف الإنجاز المهني مع جميع العلاقات',
            parameters: {
                path: { id }
            }
        }),

        getUserAchievements: (userId: string) => ({
            method: 'GET',
            path: `/professional-achievement/user/${userId}`,
            description: 'الحصول على الإنجازات المهنية للمستخدم',
            parameters: {
                path: { userId }
            }
        }),

        getCategoryAchievements: (category: string) => ({
            method: 'GET',
            path: `/professional-achievement/category/${category}`,
            description: 'الحصول على الإنجازات المهنية حسب الفئة',
            parameters: {
                path: { category }
            }
        }),

        create: (data: any) => ({
            method: 'POST',
            path: '/professional-achievement',
            description: 'إنشاء إنجاز مهني جديد',
            parameters: {
                body: data
            }
        }),

        update: (id: string, data: any) => ({
            method: 'PUT',
            path: `/professional-achievement/${id}`,
            description: 'تحديث إنجاز مهني',
            parameters: {
                path: { id },
                body: data
            }
        })
    };

    /**
     * الكوبونات
     */
    static coupon = {
        getCouponProfile: (id: string) => ({
            method: 'GET',
            path: `/coupon/profile/${id}`,
            description: 'الحصول على ملف الكوبون مع جميع العلاقات',
            parameters: {
                path: { id }
            }
        }),

        getActiveCoupons: () => ({
            method: 'GET',
            path: '/coupon/active',
            description: 'الحصول على الكوبونات النشطة'
        }),

        getExpiredCoupons: () => ({
            method: 'GET',
            path: '/coupon/expired',
            description: 'الحصول على الكوبونات المنتهية'
        }),

        validateCoupon: (code: string) => ({
            method: 'GET',
            path: `/coupon/validate/${code}`,
            description: 'التحقق من صحة الكوبون',
            parameters: {
                path: { code }
            }
        }),

        create: (data: any) => ({
            method: 'POST',
            path: '/coupon',
            description: 'إنشاء كوبون جديد',
            parameters: {
                body: data
            }
        }),

        update: (id: string, data: any) => ({
            method: 'PUT',
            path: `/coupon/${id}`,
            description: 'تحديث كوبون',
            parameters: {
                path: { id },
                body: data
            }
        })
    };

    /**
     * سلة التسوق
     */
    static cart = {
        getCartProfile: (id: string) => ({
            method: 'GET',
            path: `/cart/profile/${id}`,
            description: 'الحصول على ملف سلة التسوق مع جميع العلاقات',
            parameters: {
                path: { id }
            }
        }),

        getUserCart: (userId: string) => ({
            method: 'GET',
            path: `/cart/user/${userId}`,
            description: 'الحصول على سلة تسوق المستخدم',
            parameters: {
                path: { userId }
            }
        }),

        getCartItems: (cartId: string) => ({
            method: 'GET',
            path: `/cart/items/${cartId}`,
            description: 'الحصول على عناصر سلة التسوق',
            parameters: {
                path: { cartId }
            }
        }),

        addItem: (data: any) => ({
            method: 'POST',
            path: '/cart/item',
            description: 'إضافة عنصر إلى سلة التسوق',
            parameters: {
                body: data
            }
        }),

        updateItem: (id: string, data: any) => ({
            method: 'PUT',
            path: `/cart/item/${id}`,
            description: 'تحديث عنصر في سلة التسوق',
            parameters: {
                path: { id },
                body: data
            }
        }),

        removeItem: (id: string) => ({
            method: 'DELETE',
            path: `/cart/item/${id}`,
            description: 'إزالة عنصر من سلة التسوق',
            parameters: {
                path: { id }
            }
        }),

        clearCart: (cartId: string) => ({
            method: 'DELETE',
            path: `/cart/clear/${cartId}`,
            description: 'تفريغ سلة التسوق',
            parameters: {
                path: { cartId }
            }
        })
    };

    /**
     * قائمة الرغبات
     */
    static wishlist = {
        getWishlistProfile: (id: string) => ({
            method: 'GET',
            path: `/wishlist/profile/${id}`,
            description: 'الحصول على ملف قائمة الرغبات مع جميع العلاقات',
            parameters: {
                path: { id }
            }
        }),

        getUserWishlist: (userId: string) => ({
            method: 'GET',
            path: `/wishlist/user/${userId}`,
            description: 'الحصول على قائمة رغبات المستخدم',
            parameters: {
                path: { userId }
            }
        }),

        getWishlistItems: (wishlistId: string) => ({
            method: 'GET',
            path: `/wishlist/items/${wishlistId}`,
            description: 'الحصول على عناصر قائمة الرغبات',
            parameters: {
                path: { wishlistId }
            }
        }),

        addItem: (data: any) => ({
            method: 'POST',
            path: '/wishlist/item',
            description: 'إضافة عنصر إلى قائمة الرغبات',
            parameters: {
                body: data
            }
        }),

        removeItem: (id: string) => ({
            method: 'DELETE',
            path: `/wishlist/item/${id}`,
            description: 'إزالة عنصر من قائمة الرغبات',
            parameters: {
                path: { id }
            }
        }),

        clearWishlist: (wishlistId: string) => ({
            method: 'DELETE',
            path: `/wishlist/clear/${wishlistId}`,
            description: 'تفريغ قائمة الرغبات',
            parameters: {
                path: { wishlistId }
            }
        })
    };

    /**
     * المراجعات
     */
    static review = {
        getReviewProfile: (id: string) => ({
            method: 'GET',
            path: `/review/profile/${id}`,
            description: 'الحصول على ملف المراجعة مع جميع العلاقات',
            parameters: {
                path: { id }
            }
        }),

        getUserReviews: (userId: string) => ({
            method: 'GET',
            path: `/review/user/${userId}`,
            description: 'الحصول على مراجعات المستخدم',
            parameters: {
                path: { userId }
            }
        }),

        getProductReviews: (productId: string) => ({
            method: 'GET',
            path: `/review/product/${productId}`,
            description: 'الحصول على مراجعات المنتج',
            parameters: {
                path: { productId }
            }
        }),

        create: (data: any) => ({
            method: 'POST',
            path: '/review',
            description: 'إنشاء مراجعة جديدة',
            parameters: {
                body: data
            }
        }),

        update: (id: string, data: any) => ({
            method: 'PUT',
            path: `/review/${id}`,
            description: 'تحديث مراجعة',
            parameters: {
                path: { id },
                body: data
            }
        }),

        delete: (id: string) => ({
            method: 'DELETE',
            path: `/review/${id}`,
            description: 'حذف مراجعة',
            parameters: {
                path: { id }
            }
        })
    };

    /**
     * الطلبات
     */
    static order = {
        getOrderProfile: (id: string) => ({
            method: 'GET',
            path: `/order/profile/${id}`,
            description: 'الحصول على ملف الطلب مع جميع العلاقات',
            parameters: {
                path: { id }
            }
        }),

        getUserOrders: (userId: string) => ({
            method: 'GET',
            path: `/order/user/${userId}`,
            description: 'الحصول على طلبات المستخدم',
            parameters: {
                path: { userId }
            }
        }),

        getOrderStatus: (id: string) => ({
            method: 'GET',
            path: `/order/status/${id}`,
            description: 'الحصول على حالة الطلب',
            parameters: {
                path: { id }
            }
        }),

        create: (data: any) => ({
            method: 'POST',
            path: '/order',
            description: 'إنشاء طلب جديد',
            parameters: {
                body: data
            }
        }),

        update: (id: string, data: any) => ({
            method: 'PUT',
            path: `/order/${id}`,
            description: 'تحديث طلب',
            parameters: {
                path: { id },
                body: data
            }
        }),

        cancel: (id: string) => ({
            method: 'PUT',
            path: `/order/cancel/${id}`,
            description: 'إلغاء طلب',
            parameters: {
                path: { id }
            }
        })
    };

    /**
     * عناصر الطلبات
     */
    static orderItem = {
        getOrderItemProfile: (id: string) => ({
            method: 'GET',
            path: `/order-item/profile/${id}`,
            description: 'الحصول على ملف عنصر الطلب مع جميع العلاقات',
            parameters: {
                path: { id }
            }
        }),

        getOrderItems: (orderId: string) => ({
            method: 'GET',
            path: `/order-item/order/${orderId}`,
            description: 'الحصول على عناصر الطلب',
            parameters: {
                path: { orderId }
            }
        }),

        create: (data: any) => ({
            method: 'POST',
            path: '/order-item',
            description: 'إنشاء عنصر طلب جديد',
            parameters: {
                body: data
            }
        }),

        update: (id: string, data: any) => ({
            method: 'PUT',
            path: `/order-item/${id}`,
            description: 'تحديث عنصر طلب',
            parameters: {
                path: { id },
                body: data
            }
        }),

        delete: (id: string) => ({
            method: 'DELETE',
            path: `/order-item/${id}`,
            description: 'حذف عنصر طلب',
            parameters: {
                path: { id }
            }
        })
    };

    /**
     * الدفعات
     */
    static payment = {
        getPaymentProfile: (id: string) => ({
            method: 'GET',
            path: `/payment/profile/${id}`,
            description: 'الحصول على ملف الدفع مع جميع العلاقات',
            parameters: {
                path: { id }
            }
        }),

        getUserPayments: (userId: string) => ({
            method: 'GET',
            path: `/payment/user/${userId}`,
            description: 'الحصول على دفعات المستخدم',
            parameters: {
                path: { userId }
            }
        }),

        getOrderPayments: (orderId: string) => ({
            method: 'GET',
            path: `/payment/order/${orderId}`,
            description: 'الحصول على دفعات الطلب',
            parameters: {
                path: { orderId }
            }
        }),

        create: (data: any) => ({
            method: 'POST',
            path: '/payment',
            description: 'إنشاء دفعة جديدة',
            parameters: {
                body: data
            }
        }),

        update: (id: string, data: any) => ({
            method: 'PUT',
            path: `/payment/${id}`,
            description: 'تحديث دفعة',
            parameters: {
                path: { id },
                body: data
            }
        }),

        refund: (id: string, data: any) => ({
            method: 'POST',
            path: `/payment/refund/${id}`,
            description: 'استرداد دفعة',
            parameters: {
                path: { id },
                body: data
            }
        })
    };

    /**
     * الشحن
     */
    static shipping = {
        getShippingProfile: (id: string) => ({
            method: 'GET',
            path: `/shipping/profile/${id}`,
            description: 'الحصول على ملف الشحن مع جميع العلاقات',
            parameters: {
                path: { id }
            }
        }),

        getOrderShipping: (orderId: string) => ({
            method: 'GET',
            path: `/shipping/order/${orderId}`,
            description: 'الحصول على معلومات شحن الطلب',
            parameters: {
                path: { orderId }
            }
        }),

        calculateShipping: (data: any) => ({
            method: 'POST',
            path: '/shipping/calculate',
            description: 'حساب تكلفة الشحن',
            parameters: {
                body: data
            }
        }),

        create: (data: any) => ({
            method: 'POST',
            path: '/shipping',
            description: 'إنشاء معلومات شحن جديدة',
            parameters: {
                body: data
            }
        }),

        update: (id: string, data: any) => ({
            method: 'PUT',
            path: `/shipping/${id}`,
            description: 'تحديث معلومات الشحن',
            parameters: {
                path: { id },
                body: data
            }
        }),

        trackShipment: (id: string) => ({
            method: 'GET',
            path: `/shipping/track/${id}`,
            description: 'تتبع حالة الشحنة',
            parameters: {
                path: { id }
            }
        })
    };

    /**
     * الخصومات
     */
    static discount = {
        getDiscountProfile: (id: string) => ({
            method: 'GET',
            path: `/discount/profile/${id}`,
            description: 'الحصول على ملف الخصم مع جميع العلاقات',
            parameters: {
                path: { id }
            }
        }),

        getActiveDiscounts: () => ({
            method: 'GET',
            path: '/discount/active',
            description: 'الحصول على الخصومات النشطة'
        }),

        getProductDiscounts: (productId: string) => ({
            method: 'GET',
            path: `/discount/product/${productId}`,
            description: 'الحصول على خصومات المنتج',
            parameters: {
                path: { productId }
            }
        }),

        create: (data: any) => ({
            method: 'POST',
            path: '/discount',
            description: 'إنشاء خصم جديد',
            parameters: {
                body: data
            }
        }),

        update: (id: string, data: any) => ({
            method: 'PUT',
            path: `/discount/${id}`,
            description: 'تحديث خصم',
            parameters: {
                path: { id },
                body: data
            }
        }),

        delete: (id: string) => ({
            method: 'DELETE',
            path: `/discount/${id}`,
            description: 'حذف خصم',
            parameters: {
                path: { id }
            }
        })
    };

    /**
     * الاستردادات
     */
    static refund = {
        getRefundProfile: (id: string) => ({
            method: 'GET',
            path: `/refund/profile/${id}`,
            description: 'الحصول على ملف الاسترداد مع جميع العلاقات',
            parameters: {
                path: { id }
            }
        }),

        getOrderRefunds: (orderId: string) => ({
            method: 'GET',
            path: `/refund/order/${orderId}`,
            description: 'الحصول على استردادات الطلب',
            parameters: {
                path: { orderId }
            }
        }),

        getUserRefunds: (userId: string) => ({
            method: 'GET',
            path: `/refund/user/${userId}`,
            description: 'الحصول على استردادات المستخدم',
            parameters: {
                path: { userId }
            }
        }),

        create: (data: any) => ({
            method: 'POST',
            path: '/refund',
            description: 'إنشاء طلب استرداد جديد',
            parameters: {
                body: data
            }
        }),

        update: (id: string, data: any) => ({
            method: 'PUT',
            path: `/refund/${id}`,
            description: 'تحديث طلب استرداد',
            parameters: {
                path: { id },
                body: data
            }
        }),

        processRefund: (id: string, data: any) => ({
            method: 'POST',
            path: `/refund/process/${id}`,
            description: 'معالجة طلب الاسترداد',
            parameters: {
                path: { id },
                body: data
            }
        })
    };

    /**
     * المنتجات
     */
    static product = {
        getProductProfile: (id: string) => ({
            method: 'GET',
            path: `/product/profile/${id}`,
            description: 'الحصول على ملف المنتج مع جميع العلاقات',
            parameters: {
                path: { id }
            }
        }),

        getCategoryProducts: (categoryId: string) => ({
            method: 'GET',
            path: `/product/category/${categoryId}`,
            description: 'الحصول على منتجات الفئة',
            parameters: {
                path: { categoryId }
            }
        }),

        getFeaturedProducts: () => ({
            method: 'GET',
            path: '/product/featured',
            description: 'الحصول على المنتجات المميزة'
        }),

        searchProducts: (query: string) => ({
            method: 'GET',
            path: '/product/search',
            description: 'البحث عن المنتجات',
            parameters: {
                query: { query }
            }
        }),

        create: (data: any) => ({
            method: 'POST',
            path: '/product',
            description: 'إنشاء منتج جديد',
            parameters: {
                body: data
            }
        }),

        update: (id: string, data: any) => ({
            method: 'PUT',
            path: `/product/${id}`,
            description: 'تحديث منتج',
            parameters: {
                path: { id },
                body: data
            }
        }),

        delete: (id: string) => ({
            method: 'DELETE',
            path: `/product/${id}`,
            description: 'حذف منتج',
            parameters: {
                path: { id }
            }
        })
    };

    /**
     * فئات المنتجات
     */
    static productCategory = {
        getCategoryProfile: (id: string) => ({
            method: 'GET',
            path: `/product-category/profile/${id}`,
            description: 'الحصول على ملف الفئة مع جميع العلاقات',
            parameters: {
                path: { id }
            }
        }),

        getParentCategories: () => ({
            method: 'GET',
            path: '/product-category/parents',
            description: 'الحصول على الفئات الرئيسية'
        }),

        getSubCategories: (parentId: string) => ({
            method: 'GET',
            path: `/product-category/subcategories/${parentId}`,
            description: 'الحصول على الفئات الفرعية',
            parameters: {
                path: { parentId }
            }
        }),

        create: (data: any) => ({
            method: 'POST',
            path: '/product-category',
            description: 'إنشاء فئة منتجات جديدة',
            parameters: {
                body: data
            }
        }),

        update: (id: string, data: any) => ({
            method: 'PUT',
            path: `/product-category/${id}`,
            description: 'تحديث فئة منتجات',
            parameters: {
                path: { id },
                body: data
            }
        }),

        delete: (id: string) => ({
            method: 'DELETE',
            path: `/product-category/${id}`,
            description: 'حذف فئة منتجات',
            parameters: {
                path: { id }
            }
        })
    };

    /**
     * صور المنتجات
     */
    static productImage = {
        getImageProfile: (id: string) => ({
            method: 'GET',
            path: `/product-image/profile/${id}`,
            description: 'الحصول على ملف الصورة مع جميع العلاقات',
            parameters: {
                path: { id }
            }
        }),

        getProductImages: (productId: string) => ({
            method: 'GET',
            path: `/product-image/product/${productId}`,
            description: 'الحصول على صور المنتج',
            parameters: {
                path: { productId }
            }
        }),

        uploadImage: (productId: string, data: any) => ({
            method: 'POST',
            path: `/product-image/upload/${productId}`,
            description: 'رفع صورة للمنتج',
            parameters: {
                path: { productId },
                body: data
            }
        }),

        update: (id: string, data: any) => ({
            method: 'PUT',
            path: `/product-image/${id}`,
            description: 'تحديث صورة المنتج',
            parameters: {
                path: { id },
                body: data
            }
        }),

        delete: (id: string) => ({
            method: 'DELETE',
            path: `/product-image/${id}`,
            description: 'حذف صورة المنتج',
            parameters: {
                path: { id }
            }
        }),

        setMainImage: (id: string) => ({
            method: 'PUT',
            path: `/product-image/main/${id}`,
            description: 'تعيين الصورة الرئيسية للمنتج',
            parameters: {
                path: { id }
            }
        })
    };

    /**
     * متغيرات المنتج
     */
    static productVariant = {
        getVariantProfile: (id: string) => ({
            method: 'GET',
            path: `/product-variant/profile/${id}`,
            description: 'الحصول على ملف المتغير مع جميع العلاقات',
            parameters: {
                path: { id }
            }
        }),

        getProductVariants: (productId: string) => ({
            method: 'GET',
            path: `/product-variant/product/${productId}`,
            description: 'الحصول على متغيرات المنتج',
            parameters: {
                path: { productId }
            }
        }),

        getAvailableVariants: (productId: string) => ({
            method: 'GET',
            path: `/product-variant/available/${productId}`,
            description: 'الحصول على المتغيرات المتوفرة',
            parameters: {
                path: { productId }
            }
        }),

        create: (data: any) => ({
            method: 'POST',
            path: '/product-variant',
            description: 'إنشاء متغير منتج جديد',
            parameters: {
                body: data
            }
        }),

        update: (id: string, data: any) => ({
            method: 'PUT',
            path: `/product-variant/${id}`,
            description: 'تحديث متغير المنتج',
            parameters: {
                path: { id },
                body: data
            }
        }),

        delete: (id: string) => ({
            method: 'DELETE',
            path: `/product-variant/${id}`,
            description: 'حذف متغير المنتج',
            parameters: {
                path: { id }
            }
        }),

        updateStock: (id: string, data: any) => ({
            method: 'PUT',
            path: `/product-variant/stock/${id}`,
            description: 'تحديث المخزون',
            parameters: {
                path: { id },
                body: data
            }
        })
    };

    /**
     * تقييمات المنتج
     */
    static productReview = {
        getReviewProfile: (id: string) => ({
            method: 'GET',
            path: `/product-review/profile/${id}`,
            description: 'الحصول على ملف التقييم مع جميع العلاقات',
            parameters: {
                path: { id }
            }
        }),

        getProductReviews: (productId: string) => ({
            method: 'GET',
            path: `/product-review/product/${productId}`,
            description: 'الحصول على تقييمات المنتج',
            parameters: {
                path: { productId }
            }
        }),

        getUserReviews: (userId: string) => ({
            method: 'GET',
            path: `/product-review/user/${userId}`,
            description: 'الحصول على تقييمات المستخدم',
            parameters: {
                path: { userId }
            }
        }),

        create: (data: any) => ({
            method: 'POST',
            path: '/product-review',
            description: 'إنشاء تقييم جديد',
            parameters: {
                body: data
            }
        }),

        update: (id: string, data: any) => ({
            method: 'PUT',
            path: `/product-review/${id}`,
            description: 'تحديث التقييم',
            parameters: {
                path: { id },
                body: data
            }
        }),

        delete: (id: string) => ({
            method: 'DELETE',
            path: `/product-review/${id}`,
            description: 'حذف التقييم',
            parameters: {
                path: { id }
            }
        }),

        verifyPurchase: (id: string) => ({
            method: 'POST',
            path: `/product-review/verify/${id}`,
            description: 'التحقق من شراء المنتج',
            parameters: {
                path: { id }
            }
        })
    };

    /**
     * سجلات تحسين الأداء
     */
    static optimizationLog = {
        getLogProfile: (id: string) => ({
            method: 'GET',
            path: `/optimization-log/profile/${id}`,
            description: 'الحصول على ملف السجل مع جميع العلاقات',
            parameters: {
                path: { id }
            }
        }),

        getPerformanceLogs: (startDate: string, endDate: string) => ({
            method: 'GET',
            path: '/optimization-log/performance',
            description: 'الحصول على سجلات الأداء',
            parameters: {
                query: { startDate, endDate }
            }
        }),

        getErrorLogs: (startDate: string, endDate: string) => ({
            method: 'GET',
            path: '/optimization-log/errors',
            description: 'الحصول على سجلات الأخطاء',
            parameters: {
                query: { startDate, endDate }
            }
        }),

        create: (data: any) => ({
            method: 'POST',
            path: '/optimization-log',
            description: 'إنشاء سجل تحسين جديد',
            parameters: {
                body: data
            }
        }),

        update: (id: string, data: any) => ({
            method: 'PUT',
            path: `/optimization-log/${id}`,
            description: 'تحديث سجل التحسين',
            parameters: {
                path: { id },
                body: data
            }
        }),

        delete: (id: string) => ({
            method: 'DELETE',
            path: `/optimization-log/${id}`,
            description: 'حذف سجل التحسين',
            parameters: {
                path: { id }
            }
        }),

        analyzePerformance: (data: any) => ({
            method: 'POST',
            path: '/optimization-log/analyze',
            description: 'تحليل الأداء',
            parameters: {
                body: data
            }
        })
    };

    /**
     * شرائح المستخدمين
     */
    static userSegment = {
        getSegmentProfile: (id: string) => ({
            method: 'GET',
            path: `/user-segment/profile/${id}`,
            description: 'الحصول على ملف الشريحة مع جميع العلاقات',
            parameters: {
                path: { id }
            }
        }),

        getActiveSegments: () => ({
            method: 'GET',
            path: '/user-segment/active',
            description: 'الحصول على الشرائح النشطة'
        }),

        getSegmentUsers: (segmentId: string) => ({
            method: 'GET',
            path: `/user-segment/users/${segmentId}`,
            description: 'الحصول على مستخدمي الشريحة',
            parameters: {
                path: { segmentId }
            }
        }),

        create: (data: any) => ({
            method: 'POST',
            path: '/user-segment',
            description: 'إنشاء شريحة مستخدمين جديدة',
            parameters: {
                body: data
            }
        }),

        update: (id: string, data: any) => ({
            method: 'PUT',
            path: `/user-segment/${id}`,
            description: 'تحديث شريحة المستخدمين',
            parameters: {
                path: { id },
                body: data
            }
        }),

        delete: (id: string) => ({
            method: 'DELETE',
            path: `/user-segment/${id}`,
            description: 'حذف شريحة المستخدمين',
            parameters: {
                path: { id }
            }
        }),

        analyzeSegment: (id: string) => ({
            method: 'POST',
            path: `/user-segment/analyze/${id}`,
            description: 'تحليل شريحة المستخدمين',
            parameters: {
                path: { id }
            }
        })
    };

    /**
     * تقييم المحتوى
     */
    static contentScore = {
        getScoreProfile: (id: string) => ({
            method: 'GET',
            path: `/content-score/profile/${id}`,
            description: 'الحصول على ملف التقييم مع جميع العلاقات',
            parameters: {
                path: { id }
            }
        }),

        getContentScores: (contentId: string) => ({
            method: 'GET',
            path: `/content-score/content/${contentId}`,
            description: 'الحصول على تقييمات المحتوى',
            parameters: {
                path: { contentId }
            }
        }),

        getHighScores: () => ({
            method: 'GET',
            path: '/content-score/high',
            description: 'الحصول على المحتوى الأعلى تقييماً'
        }),

        create: (data: any) => ({
            method: 'POST',
            path: '/content-score',
            description: 'إنشاء تقييم محتوى جديد',
            parameters: {
                body: data
            }
        }),

        update: (id: string, data: any) => ({
            method: 'PUT',
            path: `/content-score/${id}`,
            description: 'تحديث تقييم المحتوى',
            parameters: {
                path: { id },
                body: data
            }
        }),

        delete: (id: string) => ({
            method: 'DELETE',
            path: `/content-score/${id}`,
            description: 'حذف تقييم المحتوى',
            parameters: {
                path: { id }
            }
        }),

        analyzeContent: (id: string) => ({
            method: 'POST',
            path: `/content-score/analyze/${id}`,
            description: 'تحليل تقييم المحتوى',
            parameters: {
                path: { id }
            }
        })
    };

    /**
     * أداء الاستهداف
     */
    static targetingPerformance = {
        getPerformanceProfile: (id: string) => ({
            method: 'GET',
            path: `/targeting-performance/profile/${id}`,
            description: 'الحصول على ملف الأداء مع جميع العلاقات',
            parameters: {
                path: { id }
            }
        }),

        getCampaignPerformance: (campaignId: string) => ({
            method: 'GET',
            path: `/targeting-performance/campaign/${campaignId}`,
            description: 'الحصول على أداء الحملة',
            parameters: {
                path: { campaignId }
            }
        }),

        getSegmentPerformance: (segmentId: string) => ({
            method: 'GET',
            path: `/targeting-performance/segment/${segmentId}`,
            description: 'الحصول على أداء الشريحة',
            parameters: {
                path: { segmentId }
            }
        }),

        create: (data: any) => ({
            method: 'POST',
            path: '/targeting-performance',
            description: 'إنشاء سجل أداء استهداف جديد',
            parameters: {
                body: data
            }
        }),

        update: (id: string, data: any) => ({
            method: 'PUT',
            path: `/targeting-performance/${id}`,
            description: 'تحديث سجل أداء الاستهداف',
            parameters: {
                path: { id },
                body: data
            }
        }),

        delete: (id: string) => ({
            method: 'DELETE',
            path: `/targeting-performance/${id}`,
            description: 'حذف سجل أداء الاستهداف',
            parameters: {
                path: { id }
            }
        }),

        analyzePerformance: (id: string) => ({
            method: 'POST',
            path: `/targeting-performance/analyze/${id}`,
            description: 'تحليل أداء الاستهداف',
            parameters: {
                path: { id }
            }
        })
    };

    static contentAnalytics = {
        getProfile: (id: string) => ({
            method: 'GET',
            path: `/content-analytics/${id}`,
            description: 'الحصول على ملف تحليل المحتوى',
            parameters: {
                path: { id }
            }
        }),

        getContentAnalytics: (contentId: string) => ({
            method: 'GET',
            path: `/content-analytics/content/${contentId}`,
            description: 'الحصول على تحليلات المحتوى',
            parameters: {
                path: { contentId }
            }
        }),

        getPopularContent: () => ({
            method: 'GET',
            path: '/content-analytics/popular',
            description: 'الحصول على المحتوى الأكثر شعبية'
        }),

        createAnalytics: (data: any) => ({
            method: 'POST',
            path: '/content-analytics',
            description: 'إنشاء تحليل محتوى جديد',
            parameters: {
                body: data
            }
        }),

        updateAnalytics: (id: string, data: any) => ({
            method: 'PUT',
            path: `/content-analytics/${id}`,
            description: 'تحديث تحليل المحتوى',
            parameters: {
                path: { id },
                body: data
            }
        }),

        deleteAnalytics: (id: string) => ({
            method: 'DELETE',
            path: `/content-analytics/${id}`,
            description: 'حذف تحليل المحتوى',
            parameters: {
                path: { id }
            }
        }),

        analyzeContent: (id: string) => ({
            method: 'POST',
            path: `/content-analytics/analyze/${id}`,
            description: 'تحليل المحتوى',
            parameters: {
                path: { id }
            }
        })
    };

    static engagementMetrics = {
        getProfile: (id: string) => ({
            method: 'GET',
            path: `/engagement-metrics/${id}`,
            description: 'الحصول على ملف مقاييس المشاركة',
            parameters: {
                path: { id }
            }
        }),

        getUserMetrics: (userId: string) => ({
            method: 'GET',
            path: `/engagement-metrics/user/${userId}`,
            description: 'الحصول على مقاييس مشاركة المستخدم',
            parameters: {
                path: { userId }
            }
        }),

        getContentMetrics: (contentId: string) => ({
            method: 'GET',
            path: `/engagement-metrics/content/${contentId}`,
            description: 'الحصول على مقاييس مشاركة المحتوى',
            parameters: {
                path: { contentId }
            }
        }),

        createMetrics: (data: any) => ({
            method: 'POST',
            path: '/engagement-metrics',
            description: 'إنشاء مقاييس مشاركة جديدة',
            parameters: {
                body: data
            }
        }),

        updateMetrics: (id: string, data: any) => ({
            method: 'PUT',
            path: `/engagement-metrics/${id}`,
            description: 'تحديث مقاييس المشاركة',
            parameters: {
                path: { id },
                body: data
            }
        }),

        deleteMetrics: (id: string) => ({
            method: 'DELETE',
            path: `/engagement-metrics/${id}`,
            description: 'حذف مقاييس المشاركة',
            parameters: {
                path: { id }
            }
        }),

        analyzeEngagement: (id: string) => ({
            method: 'POST',
            path: `/engagement-metrics/analyze/${id}`,
            description: 'تحليل المشاركة',
            parameters: {
                path: { id }
            }
        })
    };

    static userBehaviors = {
        getProfile: (id: string) => ({
            method: 'GET',
            path: `/user-behaviors/${id}`,
            description: 'الحصول على ملف سلوكيات المستخدم',
            parameters: {
                path: { id }
            }
        }),

        getUserBehaviors: (userId: string) => ({
            method: 'GET',
            path: `/user-behaviors/user/${userId}`,
            description: 'الحصول على سلوكيات المستخدم',
            parameters: {
                path: { userId }
            }
        }),

        getBehaviorPatterns: () => ({
            method: 'GET',
            path: '/user-behaviors/patterns',
            description: 'الحصول على أنماط السلوك'
        }),

        createBehavior: (data: any) => ({
            method: 'POST',
            path: '/user-behaviors',
            description: 'إنشاء سجل سلوك مستخدم جديد',
            parameters: {
                body: data
            }
        }),

        updateBehavior: (id: string, data: any) => ({
            method: 'PUT',
            path: `/user-behaviors/${id}`,
            description: 'تحديث سجل سلوك المستخدم',
            parameters: {
                path: { id },
                body: data
            }
        }),

        deleteBehavior: (id: string) => ({
            method: 'DELETE',
            path: `/user-behaviors/${id}`,
            description: 'حذف سجل سلوك المستخدم',
            parameters: {
                path: { id }
            }
        }),

        analyzeBehavior: (id: string) => ({
            method: 'POST',
            path: `/user-behaviors/analyze/${id}`,
            description: 'تحليل سلوك المستخدم',
            parameters: {
                path: { id }
            }
        })
    };

    static reports = {
        getProfile: (id: string) => ({
            method: 'GET',
            path: `/reports/${id}`,
            description: 'الحصول على ملف التقرير',
            parameters: {
                path: { id }
            }
        }),

        getUserReports: (userId: string) => ({
            method: 'GET',
            path: `/reports/user/${userId}`,
            description: 'الحصول على تقارير المستخدم',
            parameters: {
                path: { userId }
            }
        }),

        getReportTypes: () => ({
            method: 'GET',
            path: '/reports/types',
            description: 'الحصول على أنواع التقارير'
        }),

        createReport: (data: any) => ({
            method: 'POST',
            path: '/reports',
            description: 'إنشاء تقرير جديد',
            parameters: {
                body: data
            }
        }),

        updateReport: (id: string, data: any) => ({
            method: 'PUT',
            path: `/reports/${id}`,
            description: 'تحديث التقرير',
            parameters: {
                path: { id },
                body: data
            }
        }),

        deleteReport: (id: string) => ({
            method: 'DELETE',
            path: `/reports/${id}`,
            description: 'حذف التقرير',
            parameters: {
                path: { id }
            }
        }),

        generateReport: (id: string) => ({
            method: 'POST',
            path: `/reports/generate/${id}`,
            description: 'توليد التقرير',
            parameters: {
                path: { id }
            }
        })
    };

    static subscriptions = {
        getProfile: (id: string) => ({
            method: 'GET',
            path: `/subscriptions/${id}`,
            description: 'الحصول على ملف الاشتراك',
            parameters: {
                path: { id }
            }
        }),

        getUserSubscriptions: (userId: string) => ({
            method: 'GET',
            path: `/subscriptions/user/${userId}`,
            description: 'الحصول على اشتراكات المستخدم',
            parameters: {
                path: { userId }
            }
        }),

        getSubscriptionPlans: () => ({
            method: 'GET',
            path: '/subscriptions/plans',
            description: 'الحصول على خطط الاشتراك'
        }),

        createSubscription: (data: any) => ({
            method: 'POST',
            path: '/subscriptions',
            description: 'إنشاء اشتراك جديد',
            parameters: {
                body: data
            }
        }),

        updateSubscription: (id: string, data: any) => ({
            method: 'PUT',
            path: `/subscriptions/${id}`,
            description: 'تحديث الاشتراك',
            parameters: {
                path: { id },
                body: data
            }
        }),

        cancelSubscription: (id: string) => ({
            method: 'POST',
            path: `/subscriptions/cancel/${id}`,
            description: 'إلغاء الاشتراك',
            parameters: {
                path: { id }
            }
        }),

        renewSubscription: (id: string) => ({
            method: 'POST',
            path: `/subscriptions/renew/${id}`,
            description: 'تجديد الاشتراك',
            parameters: {
                path: { id }
            }
        })
    };

    static performanceReports = {
        getProfile: (id: string) => ({
            method: 'GET',
            path: `/performance-reports/${id}`,
            description: 'الحصول على ملف تقرير الأداء',
            parameters: {
                path: { id }
            }
        }),

        getUserPerformance: (userId: string) => ({
            method: 'GET',
            path: `/performance-reports/user/${userId}`,
            description: 'الحصول على أداء المستخدم',
            parameters: {
                path: { userId }
            }
        }),

        getPerformanceMetrics: () => ({
            method: 'GET',
            path: '/performance-reports/metrics',
            description: 'الحصول على مقاييس الأداء'
        }),

        createPerformanceReport: (data: any) => ({
            method: 'POST',
            path: '/performance-reports',
            description: 'إنشاء تقرير أداء جديد',
            parameters: {
                body: data
            }
        }),

        updatePerformanceReport: (id: string, data: any) => ({
            method: 'PUT',
            path: `/performance-reports/${id}`,
            description: 'تحديث تقرير الأداء',
            parameters: {
                path: { id },
                body: data
            }
        }),

        deletePerformanceReport: (id: string) => ({
            method: 'DELETE',
            path: `/performance-reports/${id}`,
            description: 'حذف تقرير الأداء',
            parameters: {
                path: { id }
            }
        }),

        analyzePerformance: (id: string) => ({
            method: 'POST',
            path: `/performance-reports/analyze/${id}`,
            description: 'تحليل الأداء',
            parameters: {
                path: { id }
            }
        })
    };

    static competitions = {
        getProfile: (id: string) => ({
            method: 'GET',
            path: `/competitions/${id}`,
            description: 'الحصول على ملف المسابقة',
            parameters: {
                path: { id }
            }
        }),

        getActiveCompetitions: () => ({
            method: 'GET',
            path: '/competitions/active',
            description: 'الحصول على المسابقات النشطة'
        }),

        getCompetitionCategories: () => ({
            method: 'GET',
            path: '/competitions/categories',
            description: 'الحصول على فئات المسابقات'
        }),

        createCompetition: (data: any) => ({
            method: 'POST',
            path: '/competitions',
            description: 'إنشاء مسابقة جديدة',
            parameters: {
                body: data
            }
        }),

        updateCompetition: (id: string, data: any) => ({
            method: 'PUT',
            path: `/competitions/${id}`,
            description: 'تحديث المسابقة',
            parameters: {
                path: { id },
                body: data
            }
        }),

        deleteCompetition: (id: string) => ({
            method: 'DELETE',
            path: `/competitions/${id}`,
            description: 'حذف المسابقة',
            parameters: {
                path: { id }
            }
        }),

        startCompetition: (id: string) => ({
            method: 'POST',
            path: `/competitions/start/${id}`,
            description: 'بدء المسابقة',
            parameters: {
                path: { id }
            }
        }),

        endCompetition: (id: string) => ({
            method: 'POST',
            path: `/competitions/end/${id}`,
            description: 'إنهاء المسابقة',
            parameters: {
                path: { id }
            }
        })
    };

    static competitionRounds = {
        getProfile: (id: string) => ({
            method: 'GET',
            path: `/competition-rounds/${id}`,
            description: 'الحصول على ملف جولة المسابقة',
            parameters: {
                path: { id }
            }
        }),

        getCompetitionRounds: (competitionId: string) => ({
            method: 'GET',
            path: `/competition-rounds/competition/${competitionId}`,
            description: 'الحصول على جولات المسابقة',
            parameters: {
                path: { competitionId }
            }
        }),

        getCurrentRound: (competitionId: string) => ({
            method: 'GET',
            path: `/competition-rounds/current/${competitionId}`,
            description: 'الحصول على الجولة الحالية',
            parameters: {
                path: { competitionId }
            }
        }),

        createRound: (data: any) => ({
            method: 'POST',
            path: '/competition-rounds',
            description: 'إنشاء جولة مسابقة جديدة',
            parameters: {
                body: data
            }
        }),

        updateRound: (id: string, data: any) => ({
            method: 'PUT',
            path: `/competition-rounds/${id}`,
            description: 'تحديث جولة المسابقة',
            parameters: {
                path: { id },
                body: data
            }
        }),

        deleteRound: (id: string) => ({
            method: 'DELETE',
            path: `/competition-rounds/${id}`,
            description: 'حذف جولة المسابقة',
            parameters: {
                path: { id }
            }
        }),

        startRound: (id: string) => ({
            method: 'POST',
            path: `/competition-rounds/start/${id}`,
            description: 'بدء جولة المسابقة',
            parameters: {
                path: { id }
            }
        }),

        endRound: (id: string) => ({
            method: 'POST',
            path: `/competition-rounds/end/${id}`,
            description: 'إنهاء جولة المسابقة',
            parameters: {
                path: { id }
            }
        })
    };

    static competitionParticipants = {
        getProfile: (id: string) => ({
            method: 'GET',
            path: `/competition-participants/${id}`,
            description: 'الحصول على ملف مشارك المسابقة',
            parameters: {
                path: { id }
            }
        }),

        getCompetitionParticipants: (competitionId: string) => ({
            method: 'GET',
            path: `/competition-participants/competition/${competitionId}`,
            description: 'الحصول على مشاركي المسابقة',
            parameters: {
                path: { competitionId }
            }
        }),

        getRoundParticipants: (roundId: string) => ({
            method: 'GET',
            path: `/competition-participants/round/${roundId}`,
            description: 'الحصول على مشاركي الجولة',
            parameters: {
                path: { roundId }
            }
        }),

        createParticipant: (data: any) => ({
            method: 'POST',
            path: '/competition-participants',
            description: 'إنشاء مشارك مسابقة جديد',
            parameters: {
                body: data
            }
        }),

        updateParticipant: (id: string, data: any) => ({
            method: 'PUT',
            path: `/competition-participants/${id}`,
            description: 'تحديث مشارك المسابقة',
            parameters: {
                path: { id },
                body: data
            }
        }),

        deleteParticipant: (id: string) => ({
            method: 'DELETE',
            path: `/competition-participants/${id}`,
            description: 'حذف مشارك المسابقة',
            parameters: {
                path: { id }
            }
        }),

        qualifyParticipant: (id: string) => ({
            method: 'POST',
            path: `/competition-participants/qualify/${id}`,
            description: 'تأهيل المشارك للجولة التالية',
            parameters: {
                path: { id }
            }
        }),

        disqualifyParticipant: (id: string) => ({
            method: 'POST',
            path: `/competition-participants/disqualify/${id}`,
            description: 'استبعاد المشارك',
            parameters: {
                path: { id }
            }
        })
    };

    static trainingCategories = {
        getProfile: (id: string) => ({
            method: 'GET',
            path: `/training-categories/${id}`,
            description: 'الحصول على ملف فئة التدريب',
            parameters: {
                path: { id }
            }
        }),

        getActiveCategories: () => ({
            method: 'GET',
            path: '/training-categories/active',
            description: 'الحصول على فئات التدريب النشطة'
        }),

        getCategoryTrainings: (categoryId: string) => ({
            method: 'GET',
            path: `/training-categories/${categoryId}/trainings`,
            description: 'الحصول على التدريبات في الفئة',
            parameters: {
                path: { categoryId }
            }
        }),

        createCategory: (data: any) => ({
            method: 'POST',
            path: '/training-categories',
            description: 'إنشاء فئة تدريب جديدة',
            parameters: {
                body: data
            }
        }),

        updateCategory: (id: string, data: any) => ({
            method: 'PUT',
            path: `/training-categories/${id}`,
            description: 'تحديث فئة التدريب',
            parameters: {
                path: { id },
                body: data
            }
        }),

        deleteCategory: (id: string) => ({
            method: 'DELETE',
            path: `/training-categories/${id}`,
            description: 'حذف فئة التدريب',
            parameters: {
                path: { id }
            }
        }),

        activateCategory: (id: string) => ({
            method: 'POST',
            path: `/training-categories/activate/${id}`,
            description: 'تفعيل فئة التدريب',
            parameters: {
                path: { id }
            }
        }),

        deactivateCategory: (id: string) => ({
            method: 'POST',
            path: `/training-categories/deactivate/${id}`,
            description: 'تعطيل فئة التدريب',
            parameters: {
                path: { id }
            }
        })
    };

    static trainingReviews = {
        getProfile: (id: string) => ({
            method: 'GET',
            path: `/training-reviews/${id}`,
            description: 'الحصول على ملف مراجعة التدريب',
            parameters: {
                path: { id }
            }
        }),

        getTrainingReviews: (trainingId: string) => ({
            method: 'GET',
            path: `/training-reviews/training/${trainingId}`,
            description: 'الحصول على مراجعات التدريب',
            parameters: {
                path: { trainingId }
            }
        }),

        getUserReviews: (userId: string) => ({
            method: 'GET',
            path: `/training-reviews/user/${userId}`,
            description: 'الحصول على مراجعات المستخدم',
            parameters: {
                path: { userId }
            }
        }),

        createReview: (data: any) => ({
            method: 'POST',
            path: '/training-reviews',
            description: 'إنشاء مراجعة تدريب جديدة',
            parameters: {
                body: data
            }
        }),

        updateReview: (id: string, data: any) => ({
            method: 'PUT',
            path: `/training-reviews/${id}`,
            description: 'تحديث مراجعة التدريب',
            parameters: {
                path: { id },
                body: data
            }
        }),

        deleteReview: (id: string) => ({
            method: 'DELETE',
            path: `/training-reviews/${id}`,
            description: 'حذف مراجعة التدريب',
            parameters: {
                path: { id }
            }
        }),

        approveReview: (id: string) => ({
            method: 'POST',
            path: `/training-reviews/approve/${id}`,
            description: 'الموافقة على مراجعة التدريب',
            parameters: {
                path: { id }
            }
        }),

        rejectReview: (id: string) => ({
            method: 'POST',
            path: `/training-reviews/reject/${id}`,
            description: 'رفض مراجعة التدريب',
            parameters: {
                path: { id }
            }
        })
    };

    static eventSponsors = {
        getProfile: (id: string) => ({
            method: 'GET',
            path: `/event-sponsors/${id}`,
            description: 'الحصول على ملف راعي الفعالية',
            parameters: {
                path: { id }
            }
        }),

        getEventSponsors: (eventId: string) => ({
            method: 'GET',
            path: `/event-sponsors/event/${eventId}`,
            description: 'الحصول على رعاة الفعالية',
            parameters: {
                path: { eventId }
            }
        }),

        getSponsorEvents: (sponsorId: string) => ({
            method: 'GET',
            path: `/event-sponsors/sponsor/${sponsorId}`,
            description: 'الحصول على فعاليات الراعي',
            parameters: {
                path: { sponsorId }
            }
        }),

        createSponsor: (data: any) => ({
            method: 'POST',
            path: '/event-sponsors',
            description: 'إنشاء راعي فعالية جديد',
            parameters: {
                body: data
            }
        }),

        updateSponsor: (id: string, data: any) => ({
            method: 'PUT',
            path: `/event-sponsors/${id}`,
            description: 'تحديث راعي الفعالية',
            parameters: {
                path: { id },
                body: data
            }
        }),

        deleteSponsor: (id: string) => ({
            method: 'DELETE',
            path: `/event-sponsors/${id}`,
            description: 'حذف راعي الفعالية',
            parameters: {
                path: { id }
            }
        }),

        approveSponsor: (id: string) => ({
            method: 'POST',
            path: `/event-sponsors/approve/${id}`,
            description: 'الموافقة على راعي الفعالية',
            parameters: {
                path: { id }
            }
        }),

        rejectSponsor: (id: string) => ({
            method: 'POST',
            path: `/event-sponsors/reject/${id}`,
            description: 'رفض راعي الفعالية',
            parameters: {
                path: { id }
            }
        })
    };

    static eventParticipants = {
        getProfile: (id: string) => ({
            method: 'GET',
            path: `/event-participants/${id}`,
            description: 'الحصول على ملف مشارك الفعالية',
            parameters: {
                path: { id }
            }
        }),

        getEventParticipants: (eventId: string) => ({
            method: 'GET',
            path: `/event-participants/event/${eventId}`,
            description: 'الحصول على مشاركي الفعالية',
            parameters: {
                path: { eventId }
            }
        }),

        getUserEvents: (userId: string) => ({
            method: 'GET',
            path: `/event-participants/user/${userId}`,
            description: 'الحصول على فعاليات المستخدم',
            parameters: {
                path: { userId }
            }
        }),

        createParticipant: (data: any) => ({
            method: 'POST',
            path: '/event-participants',
            description: 'إنشاء مشارك فعالية جديد',
            parameters: {
                body: data
            }
        }),

        updateParticipant: (id: string, data: any) => ({
            method: 'PUT',
            path: `/event-participants/${id}`,
            description: 'تحديث مشارك الفعالية',
            parameters: {
                path: { id },
                body: data
            }
        }),

        deleteParticipant: (id: string) => ({
            method: 'DELETE',
            path: `/event-participants/${id}`,
            description: 'حذف مشارك الفعالية',
            parameters: {
                path: { id }
            }
        }),

        approveParticipant: (id: string) => ({
            method: 'POST',
            path: `/event-participants/approve/${id}`,
            description: 'الموافقة على مشارك الفعالية',
            parameters: {
                path: { id }
            }
        }),

        rejectParticipant: (id: string) => ({
            method: 'POST',
            path: `/event-participants/reject/${id}`,
            description: 'رفض مشارك الفعالية',
            parameters: {
                path: { id }
            }
        })
    };

    static prizes = {
        getProfile: (id: string) => ({
            method: 'GET',
            path: `/prizes/${id}`,
            description: 'الحصول على ملف الجائزة',
            parameters: {
                path: { id }
            }
        }),

        getEventPrizes: (eventId: string) => ({
            method: 'GET',
            path: `/prizes/event/${eventId}`,
            description: 'الحصول على جوائز الفعالية',
            parameters: {
                path: { eventId }
            }
        }),

        getPrizeCategories: () => ({
            method: 'GET',
            path: '/prizes/categories',
            description: 'الحصول على فئات الجوائز'
        }),

        createPrize: (data: any) => ({
            method: 'POST',
            path: '/prizes',
            description: 'إنشاء جائزة جديدة',
            parameters: {
                body: data
            }
        }),

        updatePrize: (id: string, data: any) => ({
            method: 'PUT',
            path: `/prizes/${id}`,
            description: 'تحديث الجائزة',
            parameters: {
                path: { id },
                body: data
            }
        }),

        deletePrize: (id: string) => ({
            method: 'DELETE',
            path: `/prizes/${id}`,
            description: 'حذف الجائزة',
            parameters: {
                path: { id }
            }
        }),

        awardPrize: (id: string, winnerId: string) => ({
            method: 'POST',
            path: `/prizes/award/${id}`,
            description: 'منح الجائزة',
            parameters: {
                path: { id },
                body: { winnerId }
            }
        })
    };

    static eventAgenda = {
        getProfile: (id: string) => ({
            method: 'GET',
            path: `/event-agenda/${id}`,
            description: 'الحصول على ملف أجندة الفعالية',
            parameters: {
                path: { id }
            }
        }),

        getEventAgenda: (eventId: string) => ({
            method: 'GET',
            path: `/event-agenda/event/${eventId}`,
            description: 'الحصول على أجندة الفعالية',
            parameters: {
                path: { eventId }
            }
        }),

        getAgendaItems: (agendaId: string) => ({
            method: 'GET',
            path: `/event-agenda/${agendaId}/items`,
            description: 'الحصول على عناصر الأجندة',
            parameters: {
                path: { agendaId }
            }
        }),

        createAgenda: (data: any) => ({
            method: 'POST',
            path: '/event-agenda',
            description: 'إنشاء أجندة فعالية جديدة',
            parameters: {
                body: data
            }
        }),

        updateAgenda: (id: string, data: any) => ({
            method: 'PUT',
            path: `/event-agenda/${id}`,
            description: 'تحديث أجندة الفعالية',
            parameters: {
                path: { id },
                body: data
            }
        }),

        deleteAgenda: (id: string) => ({
            method: 'DELETE',
            path: `/event-agenda/${id}`,
            description: 'حذف أجندة الفعالية',
            parameters: {
                path: { id }
            }
        }),

        addAgendaItem: (agendaId: string, data: any) => ({
            method: 'POST',
            path: `/event-agenda/${agendaId}/items`,
            description: 'إضافة عنصر للأجندة',
            parameters: {
                path: { agendaId },
                body: data
            }
        }),

        updateAgendaItem: (agendaId: string, itemId: string, data: any) => ({
            method: 'PUT',
            path: `/event-agenda/${agendaId}/items/${itemId}`,
            description: 'تحديث عنصر الأجندة',
            parameters: {
                path: { agendaId, itemId },
                body: data
            }
        }),

        deleteAgendaItem: (agendaId: string, itemId: string) => ({
            method: 'DELETE',
            path: `/event-agenda/${agendaId}/items/${itemId}`,
            description: 'حذف عنصر الأجندة',
            parameters: {
                path: { agendaId, itemId }
            }
        })
    };

    static eventImages = {
        getProfile: (id: string) => ({
            method: 'GET',
            path: `/event-images/${id}`,
            description: 'الحصول على ملف صورة الفعالية',
            parameters: {
                path: { id }
            }
        }),

        getEventImages: (eventId: string) => ({
            method: 'GET',
            path: `/event-images/event/${eventId}`,
            description: 'الحصول على صور الفعالية',
            parameters: {
                path: { eventId }
            }
        }),

        getImageCategories: () => ({
            method: 'GET',
            path: '/event-images/categories',
            description: 'الحصول على فئات الصور'
        }),

        createImage: (data: any) => ({
            method: 'POST',
            path: '/event-images',
            description: 'إنشاء صورة فعالية جديدة',
            parameters: {
                body: data
            }
        }),

        updateImage: (id: string, data: any) => ({
            method: 'PUT',
            path: `/event-images/${id}`,
            description: 'تحديث صورة الفعالية',
            parameters: {
                path: { id },
                body: data
            }
        }),

        deleteImage: (id: string) => ({
            method: 'DELETE',
            path: `/event-images/${id}`,
            description: 'حذف صورة الفعالية',
            parameters: {
                path: { id }
            }
        }),

        uploadImage: (id: string, file: File) => ({
            method: 'POST',
            path: `/event-images/${id}/upload`,
            description: 'رفع صورة الفعالية',
            parameters: {
                path: { id },
                body: { file }
            }
        })
    };

    static eventCategories = {
        getProfile: (id: string) => ({
            method: 'GET',
            path: `/event-categories/${id}`,
            description: 'الحصول على ملف فئة الفعالية',
            parameters: {
                path: { id }
            }
        }),

        getEventCategories: () => ({
            method: 'GET',
            path: '/event-categories',
            description: 'الحصول على فئات الفعاليات'
        }),

        getCategoryEvents: (categoryId: string) => ({
            method: 'GET',
            path: `/event-categories/${categoryId}/events`,
            description: 'الحصول على فعاليات الفئة',
            parameters: {
                path: { categoryId }
            }
        }),

        createCategory: (data: any) => ({
            method: 'POST',
            path: '/event-categories',
            description: 'إنشاء فئة فعالية جديدة',
            parameters: {
                body: data
            }
        }),

        updateCategory: (id: string, data: any) => ({
            method: 'PUT',
            path: `/event-categories/${id}`,
            description: 'تحديث فئة الفعالية',
            parameters: {
                path: { id },
                body: data
            }
        }),

        deleteCategory: (id: string) => ({
            method: 'DELETE',
            path: `/event-categories/${id}`,
            description: 'حذف فئة الفعالية',
            parameters: {
                path: { id }
            }
        }),

        activateCategory: (id: string) => ({
            method: 'POST',
            path: `/event-categories/activate/${id}`,
            description: 'تفعيل فئة الفعالية',
            parameters: {
                path: { id }
            }
        }),

        deactivateCategory: (id: string) => ({
            method: 'POST',
            path: `/event-categories/deactivate/${id}`,
            description: 'تعطيل فئة الفعالية',
            parameters: {
                path: { id }
            }
        })
    };

    static campaignAnalytics = {
        getProfile: (id: string) => ({
            method: 'GET',
            path: `/campaign-analytics/${id}`,
            description: 'الحصول على ملف تحليل الحملة',
            parameters: {
                path: { id }
            }
        }),

        getCampaignAnalytics: (campaignId: string) => ({
            method: 'GET',
            path: `/campaign-analytics/campaign/${campaignId}`,
            description: 'الحصول على تحليلات الحملة',
            parameters: {
                path: { campaignId }
            }
        }),

        getAnalyticsMetrics: (analyticsId: string) => ({
            method: 'GET',
            path: `/campaign-analytics/${analyticsId}/metrics`,
            description: 'الحصول على مقاييس التحليل',
            parameters: {
                path: { analyticsId }
            }
        }),

        createAnalytics: (data: any) => ({
            method: 'POST',
            path: '/campaign-analytics',
            description: 'إنشاء تحليل حملة جديد',
            parameters: {
                body: data
            }
        }),

        updateAnalytics: (id: string, data: any) => ({
            method: 'PUT',
            path: `/campaign-analytics/${id}`,
            description: 'تحديث تحليل الحملة',
            parameters: {
                path: { id },
                body: data
            }
        }),

        deleteAnalytics: (id: string) => ({
            method: 'DELETE',
            path: `/campaign-analytics/${id}`,
            description: 'حذف تحليل الحملة',
            parameters: {
                path: { id }
            }
        }),

        generateReport: (id: string) => ({
            method: 'POST',
            path: `/campaign-analytics/report/${id}`,
            description: 'إنشاء تقرير التحليل',
            parameters: {
                path: { id }
            }
        }),

        analyzePerformance: (id: string) => ({
            method: 'POST',
            path: `/campaign-analytics/analyze/${id}`,
            description: 'تحليل أداء الحملة',
            parameters: {
                path: { id }
            }
        })
    };

    static campaigns = {
        getProfile: (id: string) => ({
            method: 'GET',
            path: `/campaigns/${id}`,
            description: 'الحصول على ملف الحملة',
            parameters: {
                path: { id }
            }
        }),

        getActiveCampaigns: () => ({
            method: 'GET',
            path: '/campaigns/active',
            description: 'الحصول على الحملات النشطة'
        }),

        getCampaignTypes: () => ({
            method: 'GET',
            path: '/campaigns/types',
            description: 'الحصول على أنواع الحملات'
        }),

        createCampaign: (data: any) => ({
            method: 'POST',
            path: '/campaigns',
            description: 'إنشاء حملة جديدة',
            parameters: {
                body: data
            }
        }),

        updateCampaign: (id: string, data: any) => ({
            method: 'PUT',
            path: `/campaigns/${id}`,
            description: 'تحديث الحملة',
            parameters: {
                path: { id },
                body: data
            }
        }),

        deleteCampaign: (id: string) => ({
            method: 'DELETE',
            path: `/campaigns/${id}`,
            description: 'حذف الحملة',
            parameters: {
                path: { id }
            }
        }),

        startCampaign: (id: string) => ({
            method: 'POST',
            path: `/campaigns/start/${id}`,
            description: 'بدء الحملة',
            parameters: {
                path: { id }
            }
        }),

        stopCampaign: (id: string) => ({
            method: 'POST',
            path: `/campaigns/stop/${id}`,
            description: 'إيقاف الحملة',
            parameters: {
                path: { id }
            }
        }),

        pauseCampaign: (id: string) => ({
            method: 'POST',
            path: `/campaigns/pause/${id}`,
            description: 'تعليق الحملة',
            parameters: {
                path: { id }
            }
        }),

        resumeCampaign: (id: string) => ({
            method: 'POST',
            path: `/campaigns/resume/${id}`,
            description: 'استئناف الحملة',
            parameters: {
                path: { id }
            }
        })
    };

    static advertisement = {
        getProfile: (id: string) => ({
            method: 'GET',
            path: `/advertisements/${id}`,
            description: 'الحصول على ملف الإعلان',
            parameters: {
                path: { id }
            }
        }),

        getCampaignAds: (campaignId: string) => ({
            method: 'GET',
            path: `/advertisements/campaign/${campaignId}`,
            description: 'الحصول على إعلانات الحملة',
            parameters: {
                path: { campaignId }
            }
        }),

        getAdTypes: () => ({
            method: 'GET',
            path: '/advertisements/types',
            description: 'الحصول على أنواع الإعلانات'
        }),

        createAdvertisement: (data: any) => ({
            method: 'POST',
            path: '/advertisements',
            description: 'إنشاء إعلان جديد',
            parameters: {
                body: data
            }
        }),

        updateAdvertisement: (id: string, data: any) => ({
            method: 'PUT',
            path: `/advertisements/${id}`,
            description: 'تحديث الإعلان',
            parameters: {
                path: { id },
                body: data
            }
        }),

        deleteAdvertisement: (id: string) => ({
            method: 'DELETE',
            path: `/advertisements/${id}`,
            description: 'حذف الإعلان',
            parameters: {
                path: { id }
            }
        }),

        approveAdvertisement: (id: string) => ({
            method: 'POST',
            path: `/advertisements/approve/${id}`,
            description: 'الموافقة على الإعلان',
            parameters: {
                path: { id }
            }
        }),

        rejectAdvertisement: (id: string) => ({
            method: 'POST',
            path: `/advertisements/reject/${id}`,
            description: 'رفض الإعلان',
            parameters: {
                path: { id }
            }
        }),

        uploadAdMedia: (id: string, file: File) => ({
            method: 'POST',
            path: `/advertisements/${id}/upload`,
            description: 'رفع وسائط الإعلان',
            parameters: {
                path: { id },
                body: { file }
            }
        })
    };

    static article = {
        getProfile: (id: string) => ({
            method: 'GET',
            path: `/articles/${id}`,
            description: 'الحصول على ملف المقال',
            parameters: {
                path: { id }
            }
        }),

        getCategoryArticles: (categoryId: string) => ({
            method: 'GET',
            path: `/articles/category/${categoryId}`,
            description: 'الحصول على مقالات الفئة',
            parameters: {
                path: { categoryId }
            }
        }),

        getAuthorArticles: (authorId: string) => ({
            method: 'GET',
            path: `/articles/author/${authorId}`,
            description: 'الحصول على مقالات الكاتب',
            parameters: {
                path: { authorId }
            }
        }),

        createArticle: (data: any) => ({
            method: 'POST',
            path: '/articles',
            description: 'إنشاء مقال جديد',
            parameters: {
                body: data
            }
        }),

        updateArticle: (id: string, data: any) => ({
            method: 'PUT',
            path: `/articles/${id}`,
            description: 'تحديث المقال',
            parameters: {
                path: { id },
                body: data
            }
        }),

        deleteArticle: (id: string) => ({
            method: 'DELETE',
            path: `/articles/${id}`,
            description: 'حذف المقال',
            parameters: {
                path: { id }
            }
        }),

        publishArticle: (id: string) => ({
            method: 'POST',
            path: `/articles/publish/${id}`,
            description: 'نشر المقال',
            parameters: {
                path: { id }
            }
        }),

        unpublishArticle: (id: string) => ({
            method: 'POST',
            path: `/articles/unpublish/${id}`,
            description: 'إلغاء نشر المقال',
            parameters: {
                path: { id }
            }
        }),

        uploadArticleImage: (id: string, file: File) => ({
            method: 'POST',
            path: `/articles/${id}/upload`,
            description: 'رفع صورة المقال',
            parameters: {
                path: { id },
                body: { file }
            }
        })
    };

    static category = {
        getProfile: (id: string) => ({
            method: 'GET',
            path: `/categories/${id}`,
            description: 'الحصول على ملف الفئة',
            parameters: {
                path: { id }
            }
        }),

        getParentCategories: () => ({
            method: 'GET',
            path: '/categories/parents',
            description: 'الحصول على الفئات الرئيسية'
        }),

        getSubCategories: (parentId: string) => ({
            method: 'GET',
            path: `/categories/${parentId}/subs`,
            description: 'الحصول على الفئات الفرعية',
            parameters: {
                path: { parentId }
            }
        }),

        createCategory: (data: any) => ({
            method: 'POST',
            path: '/categories',
            description: 'إنشاء فئة جديدة',
            parameters: {
                body: data
            }
        }),

        updateCategory: (id: string, data: any) => ({
            method: 'PUT',
            path: `/categories/${id}`,
            description: 'تحديث الفئة',
            parameters: {
                path: { id },
                body: data
            }
        }),

        deleteCategory: (id: string) => ({
            method: 'DELETE',
            path: `/categories/${id}`,
            description: 'حذف الفئة',
            parameters: {
                path: { id }
            }
        }),

        activateCategory: (id: string) => ({
            method: 'POST',
            path: `/categories/activate/${id}`,
            description: 'تفعيل الفئة',
            parameters: {
                path: { id }
            }
        }),

        deactivateCategory: (id: string) => ({
            method: 'POST',
            path: `/categories/deactivate/${id}`,
            description: 'تعطيل الفئة',
            parameters: {
                path: { id }
            }
        })
    };

    static availabilitySchedule = {
        getProfile: (id: string) => ({
            method: 'GET',
            path: `/availabilities/${id}`,
            description: 'الحصول على ملف التوفر',
            parameters: {
                path: { id }
            }
        }),

        getUserAvailabilities: (userId: string) => ({
            method: 'GET',
            path: `/availabilities/user/${userId}`,
            description: 'الحصول على أوقات توفر المستخدم',
            parameters: {
                path: { userId }
            }
        }),

        getTeamAvailabilities: (teamId: string) => ({
            method: 'GET',
            path: `/availabilities/team/${teamId}`,
            description: 'الحصول على أوقات توفر الفريق',
            parameters: {
                path: { teamId }
            }
        }),

        createAvailability: (data: any) => ({
            method: 'POST',
            path: '/availabilities',
            description: 'إنشاء وقت توفر جديد',
            parameters: {
                body: data
            }
        }),

        updateAvailability: (id: string, data: any) => ({
            method: 'PUT',
            path: `/availabilities/${id}`,
            description: 'تحديث وقت التوفر',
            parameters: {
                path: { id },
                body: data
            }
        }),

        deleteAvailability: (id: string) => ({
            method: 'DELETE',
            path: `/availabilities/${id}`,
            description: 'حذف وقت التوفر',
            parameters: {
                path: { id }
            }
        }),

        checkAvailability: (userId: string, date: string) => ({
            method: 'GET',
            path: `/availabilities/check/${userId}`,
            description: 'التحقق من التوفر',
            parameters: {
                path: { userId },
                query: { date }
            }
        })
    };

    static sponsorship = {
        getProfile: (id: string) => ({
            method: 'GET',
            path: `/endorsements/${id}`,
            description: 'الحصول على ملف الرعاية',
            parameters: {
                path: { id }
            }
        }),

        getAthleteEndorsements: (athleteId: string) => ({
            method: 'GET',
            path: `/endorsements/athlete/${athleteId}`,
            description: 'الحصول على رعايات الرياضي',
            parameters: {
                path: { athleteId }
            }
        }),

        getSponsorEndorsements: (sponsorId: string) => ({
            method: 'GET',
            path: `/endorsements/sponsor/${sponsorId}`,
            description: 'الحصول على رعايات الراعي',
            parameters: {
                path: { sponsorId }
            }
        }),

        createEndorsement: (data: any) => ({
            method: 'POST',
            path: '/endorsements',
            description: 'إنشاء رعاية جديدة',
            parameters: {
                body: data
            }
        }),

        updateEndorsement: (id: string, data: any) => ({
            method: 'PUT',
            path: `/endorsements/${id}`,
            description: 'تحديث الرعاية',
            parameters: {
                path: { id },
                body: data
            }
        }),

        deleteEndorsement: (id: string) => ({
            method: 'DELETE',
            path: `/endorsements/${id}`,
            description: 'حذف الرعاية',
            parameters: {
                path: { id }
            }
        }),

        approveEndorsement: (id: string) => ({
            method: 'POST',
            path: `/endorsements/approve/${id}`,
            description: 'الموافقة على الرعاية',
            parameters: {
                path: { id }
            }
        }),

        rejectEndorsement: (id: string) => ({
            method: 'POST',
            path: `/endorsements/reject/${id}`,
            description: 'رفض الرعاية',
            parameters: {
                path: { id }
            }
        })
    };

    static teamMember = {
        getProfile: (id: string) => ({
            method: 'GET',
            path: `/team-members/${id}`,
            description: 'الحصول على ملف عضو الفريق',
            parameters: {
                path: { id }
            }
        }),

        getTeamMembers: (teamId: string) => ({
            method: 'GET',
            path: `/team-members/team/${teamId}`,
            description: 'الحصول على أعضاء الفريق',
            parameters: {
                path: { teamId }
            }
        }),

        getUserTeams: (userId: string) => ({
            method: 'GET',
            path: `/team-members/user/${userId}`,
            description: 'الحصول على فرق المستخدم',
            parameters: {
                path: { userId }
            }
        }),

        createTeamMember: (data: any) => ({
            method: 'POST',
            path: '/team-members',
            description: 'إنشاء عضو فريق جديد',
            parameters: {
                body: data
            }
        }),

        updateTeamMember: (id: string, data: any) => ({
            method: 'PUT',
            path: `/team-members/${id}`,
            description: 'تحديث عضو الفريق',
            parameters: {
                path: { id },
                body: data
            }
        }),

        deleteTeamMember: (id: string) => ({
            method: 'DELETE',
            path: `/team-members/${id}`,
            description: 'حذف عضو الفريق',
            parameters: {
                path: { id }
            }
        }),

        assignRole: (id: string, role: string) => ({
            method: 'POST',
            path: `/team-members/${id}/role`,
            description: 'تعيين دور عضو الفريق',
            parameters: {
                path: { id },
                body: { role }
            }
        }),

        updateStatus: (id: string, status: string) => ({
            method: 'POST',
            path: `/team-members/${id}/status`,
            description: 'تحديث حالة عضو الفريق',
            parameters: {
                path: { id },
                body: { status }
            }
        })
    };

    static matches = {
        getAll: () => ({
            method: 'GET',
            path: '/matches',
            description: 'الحصول على قائمة المباريات'
        }),
        getById: (id: string) => ({
            method: 'GET',
            path: `/matches/${id}`,
            description: 'الحصول على تفاصيل مباراة محددة',
            parameters: {
                path: { id }
            }
        }),
        create: (data: any) => ({
            method: 'POST',
            path: '/matches',
            description: 'إنشاء مباراة جديدة',
            parameters: {
                body: data
            }
        }),
        update: (id: string, data: any) => ({
            method: 'PUT',
            path: `/matches/${id}`,
            description: 'تحديث بيانات مباراة',
            parameters: {
                path: { id },
                body: data
            }
        }),
        delete: (id: string) => ({
            method: 'DELETE',
            path: `/matches/${id}`,
            description: 'حذف مباراة',
            parameters: {
                path: { id }
            }
        })
    };

    static jobApplications = {
        getAll: () => ({
            method: 'GET',
            path: '/job-applications',
            description: 'الحصول على قائمة طلبات التوظيف'
        }),
        getById: (id: string) => ({
            method: 'GET',
            path: `/job-applications/${id}`,
            description: 'الحصول على تفاصيل طلب توظيف محدد',
            parameters: {
                path: { id }
            }
        }),
        create: (data: any) => ({
            method: 'POST',
            path: '/job-applications',
            description: 'إنشاء طلب توظيف جديد',
            parameters: {
                body: data
            }
        }),
        update: (id: string, data: any) => ({
            method: 'PUT',
            path: `/job-applications/${id}`,
            description: 'تحديث بيانات طلب توظيف',
            parameters: {
                path: { id },
                body: data
            }
        }),
        delete: (id: string) => ({
            method: 'DELETE',
            path: `/job-applications/${id}`,
            description: 'حذف طلب توظيف',
            parameters: {
                path: { id }
            }
        })
    };

    static jobs = {
        getAll: () => ({
            method: 'GET',
            path: '/jobs',
            description: 'الحصول على قائمة الوظائف'
        }),
        getById: (id: string) => ({
            method: 'GET',
            path: `/jobs/${id}`,
            description: 'الحصول على تفاصيل وظيفة محددة',
            parameters: {
                path: { id }
            }
        }),
        create: (data: any) => ({
            method: 'POST',
            path: '/jobs',
            description: 'إنشاء وظيفة جديدة',
            parameters: {
                body: data
            }
        }),
        update: (id: string, data: any) => ({
            method: 'PUT',
            path: `/jobs/${id}`,
            description: 'تحديث بيانات وظيفة',
            parameters: {
                path: { id },
                body: data
            }
        }),
        delete: (id: string) => ({
            method: 'DELETE',
            path: `/jobs/${id}`,
            description: 'حذف وظيفة',
            parameters: {
                path: { id }
            }
        })
    };

    static achievements = {
        getAll: () => ({
            method: 'GET',
            path: '/achievements',
            description: 'الحصول على قائمة الإنجازات'
        }),
        getById: (id: string) => ({
            method: 'GET',
            path: `/achievements/${id}`,
            description: 'الحصول على تفاصيل إنجاز محدد',
            parameters: {
                path: { id }
            }
        }),
        create: (data: any) => ({
            method: 'POST',
            path: '/achievements',
            description: 'إنشاء إنجاز جديد',
            parameters: {
                body: data
            }
        }),
        update: (id: string, data: any) => ({
            method: 'PUT',
            path: `/achievements/${id}`,
            description: 'تحديث بيانات إنجاز',
            parameters: {
                path: { id },
                body: data
            }
        }),
        delete: (id: string) => ({
            method: 'DELETE',
            path: `/achievements/${id}`,
            description: 'حذف إنجاز',
            parameters: {
                path: { id }
            }
        })
    };

    static skills = {
        getAll: () => ({
            method: 'GET',
            path: '/skills',
            description: 'الحصول على قائمة المهارات'
        }),
        getById: (id: string) => ({
            method: 'GET',
            path: `/skills/${id}`,
            description: 'الحصول على تفاصيل مهارة محددة',
            parameters: {
                path: { id }
            }
        }),
        create: (data: any) => ({
            method: 'POST',
            path: '/skills',
            description: 'إنشاء مهارة جديدة',
            parameters: {
                body: data
            }
        }),
        update: (id: string, data: any) => ({
            method: 'PUT',
            path: `/skills/${id}`,
            description: 'تحديث بيانات مهارة',
            parameters: {
                path: { id },
                body: data
            }
        }),
        delete: (id: string) => ({
            method: 'DELETE',
            path: `/skills/${id}`,
            description: 'حذف مهارة',
            parameters: {
                path: { id }
            }
        })
    };

    static companies = {
        getAll: () => ({
            method: 'GET',
            path: '/companies',
            description: 'الحصول على قائمة الشركات'
        }),
        getById: (id: string) => ({
            method: 'GET',
            path: `/companies/${id}`,
            description: 'الحصول على تفاصيل شركة محددة',
            parameters: {
                path: { id }
            }
        }),
        create: (data: any) => ({
            method: 'POST',
            path: '/companies',
            description: 'إنشاء شركة جديدة',
            parameters: {
                body: data
            }
        }),
        update: (id: string, data: any) => ({
            method: 'PUT',
            path: `/companies/${id}`,
            description: 'تحديث بيانات شركة',
            parameters: {
                path: { id },
                body: data
            }
        }),
        delete: (id: string) => ({
            method: 'DELETE',
            path: `/companies/${id}`,
            description: 'حذف شركة',
            parameters: {
                path: { id }
            }
        })
    };

    static scouts = {
        getAll: () => ({
            method: 'GET',
            path: '/scouts',
            description: 'الحصول على قائمة الكشافين'
        }),
        getById: (id: string) => ({
            method: 'GET',
            path: `/scouts/${id}`,
            description: 'الحصول على تفاصيل كشاف محدد',
            parameters: {
                path: { id }
            }
        }),
        create: (data: any) => ({
            method: 'POST',
            path: '/scouts',
            description: 'إنشاء كشاف جديد',
            parameters: {
                body: data
            }
        }),
        update: (id: string, data: any) => ({
            method: 'PUT',
            path: `/scouts/${id}`,
            description: 'تحديث بيانات كشاف',
            parameters: {
                path: { id },
                body: data
            }
        }),
        delete: (id: string) => ({
            method: 'DELETE',
            path: `/scouts/${id}`,
            description: 'حذف كشاف',
            parameters: {
                path: { id }
            }
        })
    };

    static clubs = {
        getAll: () => ({
            method: 'GET',
            path: '/clubs',
            description: 'الحصول على قائمة النوادي'
        }),
        getById: (id: string) => ({
            method: 'GET',
            path: `/clubs/${id}`,
            description: 'الحصول على تفاصيل نادي محدد',
            parameters: {
                path: { id }
            }
        }),
        create: (data: any) => ({
            method: 'POST',
            path: '/clubs',
            description: 'إنشاء نادي جديد',
            parameters: {
                body: data
            }
        }),
        update: (id: string, data: any) => ({
            method: 'PUT',
            path: `/clubs/${id}`,
            description: 'تحديث بيانات نادي',
            parameters: {
                path: { id },
                body: data
            }
        }),
        delete: (id: string) => ({
            method: 'DELETE',
            path: `/clubs/${id}`,
            description: 'حذف نادي',
            parameters: {
                path: { id }
            }
        })
    };

    static notification = {
        getAll: () => ({
            method: 'GET',
            path: '/notification',
            description: 'الحصول على قائمة الإشعارات'
        }),
        getById: (id: string) => ({
            method: 'GET',
            path: `/notification/${id}`,
            description: 'الحصول على تفاصيل إشعار محدد',
            parameters: {
                path: { id }
            }
        }),
        create: (data: any) => ({
            method: 'POST',
            path: '/notification',
            description: 'إنشاء إشعار جديد',
            parameters: {
                body: data
            }
        }),
        update: (id: string, data: any) => ({
            method: 'PUT',
            path: `/notification/${id}`,
            description: 'تحديث بيانات إشعار',
            parameters: {
                path: { id },
                body: data
            }
        }),
        delete: (id: string) => ({
            method: 'DELETE',
            path: `/notification/${id}`,
            description: 'حذف إشعار',
            parameters: {
                path: { id }
            }
        }),
        markAsRead: (id: string) => ({
            method: 'PUT',
            path: `/notification/${id}/read`,
            description: 'تحديد الإشعار كمقروء',
            parameters: {
                path: { id }
            }
        }),
        markAllAsRead: () => ({
            method: 'PUT',
            path: '/notification/read-all',
            description: 'تحديد جميع الإشعارات كمقروءة'
        })
    };

}