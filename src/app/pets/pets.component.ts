import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PetService } from '../services/pet.service';
import { OwnerService } from '../services/owner.service';
import { MessagesService } from '../services/messages.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit {
  public form: FormGroup;
  public formNewPet: FormGroup;
  data: any = null
  owners: any;
  ownerSelected: boolean = false;
  edit_id: string = null;

  constructor(
    public formBuilder: FormBuilder, 
    private petService: PetService, 
    private ownerService: OwnerService,
    private modalService: NgbModal,
    private messageService: MessagesService,
    private spinnerService: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      owner: ['', Validators.required],
    });

    this.formNewPet = this.formBuilder.group({
      owner: ['', Validators.required],
      name: ['', Validators.required],
      type: ['', Validators.required],
    });

    this.ownerService.getOwners().subscribe( res =>{
      this.owners  = res.data
    });
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.postPet()
    }, (reason) => {
      console.log('reason',reason)
    });
  }

  validation(control: string){
    if(this.formNewPet.get(control)?.errors?.required && this.formNewPet.get(control)?.touched){
      return true
    } else return false
  }

  changeOwner( owner: string){
    console.log(owner)
    this.ownerSelected = true
    this.spinnerService.show();
    this.petService.getPets(owner).subscribe( res =>{
      this.data  = res.data
      console.log(this.data)
      this.spinnerService.hide();
    });
  }

  reload(owner: any){
    this.changeOwner( owner)
  }

  postPet(){
    this.spinnerService.show();
    const { name, owner, type } = this.formNewPet.value;
    console.log(owner)
    this.petService.postPets({ name, owner_id :owner, type }).subscribe( res =>{
      this.changeOwner( owner)
      this.messageService.messageSuccess('La mascota fue agregada con éxito')
      this.spinnerService.hide();
    }, error =>{
      this.messageService.messageError(error)
    });
  }

  async delete(data: any){
    let confirmed = await this.messageService.messageModal('mascota');
    if(confirmed){
      console.log(data)
      this.petService.deletePet(data.id).subscribe( res=>{
        this.changeOwner(data.owner_id )
        this.messageService.messageSuccess('La mascota fue eliminada con éxito')
      }, error =>{
        this.messageService.messageError(error)
      });
    }
  }

  editModal(data: any, content){
    console.log(data)
    this.open(content);
    this.edit_id = data.id
    this.formNewPet.controls.name.setValue(data.name);
    this.formNewPet.controls.owner.setValue(data.owner_id);
    this.formNewPet.controls.type.setValue(data.type);
  }

  edit(){
    this.modalService.dismissAll()
    const { name, owner, type } = this.formNewPet.value;
    this.petService.editPet(this.edit_id, { name, owner, type }).subscribe( res=>{
      this.ngOnInit()
      this.edit_id = null;
      this.changeOwner(owner )
      this.messageService.messageSuccess('La mascota fue editada con éxito')
    }, error =>{
      this.messageService.messageError(error)
    });
  }
}
