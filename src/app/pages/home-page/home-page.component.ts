import { Component, computed, inject, signal } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderComponent } from "../../components/header/header.component";
import { CommonModule } from '@angular/common';
import { Article } from '../../models/article.model';
import { PostPreviewComponent } from "./components/post-preview/post-preview.component";
import { UserService } from '../../services/users.service';
import { GlobalFeedComponent } from "./components/global-feed/global-feed.component";
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { map } from 'rxjs';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectArticles } from '../../store/feed/feed.reducer';
import { selectIsAuthenticated } from '../../store/auth/auth.reducer';

@Component({
    selector: 'app-home-page',
    standalone: true,
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.scss',
    imports: [HeaderComponent, FooterComponent, CommonModule, 
        RouterOutlet, RouterLink, RouterLinkActive,
        PostPreviewComponent, GlobalFeedComponent]
})
export class HomePageComponent {

   // private activatedRoute = inject(ActivatedRoute);
    
   // userService = inject(UserService);


    store = inject(Store);

    isLogged = toSignal(this.store.select(selectIsAuthenticated));

    articoli = toSignal(this.store.select(selectArticles));


    tagList = computed<string[]>(()=>{

        const articoli = this.articoli();
        return articoli?.reduce((pv, cvArticle)=>{
            return [ ...pv , ...cvArticle.tagList];
        },<string[]>[]).filter((value, index, self)=>{
            return self.indexOf(value) === index;
        }) ?? [];
        
    })


    constructor(){
        // this.activatedRoute.data.pipe(
        //     map(datas => datas['articles'] as Article[])
        //   ).subscribe({
        //     next: (articles)=>{
        //       this.articoli.set(articles);
        //     }
        //   })
    }





}
