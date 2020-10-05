import { saveAs } from 'file-saver';
import Note from '../models/Note';

export default {
    get,
    update,
    download
}

function get(): Note[] {
    if (localStorage.getItem("vanilla-notes")) {
        return JSON.parse(localStorage.getItem("vanilla-notes"));
    }
    return null;
}

function update(notes: Note[]) {
    localStorage.setItem("vanilla-notes", JSON.stringify(notes));
}

// possibly dangerous function?
function download(title: string, content: string) {
    let filename = title.toLowerCase().replace(" ", "_");
    let extension = null;
    for (let i = 0; i < title.length; i++) {
        if (title[i] === '.') {
            let potentialExtension = title.substr(i, title.length - 1);
            // if it looks like a legitimate extension, assign it.
            if (potentialExtension.length < 6) {
                extension = potentialExtension;
                filename = filename.substr(0, i);
            }
        }
    }
    // if no extension is specified in the title, txt will be used.
    const blob = new Blob([content], {type: "text/plain;charset=utf-8"});
    saveAs(blob, filename + (extension || ".txt"));
}