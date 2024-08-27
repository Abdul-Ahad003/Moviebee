import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: '',
}

export const typeSlice = createSlice({
  name: 'type',
  initialState,
  reducers: {
    setType: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setType } = typeSlice.actions

export default typeSlice.reducer