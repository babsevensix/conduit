import { Component, inject, input, signal } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { NavigationService } from '../../services/navigation.service';
import { DatePipe } from '@angular/common';
import { ArticlesService } from '../../services/articles.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { ArticleResponse } from '../../models/article.model';

@Component({
  selector: 'app-post',
  standalone: true,
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
  imports: [HeaderComponent, FooterComponent, DatePipe],
})
export class PostComponent {
  article = signal<ArticleResponse | undefined>(undefined);

  articlesService = inject(ArticlesService);
  private activatedRoute = inject(ActivatedRoute);


  

  slug = input<string>('');

  constructor() {
    //this.slug.set(this.activatedRoute.snapshot.queryParams['slug']);


    this.activatedRoute.data
      .pipe(map((datas) => datas['article'] as ArticleResponse))
      .subscribe({
        next: (article) => {
          this.article.set(article);
        },
      });
  }
}
