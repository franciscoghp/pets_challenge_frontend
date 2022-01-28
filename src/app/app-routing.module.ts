import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './shared/home/home.component';

const routes: Routes = [
  	{ path: '',  component: HomeComponent },
	{ path: 'owners', loadChildren: () => import('./owners/owners.module').then(m => m.OwnersModule) },
  	{ path: 'pets', loadChildren: () => import('./pets/pets.module').then(m => m.PetsModule) },
	{ path: '**',  redirectTo: '' },
];

@NgModule({
  	imports: [ RouterModule.forRoot(routes) ],
  	exports: [ RouterModule ]
})
export class AppRoutingModule { }