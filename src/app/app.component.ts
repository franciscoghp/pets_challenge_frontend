import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <main class="container">
    <router-outlet></router-outlet>
  </main>
    <!-- SPINNER -->
  <ngx-spinner bdColor="rgba(51,51,51,0.8)" size="medium" color="#fff" type="ball-scale-multiple">
      <p style="font-size: 20px; color: white">Loading...</p>
  </ngx-spinner>`
  
})
export class AppComponent  implements OnInit {
    
    constructor() {
    }

    ngOnInit() {
    }
}