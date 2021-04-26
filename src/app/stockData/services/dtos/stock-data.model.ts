export interface StockData {
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
}

export interface StockDataApiResponse {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: StockData[];
}

export interface StockDataResponse {
    isEmpty: boolean;
    data?: StockData;
}
