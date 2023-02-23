import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddClientComponent } from './_components/client/add-client/add-client.component';
import { ClientListComponent } from './_components/client/client-list/client-list.component';
import { ShowClientComponent } from './_components/client/show-client/show-client.component';
import { ItemComponent } from './_components/item/item/item.component';
import { PackageComponent } from './_components/package/package.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'clients', component: ClientListComponent, canActivate: [AuthGuard]},
  // {path: 'clients/:id', component: ShowClientComponent},
  {path: 'items', component: ItemComponent, canActivate: [AuthGuard]},
  {path: 'package', component: PackageComponent, canActivate: [AuthGuard]},
  {path: 'clients/addClient', component: AddClientComponent, canActivate: [AuthGuard]},
  {path: '**', component: HomeComponent, pathMatch: 'full'},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
