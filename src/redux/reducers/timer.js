const initialState = {
  initialcounter: undefined,
  counterdecrement: undefined,
  counter: undefined,
  baseTime: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "START":
      return {
        result: action.payload
      };
    case "PAUSE":
      return {
        result: action.payload
      };
    case "RESET":
      return {
        result: action.payload
      };
    default:
      return state;
  }
};
