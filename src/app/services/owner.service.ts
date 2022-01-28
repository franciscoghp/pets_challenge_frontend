import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  private url = environment.url;

  constructor( private http: HttpClient) { }

  getOwners(){
    return this.http.get<any>(this.url + '/owners/')
  }

  postOwners(data: any){
    return this.http.post<any>(this.url + '/owners', data)
  }

  deleteOwner(id: string){
    return this.http.delete<any>(this.url + '/owners/' + id)
  }

  editOwner(id: string ,data: any){
    return this.http.put<any>(this.url + '/owners/' + id, data)
  }
}
