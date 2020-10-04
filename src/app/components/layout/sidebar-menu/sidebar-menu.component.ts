import { Component, OnInit } from '@angular/core';
import Note from 'src/app/models/Note';
import Topic from 'src/app/models/Topic';
import { localSort, getDates } from 'src/app/utilities/sortOps';
import * as dayjs from 'dayjs';

import { NoteService } from '../../../services/note.service';

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
    this.dateDisplay = false;
    this.viewAll = true;
    this.viewNotes = false;
    this.sortBy = "title";
    this.sortAsc = true;
    this.notes = localSort(this.noteService.getNotes(), this.sortBy, this.sortAsc);
    this.topics = localSort(this.noteService.getTopics(), this.sortBy, this.sortAsc);
  }

  getNotesFromDate(date: string): Note[] {
    return this.datesMap.get(date);
  }

  changeSort(changes: SortChanges): void {
    this.sortBy = changes.newSort;
    this.sortAsc = changes.newDir;
    this.notes = localSort(this.noteService.getNotes(), this.sortBy, this.sortAsc);
    this.dateDisplay = false;
  }

  changeTopic(topic: string) {
    this.activeTopic = topic;
    if (this.activeTopic === 'All Notes') this.viewAll = true;
    else this.viewAll = false;
    this.viewNotes = true;
    if (this.dateDisplay) this.toggleDateDisplay();
  }

  toggleDateDisplay() {
    let notes = localSort(this.noteService.getNotes(), 'title', true);
    if (this.activeTopic) notes = notes.filter(note => (note.topic !== this.activeTopic));
    this.datesMap = getDates(notes);
    this.dates = Array.from(this.datesMap.keys()).map(date => {
      const now = dayjs().format("MMMM D, YYYY");
      const dateCreated = dayjs(date).format("MMMM D, YYYY");
      return {
        formatted: dateCreated === now ? "Today" : dateCreated,
        iso: date
      }
    });
    this.dateDisplay = true;
  }

  return() {
    this.viewNotes = false;
  }

}
