import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  private url = environment.url;

  constructor( private http: HttpClient) { }

  getPets(owner: string){
    return this.http.get<any>(this.url + '/pets/' + owner)
  }

  postPets(data: any){
    return this.http.post<any>(this.url + '/pets', data)
  }

  deletePet(id: string){
    return this.http.delete<any>(this.url + '/pets/' + id)
  }

  editPet(id: string, data: any){
    return this.http.put<any>(this.url + '/pets/' + id, data)
  }
}
