import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Nav } from '../ux/nav/index';
import { Menu } from '../ux/menu/index';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UxService {

  private _errors = new Subject<string>();
  private _navBar = new Subject<Nav>();
  private _contextMenu = new Subject<Menu>();

  navBarChanges: Observable<Nav> = this._navBar.asObservable();
  contextMenuChanges: Observable<Menu>  = this._contextMenu.asObservable();
  errors: Observable<string> = this._errors.asObservable();

  constructor() { }

  setNavBar(nav: Nav) {
    this._navBar.next(nav);
  }

  resetNavBar() {
    this._navBar.next(null);
  }

  setContextMenu(menu: Menu) {
    this._contextMenu.next(menu);
  }

  resetContextMenu() {
    this._contextMenu.next(null);
  }

  errorOccurred(error: string) {
    this._errors.next(error);
  }
}
