import { ArrayType } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import keyCodes from '../../../models/keyCodes';
import { ModeSchema } from '../../../models/ModeSchema';

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
  textRows: number;
  displayRaw: boolean;
  noteForm: object;
  modes: ModeSchema;

  constructor(
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
    this.displayRaw = true;
  }

  changeMode(data: ModeOptions): void {
    this.modes[data.key] = data.bool;
  }

  handleChanges() {
    const penulChar = (<any>this.noteForm).value.body.charCodeAt((<any>this.noteForm).value.body.length - 3)
    const lastChar = (<any>this.noteForm).value.body.charCodeAt((<any>this.noteForm).value.body.length - 1)
    console.log("penulChar:", penulChar)
    if (this.modes.bullet) {
      console.log(lastChar === keyCodes["enter"]);
      if (lastChar === keyCodes["enter"]) {
        console.log("body should be updated");
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
    console.log(lastChar);
  }

  undo() {
    const newString = cutAtLastPeriod((<any>this.noteForm).value.body);
    if (newString) this.undoHistory.push((<any>this.noteForm).value.body);
    (<any>this.noteForm).patchValue({
      body: newString
    })
  }

  redo() {
    const poo = this.undoHistory.pop();
    if (poo) (<any>this.noteForm).patchValue({
      body: poo
    })
  }

  peekForm(): void {
    console.log((<HTMLInputElement>this.noteForm).value);
  }

  // whatIsDisplayRaw(): void {
  //   console.log(this.displayRaw);
  // }

  whatIsModes(): void {
    console.log(this.modes);
  }

}
