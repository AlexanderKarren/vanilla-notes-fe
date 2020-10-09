import keyCodes from '../models/keyCodes';
import Heading from '../models/Heading';
import TextLine from '../models/TextLine';
import formatTextLine from './formatTextLine';

// this splits single lines of text into smaller lines to be used on formatTextLine
export function splitLine(textLines: TextLine[], headings: Heading[], line: string, variables: any) {
        let subLinesFound = false;
        let foundClosingBracket = false;
        let parsing = false;
        let subLength = 0;
        let start = 0;

        // ignore lines
        if (line[0] === 'c' || line[0] === 'r' || line[0] === '`' || line[0] === '!') {
            textLines.push(formatTextLine(line, variables, headings, false));
            return;
        }

        let i = 0;
        while (i < line.length - 1) {
            subLength++;
            // if at end of string
            if (i === line.length - 2) {
                if (subLinesFound && line[i] !== '*') {
                    textLines.push(formatTextLine(line.substr(start), variables, headings, true));
                }
                else if (line[i] === '*') {
                    textLines.push(formatTextLine(line.substr(start, subLength), variables, headings, true));
                }
            }
            // if not currently parsing
            else if (parsing === false) {
                if (line[i] === '*' && line[i + 1] === '*') {
                    textLines.push(formatTextLine(line.substr(start, subLength - 2), variables, headings, true));
                    parsing = true;
                    start = i;
                    i += 2;
                    // This is probably a problem
                    subLength = 2;
                }
                else if (line[i] === '[') {
                    textLines.push(formatTextLine(line.substr(start, subLength - 1), variables, headings, true));
                    parsing = true;
                    start = i;
                    i += 2;
                    // This is probably a problem
                    subLength = 1;
                }
            }
            // if currently parsing
            else {
                // bold asterisks found
                if (line[i] === '*' && line[i + 1] === '*') {
                    textLines.push(formatTextLine(line.substr(start, subLength), variables, headings, true));
                    parsing = false;
                    start = i + 3;
                    subLinesFound = true;
                    subLength = 0;
                    i += 2;
                }
                else if (line[i] === ']' || line[i] === ')') {
                    if (foundClosingBracket) {
                        foundClosingBracket = false;
                        console.log("start:", start, "subLength:", subLength, line.substr(start, subLength + 2));
                        textLines.push(formatTextLine(line.substr(start, subLength + 2), variables, headings, true));
                        parsing = false;
                        start = i + 1;
                        subLinesFound = true;
                        subLength = 0;
                        i += 1;
                    }
                    else {
                        foundClosingBracket = true;
                    }
                }
            }
            i++;
        }
        // console.log(textLines);
        !subLinesFound && textLines.push(formatTextLine(line, variables, headings));
}

export function scanForVariables(body: string, variables: any): string {
    let ignore = false;
    let firstVar = null;
    let parsing = false;
    let start = 0;
    let i = 0;
    let j = 0;

    while (i < body.length - 2) {
        if (body[i] === '`') {
            ignore = !ignore;
        }
        if (parsing && !ignore) {
            if (body[i] === ']' && body[i + 1] === ':') {
                if (!firstVar) {
                    let j = i;
                    while (body[j] !== '[') {
                        j--;
                    }
                    firstVar = j;
                }
                parsing = false;
                let key = body.substr(start + 1, j - 1);
                const endIndex = body.substr(i + 3, body.length).split("").findIndex(char => {
                    return (char.charCodeAt(0) === keyCodes["enter"]);
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
        else if (!ignore) {
            if (body[i] === '[') {
                parsing = true;
                start = i;
                j = 1;
            }
        }

        i++
    }
    if (firstVar) return body.substr(0, firstVar);
    return body;
}