import { Component, OnInit } from '@angular/core';
import Note from 'src/app/models/Note';
import Topic from 'src/app/models/Topic';
import { localSort } from 'src/app/utilities/sortOps';

import { NoteService } from '../../../services/note.service';

interface SortChanges {
  newSort: string;
  newDir: boolean;
}

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit {
  activeTopic: string;
  viewNotes: boolean;
  sortBy: string;
  sortAsc: boolean;
  notes: Note[];
  topics: Topic[];

  constructor(
    private noteService: NoteService
  ) { }

  ngOnInit(): void {
    this.viewNotes = false;
    this.sortBy = "title";
    this.sortAsc = true;
    this.notes = localSort(this.noteService.getNotes(), this.sortBy, this.sortAsc);
    this.topics = localSort(this.noteService.getTopics(), this.sortBy, this.sortAsc);
  }

  changeSort(changes: SortChanges): void {
    this.sortBy = changes.newSort;
    this.sortAsc = changes.newDir;
    this.topics = localSort(this.noteService.getTopics(), this.sortBy, this.sortAsc);
  }

  changeTopic(topic: string) {
    this.activeTopic = topic;
    this.viewNotes = true;
  }

  return() {
    this.viewNotes = false;
  }

}
