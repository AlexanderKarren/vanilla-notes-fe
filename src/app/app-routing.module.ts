import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingComponent } from './components/pages/landing/landing.component';
import { NewNoteComponent } from './components/notes/new-note/new-note.component';
import { SettingsComponent } from './components/pages/settings/settings.component';
import { AboutComponent } from './components/pages/about/about.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'notes/new', component: NewNoteComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'about', component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
