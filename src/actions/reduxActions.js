import { signup, login, logout, authenticate } from './authActions';
import { getUsers, editUser, getData, postData, editData } from './apiActions';
import { AUTH, AUTH_CLEAR, POPUP, DATA_GET, DATA_ADD } from './constants';

// ------------ Redux Actions -------------

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

