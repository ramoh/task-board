const mockTasks = [
  {
    id: 1,
    title: "Learn Redux",
    description: "The store, actions, and reducers, oh my!",
    status: "In Progress",
  },
  {
    id: 2,
    title: "Peace on Earth",
    description: "No big deal.",
    status: "In Progress",
  },
  {
    id: 3,
    title: "There should be a war",
    description: "And the war begins",
    status: "Completed",
  },
];

const tasks = (state = { tasks: mockTasks }, action) => {
  return state;
};
export default tasks;
