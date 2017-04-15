import cookie from 'react-cookie';

import ajax from '../helpers/ajax';
import { errorHandler } from '../helpers/appHelpers';

export function getUsers (callback, id = '') {
	// ajax.get(`/api/users/${id}`, cookie.load('authHeaders')).then(argumentArray =>{
	// 	const [ users, , xhr ] = argumentArray;
	// 	callback(users)
	// }).catch( e => {
	// 	errorHandler(e)
	// })
}

export function editUser (user, callback) {
	// ajax.put(`/api/users/${user.id}`, cookie.load('authHeaders'), {user}).then(argumentArray=>{
	// 	const [ user, , xhr ] = argumentArray;
	// 	callback(user)
	// }).catch( e => {
	// 	errorHandler(e)
	// })
}

export function getData (callback, matchId = '') {
	// ajax.get(`/api/matches/${matchId}`, cookie.load('authHeaders')).then(argumentArray =>{
	// 	const [ matches, , xhr ] = argumentArray;
	// 	callback(matches)
	// }).catch( e => {
	// 	errorHandler(e)
	// })
}

export function postData (match, callback) {
	// ajax.post('/api/matches', cookie.load('authHeaders'), {match}).then(argumentArray => {
	// 	const [ newMatch, , xhr ] = argumentArray;
	// 	callback(newMatch)
	// }).catch( e => {
	// 	errorHandler(e)
	// })
}

export function editData (match, callback) {
	// ajax.put(`/api/matches/${match.id}`, cookie.load('authHeaders'), {match}).then(argumentArray => {
	// 	const [ match, , xhr ] = argumentArray;
	// 	callback(match)
	// }).catch( e => {
	// 	errorHandler(e)
	// })
}