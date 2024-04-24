import { Injectable, signal } from '@angular/core';
import { Article, Author } from '../models/article.model';

export type Pages = 'Home' | 'Register' | 'Login' | 'NewPost' | 'Post' | 'Profile';

@Injectable({providedIn: 'root'})
export class NavigationService {
    constructor() { }
 
    pageToView = signal<Pages>('Home');

    articleSelected = signal<Article | undefined>(undefined);

    authorSelected = signal<Author | undefined>(undefined);
}