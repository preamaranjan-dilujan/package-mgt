import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemService {


 
  baseUrl = "https://localhost:44310/api/";

  constructor(private http: HttpClient) { }

  addItem(model: any){
    return this.http.post(this.baseUrl + "Item", model);
  }

  showItemList(){
    return this.http.get(this.baseUrl + "Item");
  }

  updateItem(id: any, model: any){
    return this.http.put(this.baseUrl + "Item/" + id, model);
  }

 


  
}
