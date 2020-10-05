import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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

  toggleDarkMode = () => this.themeChange.emit();

}
