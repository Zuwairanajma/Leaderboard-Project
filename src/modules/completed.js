const markAsCompleted = (task) => {
  task.completed = true;
};

const markAsIncomplete = (task) => {
  task.completed = false;
};

export { markAsCompleted, markAsIncomplete };