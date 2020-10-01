import { Component, OnInit } from '@angular/core';
import Note from 'src/app/models/Note';
import Topic from 'src/app/models/Topic';

import { NoteService } from '../../../services/note.service';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit {
  notes: Note[];
  topics: Topic[];

  constructor(
    private noteService: NoteService
  ) { }

  ngOnInit(): void {
    this.notes = this.noteService.getNotes();
    this.topics = this.noteService.getTopics();
  }

}
