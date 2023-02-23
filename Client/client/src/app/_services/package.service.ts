import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  baseUrl = "https://localhost:44310/api/";

  constructor(private http: HttpClient) { }

  addPackage(model: any){
    return this.http.post(this.baseUrl + "Package", model);
  }

  showPackageList(){
    return this.http.get(this.baseUrl + "Package");
  }

  updatePackage(id: any, model: any){
    return this.http.put(this.baseUrl + "Item/" + id, model);
  }

}
