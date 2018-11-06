import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class SaveHistoryService {
  private historySource = new BehaviorSubject(false);
  public historyState = this.historySource.asObservable();

  constructor() {
  }

  toggleSearchHistoryState(state: boolean) {
    this.historySource.next(state);
  }
}
