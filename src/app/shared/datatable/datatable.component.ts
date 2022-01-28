import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { Owner, Pet } from 'src/app/interfaces/interfaces';
import { OwnerService } from 'src/app/services/owner.service';
import { PetService } from 'src/app/services/pet.service';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  providers: [DecimalPipe]
})
export class DatatableComponent {
  @Input('owners') owners: Owner[];
  @Input('pets') pets: Pet[];
  @Output() searchEvent = new EventEmitter<any>();

  @Output() deleteOwner = new EventEmitter<any>();
  @Output() deletePet = new EventEmitter<any>();

  @Output() editOwner = new EventEmitter<any>();
  @Output() editPet = new EventEmitter<any>();


  filter: string = ''
  key: string = 'name'
  reverse: boolean = false;
  p: number = 1;

  constructor( private ownerService: OwnerService, private petService: PetService ) {  }

  search(){
    if(this.filter == '') {
      if(this.owners){
        this.searchEvent.emit(true);
      }else if(this.pets){
        this.searchEvent.emit(this.pets[0]?.owner_id);
      }
    }
    else{
      if(this.owners){
        this.owners = this.owners.filter( res=>{
          return res.name.toLocaleLowerCase().match(this.filter.toLocaleLowerCase()) ||
          res.lastname.toLocaleLowerCase().match(this.filter.toLocaleLowerCase())
        })
      }else if(this.pets){
        this.pets = this.pets.filter( res=>{
          return res.name.toLocaleLowerCase().match(this.filter.toLocaleLowerCase()) ||
          res.owner.toLocaleLowerCase().match(this.filter.toLocaleLowerCase()) || 
          res.type.toLocaleLowerCase().match(this.filter.toLocaleLowerCase())
        })
      }
    }
  }

  sort(key:string){
    this.key = key;
    this.reverse = !this.reverse
  }

  delete(data: any, type: string){
    console.log(type)
    if(type == 'owner'){
      this.deleteOwner.emit(data)
    }else{
      this.deletePet.emit(data)
    }
  }

  edit(data: any, type: string){
    console.log(type)
    if(type == 'owner'){
      this.editOwner.emit(data)
    }else{
      this.editPet.emit(data)
    }
  }
}