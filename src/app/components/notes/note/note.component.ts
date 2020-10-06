import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import Note from 'src/app/models/Note';
import TextLine from 'src/app/models/TextLine';

import { NoteService } from 'src/app/services/note.service';
import { splitLine, scanForVariables } from 'src/app/utilities/splitLine';
import storage from 'src/app/utilities/storage';

function updateCheckboxes(note: Note, checked: boolean, text: string): Note {
  return checked ? {
    ...note,
    body: note.body.replace(`[*] ${text}`, `[ ] ${text}`)
  } : {
    ...note,
    body: note.body.replace(`[ ] ${text}`, `[*] ${text}`)
  }
}

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  private sub: any;
  note: Note;
  confirmDelete: boolean;
  textLines: TextLine[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private noteService: NoteService
  ) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.confirmDelete = false;
    this.textLines = [];
    this.sub = this.route.params.subscribe(params => {
      this.note = this.noteService.getNote(params['id']);
      this.renderNote();
    })
  }

  renderNote():void {
    const lines = this.note.body.replace(/\r\n/g, "\r").replace(/\n/g, "\r").split(/\r/);
    const variables = {};
    scanForVariables(this.note.body, variables);
    lines.forEach(line => {
      splitLine(this.textLines, line, variables);
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  changeDeleteStatus(status: boolean) {
    this.confirmDelete = status;
  }

  download = () => storage.download(this.note.title, this.note.body);

  handleBoxTick(text: string, checked: boolean) {
    this.textLines = [];
    this.note = updateCheckboxes(this.note, checked, text)
    this.noteService.editNote(this.note.id, this.note);
    this.renderNote();
  };

}