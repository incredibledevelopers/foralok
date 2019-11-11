import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  providers : [UserService, ToastrService]
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private toastr: ToastrService, private builder: FormBuilder, private _userService: UserService, private router: Router) {
    this.signupForm = this.builder.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
  }

  validateSignup(){
    let username = this.signupForm.get('username').value;
    let password = this.signupForm.get('password').value;
    let firstName = this.signupForm.get('firstName').value;
    let lastName = this.signupForm.get('lastName').value;

    if(this.isNull(username) && this.isNull(password) && 
    this.isNull(firstName) && this.isNull(lastName)){
      this.toastr.error('Please fill all the fields', '');
    }
    else {
      let user = {
        "firstName": firstName,
        "lastName": lastName,
        "username": username,
        "password": password,
        "role": 'USER'
      }
      this._userService.addUser(user).subscribe(result => {
        console.log(result);
        if (result) {
          this.toastr.success('Signup completed Successfully...Please wait...', '');
          this.router.navigate(['']);
        }
      },
        (error) => {
          console.log('Error While Signup');
          this.toastr.error('Error While Signup', '');
        }
      )
    }
  }

  isNull(input){
    if(input === undefined || input === null || input ==='')
        return true;
    else
        return false;    
  }
}
