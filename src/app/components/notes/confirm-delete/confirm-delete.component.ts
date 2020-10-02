import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import Note from 'src/app/models/Note';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss']
})
export class ConfirmDeleteComponent implements OnInit {
  @Input() note: Note;

  @Output() statusAction = new EventEmitter();

  constructor(
    private noteService: NoteService,
    private router: Router
  ) { }

  ngOnInit(): void {
    
  }

  changeDeleteStatus(status: boolean) {
    this.statusAction.emit(status);
  }

  deleteNote() {
    this.changeDeleteStatus(false);
    if (this.note) this.noteService.deleteLocalNote(this.note);
    this.router.navigate([""]);
  }

}
