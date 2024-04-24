import { Component, DestroyRef, inject, input } from '@angular/core';
import { Article } from '../../../../models/article.model';
import { CommonModule, DatePipe } from '@angular/common';
import { ArticlesService } from '../../../../services/articles.service';
import { ToastrService } from 'ngx-toastr';
import { takeUntilDestroyed} from '@angular/core/rxjs-interop';
import { NavigationService } from '../../../../services/navigation.service';

@Component({
  selector: 'app-post-preview',
  standalone: true,
  imports: [DatePipe,],
  templateUrl: './post-preview.component.html',
  styleUrl: './post-preview.component.scss'
})
export class PostPreviewComponent {



  article= input.required<Article>();

  private articleService = inject(ArticlesService);
  private toastService = inject(ToastrService);

  private navigationService = inject(NavigationService);

  private destroyRef = inject(DestroyRef);

  onSetFavorite(slug: string) {
      this.articleService.setFavorite(slug)
        .pipe(
          takeUntilDestroyed(this.destroyRef)
        )
      .subscribe({
        next: (res)=>{
          this.toastService.success('Set in your favorites');
        },
        complete: ()=>{
          console.log(' complete');
        }
      });
  }

  onShowPost() {
    this.navigationService.articleSelected.set(this.article());
    this.navigationService.pageToView.set('Post');
  }

  onShowProfile() {
    this.navigationService.authorSelected.set(this.article().author);
    this.navigationService.pageToView.set('Profile');
    }
}
