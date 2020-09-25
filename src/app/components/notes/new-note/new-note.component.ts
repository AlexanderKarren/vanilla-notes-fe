import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.component.html',
  styleUrls: ['./new-note.component.scss']
})
export class NewNoteComponent implements OnInit {
  textRows:number;
  displayRaw:boolean;

  ngOnInit(): void {
    this.textRows = 30;
    this.displayRaw = true;
  }

}
