import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Article, ArticleResponse, NewArticleDto } from "../../models/article.model";

export const feedActions = createActionGroup({
    source: 'feed',
    events:{
        'Load Feed': props<{tag: string | null}>(),
        'Load Feed success': props<{articles: Article[]}>(),
        'Load Feed fail': emptyProps(),

        'Create New Post': props<{newArticle: NewArticleDto}>(),
        'Create New Post Success': props<{articleCreated: ArticleResponse | undefined}>(),
        'Create New Post Failed': emptyProps(),
    }
})