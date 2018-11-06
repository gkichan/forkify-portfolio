import { Injectable } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import { BehaviorSubject } from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _uId: string;

  private userStateChange = new BehaviorSubject(this.uId);
  userState = this.userStateChange.asObservable();

  public get uId() : string
  {
    return this._uId || localStorage.getItem('uId');
  }

  public set uId(val: string)
  {
    this._uId = val;
    localStorage.setItem('uId', this._uId);
  }

  constructor(
    private afauth: AngularFireAuth
  ) { }

  login(email, password): Promise<any> {
    return this.afauth.auth.signInWithEmailAndPassword(email, password)
      .then(res => {
        this.uId = res.user.uid;
        this.userStateChange.next(this.uId);
      });
  }

  signup(email, password): Promise<any> {
    return this.afauth.auth.createUserWithEmailAndPassword(email, password);
  }

  resetPassword(email) {
    return this.afauth.auth.sendPasswordResetEmail(email);
  }

  logout() {
    this._uId = '';
    localStorage.removeItem('uId');

    this.userStateChange.next(this.uId);

    this.afauth.auth.signOut();
  }
}
