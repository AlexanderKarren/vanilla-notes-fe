import TextLine from '../models/TextLine';

function parseImage(line: string) {
    let imageElements = [];
    let i = 0;
    let start = 0;
    let subLength = 0;

    while (i < line.length) {
        if ((line[i] === '[') || (line[i] === '(')) {
            start = i + 1;
        }
        else if ((line[i] === ']') || (line[i] === ')')) {
            imageElements.push(line.substr(start, subLength - 2))
            subLength = 0;
        }
        i++;
        subLength++;
    }

    return imageElements;
}

function formatTextLine(line: string, inline: boolean = false): TextLine {
    // console.log(line);
    switch(line[0]) {
        // backtick case not working for multi-line yet
        case '`':
            for (let i = 2; i < line.length; i++) {
                if (line[i] === '`') {
                    // console.log(line.substr(1, i));
                    return {
                        className: 'codeBlock',
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
                    image: false,
                    text: line.substr(3, line.length - 1),
                    bullet: false,
                    inline: inline
                    }
                }
                return {
                    className: 'headingTwo',
                    image: false,
                    text: line.substr(2, line.length - 1),
                    bullet: false,
                    inline: inline
                }
            }
            return {
                className: 'headingOne',
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
                        image: false,
                        text: null,
                        bullet: false,
                        inline: inline
                    }
                }
                return {
                    className: 'bold',
                    image: false,
                    text: line.substr(2, line.length - 1),
                    bullet: false,
                    inline: inline
                }
            }
            return {
            className: 'default',
            image: false,
            text: line.substr(1, line.length - 1),
            bullet: true,
            inline: inline
            }
        case '!':
            if (line[line.length - 1] === ')') {
                const imageElements = parseImage(line);
                return {
                    className: imageElements[1],
                    image: true,
                    text: imageElements[0],
                    bullet: false,
                    inline: inline
                }
            }
        case 'c':
            if (line[1] === '[' && line[line.length - 1] === ']') {
                return {
                    className: "centerAlign",
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
                    image: false,
                    text: line.substr(2, line.length - 3),
                    bullet: false,
                    inline: inline
                }
            }
    }
    return {
      className: 'default',
      image: false,
      text: line,
      bullet: false,
      inline: inline
    }
  }

export default function splitLine(textLines: TextLine[], line: string) {
    let subLinesFound = false;
        let parsing = false;
        let subLength = 0;
        let start = 0;

        let i = 0;
        while (i < line.length - 1) {
          subLength++;
          if (i === line.length - 2) {
            if (subLinesFound && line[i] !== '*') {
              textLines.push(formatTextLine(line.substr(start), true))
            }
            else if (line[i] === '*') {
              textLines.push(formatTextLine(line.substr(start, subLength), true))
            }
          }
          else if (parsing === false) {
            if (line[i] === '*' && line[i + 1] === '*') {
              textLines.push(formatTextLine(line.substr(start, subLength - 2), true))
              parsing = true;
              start = i;
              i += 2;
              subLength = 2;
            }
          }
          else {
            if (line[i] === '*' && line[i + 1] === '*') {
              textLines.push(formatTextLine(line.substr(start, subLength), true))
              parsing = false;
              start = i + 3;
              subLinesFound = true;
              subLength = 0;
              i += 2;
            }
          }
          i++;
        }
        !subLinesFound && textLines.push(formatTextLine(line))
}