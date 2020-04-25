
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import axios from 'axios';
import { CompanyService } from '../../shared/company.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up-cmp.component.html',
  styleUrls: ['./sign-up-cmp.component.css'],
  providers: [CompanyService]
})
export class SignUpCmpComponent implements OnInit {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSucessMessage: boolean;
  serverErrorMessages: string;
  fileToUpload : File = null;

  constructor(private companyService: CompanyService) { }
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
    bodyFormData.append('employerName',this.companyService.selectedCompany.employerName);
    bodyFormData.append('companyName',this.companyService.selectedCompany.companyName);
    bodyFormData.append('email',this.companyService.selectedCompany.email);
    bodyFormData.append('companyAddress',this.companyService.selectedCompany.companyAddress);
    bodyFormData.append('password',this.companyService.selectedCompany.password);
    axios.put('http://localhost:4000/imgsignupcmp',bodyFormData).then(res=>{
      console.log(res.data);
      window.alert('uploaded Successfully');
    }).catch(e=>{
      console.log(e)
      window.alert('fail to upload');
    })

    // this.companyService.postCompany(form.value).subscribe(
    //   res => {
    //     this.showSucessMessage = true;
    //     setTimeout(() => this.showSucessMessage = false, 4000);
    //     this.resetForm(form);
    //   },
    //   err => {
    //     if (err.status === 422) {
    //       this.serverErrorMessages = err.error.join('hihi<br/>');
    //     }
    //     else
    //       this.serverErrorMessages = 'Something went wrong.Please contact admin.';
    //   }
    // );
  }

  resetForm(form: NgForm) {
    this.companyService.selectedCompany = {
      companyName: '',
      email: '',
      companyAddress: '',
      employerName: '',
      logo:'',
      password: ''
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }

}
