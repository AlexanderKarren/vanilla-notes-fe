import Note from '../models/Note';

export default {
    get,
    update
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