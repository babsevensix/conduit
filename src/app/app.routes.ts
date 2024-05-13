import { Routes } from '@angular/router';
import { routesHomePage } from './pages/home-page/routes.homepage';
import { AuthGuard } from './services/auth.guard';
import { ArticleResolver, ArticlesResolver } from './services/articles.resolver.service';

export const routes: Routes = [
  {
    path: 'sign-in',
    loadComponent: () =>
      import('./pages/auth/auth.component').then((c) => c.AuthComponent),
    data: { isSignIn: true },
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/auth/auth.component').then((c) => c.AuthComponent),
    data: { isSignIn: false },
  },
  {
    path: 'post/detail',
    loadComponent: ()=>import('./pages/post/post.component').then(c=>c.PostComponent),
    resolve:{article: ArticleResolver}
  },
  {
    path: 'newpost',
    loadComponent: () =>
      import('./pages/editor/editor.component').then((c) => c.EditorComponent),
    canActivate: [AuthGuard],
  },
  {
    path: '',
    loadComponent: () =>
      import('./pages/home-page/home-page.component').then(
        (c) => c.HomePageComponent
      ),

    children: routesHomePage,
    //resolve: { articles: ArticlesResolver },
  },

  { path: '**', redirectTo: 'sign-in' },
];
