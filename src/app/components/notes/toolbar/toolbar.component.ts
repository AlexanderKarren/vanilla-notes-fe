import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModeSchema } from 'src/app/models/ModeSchema';

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
  @Input() modes: ModeSchema;

  @Output() displayChange = new EventEmitter();
  @Output() modeChange = new EventEmitter();
  @Output() undoAction = new EventEmitter();
  @Output() redoAction = new EventEmitter();

  ngOnInit(): void {
  }

  toggleRawDisplay(display: boolean) {
    this.displayRaw = display;
    this.displayChange.emit(this.displayRaw);
  }

  changeMode(key: string, bool: boolean) {
    this.modes[key] = bool;
    this.modeChange.emit({
      key: key,
      bool: bool
    })
  }

  undo() {
    this.undoAction.emit();
  }

  redo() {
    this.redoAction.emit();
  }

}
