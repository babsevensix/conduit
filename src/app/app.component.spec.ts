import { TestBed, fakeAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';



describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, HttpClientTestingModule],
      providers:[
        provideRouter([])
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
    
  });

  it(`should have the 'conduit' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('conduit');
  });

  it('show and hide spinner', fakeAsync (()=>{
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    app.spinnerService.isLoading.set(true);
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.innerHTML).toContain('Caricamento in corso');
    app.spinnerService.isLoading.set(false);
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.innerHTML).not.toContain('Caricamento in corso');
  }));

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('h1')?.textContent).toContain('Hello, conduit');
  // });
});
