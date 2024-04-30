import {
  ActivatedRouteSnapshot,
  MaybeAsync,
  Resolve,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Article, ArticleResponse } from '../models/article.model';
import { Injectable, inject } from '@angular/core';
import { ArticlesService } from './articles.service';
import { Observable, delay, map, tap } from 'rxjs';
import { SpinnerService } from './spinner.service';

// @Injectable({providedIn: 'root'})
// export class ArticlesResolver implements Resolve<Article[]>{

//     private articleService = inject(ArticlesService);

//     resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Article[]> {
//         return this.articleService.getArticles(route.params['tag']).pipe(
//             map(result=> result.articles),
//         )
//     }
// }

export const ArticlesResolver: ResolveFn<Article[]> = (
  route: ActivatedRouteSnapshot
) => {
  const articleService = inject(ArticlesService);
  const spinnerService = inject(SpinnerService);

  return articleService
    .getArticles(route.params['tag'])
    .pipe(
        tap(()=> spinnerService.isLoading.set(true)),
        // delay(2000),
        map((result) => result.articles),
        tap(()=> spinnerService.isLoading.set(false)),
    );
};


export const ArticleResolver: ResolveFn<ArticleResponse> = (
    route: ActivatedRouteSnapshot
  ) => {
    const articleService = inject(ArticlesService);
    const spinnerService = inject(SpinnerService);
  
    return articleService
      .getArticle(route.queryParams['slug'])
      .pipe(
          tap(()=> spinnerService.isLoading.set(true)),
          // delay(2000),
          map((result) => result.article),
          tap(()=> spinnerService.isLoading.set(false)),
      );
  };