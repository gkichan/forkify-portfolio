import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from './components/home/home.component';
import {LoginComponent} from "./components/login/login.component";
import {SignupComponent} from "./components/signup/signup.component";
import {ResetPasswordComponent} from "./components/reset-password/reset-password.component";
import {SettingsComponent} from "./components/settings/settings.component";
import {RecipeDetailsComponent} from "./components/recipe-details/recipe-details.component";

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'settings', component: SettingsComponent},
  { path: 'recipes/:id', component: RecipeDetailsComponent},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'reset-password', component: ResetPasswordComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
