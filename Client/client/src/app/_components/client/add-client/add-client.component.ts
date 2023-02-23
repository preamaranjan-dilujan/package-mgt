import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PackageService } from 'src/app/_services/package.service';
import { ClientService } from '../../../_services/client.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})

export class AddClientComponent implements OnInit {

  selectedItems: any = [];
  dropdownSettings: IDropdownSettings = {};
  dropdownList: any;

  typeDropdownList: any;

  clientForm = new FormGroup({

    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    IsActive: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    packageIds: new FormControl(this.selectedItems)

  });

  submitted = false;

  constructor(private clientService: ClientService,
    private packageService: PackageService,
    private router : Router, private spinner: NgxSpinnerService, 
    private toastr : ToastrService) { }

  ngOnInit(): void {
    this.loadDropDownList();
    this.loadDropdownSettings();
  }

  loadDropDownList() {

    // package list
    this.packageService.showPackageList().subscribe(
      (reponse: any) => {
        this.dropdownList = reponse['$values'];
      }, err => {
        console.log(err);
      }
    )

    // user list 
    this.typeDropdownList = [
      { item_id: 1, item_text: 'Level 1' },
      { item_id: 2, item_text: 'Level 2' },
      { item_id: 3, item_text: 'Level 3' }
    ];

  }

  loadDropdownSettings() {

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

  }

  onItemSelect(item: any) {
    console.log(item);
    
    this.selectedItems.push(item.id);
  }

  onSelectAll(items: any) {
    console.log(items);
  }

  addClient() {
    this.submitted = true;
    this.spinner.show();
    
    if (this.clientForm.valid){

      this.clientService.addClient(this.clientForm.value).subscribe(
        response => {
          console.log(response);
          //this.spinner.hide();
          setTimeout(() => {
            this.spinner.hide();
          }, 3000);
          this.toastr.success("Add client sucessfully");
          this.router.navigateByUrl("/clients");
  
        }, error => {
          console.log(error);
          //this.spinner.hide();
          setTimeout(() => {
            this.spinner.hide();
          }, 3000);
          this.toastr.error("Error added client");
  
        }
      );
    }

    else{
      console.log("error validation");
      console.log(this.clientForm.value);
      setTimeout(() => {
        this.spinner.hide();
      }, 3000);
      this.toastr.error("Validation Error");
    }

   }

   get clientFormControl() {
    return this.clientForm.controls;
  }

}
