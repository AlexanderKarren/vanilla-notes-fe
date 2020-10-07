import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';

import { LandingComponent } from './components/pages/landing/landing.component';
import { NewNoteComponent } from './components/notes/new-note/new-note.component';
import { SettingsComponent } from './components/pages/settings/settings.component';
import { AboutComponent } from './components/pages/about/about.component';
import { NoteComponent } from './components/notes/note/note.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'notes/new', component: NewNoteComponent },
  { path: 'notes/id/:id', component: NoteComponent},
  { path: 'notes/id/:id/edit', component: NewNoteComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'about', component: AboutComponent }
];

const routerOptions: ExtraOptions = {
  useHash: false,
  anchorScrolling: 'enabled'
}

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
