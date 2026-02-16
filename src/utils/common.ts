const getPriorityLabel = (priority: string): string => {
  switch (parseInt(priority)) {
    case 1:
      return "Low";
    case 2:
      return "Medium";
    case 3:
      return "High";
    default:
      return "Unknown";
  }
};

const getStatusLabel = (status: string): string => {
  switch (parseInt(status)) {
    case 1:
      return "Todo";
    case 2:
      return "In Progress";
    case 3:
      return "Done";
    default:
      return "Unknown";
  }
};

export { getPriorityLabel, getStatusLabel };
