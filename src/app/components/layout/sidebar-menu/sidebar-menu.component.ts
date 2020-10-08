import { Component, OnInit } from '@angular/core';
import Note from 'src/app/models/Note';
import Topic from 'src/app/models/Topic';
import { localSort, getDates } from 'src/app/utilities/sortOps';
import * as dayjs from 'dayjs';

import { NoteService } from '../../../services/note.service';
import storage from 'src/app/utilities/storage';

interface SortChanges {
  newSort: string;
  newDir: boolean;
}

interface Date {
  formatted: string;
  iso: string;
}

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit {
  viewAll: boolean;
  activeTopic: string;
  viewNotes: boolean;
  sortBy: string;
  sortAsc: boolean;
  notes: Note[];
  datesMap: Map<string, Note[]>;
  dates: Date[];
  dateDisplay: boolean;
  topics: Topic[];

  constructor(
    private noteService: NoteService
  ) { }

  ngOnInit(): void {
    this.datesMap = new Map();
    this.dates = [];
    this.dateDisplay = storage.getSort() === 'date' ? true : false;
    this.viewAll = true;
    this.viewNotes = false;
    this.sortBy = "title";
    this.sortAsc = storage.getSort() === 'za' ? false : true;
    this.topics = this.noteService.getTopics();
    this.notes = localSort(this.noteService.getNotes(), this.sortBy, this.sortAsc);
    this.noteService.notesUpdated.subscribe(() => {
      this.notes = localSort(this.noteService.getNotes(), this.sortBy, this.sortAsc)
      this.topics = this.noteService.getTopics();
      if (this.dateDisplay) this.toggleDateDisplay();
    });
  }

  getNotesFromDate(date: string): Note[] {
    return this.datesMap.get(dayjs(date).format("MMMM D, YYYY"));
  }

  changeSort(changes: SortChanges): void {
    this.sortBy = changes.newSort;
    this.sortAsc = changes.newDir;
    this.notes = localSort(this.noteService.getNotes(), this.sortBy, this.sortAsc);
    this.dateDisplay = false;
    storage.updateSort(changes.newDir ? 'az' : 'za')
  }

  changeTopic(topic: string) {
    this.activeTopic = topic;
    
    if (this.activeTopic === 'All Notes') this.viewAll = true;
    else this.viewAll = false;

    this.viewNotes = true;

    if (this.dateDisplay) this.toggleDateDisplay();
  }

  toggleDateDisplay() {
    let notes = this.noteService.getNotes();
    if (this.activeTopic && this.activeTopic !== "All Notes") notes = notes.filter(note => (note.topic === this.activeTopic));
    notes = localSort(notes, 'title', true);
    this.datesMap = getDates(notes);

    const datesMapKeys = Array.from(this.datesMap.keys());
    // sorts dates
    datesMapKeys.sort();
    this.dates = datesMapKeys.map(date => {
      const now = dayjs().format("MMMM D, YYYY");
      const dateCreated = dayjs(date).format("MMMM D, YYYY");
      return {
        formatted: (dateCreated === now) ? "Today" : dateCreated,
        iso: date
      }
    });

    this.dateDisplay = true;
    storage.updateSort('date');
  }

  return() {
    this.viewNotes = false;
  }

}
