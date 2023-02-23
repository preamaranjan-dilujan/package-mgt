import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from 'src/app/_services/client.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  modalRef?: BsModalRef;

  clients: any = [{}];
  
  clientForm = new FormGroup({

    name : new FormControl('', Validators.required),
    email : new FormControl('',  [Validators.required, Validators.email]),
    phone : new FormControl('',  Validators.required),
    address : new FormControl('',  Validators.required),
    isActive : new FormControl('',  Validators.required),
    gender : new FormControl('',  Validators.required),
    type : new FormControl('',  Validators.required)

  });

  showButton: boolean = false;

  formName : any;

  submitted = false;

  constructor(private clientService : ClientService, 
    private modalService: BsModalService, 
    private spinner: NgxSpinnerService, 
    private toastr : ToastrService){}

  ngOnInit(): void {
    this.showClientList();
  }


  viewModal(template: TemplateRef<any>, client: any) {
    this.clientForm.disable();
    this.formName = "View";
    this.showButton = false;
    this.modalRef = this.modalService.show(template);
    this.clientForm.patchValue(client);
  }

  editModel(template: TemplateRef<any>, client: any) {
    this.clientForm.enable();
    this.formName = "Edit";
    this.showButton = true;
    this.modalRef = this.modalService.show(template);
    this.clientForm.patchValue(client);
  }

  showClientList(){
    this.spinner.show();
    this.clientService.showClientList().subscribe( (response : any)  => {
      console.log(response);
      this.clients = response["$values"];
      //this.spinner.hide();
      setTimeout(() => {
        this.spinner.hide();
      }, 3000);
    }, err => {
      console.log(err); 
      //this.spinner.hide();
      setTimeout(() => {
        this.spinner.hide();
      }, 3000);
    })
  }

  updateClient(){
    this.submitted = true;
    console.log("not implemented yet, backend updating");
    this.toastr.warning("Backend updating");
  }

  get clientFormControl() {
    return this.clientForm.controls;
  }

}
