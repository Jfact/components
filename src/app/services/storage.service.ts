import { Injectable } from '@angular/core';
// Potential Issues and Considerations:
//
// 1. Storage Quota Exceeded:
//    - When local storage is full, attempting to save more data will throw a `QuotaExceededError`.
//      The try-catch blocks handle this by logging an error, but consider implementing a more user-friendly response
//      or a cleanup strategy for old data.
// 2. JSON Serialization/Deserialization:
//    - Errors in JSON parsing or stringifying (e.g., circular references or non-serializable objects) are caught,
//      but the error handling currently just logs the error. Depending on the application, you might want to provide
//      more specific feedback or fallbacks.
// 3. Browser Compatibility:
//    - While most modern browsers support local storage, there might be differences in behavior or storage limits.
//      Testing on different browsers and environments is recommended.
// 4. Security:
//    - Local storage is accessible via JavaScript and can be vulnerable to XSS attacks.
//      Never store sensitive information (like passwords or personal data) in local storage.
// 5. Concurrency:
//    - If multiple tabs of the same application are open, they can interfere with each other's local storage operations.
//      This could lead to data inconsistencies. Consider using events or other mechanisms to sync data between tabs
//      if necessary.
// 6. Storage Limits:
//    - Local storage usually has a limit of 5-10 MB depending on the browser. This limit can be quickly reached if large
//      amounts of data are stored, causing `QuotaExceededError`.
//
// Please review and address these potential issues as needed.

/**
 * Service to interact with the browser's local storage.
 */
@Injectable({
		providedIn: 'root'
})
export class LocalStorageService {
		constructor() { }

		/**
		 * Set a value in local storage.
		 * @param key The key under which the value is stored.
		 * @param value The value to store.
		 */
		setItem(key: string, value: any): void {
				try {
						localStorage.setItem(key, JSON.stringify(value));
				} catch (error) {
						console.error('Error saving to local storage', error);
				}
		}

		/**
		 * Get a value from local storage.
		 * @param key The key of the value to retrieve.
		 * @returns The value from local storage or null if not found.
		 */
		getItem<T>(key: string): T | null {
				try {
						const item = localStorage.getItem(key);
						return item ? JSON.parse(item) as T : null;
				} catch (error) {
						console.error('Error getting data from local storage', error);
						return null;
				}
		}

		/**
		 * Remove a value from local storage.
		 * @param key The key of the value to remove.
		 */
		removeItem(key: string): void {
				try {
						localStorage.removeItem(key);
				} catch (error) {
						console.error('Error removing data from local storage', error);
				}
		}

		/**
		 * Clear all local storage items.
		 */
		clear(): void {
				try {
						localStorage.clear();
				} catch (error) {
						console.error('Error clearing local storage', error);
				}
		}
}
