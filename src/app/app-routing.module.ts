import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from "./components/login/login.component";
import { SignupComponent } from "./components/signup/signup.component";
import { ResetPasswordComponent } from "./components/reset-password/reset-password.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { RecipeDetailsComponent } from "./components/recipe-details/recipe-details.component";
import { AuthGuard } from "./guards/auth.guard";
import {FavoritesComponent} from "./components/favorites/favorites.component";
import {AboutComponent} from "./components/about/about.component";

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
  { path: 'recipes/:id', component: RecipeDetailsComponent, canActivate: [AuthGuard]},
  { path: 'favorites', component: FavoritesComponent,canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'reset-password', component: ResetPasswordComponent},
  { path: 'about', component: AboutComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
