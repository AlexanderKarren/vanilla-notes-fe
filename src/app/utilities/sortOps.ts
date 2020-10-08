import Note from '../models/Note';
import * as dayjs from 'dayjs'

export const localSort = (list: any[], sortBy:string, ascending: boolean = true) => {
    return list.sort((a, b) => {
        if (a[sortBy] < b[sortBy]) {
            return ascending ? -1 : 1;
        }
        if (a[sortBy] > b[sortBy]) {
            return ascending ? 1 : -1;
        }
        return 0;
    })
}

export const getDates = (notes: Note[]):Map<string, Note[]> => {
    const map = new Map();
    notes.forEach(note => {
        const date = note.date_created ? dayjs(note.date_created).format("MMMM D, YYYY") : "Undated";
        if (map.get(date)) map.get(date).push(note);
        else map.set(date, [note]);
    });

    return map;
  }