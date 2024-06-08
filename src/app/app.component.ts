// app.component.ts

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InputComponent } from './components/input.component';
import { FormFieldComponent } from './components/form-field.component';
import { OutputComponent } from './components/output.component';
import { UserModel } from './models/user.model';
import { PreferencesModel } from './models/preferences.model';
import { SecurityModel } from './models/security.model';
import { SocialsModel } from './models/socials.model';
import { DatabaseService } from './services/database.service';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InputComponent, FormFieldComponent, OutputComponent],
  template: `
    <app-form-field label="Name" error="Error occurred">
      <app-input/>
    </app-form-field>

    <router-outlet/>
  `,
  styles: [],
})
export class AppComponent {
  title = 'components-v1';
  constructor(
      private notificationService: NotificationService,
      private userDatabaseService: DatabaseService<UserModel, 'user'>,
      private usersDatabaseService: DatabaseService<Array<UserModel>, 'user'>,
      private preferencesDatabaseService: DatabaseService<PreferencesModel, 'preferences'>,
      private securityDatabaseService: DatabaseService<SecurityModel, 'security'>,
      private socialsDatabaseService: DatabaseService<SocialsModel, 'user'>,
  ) {
    // Log each instance of ApiService for different controllers
    console.log({userDatabaseService});
    console.log({usersDatabaseService});
    console.log({preferencesDatabaseService});
    console.log({securityDatabaseService});
    console.log({socialsDatabaseService});
    userDatabaseService.request('GET', 'user').subscribe();
  }
}
