import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isNewGroup: false,
  isNotification: false,
  isAddMember: false,
  isSearch: false,
  isMobileMenu: false,
  isFileMenu: false,
  isDeleteMenu: false,
  upLoadingLoader: false,
  selectedDeleteChat: {
    chatId: "",
    groupChat: false,
  },
};

const miscSlice = createSlice({
  name: "misc",
  initialState,
  reducers: {
    seIsNewGroup: (state, action) => {
      state.isNewGroup = action.payload;
    },
    setIsNotification: (state, action) => {
      state.isNotification = action.payload;
    },
    setIsAddMember: (state, action) => {
      state.isAddMember = action.payload;
    },
    setIsSearch: (state, action) => {
      state.isSearch = action.payload;
    },
    setIsMobileMenu: (state, action) => {
      state.isMobileMenu = action.payload;
    },
    setIsFileMenu: (state, action) => {
      state.isFileMenu = action.payload;
    },
    setIsDeleteMenu: (state, action) => {
      state.isDeleteMenu = action.payload;
    },
    setUpLoadingLoader: (state, action) => {
      state.upLoadingLoader = action.payload;
    },
    setSelectedDeleteChat: (state, action) => {
      state.selectedDeleteChat = action.payload;
    },
  },
});

export default miscSlice;
export const {
  seIsNewGroup,
  setIsNotification,
  setIsAddMember,
  setIsSearch,
  setIsMobileMenu,
  setIsFileMenu,
  setIsDeleteMenu,
  setUpLoadingLoader,
  setSelectedDeleteChat,
} = miscSlice.actions;
