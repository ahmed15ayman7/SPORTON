export interface PaginatedResponse<T> {
    data: T[];
    meta: {
        total: number;
        skip: number;
        take: number;
        hasMore: boolean;
    };
} 