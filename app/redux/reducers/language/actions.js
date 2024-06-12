const actions = {
  SET_LANGUAGE: "language/SET_LANGUAGE",

  setLanguage: (languageData) => (dispatch) =>
    dispatch({
      type: actions.SET_LANGUAGE,
      languageData,
    }),
};

export default actions;
