import {ADD_DEVICES_IP, ADD_ALBUMS} from '../actions/types'

const initialState = {
    DeviceIp:[]
}

const AddDevicesIp = (state = initialState, action) => {

    switch (action.type) {
        case ADD_ALBUMS:
            console.log('working action', action)

            return {
                ...state,
                DeviceIp: action
            };
            return;
        default:
            return state;
    }

    // console.log('working devices', action, state)
    // return state;

}



export default AddDevicesIp;