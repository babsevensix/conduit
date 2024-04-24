import { Component, inject } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderComponent } from "../../components/header/header.component";
import { NavigationService } from '../../services/navigation.service';

@Component({
    selector: 'app-profile',
    standalone: true,
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss',
    imports: [HeaderComponent, FooterComponent]
})
export class ProfileComponent {

    navigationService = inject(NavigationService);
}
