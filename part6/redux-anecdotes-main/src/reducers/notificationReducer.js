import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        createNotification(state, action) {
            return action.payload
        },
        shutNotification(state, action) {
            return null
        }
    }
})

export const { createNotification, shutNotification } = notificationSlice.actions
export default notificationSlice.reducer
