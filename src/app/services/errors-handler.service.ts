import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

/**
 * Interface for defining handled errors.
 */
export interface ErrorHandled {
		title: string; // Title of the error
		description: string; // Description of the error
		date: string; // Date when the error occurred
		type: 'user-interface' | 'database'; // Type of error: user-interface or database
		statusCode: -1 | number; // Error code (-1 for non-HTTP errors)
}

@Injectable({
		providedIn: 'root'
})
export class ErrorsHandlerService implements ErrorHandler {
		readonly errorsHandled: ErrorHandled[] = []; // Array to store handled errors
		readonly errorRaised: BehaviorSubject<ErrorHandled[]> = new BehaviorSubject(this.errorsHandled); // BehaviorSubject for observing handled errors

		/**
		 * Handles errors and adds them to the errorsHandled array.
		 * @param error The error to be handled
		 */
		handleError(error: any): void {
				console.log({error});
				if (error instanceof HttpErrorResponse) {
						// Handle HTTP errors
						this.handleHttpError(error);
				} else {
						// Handle other types of errors
						this.handleUiError(error);
				}
		}

		/**
		 * Handles HTTP errors and adds them to the errorsHandled array.
		 * @param httpErrorResponse The HTTP error to be handled
		 */
		private handleHttpError(httpErrorResponse: HttpErrorResponse): void {
				console.error('API Error:', httpErrorResponse);
				// Extract the date from the error's timestamp
				const errorDate = new Date(httpErrorResponse.error?.timeStamp ?? '');
				// Add the error to the errorsHandled array
				const errorHandled: ErrorHandled = {
						title: 'HTTP Error',
						description: httpErrorResponse.message,
						date: errorDate.toISOString(), // Convert the date to ISO string format
						type: 'user-interface', // Assuming it's a user-interface error for HTTP errors
						statusCode: httpErrorResponse.status // Using the HTTP status code as the error code
				};
				this.raiseError(errorHandled);
		}

		/**
		 * Handles UI errors and adds them to the errorsHandled array.
		 * @param error The UI error to be handled
		 */
		private handleUiError(error: any): void {
				console.error('An unexpected error occurred:', error);

				// Add the error to the errorsHandled array
				const errorHandled: ErrorHandled = {
						title: 'UI Error',
						description: error.message,
						date: new Date().toISOString(),
						type: 'user-interface', // Assuming it's a user-interface error
						statusCode: -1 // Assuming -1 for UI errors
				};
				this.raiseError(errorHandled);
		}

		/**
		 * Adds an error to the errorsHandled array and notifies observers.
		 * @param errorHandled The error object to be added
		 */
		raiseError(errorHandled: ErrorHandled): void {
				this.errorsHandled.push(errorHandled);
				// Notify observers about the new error
				this.errorRaised.next(this.errorsHandled);
		}
}

/**
 * Provider for the ErrorsHandlerService.
 */
export const errorsHandlerProvider = {
		provide: ErrorHandler,
		useClass: ErrorsHandlerService
};
