import Note from '../models/Note';

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

export const getDates = (notes: Note[], map: Map<string, Note[]>):void => {
    notes.forEach(note => {
      const date = note.date_created ? note.date_created : "Undated"
      if (map.get(date)) map.get(date).push(note)
      else map.set(date, [note]);
    });
  }