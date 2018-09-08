import { Component, OnInit } from '@angular/core';
import { SwitchLanguageService } from "../../services/switch-language.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private switchLanguageService: SwitchLanguageService,
  ) { }

  ngOnInit() {
    this.switchLanguageService.setDefaultLanguage();
  }

}
