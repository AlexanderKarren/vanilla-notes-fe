import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsProviderModule } from './icons-provider.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

import { HeaderMenuComponent } from './components/layout/header-menu/header-menu.component';
import { SidebarMenuComponent } from './components/layout/sidebar-menu/sidebar-menu.component';
import { LandingComponent } from './components/pages/landing/landing.component';
import { NewNoteComponent } from './components/notes/new-note/new-note.component';
import { SettingsComponent } from './components/pages/settings/settings.component';
import { AboutComponent } from './components/pages/about/about.component';
import { ToolbarComponent } from './components/notes/toolbar/toolbar.component';
import { SortSearchComponent } from './components/layout/sort-search/sort-search.component';
import { NzInputModule } from 'ng-zorro-antd';
import { NoteComponent } from './components/notes/note/note.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    HeaderMenuComponent,
    SidebarMenuComponent,
    LandingComponent,
    NewNoteComponent,
    SettingsComponent,
    AboutComponent,
    ToolbarComponent,
    SortSearchComponent,
    NoteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    NzButtonModule,
    NzLayoutModule,
    NzMenuModule,
    NzDropDownModule,
    NzInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
