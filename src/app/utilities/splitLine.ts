import keyCodes from '../models/keyCodes';
import Note from '../models/Note';
import TextLine from '../models/TextLine';

function parseLink(line: string) {
    let imageElements = [];
    let i = 0;
    let start = 0;
    let subLength = 0;

    while (i < line.length) {
        if ((line[i] === '[') || (line[i] === '(')) {
            start = i + 1;
        }
        else if ((line[i] === ']') || (line[i] === ')')) {
            imageElements.push(line.substr(start, subLength))
            subLength = 0;
        }
        i++;
        subLength++;
    }

    return imageElements;
}

function formatTextLine(line: string, variables: any, inline: boolean = false): TextLine {
    // console.log("fTL:", line);
    switch(line[0]) {
        // backtick case not working for multi-line yet
        case '`':
            for (let i = 2; i < line.length; i++) {
                if (line[i] === '`') {
                    // console.log(line.substr(1, i));
                    return {
                        className: 'codeBlock',
                        link: false,
                        image: false,
                        text: line.substr(1, i - 1),
                        bullet: false,
                        inline: inline
                    }
                }
            }
        case '#':
            if (line[1] == '#') {
                if (line[2] == '#') {
                    return {
                    className: 'headingThree',
                    link: false,
                    image: false,
                    text: line.substr(3, line.length - 1),
                    bullet: false,
                    inline: inline
                    }
                }
                return {
                    className: 'headingTwo',
                    link: false,
                    image: false,
                    text: line.substr(2, line.length - 1),
                    bullet: false,
                    inline: inline
                }
            }
            return {
                className: 'headingOne',
                link: false,
                image: false,
                text: line.substr(1, line.length - 1),
                bullet: false,
                inline: inline
            }
        case '*':
            if (line[1] === '*') {
                if (line[2] === '*') {
                    return {
                        className: 'divider',
                        link: false,
                        image: false,
                        text: null,
                        bullet: false,
                        inline: inline
                    }
                }
                return {
                    className: 'bold',
                    link: false,
                    image: false,
                    text: line.substr(2, line.length - 1),
                    bullet: false,
                    inline: inline
                }
            }
            return {
                className: 'default',
                link: false,
                image: false,
                text: line.substr(1, line.length - 1),
                bullet: true,
                inline: inline
            }
        case '!':
            if (line[line.length - 1] === ')') {
                const imageElements = parseLink(line);
                return {
                    className: imageElements[1].substr(0, imageElements[1].length - 1),
                    link: false,
                    image: true,
                    text: imageElements[0].substr(0, imageElements[0].length - 2),
                    bullet: false,
                    inline: inline
                }
            }
        case '[':
            // Links
            const linkElements = parseLink(line);
            if (line[line.length - 1] === ')') {
                // console.log([linkElements[1], linkElements[0]]);
                return {
                    className: linkElements[1],
                    link: true,
                    image: false,
                    text: linkElements[0],
                    bullet: false,
                    inline: inline
                }
            }
            else if (line[line.length - 2] === ')') {
                const lastChar = line[line.length - 1];
                // console.log([linkElements[1].substr(0, linkElements[1].length - 2), linkElements[0].substr(0, linkElements[0].length - 1)]);
                return {
                    className: linkElements[1].substr(0, linkElements[1].length - 2),
                    link: true,
                    image: false,
                    text: linkElements[0].substr(0, linkElements[0].length - 1) + lastChar,
                    bullet: false,
                    inline: inline
                }
            }
            // Link with variable
            else if (line[line.length - 2] === ']') {
                const lastChar = line[line.length - 1];
                console.log("lwv:", [
                    linkElements[1].substr(0, linkElements[1].length - 2),
                    linkElements[0].substr(0, linkElements[0].length - 1) + lastChar
                ])
                return {
                    className: variables[linkElements[1].substr(0, linkElements[1].length - 2)],
                    link: true,
                    image: false,
                    text: linkElements[0].substr(0, linkElements[0].length - 1) + lastChar,
                    bullet: false,
                    inline: inline
                }
            }
        case 'c':
            if (line[1] === '[' && line[line.length - 1] === ']') {
                return {
                    className: "centerAlign",
                    link: false,
                    image: false,
                    text: line.substr(2, line.length - 3),
                    bullet: false,
                    inline:inline
                }
            }
        case 'r':
            if (line[1] === '[' && line[line.length - 1] === ']') {
                return {
                    className: "rightAlign",
                    link: false,
                    image: false,
                    text: line.substr(2, line.length - 3),
                    bullet: false,
                    inline: inline
                }
            }
    }
    return {
      className: 'default',
      link: false,
      image: false,
      text: line,
      bullet: false,
      inline: inline
    }
  }

export function splitLine(textLines: TextLine[], line: string, variables: any) {
    let subLinesFound = false;
        let parsing = false;
        let subLength = 0;
        let start = 0;

        let i = 0;
        while (i < line.length - 1) {
          subLength++;
          if (i === line.length - 2) {
            if (subLinesFound && line[i] !== '*') {
              textLines.push(formatTextLine(line.substr(start), variables, true))
            }
            else if (line[i] === '*') {
              textLines.push(formatTextLine(line.substr(start, subLength), variables, true))
            }
          }
          else if (parsing === false) {
            if (line[i] === '*' && line[i + 1] === '*') {
                textLines.push(formatTextLine(line.substr(start, subLength - 2), variables, true))
                parsing = true;
                start = i;
                i += 2;
                //   This is probably a problem
                subLength = 2;
            }
            else if (line[i] === '[') {
                textLines.push(formatTextLine(line.substr(start, subLength - 3), variables, true));
                parsing = true;
                start = i;
                subLength = i;
            }
          }
          else {
            if (line[i] === '*' && line[i + 1] === '*') {
              textLines.push(formatTextLine(line.substr(start, subLength), variables, true));
              parsing = false;
              start = i + 3;
              subLinesFound = true;
              subLength = 0;
              i += 2;
            }
            else if (line[i] === ')') {
                textLines.push(formatTextLine(line.substr(start, subLength), variables, true));
                parsing = false;
                start = i + 1;
                subLinesFound = true;
                subLength = 0;
                i += 1;
            }
          }
          i++;
        }
        !subLinesFound && textLines.push(formatTextLine(line, variables))
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
                let lastVar = false;
                let key = body.substr(start + 1, j - 1);
                const endIndex = body.substr(i + 3, body.length).split("").findIndex(char => {
                    return (char.charCodeAt(0) === keyCodes["enter"])
                });
                let value = body.substr(i + 3, endIndex);
                if (endIndex === -1) value = body.substr(i + 3, body.length - 1);
                console.log([
                    body.substr(start + 1, j - 1),
                    // body.substr(i + 3, body.substr(i + 3, body.length).split("").findIndex(char => {
                    //     return (char.charCodeAt(0) === keyCodes["enter"])
                    // }))
                    body.substr(i + 3, body.length).split("").findIndex(char => {
                        return (char.charCodeAt(0) === keyCodes["enter"])
                    })
                ]);
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

    console.log(variables);
}