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
}