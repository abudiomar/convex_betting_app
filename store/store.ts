"use client";
import { configureStore } from '@reduxjs/toolkit';
import numberReducer from './reducers/numberReducer';

export const store = configureStore({
     reducer: {
        number: numberReducer,
        
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch