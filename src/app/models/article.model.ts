export interface ArticleDto {
  articles: Article[];
  articlesCount: number;
}



export interface Author {
  username: string;
  image: string;
  bio: string;
  following: boolean;
}

export interface NewArticleDto {
  title?: string;
  description?: string;
  body?: string;
  tagList?: Array<string>;
}

export interface NewArticleDtoArticleEnvelope {
  article?: NewArticleDto;
}


export interface ArticleResponseArticleEnvelope { 
  article: ArticleResponse;
}

export interface ArticleResponse extends Article{ 
  // slug?: string;
  // title?: string;
  // description?: string;
  // body?: string;
  // createdAt?: Date;
  // updatedAt?: Date;
  // tagList?: Array<string>;
  // author?: Author;
  // favorited?: boolean;
  // favoritesCount?: number;
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  tagList: string[];
  author: Author;
  favorited: boolean;
  favoritesCount: number;
}