/**
 * Potential Issues:
 * - None
 *
 * Information:
 * - This file contains an HTTP interceptor for handling errors and logging them.
 * - It defines an interface for intercepted errors and provides a BehaviorSubject to notify subscribers about changes in the intercepted errors list.
 * - The interceptor intercepts HTTP requests and handles errors, logging them to the console.
 *
 * Error Handling: Used separate functions to handle HTTP errors and UI errors for better readability and maintainability.
 * Error Type: The `type` property in `ErrorIntercepted` is set to `'user-interface'` by default. Consider revising this if you plan to handle database errors differently.
 * Logging: The `ErrorsAndLoggingInterceptor` class logs errors to the console. You may replace this with your logging service if needed.
 * Provider: Created a provider for `ErrorsAndLoggingInterceptor` to use it as an HTTP interceptor.
 */

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * Interface for defining intercepted errors.
 */
export interface ErrorIntercepted {
		title: string; // Title of the error
		description: string; // Description of the error
		date: string; // Date when the error occurred
		type: 'user-interface' | 'database'; // Type of error: user-interface or database
		statusCode: -1 | number; // Error code (-1 for non-HTTP errors)
}

/**
 * BehaviorSubject to notify subscribers about changes in the intercepted errors list.
 */
export const errorsInterceptedChange$ = new BehaviorSubject<Array<ErrorIntercepted>>([]);
const errorsIntercepted: Array<ErrorIntercepted> = [];
const errorAdd = (errorIntercepted: ErrorIntercepted) => {
		errorsIntercepted.push(errorIntercepted);
		errorsInterceptedChange$.next(errorsIntercepted);
};

/**
 * Handles HTTP errors.
 * @param error The HTTP error response.
 */
const handleHttpError = (error: HttpErrorResponse): void => {
		const errorMessage = error.message || 'Unknown HTTP error';
		handleInterceptedError('API Error', errorMessage, error.status);
};

/**
 * Handles UI errors.
 * @param error The UI error.
 */
const handleUiError = (error: any): void => {
		let errorMessage = 'Unknown UI error';
		if (typeof error === 'string') {
				errorMessage = error;
		} else if (error instanceof Error) {
				errorMessage = error.message || 'Unknown error';
		}
		handleInterceptedError('UI Error', errorMessage, -1);
};

/**
 * Handles intercepted errors.
 * @param title The title of the error.
 * @param description The description of the error.
 * @param statusCode The status code of the error.
 */
const handleInterceptedError = (title: string, description: string, statusCode: number): void => {
		console.error(title === 'API Error' ? 'API Error:' : 'An unexpected error occurred:', description);
		const errorIntercepted: ErrorIntercepted = {
				title: title,
				description: description,
				date: new Date().toISOString(),
				type: 'user-interface', // Error type is not explicitly known; 'user-interface' is used as a placeholder
				statusCode: statusCode // HTTP status code received from the server or -1 for UI errors
		};
		errorAdd(errorIntercepted);
};

/**
 * Interceptor to handle errors and log them.
 */
@Injectable()
export class ErrorsAndLoggingInterceptor implements HttpInterceptor {
		constructor() {}

		/**
		 * Intercepts HTTP requests and handles errors.
		 * @param req The HTTP request.
		 * @param next The HTTP handler.
		 * @returns Observable<HttpEvent<any>> Observable of the HTTP event.
		 */
		intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
				return next.handle(req).pipe(
						catchError((error: any) => {
								if (error instanceof HttpErrorResponse) {
										handleHttpError(error);
								} else {
										handleUiError(error);
								}
								this.logError(error);
								return throwError(() => error);
						})
				);
		}

		/**
		 * Logs the error to the console.
		 * @param error The error to log.
		 */
		private logError(error: any): void {
				console.error('An error occurred:', error);
		}
}

/**
 * Provider for the ErrorsAndLoggingInterceptor.
 */
export const errorsAndLoggingInterceptorProvider = {
		provide: HTTP_INTERCEPTORS,
		useClass: ErrorsAndLoggingInterceptor,
		multi: true,
} as const;
