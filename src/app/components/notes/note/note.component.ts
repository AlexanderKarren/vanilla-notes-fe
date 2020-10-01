import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Note from 'src/app/models/Note';
import { NoteService } from 'src/app/services/note.service';

function formatTextLine(line: string): TextLine {
  switch(line[0]) {
    case '#':
      if (line[1] == '#') {
        if (line[2] == '#') {
          return {
            className: 'headingThree',
            text: line.substr(3, line.length - 1),
            bullet: false
          }
        }
        return {
          className: 'headingTwo',
          text: line.substr(2, line.length - 1),
          bullet: false
        }
      }
      return {
        className: 'headingOne',
        text: line.substr(1, line.length - 1),
        bullet: false
      }
    case '*':
      return {
        className: 'default',
        text: line.substr(1, line.length - 1),
        bullet: true
      }
  }
  return {
    className: 'default',
    text: line,
    bullet: false
  }
}

interface TextLine {
  className: string;
  text: string;
  bullet: boolean;
}

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  private sub: any;
  note: Note;
  textLines: TextLine[];

  constructor(
    private route: ActivatedRoute,
    private noteService: NoteService
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      this.note = this.noteService.notes.find(element => element.id === id);
      const lines = this.note.body.replace(/\r\n/g, "\r").replace(/\n/g, "\r").split(/\r/);
      this.textLines = lines.map(line => {
        return formatTextLine(line);
      })
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
