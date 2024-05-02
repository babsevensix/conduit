/*Statements   : 57.33% ( 43/75 )
Branches     : 18.18% ( 2/11 )
Functions    : 41.17% ( 14/34 )
Lines        : 56.16% ( 41/73 )*/

import { TestBed, fakeAsync } from '@angular/core/testing';
import { AuthComponent } from './auth.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';



describe('AuthComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthComponent, HttpClientTestingModule],
      providers:[
        provideRouter([])
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AuthComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
    
  });

});
