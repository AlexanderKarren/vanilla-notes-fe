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
    localStorage.setItem("vanilla-notes", JSON.stringify(notes))
}

function download(name: string, content: string) {
    let filename = name.toLowerCase().replace(" ", "_");
    let extension = null;
    for (let i = 0; i < name.length; i++) {
        if (name[i] === '.') {
            let potentialExtension = name.substr(i, name.length - 1);
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