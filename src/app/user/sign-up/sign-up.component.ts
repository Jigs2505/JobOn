import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import axios from 'axios';

import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [UserService]
})
export class SignUpComponent implements OnInit {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSucessMessage: boolean;
  serverErrorMessages: string;
  fileToUpload;

  constructor(private userService: UserService) { }
  handleFile(files:FileList)
  {
    this.fileToUpload = files.item(0);
  }
  ngOnInit() {
  }

  onSubmit(form: NgForm) {

    console.log('inside on submit');
    console.log(form.value);
    var bodyFormData = new FormData();
    bodyFormData.append('img',this.fileToUpload);
    bodyFormData.append('fullName',this.userService.selectedUser.fullName);
    bodyFormData.append('logo',this.userService.selectedUser.logo);
    bodyFormData.append('email',this.userService.selectedUser.email);
    bodyFormData.append('password',this.userService.selectedUser.password);
    axios.put('http://localhost:4000/imgsignup',bodyFormData).then(res=>{
      console.log(res.data);
      window.alert('uploaded Successfully');
    }).catch(e=>{
      console.log(e)
      window.alert('either duplicate email or username found');
    })
    // this.userService.postUser(form.value).subscribe(
    //   res => {
    //     this.showSucessMessage = true;
    //     setTimeout(() => this.showSucessMessage = false, 4000);
    //     this.resetForm(form);
    //   },
    //   err => {
    //     if (err.status === 422) {
    //       this.serverErrorMessages = err.error.join('<br/>');
    //     }
    //     else
    //       this.serverErrorMessages = 'Something went wrong.Please contact admin.';
    //   }
    // );
  }

  resetForm(form: NgForm) {
    this.userService.selectedUser = {
      fullName: '',
      email: '',
      password: '',
      logo:''
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }

}
