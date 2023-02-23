import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  baseUrl = "https://localhost:44310/api/";

  constructor(private http: HttpClient) { }

  addClient(model: any){
    return this.http.post(this.baseUrl + "Client/AddClient", model);
  }

  showClientList(){
    return this.http.get(this.baseUrl + "Client");
  }

  getClient(){
    
  }
}
