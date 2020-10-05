import keyCodes from '../models/keyCodes';
import TextLine from '../models/TextLine';
import formatTextLine from './formatTextLine';

export function splitLine(textLines: TextLine[], line: string, variables: any) {
    let subLinesFound = false;
        let parsing = false;
        let subLength = 0;
        let start = 0;

        let i = 0;
        while (i < line.length - 1) {
            subLength++;
            // if at end of string
            if (i === line.length - 2) {
                if (subLinesFound && line[i] !== '*') {
                textLines.push(formatTextLine(line.substr(start), variables, true))
                }
                else if (line[i] === '*') {
                textLines.push(formatTextLine(line.substr(start, subLength), variables, true))
                }
            }
            // if not currently parsing
            else if (parsing === false) {
                if (line[i] === '*' && line[i + 1] === '*') {
                    textLines.push(formatTextLine(line.substr(start, subLength - 2), variables, true))
                    parsing = true;
                    start = i;
                    i += 2;
                    // This is probably a problem
                    subLength = 2;
                }
            }
            // if currently parsing
            else {
                // bold asterisks found
                if (line[i] === '*' && line[i + 1] === '*') {
                textLines.push(formatTextLine(line.substr(start, subLength), variables, true));
                parsing = false;
                start = i + 3;
                subLinesFound = true;
                subLength = 0;
                i += 2;
                }
            }
            i++;
            }
            !subLinesFound && textLines.push(formatTextLine(line, variables));
}

export function scanForVariables(body: string, variables: any) {
    let parsing = false;
    let start = 0;
    let i = 0;
    let j = 0;

    while (i < body.length - 2) {
        if (parsing) {
            if (body[i] === ']' && body[i + 1] === ':') {
                parsing = false;
                let key = body.substr(start + 1, j - 1);
                const endIndex = body.substr(i + 3, body.length).split("").findIndex(char => {
                    return (char.charCodeAt(0) === keyCodes["enter"])
                });
                let value = body.substr(i + 3, endIndex);
                if (endIndex === -1) value = body.substr(i + 3, body.length - 1);
                // console.log([
                //     body.substr(start + 1, j - 1),
                //     // body.substr(i + 3, body.substr(i + 3, body.length).split("").findIndex(char => {
                //     //     return (char.charCodeAt(0) === keyCodes["enter"])
                //     // }))
                //     body.substr(i + 3, body.length).split("").findIndex(char => {
                //         return (char.charCodeAt(0) === keyCodes["enter"])
                //     })
                // ]);
                variables[key] = value;
            }
            else if (body[i] === '[') {
                start = i;
                // j will increment anyway
                j = 0;
            }
            j++;
        }
        else {
            if (body[i] === '[') {
                parsing = true;
                start = i;
                j = 1;
            }
        }

        i++
    }
}