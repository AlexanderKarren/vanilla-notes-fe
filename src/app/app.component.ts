import { Component, OnInit } from '@angular/core';
import storage from './utilities/storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  dark:boolean;
  isCollapsed:boolean = true;

  // constructor() {
  //   this.isCollapsed = true;
  // }

  ngOnInit():void {
    console.log("Starting app.NgOnit():")
    this.dark = storage.isDarkMode();
    console.log("Done running app.ngOnInit().")
  }

  onOutletLoaded(component) {
    console.log(typeof component);
    component.node = 'app';
  }

  toggleDarkMode = () => this.dark = !this.dark;

}
