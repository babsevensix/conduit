import { Component } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderComponent } from "../../components/header/header.component";

@Component({
    selector: 'app-editor',
    standalone: true,
    templateUrl: './editor.component.html',
    styleUrl: './editor.component.scss',
    imports: [HeaderComponent, FooterComponent]
})
export class EditorComponent {

}
