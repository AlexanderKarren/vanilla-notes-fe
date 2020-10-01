import { Injectable } from '@angular/core';
import Note from '../models/Note';
import Topic from '../models/Topic';
import dummyNotes from './dummy-notes';

// Get topics for client-stored tasks
function assignTopics(localNotes: Note[]): Topic[] {
  const allNotes = {
    id: 0,
    title: "All Notes"
  }

  let topicHash = {};

  localNotes.forEach((note, index) => {
    console.log(note);
    const topic = note.topic
    console.log(topicHash[topic])
    if (!topicHash[topic]) Object.assign(topicHash, {[topic]: {
      id: index + 1,
      title: topic
    }})
  })

  console.log(topicHash);

  return <Topic[]>[allNotes, ...Object.values(topicHash)]
}

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  notes: Note[] = dummyNotes;
  topics: Topic[];

  constructor() {
    this.topics = assignTopics(this.notes);
  }

  getNotes() {
    return this.notes;
  }

  getTopics() {
    return this.topics;
  }

  addLocalNote(note: Note) {
    this.notes.push(note);
    this.topics = assignTopics(this.notes);
  }

}
