
import { ADD_TASK, DELETE_TASK, TOGGLE_TASK } from "./actionTypes";

const initialState = {
    tasks: JSON.parse(localStorage.getItem("tasks")) || [],
  };

// const initialState = {
//   tasks: [
//     { id: 1, text: 'Learn React', completed: false },
//     { id: 2, text: 'Build a Todo App', completed: false },
    
//   ],
// };

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      const newTasks = [
        ...state.tasks,
        { 
            text: action.payload, 
            completed: false 
        },
      ];
      localStorage.setItem("tasks", 
        JSON.stringify(newTasks));
      return { 
        ...state, 
        tasks: newTasks };
    case DELETE_TASK:
      const filteredTasks = state.tasks.filter((task, index) => index !== action.payload);
      localStorage.setItem("tasks", JSON.stringify(filteredTasks));
      return { 
        ...state, 
        tasks: filteredTasks 
    };
    case TOGGLE_TASK:
      const toggledTasks = state.tasks.map((task, index) =>
        index === action.payload? { ...task, completed: !task.completed }: task
      );
      localStorage.setItem("tasks", JSON.stringify(toggledTasks));
      return { ...state, tasks: toggledTasks };
    default:
      return state;
  }
};

export default taskReducer;
