import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor() { }

  init() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 6000,
      timerProgressBar: true,
      willOpen: (toast: any) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });
    return Toast;
  }

  messageSuccess(message: any) {
    const Toast = this.init();
    Toast.fire({
      icon: 'success',
      title: `${message}`,
    });
  }

  messageError(message: any) {
    const Toast = this.init();
    Toast.fire({
      icon: 'error',
      title: `${message}`,
    });
  }

  async messageModal(campo: string) {
    const Toast = Swal.fire({
      title: '¿Estás seguro?',
      text: campo == 'dueño'? `¿Deseas eliminar este ${campo}?` : `¿Deseas eliminar esta ${campo}?` ,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ACEPTAR',
      cancelButtonText: 'CANCELAR',
    }).then((result: { isConfirmed: any }) => {
      if (result.isConfirmed) {
        return result.isConfirmed;
      }
    });
    const response = await Toast;
    return response;
  }
}
