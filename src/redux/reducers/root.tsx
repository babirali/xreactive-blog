import { combineReducers } from 'redux';
import post from '../reducers/post'
import tags from '../reducers/test'
export default combineReducers({
    post,
    tags
});