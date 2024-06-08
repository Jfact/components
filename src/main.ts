import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { databaseConfigProvider } from './app/services/database.service';
import { errorsAndLoggingInterceptorProvider } from './app/interceptors/errors-and-logging.interceptor';

bootstrapApplication(AppComponent, {
		providers: [
				provideHttpClient(),
				provideRouter([]),
				databaseConfigProvider,
				errorsAndLoggingInterceptorProvider
		],
})
		.catch((err) => console.error(err));
