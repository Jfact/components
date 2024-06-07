import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { databaseConfigProvider } from './app/services/database.service';
import { errorsHandlerProvider } from './app/services/errors-handler.service';

bootstrapApplication(AppComponent, {
		providers: [
				provideHttpClient(),
				provideRouter([]),
				databaseConfigProvider,
				errorsHandlerProvider
		],
})
		.catch((err) => console.error(err));
