import axios from 'axios';

const initialState = {
  items: [],
  loading: false,
}

const START_LOADING = 'START_LOADING';
const ITEMS_LOADED = 'ITEMS_LOADED';

export default function news(state = initialState, action) {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        loading: true,
      }
    case ITEMS_LOADED:
      return {
        ...state,
        items: action.items,
        loading: false,
      }
    default:
      return state
  }
}

export const loadItems = () => {
  return dispatch => {

    dispatch({ type: START_LOADING });
    return axios.get('http://node-hnapi.herokuapp.com/news')
      .then(response => {
        dispatch({ type: ITEMS_LOADED, items: response.data })
      })
  }
}