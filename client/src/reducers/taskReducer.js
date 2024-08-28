const initialState = {
    tasks: [],
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case 'GET_TASKS':
        return {
          ...state,
          tasks: action.payload,
        };
      case 'ADD_TASK':
        return {
          ...state,
          tasks: [action.payload, ...state.tasks],
        };
      case 'EDIT_TASK':
        return {
          ...state,
          tasks: state.tasks.map((task) =>
            task._id === action.payload._id ? action.payload : task
          ),
        };
      case 'DELETE_TASK':
        return {
          ...state,
          tasks: state.tasks.filter((task) => task._id !== action.payload),
        };
      default:
        return state;
    }
  }
  