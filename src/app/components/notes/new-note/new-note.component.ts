import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NoteService } from 'src/app/services/note.service';

import keyCodes from '../../../models/keyCodes';
import { ModeSchema } from '../../../models/ModeSchema';

import { generate } from 'shortid';
import { ActivatedRoute, Router } from '@angular/router';
import Topic from 'src/app/models/Topic';
import Note from 'src/app/models/Note';

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
    key: string;
    bool: boolean;
}


@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.component.html',
  styleUrls: ['./new-note.component.scss'],
})
export class NewNoteComponent implements OnInit {
  note: Note;
  topics: Topic[];
  undoHistory = [];
  editId: string;
  textRows: number;
  saved: boolean;
  displayRaw: boolean;
  noteForm: object;
  modes: ModeSchema;
  confirmDelete: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private noteService: NoteService,
    private formBuilder: FormBuilder
  ) {
    this.noteForm = this.formBuilder.group({
      title: 'New Note',
      topic: 'Misc',
      body: ''
    })
  }

  ngOnInit(): void {
    // console.log("ngOnInit() called")
    this.note = null;
    this.topics = this.noteService.getTopics();
    this.modes = {
      bullet: false
    }
    this.textRows = 30;
    this.saved = false;
    this.displayRaw = true;
    this.route.params.subscribe(params => {
      console.log("route params note form:", this.noteForm);
      if (params['id']) {
        this.saved = true;
        this.editId = params['id'];
        this.note = this.noteService.getNote(params['id']);
        (<any>this.noteForm).patchValue({
          title: this.note.title,
          body: this.note.body
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
    const lastChar = (<any>this.noteForm).value.body.charCodeAt((<any>this.noteForm).value.body.length - 1)
    const penulChar = (<any>this.noteForm).value.body.charCodeAt((<any>this.noteForm).value.body.length - 2)
    if (this.modes.bullet) {
      console.log(penulChar);
      if (lastChar === keyCodes["enter"]) {
        if (penulChar === keyCodes["blank"]) {
          this.changeMode({
            key: 'bullet',
            bool: false
          });
          (<any>this.noteForm).patchValue({
            body: (<any>this.noteForm).value.body.substr(0, (<any>this.noteForm).value.body.length - 3)
          });
        }
        else {
          (<any>this.noteForm).patchValue({
            body: (<any>this.noteForm).value.body + '* '
          });
        }
      }
    }
    else {
      if (penulChar === keyCodes["enter"] && lastChar === keyCodes["asterisk"]) {
        this.changeMode({
          key: "bullet",
          bool: true
        })
      }
    }
  }

  save() {
    this.saved = true;
    // console.log((<any>this.noteForm).value);
    if (this.editId) {
      this.noteService.editNote(this.editId, {
        ...(<any>this.noteForm).value
      })
    }
    else {
        const id = generate();
        this.noteService.addLocalNote({
          id: id,
          topic: "poo",
          ...(<any>this.noteForm).value
        })
        this.editId = id;
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

  changeTopic(topic: string): void {
    (<any>this.noteForm).patchValue({
      topic: topic
    })
  }

  changeDeleteStatus(status: boolean) {
    this.confirmDelete = status;
  }

}
