import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { NoteService } from '../../../services/note.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(
    private noteService: NoteService
  ) { }

  @Input() displayRaw:boolean;
  @Output() displayChange = new EventEmitter();

  ngOnInit(): void {
  }

  toggleRawDisplay(display: boolean) {
    this.displayRaw = display;
    this.displayChange.emit(this.displayRaw);
  }

}
