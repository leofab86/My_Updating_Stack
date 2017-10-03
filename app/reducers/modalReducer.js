import {MODAL} from '../actions/constants';

export default function modalReducer ( state = {
  showModal: false,
  label: '',
  Component: () => {},
  props: {}
}, action) {
  switch (action.type) {
    case MODAL:
      return {...state, ...action.modal}
    default:
      return state
  }
}