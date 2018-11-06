import { Component, OnInit } from '@angular/core';
import { SwitchLanguageService } from "../../services/switch-language.service";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isAuth: boolean = false;

  constructor(
    private switchLanguageService: SwitchLanguageService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.switchLanguageService.setDefaultLanguage();

    this.auth.userState.subscribe((uId: string) => {
      this.isAuth = Boolean(uId);
    })
  }

  onLogout() {
    this.auth.logout();
  }

}
