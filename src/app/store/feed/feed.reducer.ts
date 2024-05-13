import { createFeature, createReducer, on } from '@ngrx/store';
import { Article } from '../../models/article.model';
import { feedActions } from './feed.actions';

export interface FeedState {
  isLoading: boolean;
  articles: Article[] | undefined;
}

const initialState: FeedState = {
  isLoading: false,
  articles: undefined,
};

export const feedFeature = createFeature({
  name: 'feed',
  reducer: createReducer(
    initialState,
    on(feedActions.loadFeed, (state) => ({ ...state, isLoading: true })),
    on(feedActions.loadFeedSuccess, (state, { articles }) => ({
      ...state,
      isLoading: false,
      articles,
    })),
    on(feedActions.loadFeedFail, (state) => ({ ...state, isLoading: false })),

    on(feedActions.createNewPost, (state) => ({...state, isLoading: true})),
    on(feedActions.createNewPostSuccess, (state, articleCreated) =>{
        const articles = [...(state.articles ??[]) ];
        const a = articleCreated.articleCreated;

        if (a){
            articles.push({
                ...a
            });
        }
        return {...state, articles};
    })
  ),
});

export const {
    selectArticles,
    selectIsLoading
} = feedFeature;