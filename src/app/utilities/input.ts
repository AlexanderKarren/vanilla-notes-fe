import { ModeOptions, Mode } from '../models/ModeSchema';
import keyCodes from '../models/keyCodes';

class InputData {
    body: string;
    lastChar: number;
    penulChar: number;
    modes: Mode;
    form: any;
}

function changeMode(data: ModeOptions, modes: Mode): void {
    modes[data.key] = data.bool;
}

export function handleNoteInput(data: InputData): void {
    if (data.modes.bullet) {
        console.log(data.penulChar);
        if (data.lastChar === keyCodes["enter"]) {
          if (data.penulChar === keyCodes["blank"]) {
            changeMode({
              key: 'bullet',
              bool: false
            }, data.modes);
            data. form.patchValue({
              body: data.body.substr(0, data.body.length - 3)
            });
          }
          else {
            data. form.patchValue({
              body: data.body + '* '
            });
          }
        }
      }
      else {
        console.log((data.penulChar === keyCodes["enter"] || !data.penulChar) && data.lastChar === keyCodes["asterisk"])
        // if an asterisk is entered on a newline, turn on bullet mode
        if ((data.penulChar === keyCodes["enter"] || !data.penulChar) && data.lastChar === keyCodes["asterisk"]) {
          changeMode({
            key: "bullet",
            bool: true
          }, data.modes)
        }
      }
}