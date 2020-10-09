import { saveAs } from 'file-saver';
import Note from '../models/Note';
import dummyNotes from '../services/dummyNotes';

interface Storage {
    notes: Note[];
    dark_mode: boolean;
    sort: string;
}

export default {
    getNotes,
    getSort,
    updateSort,
    updateNotes,
    toggleDarkMode,
    isDarkMode,
    download
}

// get entire Storage object in vanilla-notes
const get = (): Storage => (
    localStorage.getItem("vanilla-notes") ? 
    <Storage>JSON.parse(localStorage.getItem("vanilla-notes")) : 
    null);

function getNotes(): Note[] | null {
    if (localStorage.getItem("vanilla-notes")) {
        return JSON.parse(localStorage.getItem("vanilla-notes")).notes;
    }
    return null;
}

function getSort(): string {
    return localStorage.getItem("vanilla-notes") ? 
        (<Storage>JSON.parse(localStorage.getItem("vanilla-notes"))).sort
         : null;
}

function updateSort(sort: string): void {
    const userStorage: Storage = get();

    if (userStorage) localStorage.setItem("vanilla-notes", JSON.stringify({
        ...userStorage,
        sort: sort
    }))
    else localStorage.setItem("vanilla-notes", JSON.stringify({
        notes: dummyNotes,
        dark_mode: false,
        sort: sort
    }))
}

function updateNotes(notes: Note[]): void {
    const userStorage: Storage = get();

    if (userStorage) localStorage.setItem("vanilla-notes", JSON.stringify({
        ...userStorage,
        notes: notes
    }))
    else localStorage.setItem("vanilla-notes", JSON.stringify({
        notes: notes,
        dark_mode: false,
        sort: "az"
    }));
}

function isDarkMode(): boolean {
    return localStorage.getItem("vanilla-notes") ? 
        JSON.parse(localStorage.getItem("vanilla-notes")).dark_mode : 
        false
}

function toggleDarkMode(): void {
    const userStorage: Storage = get();

    if (userStorage) localStorage.setItem("vanilla-notes", JSON.stringify({
        notes: userStorage.notes,
        dark_mode: !userStorage.dark_mode
    }));
    else localStorage.setItem("vanilla-notes", JSON.stringify({
        notes: null,
        dark_mode: true
    }));
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