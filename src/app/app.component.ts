import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isCollapsed:boolean = true;

  // constructor() {
  //   this.isCollapsed = true;
  // }

  ngOnInit():void {
    console.log(this.isCollapsed);
  }

}
