import { Injectable } from '@angular/core';
import Note from '../models/Note';
import Topic from '../models/Topic';
import storage from '../utilities/storage';
import dummyNotes from './dummy-notes';

// Get topics for client-stored tasks
function assignTopics(localNotes: Note[]): Topic[] {
  const allNotes = {
    id: 0,
    title: "All Notes"
  }

  let topicHash = {};

  localNotes.forEach((note, index) => {
    // console.log(note);
    const topic = note.topic;
    // console.log(topicHash[topic]);
    if (!topicHash[topic]) Object.assign(topicHash, {[topic]: {
      id: index + 1,
      title: topic
    }});
  })

  // console.log(topicHash);

  return <Topic[]>[allNotes, ...Object.values(topicHash)];
}

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  notes: Note[];
  topics: Topic[];

  constructor() {
    this.notes = storage.get() || dummyNotes;
    this.topics = assignTopics(this.notes);
  }

  getNote(id: string): Note {
    return this.notes.find(element => element.id === id)
  }

  editNote(id: string, newNote: any): void {
    this.notes = this.notes.map(note => {
      if (note.id === id) {
        return {
          ...note,
          ...newNote
        };
      }
      return note;
    })
    storage.update(this.notes);
  }

  getNotes(): Note[] {
    return this.notes;
  }

  getTopics(): Topic[] {
    return this.topics;
  }

  addLocalNote(note: Note): void {
    // console.log(new Date());
    // console.log(format(new Date(), null, null))
    this.addLocalTopic(note);
    this.notes.push(note);
    storage.update(this.notes);
  }

  // addLocalTopic will only add a topic if it doesn't already exist
  addLocalTopic(note: Note): void {
    if (!this.notes.find(element => element.topic === note.topic)) this.topics.push({
      id: this.topics.length,
      title: note.topic
    })
  }

  deleteLocalNote(note: Note) {
    this.notes = this.notes.filter(element => (element.id !== note.id))
    storage.update(this.notes);
  }

}
