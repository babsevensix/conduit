import {
  ComponentFixture,
  DeferBlockBehavior,
  DeferBlockState,
  TestBed,
  fakeAsync,
  flush,
  tick,
} from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router, provideRouter } from '@angular/router';
import { GlobalFeedComponent } from './global-feed.component';
import { provideToastr } from 'ngx-toastr';
import { ArticlesService } from '../../../../services/articles.service';
import { Observable, of } from 'rxjs';
import { ArticleDto } from '../../../../models/article.model';

describe('Global Feed Test', () => {
    TestBed.configureTestingModule({deferBlockBehavior: DeferBlockBehavior.Manual});
  let fixture: ComponentFixture<GlobalFeedComponent>;
  let component: GlobalFeedComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        GlobalFeedComponent,
        //, HttpClientTestingModule
      ],
      providers: [
        provideRouter([
          {
            path: 'global',
            component: GlobalFeedComponent,
          },

        ]),
        provideToastr(),
        {
          provide: ArticlesService,
          useClass: MockArticleService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GlobalFeedComponent);
    component = fixture.componentInstance;
  });

  it('should create the global component', () => {
    expect(component).toBeTruthy();
  });

  it('Should fecth data from the service before rendering', fakeAsync(async () => {


    expect(component.articoli()).toBeDefined();
    expect(component.articoli()?.length).toEqual(1);
  }));

  it('Should html have div', fakeAsync(async () => {
    

    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.innerHTML).toContain('Caricamento in corso');

    tick(6000);
    fixture.detectChanges();

    const compiledHtml =fixture.debugElement.nativeElement;
    expect(compiledHtml.querySelector('h1').innerHTML).toContain('Title');
  }));

});

class MockArticleService {
  getArticles(filterByTag: string | null): Observable<ArticleDto> {
    const res: ArticleDto = {
      articles: [
        {
          author: { username: 'Alberto', image: '', bio: '', following: false },
          body: '',
          title: 'Title',
          createdAt: '',
          description: '',
          favorited: false,
          favoritesCount: 0,
          slug: 'slug',
          tagList: [],
          updatedAt: '',
        },
      ],
      articlesCount: 1,
    };

    return of(res);
  }
}
