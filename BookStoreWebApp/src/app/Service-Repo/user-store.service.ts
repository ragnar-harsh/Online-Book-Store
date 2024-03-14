import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  private firstName$ = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");

  constructor() { }

  public setFirstNameForStore(fname: string){
    this.firstName$.next(fname);
  }

  public getFirstNameFromStore(){
    return this.firstName$.asObservable();
  }

  public setRoleForStore(role : string){
    this.role$.next(role);
  }

  public getRoleFromStore(){
    return this.role$.asObservable();
  }
}
