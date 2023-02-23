import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HomeComponent } from './home/home.component';
import { AddClientComponent } from './_components/client/add-client/add-client.component';
import { ShowClientComponent } from './_components/client/show-client/show-client.component';
import { EditClientComponent } from './_components/client/edit-client/edit-client.component';
import { ClientListComponent } from './_components/client/client-list/client-list.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ItemComponent } from './_components/item/item/item.component';
import { PackageComponent } from './_components/package/package.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    AddClientComponent,
    ShowClientComponent,
    EditClientComponent,
    ClientListComponent,
    ItemComponent,
    PackageComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    ReactiveFormsModule,
    ModalModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    ToastrModule.forRoot({
      positionClass : 'toast-bottom-right'
    })
   
  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }
