import { EDITED_ARTICLE } from '../actions/types'   


export default function(state = [], action) {  
    switch (action.type) {
      case EDITED_ARTICLE:
        return action.payload;
      default:
        return state;
    }
  }
  