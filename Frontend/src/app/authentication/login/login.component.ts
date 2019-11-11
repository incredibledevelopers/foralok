import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [UserService, ToastrService]
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private builder: FormBuilder, private _userService: UserService, private router: Router, private toastr: ToastrService) {
    this.loginForm = this.builder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  isNull(input){
    if(input === undefined || input === null || input ==='')
        return true;
    else
        return false;    
  }

  loginform = true;
  recoverform = false;

  showRecoverForm() {
    this.loginform = !this.loginform;
    this.recoverform = !this.recoverform;
  }

  validateLogin() {
    let username = this.loginForm.get('username').value;
    let password = this.loginForm.get('password').value;
    console.log('Details Entered are:', username, password);

    if (this.isNull(username) && this.isNull(password)) {
      this.toastr.error('Please fill all the fields', '');
    }
    else {
      this._userService.validateUser(username, password).subscribe(user => {
        if (user) {
          console.log('User Details:', user);
          let name = user.firstName + " " + user.lastName;
          sessionStorage.setItem('name', name);
          sessionStorage.setItem('username', user.username);
          sessionStorage.setItem('role', user.role);
          this.router.navigate(['ipenapp/concept']);
        }
        else {
          this.router.navigate(['login']);
          this.loginForm.get('username').setValue('');
          this.loginForm.get('password').setValue('');
          this.toastr.error('Invalid Username/Password.Try Again', '');
        }
      },
        (error) => {
          console.log('Invalid Username and Password');
          this.router.navigate(['']);
          this.toastr.error('Invalid Username/Password.Try Again', '');
        }
      );
    }
  }

}
