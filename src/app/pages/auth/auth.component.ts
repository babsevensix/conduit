import { Component, OnInit, effect, inject, input } from '@angular/core';
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

@Component({
  selector: 'app-auth',
  standalone: true,
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  imports: [FooterComponent, HeaderComponent, ReactiveFormsModule],
})
export class AuthComponent implements OnInit {
  isSignInForm = input.required<boolean>();

  frmGrp: FormGroup;

  private userSerice = inject(UserService);

  navigationService = inject(NavigationService);

  constructor(fb: FormBuilder) {
    this.frmGrp = fb.nonNullable.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    // effect(() => {
    //   const isSignIn = this.isSignInForm();
    //   this.updateSignInSignUpForm(isSignIn);
    // });
  }
  ngOnInit(): void {
    const isSignIn = this.isSignInForm();
    this.updateSignInSignUpForm(isSignIn);
  }

  private updateSignInSignUpForm(isSignIn: boolean): void {
    if (isSignIn) {
      this.frmGrp.get('username')?.removeValidators([Validators.required]);
    } else {
      this.frmGrp.get('username')?.addValidators([Validators.required]);
    }
  }

  onLoginRegisterUser() {
    if (this.isSignInForm()) {
        const userData: LoginUserDto ={
            email: this.frmGrp.value.email,
            password: this.frmGrp.value.password
        };
        this.userSerice.login(userData).subscribe(res=>{
            console.log(res);
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
