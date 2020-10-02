import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NoteService } from 'src/app/services/note.service';

import keyCodes from '../../../models/keyCodes';
import { ModeSchema } from '../../../models/ModeSchema';

import { generate } from 'shortid';
import { ActivatedRoute } from '@angular/router';

// Traverses a body string and returns a shortened version that ends at the last period.
const cutAtLastPeriod = (str: string):string => {
  let i = str.length - 1;
  while (i > 0) {
    // TODO: update with key code syntax for consistency
    if (str[i] === '.') return str.substring(0, i);
    i--;
  }
  return null
}

interface ModeOptions {
    key?: string
    bool?: boolean
}

@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.component.html',
  styleUrls: ['./new-note.component.scss']
})
export class NewNoteComponent implements OnInit {
  undoHistory = [];
  editId: string;
  textRows: number;
  saved: boolean;
  displayRaw: boolean;
  noteForm: object;
  modes: ModeSchema;

  constructor(
    private route: ActivatedRoute,
    private noteService: NoteService,
    private formBuilder: FormBuilder
  ) {
    this.noteForm = this.formBuilder.group({
      title: 'New Note',
      body: ''
    })
  }

  ngOnInit(): void {
    this.modes = {
      bullet: false
    }
    this.textRows = 30;
    this.saved = false;
    this.displayRaw = true;
    this.route.params.subscribe(params => {
      console.log(this.noteForm);
      if (params['id']) {
        this.saved = true;
        this.editId = params['id'];
        const note = this.noteService.getNote(params['id']);
        (<any>this.noteForm).patchValue({
          title: note.title,
          body: note.body
        })
      }
    })
  }

  getTitleLength(): number {
    return (<any>this.noteForm).value.title.length;
  }

  changeMode(data: ModeOptions): void {
    this.modes[data.key] = data.bool;
  }

  handleChanges() {
    this.saved = false;
    const penulChar = (<any>this.noteForm).value.body.charCodeAt((<any>this.noteForm).value.body.length - 3)
    const lastChar = (<any>this.noteForm).value.body.charCodeAt((<any>this.noteForm).value.body.length - 1)
    if (this.modes.bullet) {
      if (lastChar === keyCodes["enter"]) {
        (<any>this.noteForm).patchValue({
          body: (<any>this.noteForm).value.body + '* '
        })
      }
      else if (penulChar === keyCodes["asterisk"]) {
        this.changeMode({
          key: 'bullet',
          bool: false
        })
      }
    }
  }

  save() {
    this.saved = true;
    // console.log((<any>this.noteForm).value);
    if (this.editId) {
      console.log(this.noteService.getNote(this.editId));
      this.noteService.editNote(this.editId, {
        ...(<any>this.noteForm).value
      })
      console.log(this.noteService.getNote(this.editId));
    }
    else {
      this.noteService.addLocalNote({
        id: generate(),
        topic: "poo",
        ...(<any>this.noteForm).value
      })
    }
    // console.log(this.noteService.notes);
  }

  undo() {
    this.saved = false;
    const newString = cutAtLastPeriod((<any>this.noteForm).value.body);
    if (newString) this.undoHistory.push((<any>this.noteForm).value.body);
    (<any>this.noteForm).patchValue({
      body: newString
    })
  }

  redo() {
    this.saved = false;
    const poppedBody = this.undoHistory.pop();
    if (poppedBody) (<any>this.noteForm).patchValue({
      body: poppedBody
    })
  }

  peekForm(): void {
    console.log((<any>this.noteForm).value);
  }

  // whatIsDisplayRaw(): void {
  //   console.log(this.displayRaw);
  // }

  whatIsModes(): void {
    console.log(this.modes);
  }

}
