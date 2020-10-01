import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sort-search',
  templateUrl: './sort-search.component.html',
  styleUrls: ['./sort-search.component.scss']
})
export class SortSearchComponent implements OnInit {
  @Input() sortBy: string;
  @Input() sortAsc: boolean;

  @Output() sortChange = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  changeSort(newSort: string, newDir: boolean) {
    this.sortBy = newSort;
    this.sortAsc = newDir;
    console.log((this.sortBy === 'title') && !this.sortAsc);
    this.sortChange.emit({
      newSort: newSort,
      newDir: newDir
    })
  }

}
