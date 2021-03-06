import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Mode } from 'src/app/models/ModeSchema';
import { PreviousRouteService } from 'src/app/services/previous-route.service';

import { NoteService } from '../../../services/note.service';

function getSelection():string {
  return document.getSelection().toString() ? document.getSelection().toString() : null;
}

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  constructor(
    private previousRouteService: PreviousRouteService,
    private router: Router,
    private noteService: NoteService
  ) { }

  @Input() saved: boolean;
  @Input() displayRaw: boolean;
  @Input() modes: Mode;
  @Input() canUndo: boolean;
  @Input() editId: string;

  @Output() displayChange = new EventEmitter();
  @Output() modeChange = new EventEmitter();
  @Output() saveAction = new EventEmitter();
  @Output() undoAction = new EventEmitter();
  @Output() redoAction = new EventEmitter();
  @Output() deleteAction = new EventEmitter();
  @Output() insertAction = new EventEmitter();

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

  save() {
    this.saveAction.emit();
  }

  undo() {
    this.undoAction.emit();
  }

  redo() {
    this.redoAction.emit();
  }

  changeDeleteStatus(status: boolean) {
    this.deleteAction.emit(status);
  }

  insertLink(image: boolean) {
    const userSelection = getSelection();
    this.insertAction.emit({
      selection: userSelection,
      image: image,
      alignment: null
    });
  }

  insertAlignment(alignment: string) {
    const userSelection = getSelection();
    this.insertAction.emit({
      selection: userSelection,
      image: false,
      alignment: alignment
    })
  }

  return(save: boolean) {
    save && this.save();
    this.router.navigate([`notes/id/${this.editId}`])
  }

}
