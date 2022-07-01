export interface INewsData {
    status: 'ok' | 'error';
    sources: INewsInfo[];
}

export interface INewsInfo {
    category: string;
    country: string;
    description: string;
    id: string;
    language: string;
    name: string;
    url: string;
}

export interface IArticlesData {
    status: 'ok' | 'error';
    totalResults: number;
    articles: IArticleInfo[];
}

export interface IArticleInfo {
    source: IArticleSource;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

export interface IArticleSource {
    id: string;
    name: string;
}

type GetData = (data: IArticlesData | INewsData) => void;

export type GetDataCallback = GetData | (() => void);