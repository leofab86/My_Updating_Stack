import cookie from 'react-cookie';
import querystring from 'querystring';

import ajax from '../helpers/ajax';
import { toastrMsg, errorHandler } from '../helpers/appHelpers';

const { ajaxLogging } = window.CONFIG;


export function authenticate (authTokens, callback) {
	// const authHeaders = (authTokens) ? authTokens : cookie.load('authHeaders');
	// if(!authHeaders) return callback();
	// ajax.get('/auth/validate_token', authHeaders)
	// .then( argumentArray => {
	// 	const xhr = argumentArray[2];
	// 	const user = {...argumentArray[0].data, isSignedIn: true};
	// 	callback(user)
	// }).catch( e => {
	// 	console.error(e);
	// 	cookie.remove('authHeaders', { path: '/' });
	// 	callback({isSignedIn: false})
	// })
}


export function signup ({name, email, username, password}, callback) {
	ajax.post('/api/signup', {name, email, username, password}).then( user => {
		if (callback) callback(user);
		if (!callback) console.log('No Signup Callback, wasted ', user);
	}).catch( e => errorHandler(e) )
}


export function login ({username, password}, callback){
	ajax.post('/api/login', {username, password}).then( user => {
		if (callback) callback(user);
		if (!callback) console.log('No Login Callback, wasted ', user);
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
