import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import storage from 'src/app/utilities/storage';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class HeaderMenuComponent implements OnInit {
  @Output() themeChange = new EventEmitter();

  @Input() dark: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  toggleDarkMode() {
    storage.toggleDarkMode();
    this.themeChange.emit()
  };

}
