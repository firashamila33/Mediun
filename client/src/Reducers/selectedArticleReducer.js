import { SELECTED_ARTICLE } from '../actions/types'   


export default function(state = [], action) {  
    switch (action.type) {
      case SELECTED_ARTICLE:
        return action.payload;
      default:
        return state;
    }
  }
  