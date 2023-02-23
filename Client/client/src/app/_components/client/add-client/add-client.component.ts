import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
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

    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    address: new FormControl(''),
    IsActive: new FormControl(''),
    gender: new FormControl(''),
    type: new FormControl(''),
    packageIds: new FormControl(this.selectedItems)

  });

  constructor(private clientService: ClientService,
    private packageService: PackageService) { }

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
    console.log(this.clientForm.value);

    this.clientService.addClient(this.clientForm.value).subscribe(
      response => {
        console.log(response);

      }, error => {
        console.log(error);

      }
    );
   }

}
