import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
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

    name : new FormControl(''),
    email : new FormControl(''),
    phone : new FormControl(''),
    address : new FormControl(''),
    isActive : new FormControl(''),
    gender : new FormControl(''),
    type : new FormControl('')

  });

  showButton: boolean = false;

  formName : any;

  constructor(private clientService : ClientService, private modalService: BsModalService){}

  ngOnInit(): void {
    this.showClientList();
   
  }


  viewModal(template: TemplateRef<any>, client: any) {
    this.clientForm.disable();
    this.formName = "View";
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
    this.clientService.showClientList().subscribe( (response : any)  => {
      console.log(response);
      this.clients = response["$values"];
    }, err => {
      console.log(err); 
    })
  }

  updateClient(){

  }

}
