import Heading from '../models/Heading'
import TextLine from '../models/TextLine'
import { romanize, deromanize } from './romanize';

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

function getHeadingNum(headings: Heading[], curClass: string):string {
    let i = headings.length - 1;
    switch(curClass) {
        default:
            return "0";
        case 'headingTwo':
            while (i > 0) {
                if (headings[i].className === 'headingTwo') {
                    return String(parseInt(headings[i].num) + 1);
                }
                i--;
            }
            return "1"
        case 'headingThree':
            while (i > 0) {
                if (headings[i].className === 'headingThree') {
                    const prevNum = deromanize(headings[i].num)
                    return romanize(prevNum + 1);
                }
                i--;
            }
            return romanize(1)
    }
}

export default function formatTextLine(line: string, variables: any, headings: Heading[], inline: boolean = false): TextLine {
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
                    headings.push({
                        name: line.substr(4, line.length - 1),
                        className: 'headingThree',
                        num: getHeadingNum(headings, "headingThree")
                    })
                    return {
                        className: 'headingThree',
                        link: false,
                        image: false,
                        text: line.substr(4, line.length - 1),
                        bullet: false,
                        inline: inline
                    }
                }
                headings.push({
                    name: line.substr(3, line.length - 1),
                    className: 'headingTwo',
                    num: getHeadingNum(headings, "headingTwo")
                })
                return {
                    className: 'headingTwo',
                    link: false,
                    image: false,
                    text: line.substr(3, line.length - 1),
                    bullet: false,
                    inline: inline
                }
            }
            headings.push({
                name: line.substr(2, line.length - 1),
                className: 'headingOne',
                num: getHeadingNum(headings, "headingOne")
            })
            return {
                className: 'headingOne',
                link: false,
                image: false,
                text: line.substr(2, line.length - 1),
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
            // Checkbox
            else if (line[2] === '[' && line[4] === ']') {
                // if checked,
                if (line[3] === 'x') return {
                    className: 'default checkbox checked',
                    link: false,
                    image: false,
                    text: line.substr(6, line.length - 1),
                    bullet: true,
                    inline: inline
                }
                return {
                    className: 'default checkbox',
                    link: false,
                    image: false,
                    text: line.substr(6, line.length - 1),
                    bullet: true,
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
                    className: linkElements[1].substr(0, linkElements[1].length - 2) || "#",
                    link: true,
                    image: false,
                    text: linkElements[0].substr(0, linkElements[0].length - 1) + lastChar,
                    bullet: false,
                    inline: inline
                }
            }
            // Link with variable
            else if (line[line.length - 2] === ']' && line[line.length - 1] === '.') {
                const lastChar = line[line.length - 1];
                return {
                    className: variables[linkElements[1].substr(0, linkElements[1].length - 2)] || "#",
                    link: true,
                    image: false,
                    text: linkElements[0].substr(0, linkElements[0].length - 1) + lastChar,
                    bullet: false,
                    inline: inline
                }
            }
            else if (line[line.length - 1] === ']') {
                return {
                    className: variables[linkElements[1].substr(0, linkElements[1].length - 1)] || "#",
                    link: true,
                    image: false,
                    text: linkElements[0].substr(0, linkElements[0].length - 1),
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