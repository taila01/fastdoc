import { SearchParams } from "./Search/SearchInterface";

export interface ApiResponseGet<T> {
    data: T;
}

export interface ApiResponseModify {
    message: string;
    data: {
        id: number;
    };
}

export interface SerializableError {
    success: boolean;
    result: any;
    error: {
        message: string;
        code?: string;
        response?: {
            status: number;
            data: any;
        };
    };
}

export interface PaginatedResponse<T> {
    success?: boolean;
    message?: string;
    status?: number;
    data?: T[];
    meta?: {
        current_page: number;
        last_page: number;
        total: number;
        per_page: number;
    };
    errors?: any;
}

export interface ApiResponse<T> {
    success?: boolean;
    result?: T;
    data?: T;
    error?: SerializableError["error"];
}

export interface ApiPaginationMeta {
    current_page: number;
    from: number | null;
    last_page: number;
    links: [
        {
            url: string | null;
            label: string;
            active: boolean;
        },
        {
            url: string | null;
            label: string;
            active: boolean;
        },
        {
            url: null;
            label: string;
            active: boolean;
        },
    ];
    path: string;
    per_page: number;
    to: number | null;
    total: number;
}

export interface ApiResponsePaginated<T> {
    data: T;
    links: {
        first: string;
        last: string;
        prev: string | null;
        next: string | null;
    };
    meta: ApiPaginationMeta;
}

export type Guard = 'admin' | 'user';

export interface Query {
    page: string;
}

export interface GetAllDataProps {
    searchParams: SearchParams;
}
