import { DatePipe } from '@angular/common';
import { Component, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ItemService } from 'src/app/_services/item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  providers: [DatePipe]
})
export class ItemComponent {

  modalRef?: BsModalRef;

  items: any = [{}];

  showButton: boolean = false;

  formName: any;

  ItemForm = new FormGroup({
    id: new FormControl('0'),
    name: new FormControl('', Validators.required),
    startTime: new FormControl('', Validators.required),
    endTime: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    active: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required)
  });

  selectedDate: Date = new Date();

  submitted = false;


  constructor(private itemService: ItemService, private modalService: BsModalService,
    private datePipe: DatePipe, private spinner: NgxSpinnerService, 
    private toastr : ToastrService) { }

  ngOnInit(): void {
    this.showItemList();
  }

  viewModal(template: TemplateRef<any>, item: any) {
    this.ItemForm.disable();
    item.startTime = new Date(item.startTime);
    item.endTime = new Date(item.endTime);
    this.formName = "View";
    this.showButton = false;
    this.modalRef = this.modalService.show(template);
    this.ItemForm.patchValue(item);
  }

  editModel(template: TemplateRef<any>, item: any) {
    this.ItemForm.enable();
    item.startTime = new Date(item.startTime);
    item.endTime = new Date(item.endTime);
    this.formName = "Edit";
    this.showButton = true;
    this.modalRef = this.modalService.show(template);
    this.ItemForm.patchValue(item);
  }

  AddModal(template: TemplateRef<any>) {
    this.ItemForm.enable();
    this.formName = "Add";
    this.showButton = true;
    this.modalRef = this.modalService.show(template);
  }

  formatDate(dateX: any): string {
    const date = new Date(dateX);
    return date.toISOString();
  }

  showItemList(){
    this.spinner.show();
    this.itemService.showItemList().subscribe((response: any) => {
      //console.log(response['$values']);
      this.items = response['$values'];
      //this.spinner.hide();
      setTimeout(() => {
        this.spinner.hide();
      }, 3000);
    }, err => {
      console.log(err);
      this.spinner.hide();
    });
  }

  addItem() {
    this.submitted = true;
    this.spinner.show();

    if (this.ItemForm.valid) {

      this.ItemForm.patchValue({
        startTime: this.formatDate(this.ItemForm.get("startTime")?.value),
        endTime: this.formatDate(this.ItemForm.get("endTime")?.value)
      });

      this.itemService.addItem(this.ItemForm.value).subscribe(
        response => {
          console.log(response);
          //this.spinner.hide();
          setTimeout(() => {
            this.spinner.hide();
          }, 3000);
          this.toastr.success("Add item sucessfully");
          window.location.reload();
        }, error => {
          console.log(error);
          //this.spinner.hide();
          setTimeout(() => {
            this.spinner.hide();
          }, 3000);
          this.toastr.error("Error added item");
        }
      );

    }
  }

  updateItem() {
    this.submitted = true;
    this.spinner.show();

    if (this.ItemForm.valid){

      this.ItemForm.patchValue({
        startTime: this.formatDate(this.ItemForm.get("startTime")?.value),
        endTime: this.formatDate(this.ItemForm.get("endTime")?.value)
      });
  
      this.itemService.updateItem(this.ItemForm.value.id, this.ItemForm.value).subscribe(
        res => {
          console.log(res);
          //this.spinner.hide();
          setTimeout(() => {
            this.spinner.hide();
          }, 3000);
          this.toastr.success("Updated item sucessfully");
          window.location.reload();
        }, err => {
          console.log(err);
          //this.spinner.hide();
          setTimeout(() => {
            this.spinner.hide();
          }, 3000);
          this.toastr.error("Error updated item");
        }
      )
    }
  }

  get itemFormControl() {
    return this.ItemForm.controls;
  }

}
