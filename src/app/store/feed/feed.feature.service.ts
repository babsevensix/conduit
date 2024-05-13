import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { feedActions } from './feed.actions';
import { map, of, switchMap } from 'rxjs';
import { ArticlesService } from '../../services/articles.service';

@Injectable()
export class FeedEffects {
  private actions$ = inject(Actions);
  private articleService = inject(ArticlesService);

  loadFeed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(feedActions.loadFeed),
      switchMap(({ tag }) =>
        this.articleService.getArticles(tag).pipe(map((m) => m.articles))
      ),
      map((articles) => feedActions.loadFeedSuccess({ articles }))
    )
  );

  createNewPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(feedActions.createNewPost),
      switchMap(({ newArticle }) =>
        this.articleService.postNewArticle(newArticle)
      ),
      map((res) => {
        if (res) {
          return feedActions.createNewPostSuccess({ articleCreated: res });
        }
        return feedActions.createNewPostFailed();
      })
    )
  );
}
