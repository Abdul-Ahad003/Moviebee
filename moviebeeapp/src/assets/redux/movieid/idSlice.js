import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 27205,
}

export const idSlice = createSlice({
  name: 'id',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    setId: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, setId } = idSlice.actions

export default idSlice.reducer