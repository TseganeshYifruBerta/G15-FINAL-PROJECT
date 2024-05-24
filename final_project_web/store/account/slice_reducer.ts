// features/userProfileSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state using the UserProfile interface
interface UserProfile {
  university: string;
  linkedin: string;
  github: string;
  phoneNumber: string;
  telegramUsername: string;
  gender: string;
  department: string;
  shortBio: string;
  photoUrl: string;
}

// Define a type for the slice state
interface UserProfileState {
  profile: UserProfile | null;
}

// Define the initial state
const initialState: UserProfileState = {
  profile: null,
};

export const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    // Define a reducer action to update the state with the profile
    updateUserProfile: (state:any, action: PayloadAction<UserProfile>) => {
      state.profile = action.payload;
    },
  },
});

// Export the action
export const { updateUserProfile } = userProfileSlice.actions;

// Export the reducer
export default userProfileSlice.reducer;
