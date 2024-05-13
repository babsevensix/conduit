import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { Article, ArticleDto } from '../../../../models/article.model';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ArticlesService } from '../../../../services/articles.service';
import { PostPreviewComponent } from '../post-preview/post-preview.component';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { feedActions } from '../../../../store/feed/feed.actions';
import { selectArticles } from '../../../../store/feed/feed.reducer';

@Component({
  selector: 'app-global-feed',
  standalone: true,
  templateUrl: './global-feed.component.html',
  styleUrl: './global-feed.component.scss',
  imports: [PostPreviewComponent],
})
export class GlobalFeedComponent  {
  
  //private articleService = inject(ArticlesService);

  private activatedRoute = inject(ActivatedRoute);


  store = inject(Store);
  
  articoli = toSignal(this.store.select(selectArticles));

  private destroyRef = inject(DestroyRef);

  constructor() {
    //console.log('GlobalFeedComponent constructor', this.articleService);
    //console.log('CONSTRUCTOR  tag ' ,this.activatedRoute.params['tag']);

    
    this.activatedRoute.params.pipe(
      tap(params=>{
        this.store.dispatch(feedActions.loadFeed({tag:params['tag']}))
      }),
     //switchMap(params => this.articleService.getArticles(params['tag'])),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(
      {
        next: (risultato)=>{
          //this.store.dispatch(feedActions.loadFeedSuccess({ articles : risultato.articles}));

          console.log('GlobalFeedComponent risultato', risultato);
          // this.articoli.set(risultato.articles);
        },
        error: (err)=>{
          console.log(' error ', err);
          //this.store.dispatch(feedActions.loadFeedFail());
        }
      }
    );

    // this.activatedRoute.data.pipe(
    //   map(datas => datas['articles'] as Article[])
    // ).subscribe({
    //   next: (articles)=>{
    //     this.articoli.set(articles);
    //   }
    // })
  }

  
}
