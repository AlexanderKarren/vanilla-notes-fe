import { Component, OnInit } from '@angular/core';

const settingsExecutions = {
  "clear-local-storage": () => localStorage.clear()
}

const alerts = {
  "clear-local-storage": {
    message: "Clearing local storage cannot be undone.",
    description: "If your notes have not been synced with cloud storage and you have not backed them up in some way, clearing local storage will remove them for good."
  }
}

interface Alert {
  message: string;
  description: string;
}

interface Setting {
  name: string;
  execution: () => void;
  warning: Alert | null;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  confirm: Setting | null;

  constructor() { }

  isLocalStorageEmpty = (): boolean => Boolean(localStorage.getItem("vanilla-notes"));

  ngOnInit(): void {
    this.confirm = null;
  }

  setConfirm = (setting: string = null, warning: boolean = false) => (this.confirm = setting ? {
    name: setting,
    execution: settingsExecutions[setting],
    warning: warning ? alerts[setting] : null
  } : null);

  execute() {
    (this.confirm.execution());
    this.setConfirm(null);
  };

}
