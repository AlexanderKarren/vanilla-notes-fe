import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-note-listing',
  templateUrl: './note-listing.component.html',
  styleUrls: ['./note-listing.component.scss']
})
export class NoteListingComponent implements OnInit {
  open: boolean;
  @Input() id: string;
  @Input() title: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    const initialUrl = this.router.url;
    this.open = !!(initialUrl === `/notes/id/${this.id}`)

    // this needs to be moved out of this component
    this.router.events.subscribe(router => {
      this.open = false;
      const { url } = <any>router;
      if (url) this.open = url.includes(`/notes/id/${this.id}`);
    })
  }

}
