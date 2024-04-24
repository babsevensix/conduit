import { Component, DestroyRef, OnChanges, OnInit, SimpleChanges, computed, inject, signal } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderComponent } from "../../components/header/header.component";
import { ArticlesService } from '../../services/articles.service';
import { CommonModule } from '@angular/common';
import { Article, ArticleDto } from '../../models/article.model';
import { PostPreviewComponent } from "./components/post-preview/post-preview.component";
import { UserService } from '../../services/users.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-home-page',
    standalone: true,
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.scss',
    imports: [HeaderComponent, FooterComponent, CommonModule, PostPreviewComponent]
})
export class HomePageComponent implements OnInit {
    private articleService = inject(ArticlesService);

    userService = inject(UserService);


    articoli = signal<ArticleDto | undefined>(undefined);


    tagList = computed<string[]>(()=>{

        const articoli = this.articoli();
        return articoli?.articles.reduce((pv, cvArticle)=>{
            return [ ...pv , ...cvArticle.tagList];
        },<string[]>[]).filter((value, index, self)=>{
            return self.indexOf(value) === index;
        }) ?? [];
        
    })

    private destroyRef = inject(DestroyRef);
    constructor(){
        
    }


    ngOnInit(): void {
        this.articleService.getArticles(null).pipe(
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe({
            next:(risultato: ArticleDto)=>{
                console.log(risultato);
                this.articoli.set(risultato);
            }
        });
    }

    filterByTag(tagName: string): void{
        this.articleService.getArticles(tagName)
        .subscribe({
            next:(risultato: ArticleDto)=>{
                console.log(risultato);
                this.articoli.set(risultato);
            }
        });
    }


}
