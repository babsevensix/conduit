import { Component } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderComponent } from "../../components/header/header.component";

@Component({
    selector: 'app-settings',
    standalone: true,
    templateUrl: './settings.component.html',
    styleUrl: './settings.component.scss',
    imports: [HeaderComponent, FooterComponent]
})
export class SettingsComponent {

}
