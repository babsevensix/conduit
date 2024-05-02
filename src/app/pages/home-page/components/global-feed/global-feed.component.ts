import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { Article, ArticleDto } from '../../../../models/article.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ArticlesService } from '../../../../services/articles.service';
import { PostPreviewComponent } from '../post-preview/post-preview.component';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-global-feed',
  standalone: true,
  templateUrl: './global-feed.component.html',
  styleUrl: './global-feed.component.scss',
  imports: [PostPreviewComponent],
})
export class GlobalFeedComponent  {
  
  private articleService = inject(ArticlesService);

  private activatedRoute = inject(ActivatedRoute);

  articoli = signal<Article[] | undefined>(undefined);

  

  private destroyRef = inject(DestroyRef);

  constructor() {
    console.log('GlobalFeedComponent constructor', this.articleService);
    //console.log('CONSTRUCTOR  tag ' ,this.activatedRoute.params['tag']);

    
    this.activatedRoute.params.pipe(
      switchMap(params => this.articleService.getArticles(params['tag'])),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(
      {
        next: (risultato)=>{
          console.log('GlobalFeedComponent risultato', risultato);
          this.articoli.set(risultato.articles);
        },
        error: (err)=>{
          console.log(' error ', err);
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
