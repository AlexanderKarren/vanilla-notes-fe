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
    const blob = new Blob([content], {type: "text/plain;charset=utf-8"});
    const filename = name.toLowerCase().replace(" ", "_");
    saveAs(blob, `${filename}.txt`);
}