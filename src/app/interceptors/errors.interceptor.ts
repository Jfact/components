import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandled } from '../services/errors-handler.service';

export const errorsInterceptedChange$ =
		new BehaviorSubject<Array<ErrorHandled>>([])
const errorsIntercepted: Array<ErrorHandled> = [];
const errorAdd = (errorIntercepted: ErrorIntercepted) => {
		errorsIntercepted.push(errorIntercepted);
		errorsInterceptedChange$.next(errorsIntercepted);
};

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

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {
		// private readonly errorsIntercepted: ErrorIntercepted[] = [];

		intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
				return next.handle(req).pipe(
						catchError((error: any) => {
								if (error instanceof HttpErrorResponse) {
										this.handleHttpError(error);
								} else {
										this.handleUiError(error);
								}
								return throwError(() => error);
						})
				);
		}

		private handleHttpError(error: HttpErrorResponse): void {
				const errorMessage = error.message || 'Unknown HTTP error';
				this.handleInterceptedError('API Error', errorMessage, error.status);
		}

		private handleUiError(error: any): void {
				let errorMessage = 'Unknown UI error';
				if (typeof error === 'string') {
						errorMessage = error;
				} else if (error instanceof Error) {
						errorMessage = error.message || 'Unknown error';
				}
				this.handleInterceptedError('UI Error', errorMessage, -1);
		}

		private handleInterceptedError(title: string, description: string, statusCode: number): void {
				console.error(title === 'API Error' ? 'API Error:' : 'An unexpected error occurred:', description);
				const errorIntercepted: ErrorIntercepted = {
						title: title,
						description: description,
						date: new Date().toISOString(),
						type: 'user-interface', // Error type is not explicitly known; 'user-interface' is used as a placeholder
						statusCode: statusCode // HTTP status code received from the server or -1 for UI errors
				};
				errorAdd(errorIntercepted);
		}

		// private addError(errorIntercepted: ErrorIntercepted): void {
		// 		errorsIntercepted.push(errorIntercepted);
		// 		errorsInterceptedChange$.next(errorsIntercepted);
		// }
}
