import {io} from 'socket.io-client';

export const initSocket = async() => {
	const options = {
		'force new connection': true,
		reconnectionAttempts: 'Infinity',
		timeout: 10000,
		// Allow polling first, then upgrade to websocket — required for Railway/cloud proxies
		transports: ['polling', 'websocket'],
	};

	// Use env variable for local dev, fall back to same origin for Railway/cloud deployments
	const backendUrl = process.env.REACT_APP_BACKEND_URL || window.location.origin;

	return io(backendUrl, options);
	
};

