import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessagesService } from '../services/messages.service';
import { OwnerService } from '../services/owner.service';


@Component({
  selector: 'app-owners',
  templateUrl: './owners.component.html',
  styleUrls: ['./owners.component.scss']
})
export class OwnersComponent implements OnInit {

  public form: FormGroup;
  data: any;
  edit_id: string = null;

  constructor( 
    public formBuilder: FormBuilder,
    private ownerService:OwnerService,
    private modalService: NgbModal,
    private spinnerService: NgxSpinnerService,
    private messageService: MessagesService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
    });

    this.ownerService.getOwners().subscribe( res =>{
      this.data  = res.data
    });
  }

  reload(value: any){
    console.log(value)
    if(value) this.ngOnInit();
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if(!this.edit_id){
        this.postOwners()
      }else{
        this.edit()
      }
    }, (reason) => {
      console.log('reason',reason)
    });
  }

  validation(control: string){
    if(this.form.get(control)?.errors?.required && this.form.get(control)?.touched){
      return true
    } else return false
  }

  postOwners(){
    this.spinnerService.show();
    const { name, lastname } = this.form.value;
    this.ownerService.postOwners({name, lastname}).subscribe( res =>{
      this.spinnerService.hide();
      this.ngOnInit();
    }, error =>{
      this.messageService.messageError(error)
    })
  }

  async delete(data: any){
    let confirmed = await this.messageService.messageModal('dueño');
    if(confirmed){
      console.log(data)
      this.ownerService.deleteOwner(data.id).subscribe( res=>{
        this.ngOnInit()
        this.messageService.messageSuccess('El dueño fue eliminado con éxito')
      }, error =>{
        this.messageService.messageError(error)
      });
    }
  }

  editModal(data: any, content){
    console.log(data)
    this.open(content);
    this.edit_id = data.id
    this.form.controls.name.setValue(data.name);
    this.form.controls.lastname.setValue(data.lastname);
  }

  edit(){
    this.modalService.dismissAll()
    const { name, lastname } = this.form.value;
    this.ownerService.editOwner(this.edit_id, { name, lastname }).subscribe( res=>{
      this.ngOnInit()
      this.edit_id = null;
      this.messageService.messageSuccess('El dueño fue editado con éxito')
    }, error =>{
      this.messageService.messageError(error)
    });
  }

}
