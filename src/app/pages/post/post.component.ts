import { Component, inject } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderComponent } from "../../components/header/header.component";
import { NavigationService } from '../../services/navigation.service';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-post',
    standalone: true,
    templateUrl: './post.component.html',
    styleUrl: './post.component.scss',
    imports: [HeaderComponent, FooterComponent, DatePipe]
})
export class PostComponent {
    navigationService = inject(NavigationService);

}
