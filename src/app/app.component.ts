import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { SpinnerService } from './services/spinner.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, HeaderComponent, 
      FooterComponent, 
      ]
})
export class AppComponent implements OnInit {
  title = 'conduit';

  spinnerService = inject(SpinnerService);

  constructor(){
    console.log('AppComponent Constructor');
  }
  ngOnInit(): void {
    console.log('AppComponent OnInit');
  }

  
  
}
