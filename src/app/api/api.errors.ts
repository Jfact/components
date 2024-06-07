const apiErrors = {
		400: {
				title: 'Bad Request',
				description: 'The server could not understand the request due to invalid syntax.'
		},
		401: {
				title: 'Unauthorized',
				description: 'The request requires user authentication. The client must authenticate itself to get the requested response.'
		},
		403: {
				title: 'Forbidden',
				description: 'The server understood the request, but refuses to authorize it.'
		},
		404: {
				title: 'Not Found',
				description: 'The server could not find the requested resource.'
		},
		405: {
				title: 'Method Not Allowed',
				description: 'The method specified in the request is not allowed for the resource identified by the request URI.'
		},
		408: {
				title: 'Request Timeout',
				description: 'The server timed out waiting for the request.'
		},
		409: {
				title: 'Conflict',
				description: 'Indicates that the request could not be processed because of conflict in the current state of the resource.'
		},
		413: {
				title: 'Payload Too Large',
				description: 'The server refused to process the request because the request payload is larger than the server is willing or able to process.'
		},
		415: {
				title: 'Unsupported Media Type',
				description: 'The server refuses to accept the request because the payload format is in an unsupported format.'
		},
		429: {
				title: 'Too Many Requests',
				description: 'The user has sent too many requests in a given amount of time.'
		}
};
