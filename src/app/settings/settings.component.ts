import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DocumentService } from '../document.service';
import { Settings, SettingsProviderService } from '../settings-provider.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  settings: Settings
  form: FormGroup;

  constructor(private fb: FormBuilder, private service: DocumentService,
    private settingsService: SettingsProviderService, private http: HttpClient) {
    this.settings = Object.assign({}, this.settingsService.getSettings());
  }

  ngOnInit() {
    this.form = this.fb.group({
      url: [this.settings.url],
      user: [this.settings.user],
      password: [this.settings.password]
    });
  }

  save = () => {
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", 
      "Basic " + window.btoa(this.form.value.user + ":" + this.form.value.password));
    this.http.get(this.form.value.url + "/api/", {headers: headers}).subscribe(
      response => {
        this.settingsService.changeSettings({url: this.form.value.url, user: this.form.value.user, pass: this.form.value.password});
      },
      error => {
        if (error.status) {
          if (error.status === 403) {
            this.form.get('user').setErrors({'wrong credentials': 'wrong credentials'});
            this.form.get('password').setErrors({'wrong credentials': 'wrong credentials'});
          }
          if (error.status === 404) {
            this.form.get('url').setErrors({'wrong url': 'wrong url'});
          }
        } else {
          this.form.get('url').setErrors({'unreachable': 'unreachable'});
        }
      }
    );
  }
}
