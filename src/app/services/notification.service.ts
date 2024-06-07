import { Injectable } from '@angular/core';

type NotificationType = 'success' | 'error' | 'warning' | 'info';

// Define the interface for HTTP errors
interface HttpError {
		title: string;
		description: string;
		comment: string;
		potentialSolution: string;
}

// Define the type for the HTTP errors object
interface HttpErrors {
		[statusCode: number]: HttpError;
}

@Injectable({
		providedIn: 'root'
})
export class NotificationService {
		private httpErrors: HttpErrors = {
				0: {
						title: 'Network Error',
						description: 'The request did not complete. The client was unable to connect to the server.',
						comment: 'Possible causes include being offline, a blocked request, or a timeout.',
						potentialSolution: 'Check your internet connection and try again.'
				},
				// 1XX — Informational
				100: {
						title: 'Continue',
						description: 'The client should continue with its request.',
						comment: 'The server has received the request headers and the client should proceed to send the request body.',
						potentialSolution: 'No action needed; this is part of the normal request process.'
				},
				101: {
						title: 'Switching Protocols',
						description: 'The requester has asked the server to switch protocols.',
						comment: 'The server is switching protocols as requested by the client.',
						potentialSolution: 'No action needed; this is part of the normal request process.'
				},
				102: {
						title: 'Processing',
						description: 'The server is processing the request, but no response is available yet.',
						comment: 'WebDAV: The server has received and is processing the request, but no response is available yet.',
						potentialSolution: 'Wait for the request to complete.'
				},
				103: {
						title: 'Early Hints',
						description: 'The server is providing some response headers before the final response.',
						comment: 'This is used to return some response headers before the final HTTP message.',
						potentialSolution: 'No action needed; this is part of the normal request process.'
				},
				// 2XX — Success
				200: {
						title: 'OK',
						description: 'The request has succeeded.',
						comment: 'The request has succeeded and the server has returned the requested resource.',
						potentialSolution: 'No action needed; the request was successful.'
				},
				201: {
						title: 'Created',
						description: 'The request has been fulfilled and resulted in a new resource being created.',
						comment: 'The request has been fulfilled and a new resource has been created.',
						potentialSolution: 'No action needed; the resource was successfully created.'
				},
				202: {
						title: 'Accepted',
						description: 'The request has been accepted for processing, but the processing is not complete.',
						comment: 'The request has been accepted for processing, but the processing has not been completed.',
						potentialSolution: 'Wait for the processing to complete.'
				},
				203: {
						title: 'Non-Authoritative Information',
						description: 'The server successfully processed the request, but is returning information that may be from another source.',
						comment: 'The server successfully processed the request, but is returning information that may be from another source.',
						potentialSolution: 'No action needed; the request was successful, but the information may not be authoritative.'
				},
				204: {
						title: 'No Content',
						description: 'The server successfully processed the request, but is not returning any content.',
						comment: 'The server successfully processed the request, but is not returning any content.',
						potentialSolution: 'No action needed; the request was successful, but there is no content to display.'
				},
				205: {
						title: 'Reset Content',
						description: 'The server successfully processed the request, but is not returning any content and requires that the requester reset the document view.',
						comment: 'The server successfully processed the request, but is not returning any content and requires that the requester reset the document view.',
						potentialSolution: 'Reset the document view to see any updates.'
				},
				206: {
						title: 'Partial Content',
						description: 'The server is delivering only part of the resource due to a range header sent by the client.',
						comment: 'The server is delivering only part of the resource due to a range header sent by the client.',
						potentialSolution: 'No action needed; the request was successful and partial content is returned.'
				},
				207: {
						title: 'Multi-Status',
						description: 'The message body that follows is an XML message and can contain a number of separate response codes.',
						comment: 'WebDAV: The message body that follows is an XML message and can contain a number of separate response codes.',
						potentialSolution: 'No action needed; the request was successful, but contains multiple response codes.'
				},
				208: {
						title: 'Already Reported',
						description: 'The members of a DAV binding have already been enumerated in a previous reply to this request, and are not being included again.',
						comment: 'WebDAV: The members of a DAV binding have already been enumerated in a previous reply to this request, and are not being included again.',
						potentialSolution: 'No action needed; the request was successful and the members are already reported.'
				},
				226: {
						title: 'IM Used',
						description: 'The server has fulfilled a GET request for the resource, and the response is a representation of the result of one or more instance-manipulations applied to the current instance.',
						comment: 'The server has fulfilled a GET request for the resource, and the response is a representation of the result of one or more instance-manipulations applied to the current instance.',
						potentialSolution: 'No action needed; the request was successful and the response includes instance-manipulations.'
				},
				// 3XX — Redirection
				300: {
						title: 'Multiple Choices',
						description: 'The request has more than one possible response. The user agent or user should choose one of them.',
						comment: 'The request has more than one possible response. The user agent or user should choose one of them.',
						potentialSolution: 'Review the available choices and select one.'
				},
				301: {
						title: 'Moved Permanently',
						description: 'The URL of the requested resource has been changed permanently. The new URL is given in the response.',
						comment: 'The URL of the requested resource has been changed permanently. The new URL is given in the response.',
						potentialSolution: 'Update the request to use the new URL.'
				},
				302: {
						title: 'Found',
						description: 'The URL of the requested resource has been changed temporarily. The new URL is given in the response.',
						comment: 'The URL of the requested resource has been changed temporarily. The new URL is given in the response.',
						potentialSolution: 'Update the request to use the temporary URL.'
				},
				303: {
						title: 'See Other',
						description: 'The server sent this response to direct the client to get the requested resource at another URI with a GET request.',
						comment: 'The server sent this response to direct the client to get the requested resource at another URI with a GET request.',
						potentialSolution: 'Perform a GET request to the provided URI.'
				},
				304: {
						title: 'Not Modified',
						description: 'The requested resource has not been modified since the last time it was requested.',
						comment: 'The requested resource has not been modified since the last time it was requested.',
						potentialSolution: 'Use the cached version of the resource.'
				},
				307: {
						title: 'Temporary Redirect',
						description: 'The server is currently responding to the request with a resource from a different URI, but the original URI should still be used for future requests.',
						comment: 'The server is currently responding to the request with a resource from a different URI, but the original URI should still be used for future requests.',
						potentialSolution: 'Update the request to use the temporary URI.'
				},
				308: {
						title: 'Permanent Redirect',
						description: 'The resource has been permanently moved to a new URI, and all future references should use this new URI.',
						comment: 'The resource has been permanently moved to a new URI, and all future references should use this new URI.',
						potentialSolution: 'Update the request to use the new URI permanently.'
				},

				// 4XX — Client Error
				400: {
						title: 'Bad Request',
						description: 'The server could not understand the request due to invalid syntax.',
						comment: 'This typically means there is something wrong with the request.',
						potentialSolution: 'Check the request syntax and try again.'
				},
				401: {
						title: 'Unauthorized',
						description: 'The client must authenticate itself to get the requested response.',
						comment: 'Authentication is needed to get the requested response.',
						potentialSolution: 'Ensure you are authenticated and try again.'
				},
				403: {
						title: 'Forbidden',
						description: 'The client does not have access rights to the content.',
						comment: 'The server understands the request, but it refuses to authorize it.',
						potentialSolution: 'Ensure you have the necessary permissions and try again.'
				},
				404: {
						title: 'Not Found',
						description: 'The server can not find the requested resource.',
						comment: 'The requested resource could not be found on the server.',
						potentialSolution: 'Check the URL and try again, or contact the administrator if the problem persists.',
				},
				405: {
						title: 'Method Not Allowed',
						description: 'The request method is known by the server but is not supported by the target resource.',
						comment: 'The method specified in the request is not allowed for the resource identified by the request URI.',
						potentialSolution: 'Verify the request method and ensure it is correct for the resource.',
				},
				408: {
						title: 'Request Timeout',
						description: 'The server did not receive a complete request message within the time that it was prepared to wait.',
						comment: 'The client did not produce a request within the time that the server was prepared to wait.',
						potentialSolution: 'Try sending the request again or check your network connection.',
				},
				409: {
						title: 'Conflict',
						description: 'The request could not be completed due to a conflict with the current state of the target resource.',
						comment: 'The request conflicts with the current state of the server.',
						potentialSolution: 'Resolve the conflict and try sending the request again.',
				},
				410: {
						title: 'Gone',
						description: 'The requested resource is no longer available and will not be available again.',
						comment: 'This response is sent when the requested content has been permanently deleted from the server.',
						potentialSolution: 'Remove references to the resource or contact the administrator for more information.',
				},
				413: {
						title: 'Payload Too Large',
						description: 'The request entity is larger than the server is willing or able to process.',
						comment: 'The request is too large for the server to process.',
						potentialSolution: 'Reduce the size of the request payload and try again.',
				},
				415: {
						title: 'Unsupported Media Type',
						description: 'The media format of the requested data is not supported by the server.',
						comment: 'The server is refusing to service the request because the payload format is in an unsupported format.',
						potentialSolution: 'Ensure the request payload format is supported by the server.',
				},
				429: {
						title: 'Too Many Requests',
						description: 'The user has sent too many requests in a given amount of time.',
						comment: 'The user has sent too many requests in a given amount of time (rate limiting).',
						potentialSolution: 'Wait before making more requests or contact the administrator for rate limits.',
				},
				500: {
						title: 'Internal Server Error',
						description: 'The server has encountered a situation it does not know how to handle.',
						comment: 'A generic error message, given when no more specific message is suitable.',
						potentialSolution: 'Try the request again later or contact the administrator if the problem persists.',
				},
				501: {
						title: 'Not Implemented',
						description: 'The server does not support the functionality required to fulfill the request.',
						comment: 'The server either does not recognize the request method, or it lacks the ability to fulfill the request.',
						potentialSolution: 'Verify the request method and functionality required. Contact the administrator if needed.',
				},
				502: {
						title: 'Bad Gateway',
						description: 'The server, while acting as a gateway or proxy, received an invalid response from the upstream server.',
						comment: 'The server was acting as a gateway or proxy and received an invalid response from the upstream server.',
						potentialSolution: 'Try the request again later or contact the administrator if the problem persists.',
				},
				503: {
						title: 'Service Unavailable',
						description: 'The server is not ready to handle the request.',
						comment: 'Common causes are a server that is down for maintenance or that is overloaded.',
						potentialSolution: 'Try the request again later or contact the administrator if the problem persists.',
				},
				504: {
						title: 'Gateway Timeout',
						description: 'The server, while acting as a gateway or proxy, did not receive a timely response from the upstream server.',
						comment: 'The server was acting as a gateway or proxy and did not get a response in time from the upstream server.',
						potentialSolution: 'Try the request again later or contact the administrator if the problem persists.',
				},
		};

		constructor() {}

		show(type: NotificationType, message: string): void {
				this.showNotification(type, message);
		}

		showHttpError(statusCode: number): void {
				const error = this.httpErrors[statusCode];
				if (error) {
						this.showNotification('error', `${error.title}: ${error.description} - ${error.comment}`);
				} else {
						this.showNotification('error', `Unknown HTTP Error: ${statusCode}`);
				}
		}

		private showNotification(type: NotificationType, message: string): void {
				alert(`[${type.toUpperCase()}] ${message}`);
		}
}
