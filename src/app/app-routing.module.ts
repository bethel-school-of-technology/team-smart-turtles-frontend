import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ProfileComponent } from './components/profile/profile.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { MaterialComponent } from './components/material/material.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "/login",
    pathMatch: "full"
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "signup",
    component: SignUpComponent
  },
  {
    path: "inventory",
    component: InventoryComponent
  },
  {
    path: "profile",
    component: ProfileComponent
  },
  {
    path: "material",
    component: MaterialComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
