import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [],
}

export const favSlice = createSlice({
  name: 'favlist',
  initialState,
  reducers: {
    addFav: (state, action) => {
      state.value.push(action.payload) 
    },
    clearFav: (state) => {
      state.value = []; 
    }
  },
})


export const { addFav,clearFav } = favSlice.actions

export default favSlice.reducer