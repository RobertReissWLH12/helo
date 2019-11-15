import axios from 'axios'

const initialState = {
    username: '',
    id: '',
    profile_img: {}
}

const UPDATE_USER = 'UPDATE_USER'

export function updateUser(username, id, profile_img) {
    return {
        type: UPDATE_USER,
        payload: {username, id, profile_img}
    }
}

export default function reducer(state = initialState, action) {
    const {type, payload} = action;
    switch(type) {
        case UPDATE_USER:
            return {payload}
            default: return state
    }
}