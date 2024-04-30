import { Route, Routes } from "@angular/router";
import { GlobalFeedComponent } from "./components/global-feed/global-feed.component";
import { YourFeedComponent } from "./components/your-feed/your-feed.component";
import { AuthGuard } from "../../services/auth.guard";
import { ArticlesResolver } from "../../services/articles.resolver.service";

export const routesHomePage: Routes =[
    {path: 'global', component: GlobalFeedComponent, resolve: {articles: ArticlesResolver}},
    {path: 'global/tag/:tag', component: GlobalFeedComponent,  resolve: {articles: ArticlesResolver}},
    {path: 'feed', component: YourFeedComponent, canActivate: [AuthGuard]},
    {path:'', redirectTo:'global', pathMatch:'full'}
];