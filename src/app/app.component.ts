import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { AuthComponent } from "./pages/auth/auth.component";
import { EditorComponent } from "./pages/editor/editor.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { PostComponent } from "./pages/post/post.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { SettingsComponent } from "./pages/settings/settings.component";
import { NavigationService } from './services/navigation.service';
import { SpinnerService } from './services/spinner.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, HeaderComponent, FooterComponent, HomePageComponent, AuthComponent, PostComponent, EditorComponent, ProfileComponent, SettingsComponent]
})
export class AppComponent {
  title = 'conduit';

  spinnerService = inject(SpinnerService);

  
}
