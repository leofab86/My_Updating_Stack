import cookie from 'react-cookie';
import querystring from 'querystring';

import ajax from '../helpers/ajax';
import { toastrMsg, errorHandler } from '../helpers/appHelpers';

const { ajaxLogging } = window.CONFIG;


export function authenticate (callback) {
	ajax.get('/api/authenticate').then( session => {
		callback(session);
	}).catch( e => errorHandler(e) )
}


export function signup ({name, email, username, password}, callback) {
	ajax.post('/api/signup', {name, email, username, password}).then( session => {
		if (callback) callback(session);
		if (!callback) console.log('No Signup Callback, wasted ', session);
	}).catch( e => errorHandler(e) )
}


export function login ({username, password}, callback){
	ajax.post('/api/login', {username, password}).then( session => {
		if (callback) callback(session);
		if (!callback) console.log('No Login Callback, wasted ', session);
	}).catch( e => errorHandler(e) )
}


export function logout () {
	ajax.get('/api/logout').then(() => {
		cookie.remove('authHeader', { path: '/' });
	}).catch( e => errorHandler(e) )
}


export function getAuthFromUrl() {
	// const parsedUrl = querystring.parse(window.location.href);
	// const authHeaders = (parsedUrl.token) ? {
	// 	client: parsedUrl.client_id,
	// 	'access-token': parsedUrl.token,
	// 	uid: parsedUrl.uid
	// } : null;
	// return authHeaders
}
