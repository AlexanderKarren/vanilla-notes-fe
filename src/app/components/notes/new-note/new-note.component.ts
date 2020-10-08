import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NoteService } from 'src/app/services/note.service';

import { Mode, ModeOptions } from 'src/app/models/ModeSchema';
import Topic from 'src/app/models/Topic';
import Note from 'src/app/models/Note';

import * as dayjs from 'dayjs';
import { generate } from 'shortid';
import { ActivatedRoute, Router } from '@angular/router';
import { handleNoteInput } from 'src/app/utilities/input';

// Traverses a body string and returns a shortened version that ends at the last period
const cutAtLastPeriod = (str: string):string => {
  let i = str.length - 1;
  while (i > 0) {
    // TODO: update with key code syntax for consistency
    if (str[i] === '.') return str.substring(0, i);
    i--;
  }
  return null
}

// A Selection object contains a string for the user's selection, and what to replace it with.
interface Selection {
  selection: string;
  image: boolean;
  alignment: string;
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
  modes: Mode;
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
    this.note = null;
    this.topics = this.noteService.getTopics();
    this.modes = {
      alignCenter: false,
      alignRight: false,
      bullet: false
    }
    this.textRows = 30;
    this.saved = false;
    this.displayRaw = true;
    // check to see if there is an id in route params
    this.route.params.subscribe(params => {
      // if there is, get note by id and pass the values to the form
      const { id } = params;
      if (id) {
        this.saved = true;
        this.editId = id;
        this.note = this.noteService.getNote(id);
        (<any>this.noteForm).patchValue({
          title: this.note.title,
          topic: this.note.topic,
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

  handleChanges(event) {
    this.saved = false;
    const body = (<any>this.noteForm).value.body;
    if (body.length % 10 === 0) console.log(body);
    const lastChar = body.charCodeAt(body.length - 1);
    const penulChar = body.charCodeAt(body.length - 2);
    handleNoteInput({
      body: (<any>this.noteForm).value.body,
      lastChar: lastChar,
      penulChar: penulChar,
      modes: this.modes,
      form: (<any>this.noteForm)
    });
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
          date_created: dayjs().format('YYYY-MM-DDTHH:mm:ss[Z]'),
          ...(<any>this.noteForm).value
        })
        this.router.navigate([`notes/id/${id}/edit`]);
        console.log(this.noteService.notes);
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

  changeTopic(topic: string): void {
    (<any>this.noteForm).patchValue({
      topic: topic
    })
  }

  changeDeleteStatus(status: boolean) {
    this.confirmDelete = status;
  }

  insert(userSelection: Selection) {
    const { selection, image, alignment } = userSelection;
    if (alignment) {
      const formatted = alignment === 'c[]' ? `c[${selection}]` : `r[${selection}]`;
      console.log("formatted:", formatted);
      if (selection) {
        (<any>this.noteForm).patchValue({
          body: (<any>this.noteForm).value.body.replace(selection, formatted)
        })
      }
      else {
        (<any>this.noteForm).patchValue({
          body: (<any>this.noteForm).value.body + formatted
        })
      }
    }
    else {
      const formatted = image ? `![${selection}]()` : `[${selection}]()`;
      // if userSelection is not null, find and replace the selection in the body with the formatted version.
      if (selection) {
        (<any>this.noteForm).patchValue({
          body: (<any>this.noteForm).value.body.replace(selection, formatted)
        })
      }
      else {
        const blankBrackets = image ? '![]()' : '[]()';
        (<any>this.noteForm).patchValue({
          body: (<any>this.noteForm).value.body + blankBrackets
        })
      }
    }
  }

  delete = () => this.router.navigate(["/notes/new"]);

  // whatIsDisplayRaw(): void {
  //   console.log(this.displayRaw);
  // }

  // whatIsModes(): void {
  //   console.log(this.modes);
  // }

}
