import { Component } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderComponent } from "../../components/header/header.component";

@Component({
    selector: 'app-post',
    standalone: true,
    templateUrl: './post.component.html',
    styleUrl: './post.component.scss',
    imports: [HeaderComponent, FooterComponent]
})
export class PostComponent {

}
