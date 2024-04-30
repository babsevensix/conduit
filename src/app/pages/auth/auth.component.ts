import { Component, Inject, OnInit, effect, inject, input } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/users.service';
import { LoginUserDto, NewUserDto } from '../../models/users.model';
import { NavigationService } from '../../services/navigation.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  imports: [FooterComponent, HeaderComponent, 
    ReactiveFormsModule,
  RouterLink,
],
})
export class AuthComponent implements OnInit {
  isSignInForm: boolean = false;

  frmGrp: FormGroup;

  private userSerice = inject(UserService);

  navigationService = inject(NavigationService);
  router= inject(Router);

  constructor(fb: FormBuilder, activatedRoute: ActivatedRoute) {
    this.isSignInForm = activatedRoute.snapshot.data['isSignIn'];

    this.frmGrp = fb.nonNullable.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

  
  }
  ngOnInit(): void {
  
    this.updateSignInSignUpForm(this.isSignInForm);
  }

  private updateSignInSignUpForm(isSignIn: boolean): void {
    if (isSignIn) {
      this.frmGrp.get('username')?.removeValidators([Validators.required]);
    } else {
      this.frmGrp.get('username')?.addValidators([Validators.required]);
    }
  }

  onLoginRegisterUser() {
    if (this.isSignInForm) {
        const userData: LoginUserDto ={
            email: this.frmGrp.value.email,
            password: this.frmGrp.value.password
        };
        this.userSerice.login(userData).subscribe(res=>{
            console.log(res);
            // this.router.navigateByUrl('/');
            this.router.navigate(['/']);
        })
    } else {
      const data: NewUserDto = {
        ...this.frmGrp.value,
      };
      this.userSerice.registerUser(data).subscribe((res) => {
        console.log(res);
      });
    }
  }
}
