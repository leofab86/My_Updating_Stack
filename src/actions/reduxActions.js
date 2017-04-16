import { signup, login, logout } from './authActions';
import { getUsers, editUser, getData, postData, editData } from './apiActions';
import { AUTH, AUTH_CLEAR, POPUP, CHALLENGE, DATA_GET, DATA_ADD } from './constants';

// ------------ Redux Actions -------------
export function newSession(userObj) {
	return {type: AUTH, userObj}
}

export function clearSession() {
	return { type: AUTH_CLEAR, userObj: {
		isSignedIn: false,
	}}
}

export function newPopup(popupObj) {
	return { type: POPUP, popupObj}
}

export function closePopup() {
	return { type: POPUP, popupObj: { visible:false }}
}

export function storeData (data) {
	return { type: DATA_GET, data }
}

export function addData (data) {
	return { type: DATA_ADD, data }
}

//------------- Async Actions ------------
export function asyncLogin (form, callback) {
	return function (dispatch) {
		login(form, function (user) {
			dispatch(newSession(user));
			if(callback) callback(user)
		})
	}
}

export function asyncSignup (form, callback) {
	return function (dispatch) {
		signup(form, function (user) {
			dispatch(newSession(user));
			if(callback) callback(user)
		});
	}
}

export function asyncLogout () {
	return function (dispatch) {
		dispatch(clearSession());
		logout()
	}
}

export function asyncGetUsers (callback, id) {
	return function (dispatch) {
		getUsers(users => {
			callback(users)
		}, id)
	}
}

export function asyncEditUser (user, callback) {
	return function (dispatch) {
		editUser( user, returnedUser => {
			dispatch( newSession(returnedUser) );
			callback(returnedUser)
		})
	}
}

export function asyncEditData (data, callback) {
	return function (dispatch) {
		editData( data, returnedData => {
			dispatch( addData(returnedData) );
			callback(returnedData)
		})
	}
}

