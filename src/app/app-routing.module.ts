import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import {FormsModule, ReactiveFormsModule} from "@angular/forms";

<<<<<<< HEAD

const routes: Routes = [

=======
const routes: Routes = [
>>>>>>> ee351c2cbddd6a388db0935dbdafb9bdea91b7cc
];

@NgModule({
  imports: [RouterModule.forRoot(routes),FormsModule,ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
