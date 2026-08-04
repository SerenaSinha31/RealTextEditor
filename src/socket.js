import { io } from 'socket.io-client';

export const initSocket = async () => {
	// In a production build, the Express server (server.js) serves BOTH the built
	// React app AND Socket.io from one origin, so the client must connect
	// same-origin. REACT_APP_BACKEND_URL is only honored during local dev
	// (react-scripts start), where the frontend (port 3000) and the API (port 5000)
	// run on separate origins.
	//
	// IMPORTANT: create-react-app bakes REACT_APP_* into the bundle at BUILD time.
	// If REACT_APP_BACKEND_URL is set in Railway's variables to e.g.
	// http://localhost:5000, the deployed client would try to connect there and
	// fail immediately with connect_error. Forcing same-origin in production
	// prevents that, regardless of what the variable is set to.
	const backendUrl =
		(process.env.NODE_ENV !== 'production' && process.env.REACT_APP_BACKEND_URL) ||
		window.location.origin;

	return io(backendUrl, {
		forceNew: true, // Socket.io v4 option key (the old 'force new connection' is ignored in v4)
		transports: ['polling', 'websocket'], // polling first, then upgrade to websocket (proxy-friendly)
		reconnection: true,
		reconnectionAttempts: Infinity, // must be a number; the string 'Infinity' is invalid in v4
		reconnectionDelay: 1000,
		timeout: 20000,
	});
};

