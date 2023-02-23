import { DatePipe } from '@angular/common';
import { Component, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
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
    name: new FormControl(''),
    startTime: new FormControl(''),
    endTime: new FormControl(''),
    description: new FormControl(''),
    active: new FormControl(''),
    price: new FormControl('')
  });

  selectedDate: Date = new Date();

  constructor(private itemService: ItemService, private modalService: BsModalService,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.itemService.showItemList().subscribe((response: any) => {
      console.log(response['$values']);
      this.items = response['$values'];
    }, err => {
      console.log(err);

    })
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

  addItem() {
    
    this.ItemForm.patchValue({
      startTime: this.formatDate(this.ItemForm.get("startTime")?.value),
      endTime: this.formatDate(this.ItemForm.get("endTime")?.value)
    });
    
    this.itemService.addItem(this.ItemForm.value).subscribe(
      response => {
        console.log(response);
      }, error => {
        console.log(error);
      }
    );

  }

  updateItem() {

    this.ItemForm.patchValue({
      startTime: this.formatDate(this.ItemForm.get("startTime")?.value),
      endTime: this.formatDate(this.ItemForm.get("endTime")?.value)
    });

    this.itemService.updateItem(this.ItemForm.value.id, this.ItemForm.value).subscribe(
      res => {
        console.log(res);
      }, err => {
        console.log(err);
      }
    )
  }
 
}
