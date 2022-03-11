import {ADD_PHOTOS} from '../actions/types'

const initialState = {
    AddPhotos:[]
}

const AddPhotosReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_PHOTOS:
            console.log('working action', action)

            return {
                ...state,
                AddPhotos: action
            };
            return;
        default:
            return state;
    }

    // console.log('working devices', action, state)
    // return state;

}



export default AddPhotosReducer;