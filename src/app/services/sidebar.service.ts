import { EventEmitter, Injectable } from '@angular/core';
import storage from '../utilities/storage';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  sidebarToggled = new EventEmitter();
  isCollapsed:boolean;

  constructor() {
    this.isCollapsed = storage.isCollapsed();
  }

  toggleSidebar(status: boolean) {
    this.isCollapsed = status;
    storage.toggleCollapse();
    this.sidebarToggled.emit();
  }
}
