import { Injectable, InjectionToken, Inject } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { appDatabaseConfig } from '../app.database';

// Define the API configuration interface
export interface DatabaseConfig {
		url: string;
}

// Define the injection token for API configuration
export const databaseConfigInjectionToken
		= new InjectionToken<DatabaseConfig>('database.config');

export const databaseConfigProvider =
		{ provide: databaseConfigInjectionToken, useValue: appDatabaseConfig }

@Injectable({
		providedIn: 'root'
})
export class DatabaseService<TModel, TController extends string> {
		constructor(
				@Inject(databaseConfigInjectionToken)
				private config: DatabaseConfig,
				private httpClient: HttpClient
		) {}

		/**
		 * Make an HTTP request to the API.
		 * @param method The HTTP method (GET, POST, PUT, DELETE).
		 * @param controller The API controller name.
		 * @param params The request parameters.
		 * @param headers The request headers.
		 * @returns An observable of the HTTP response event.
		 */
		request(
				method: 'GET' | 'POST' | 'PUT' | 'DELETE',
				controller: TController,
				params?: { [param: string]: string | number | boolean },
				headers?: { [header: string]: string | number | boolean }
		): Observable<HttpEvent<TModel>> { // Change return type to Observable<HttpEvent<TModel>>
				// Validate method
				if (!['GET', 'POST', 'PUT', 'DELETE'].includes(method)) {
						throw new Error('Invalid method. Method must be one of GET, POST, PUT, DELETE.');
				}

				// Validate controller
				if (!controller) {
						throw new Error('Controller is required.');
				}

				const url = `${this.config.url}/${String(controller)}`; // Ensure controller is treated as string
				let requestOptions: any = {}; // Initialize request options object

				// Add parameters to the request if provided
				if (params) {
						let httpParams = new HttpParams();
						Object.keys(params).forEach(key => {
								httpParams = httpParams.append(key, String(params[key]));
						});
						requestOptions.params = httpParams;
				}

				// Add headers to the request if provided
				if (headers) {
						let httpHeaders = new HttpHeaders();
						Object.keys(headers).forEach(key => {
								httpHeaders = httpHeaders.append(key, String(headers[key]));
						});
						requestOptions.headers = httpHeaders;
				}

				return this.httpClient.request<TModel>(method, url, requestOptions);
		}
}
