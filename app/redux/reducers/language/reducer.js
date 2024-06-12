import types from "./actions";

const initialState = {
  languageData: "en",
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_LANGUAGE:
      return {
        ...state,
        languageData: action.languageData,
      };
    default:
      return state;
  }
}
