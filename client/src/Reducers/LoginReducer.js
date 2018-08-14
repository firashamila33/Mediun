import { SET_USER_TOKEN } from '../actions/types';

export default function(state=null, action){
    switch (action.type){
        case SET_USER_TOKEN :
            return action.payload;
        default :
            return state ;
    }
}