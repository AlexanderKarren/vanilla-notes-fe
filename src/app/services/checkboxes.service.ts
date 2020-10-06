import { Injectable } from '@angular/core';
import storage from '../utilities/storage';

class Checkbox {
  id: string;
  note_id: string;
  checked: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CheckboxesService {
  checkboxes: any; 

  constructor() {
    this.checkboxes = storage.getCheckboxes() || {};
    console.log(this.checkboxes);
  }
}
