import { configureStore } from '@reduxjs/toolkit'
import CounterSlice from '../features/CounterSlice'

export default configureStore({
    reducer: {
        counter: CounterSlice
    }
})
