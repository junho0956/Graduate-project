const TEST = "test/TEST";

export const testtest = () => ({
  type: TEST,
});

const initState = () => ({
  number: 0,
});

function test(state = initState, action) {
  switch (action.type) {
    case TEST:
      return state;
    default:
      return state;
  }
}

export default test;
