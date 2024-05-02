import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { EditorComponent } from './editor.component';
import { provideRouter } from '@angular/router';
import { ArticlesService } from '../../services/articles.service';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { NewArticleDto, ArticleResponse } from '../../models/article.model';

describe('Editor Component', () => {
  let fixture: ComponentFixture<EditorComponent>;

  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorComponent],
      providers: [
        provideRouter([]),
        {
          provide: ArticlesService,
          useClass: MockArticleService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditorComponent);
  });

  it('should create the app', () => {
    
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('form required input', fakeAsync(()=>{
    const form = fixture.debugElement.query(By.css('form')).nativeElement;
    expect(form).toBeTruthy();
    const inputs = form.querySelectorAll('input');

    expect(inputs.length).toEqual(3);

    const textArea = form.querySelectorAll('textarea');
    expect(textArea).toBeTruthy();

    const component = fixture.componentInstance;
    component.formGrp.setValue({
        title: '',
        body:'',
        description:'',
        tagList:[],
    });

    fixture.detectChanges();

    let validationsError = fixture.debugElement.query(By.css('span.error'));

    expect(validationsError).toBeTruthy();

    expect(validationsError.nativeElement.innerHTML).toBe('Valore richiesto')

    component.formGrp.patchValue({
        title: 'Alberto'
    });
    fixture.detectChanges();
    validationsError = fixture.debugElement.query(By.css('span.error'));

    expect(validationsError).not.toBeTruthy();

  }));


  it('form invoke api ', fakeAsync(()=>{
    const articleService = fixture.debugElement.injector.get(ArticlesService);
    const postSpy = spyOn(articleService, 'postNewArticle').and.callThrough();

    const component = fixture.componentInstance;
    component.formGrp.setValue({
        title: 'Titolo',
        body:'Corpo',
        description:'Descrizione',
        tagList:[],
    });

    component.onCreateNewPost();
    tick();
    fixture.detectChanges();
    expect(postSpy).toHaveBeenCalledOnceWith({
        title: 'Titolo',
        body:'Corpo',
        description:'Descrizione',
        tagList:[],
    });


  }));

});
class MockArticleService {
    postNewArticle(body: NewArticleDto): Observable<ArticleResponse | undefined>{
        return of(undefined);
    }
}
