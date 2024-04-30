import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { ArticleDto, ArticleResponse, ArticleResponseArticleEnvelope, NewArticleDto, NewArticleDtoArticleEnvelope } from '../models/article.model';
import { UserService } from './users.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({providedIn: 'root'})
export class ArticlesService {
   
    private toastrService = inject(ToastrService);

    constructor(private httpClient: HttpClient) { }
    
    getArticles(filterByTag: string | null): Observable<ArticleDto> {

        let params = new HttpParams();
        if (filterByTag && filterByTag.length > 0){
            params = params.append('Tag', filterByTag);
        }

        return this.httpClient.get<ArticleDto>(
            'http://localhost:5000/Articles',{
                params,
            });
    }


    setFavorite(slug: string): Observable<ArticleResponse>{
        return this.httpClient.post<ArticleResponseArticleEnvelope>(
            `http://localhost:5000/Articles/${slug}/favorite`, null
        ).pipe(
            map(r=> r.article),
        );
    }

    postNewArticle(body: NewArticleDto): Observable<ArticleResponse | undefined>{
        // let headers = new HttpHeaders();
        // headers = headers.set('Authorization', `Token ${this.userService.Token}` );
        
        const envelope: NewArticleDtoArticleEnvelope = {
            article: body
        };
        return this.httpClient.post<ArticleResponseArticleEnvelope>(
            'http://localhost:5000/Articles',
            envelope,
            //{headers}
        ).pipe(
            map(response => response.article),
            catchError(err=>{
                this.toastrService.error('Qualcosa non ha funzionato');
                return of(undefined);
            })
        );
    }

    getArticle(slug: string): Observable<ArticleResponseArticleEnvelope>{
        

        return this.httpClient.get<ArticleResponseArticleEnvelope>(
            `http://localhost:5000/Articles/${slug}`);
    }
}