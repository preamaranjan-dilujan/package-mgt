import { Component, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ItemService } from 'src/app/_services/item.service';
import { PackageService } from 'src/app/_services/package.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.css']
})
export class PackageComponent {

  modalRef?: BsModalRef;

  packages: any = [{}];

  showButton: boolean = false;

  formName: any;

  dropdownSettings: IDropdownSettings = {};

  selectedItems: any = [];

  dropdownList: any;

  PackageForm;

  // itemsList : any =  [{}];;

  constructor(private packageService: PackageService, private modalService: BsModalService,
    private itemService: ItemService, private spinner: NgxSpinnerService, private toastr: ToastrService
  ) {
    this.PackageForm = new FormGroup({

      id: new FormControl(''),
      name: new FormControl(''),
      description: new FormControl(''),
      noOfAtt: new FormControl(''),
      totalPrice: new FormControl(''),
      active: new FormControl(''),
      itemIds: new FormControl(this.selectedItems)

    });
  }

  ngOnInit(): void {

    this.showPackageList();

    this.showItemList();

    this.loadDropdownSetting();

  }


  showPackageList() {
    this.spinner.show();
    this.packageService.showPackageList().subscribe((response: any) => {
      //console.log(response['$values']);
      this.packages = response['$values'];
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

  showItemList() {
    this.itemService.showItemList().subscribe(
      (response: any) => {
        this.dropdownList = response['$values']
        console.log(this.dropdownList);
      }, err => {
        console.log(err);
      }
    )
  }

  loadDropdownSetting() {
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

  viewModal(template: TemplateRef<any>, item: any) {
    this.PackageForm.disable();
    this.showButton = false;
    this.formName = "View";
    this.modalRef = this.modalService.show(template);
    // console.log(item.packageItems["$values"]);
    
    this.PackageForm.patchValue(item);
    // this.selectedItems = item.packageItems["$values"];
    // console.log(item.packageItems["$values"]);

  }

  editModel(template: TemplateRef<any>, item: any) {
    this.PackageForm.enable();
    this.formName = "Edit";
    this.showButton = true;
    this.modalRef = this.modalService.show(template);
    this.PackageForm.patchValue(item);
  }

  AddModal(template: TemplateRef<any>) {
    this.formName = "Add";
    this.showButton = true;
    this.modalRef = this.modalService.show(template);
  }


  addPackage() {
    //console.log(this.PackageForm.value);
     this.spinner.show();
    this.packageService.addPackage(this.PackageForm.value).subscribe(
      response => {
        console.log(response);
         //this.spinner.hide();
         setTimeout(() => {
          this.spinner.hide();
        }, 3000);
          this.toastr.success("Add package sucessfully");
          window.location.reload();
      }, error => {
        console.log(error);
        //this.spinner.hide();
        setTimeout(() => {
          this.spinner.hide();
        }, 3000);
          this.toastr.error("Error added package");
      }
    );

  }

  updatePackage() {
    console.log("Backend changing in progress, Need to update in service layer");
    this.toastr.warning("Backend changing in progress");
    // this.packageService.updatePackage(this.PackageForm.value.id, this.PackageForm.value).subscribe(
    //   res => {
    //     console.log(res);
    //   }, err => {
    //     console.log(err);
    //   }
    // )

  }

  onItemSelect(item: any) {
    this.selectedItems.push(item.id);
  }

  onSelectAll(items: any) {
    console.log(items);
  }

}
