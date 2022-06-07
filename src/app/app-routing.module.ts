import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecondComponent } from './second/second.component';
import { BlockitGuard } from './blockit.guard'

const routes: Routes = [
  {path: 'second', component: SecondComponent},
  {
    path: 'customer',
    //Guard trenutno uvek vraca true... 
    canActivate: [BlockitGuard],
    loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule)
  },
  //prazan path -> customer
  {
    path: '',
    redirectTo: '/customer',
    pathMatch: 'full'
  },
  //handler za nepostojeci path (wildcard route)
  //Mora biti ispod ostalih path-ova, inace ce sve redirect na first component??
  {
    path: '**',
    loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
