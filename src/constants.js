export const CATEGORIES = [
  "Salary",
  "Dining",
  "Rent",
  "Shopping",
  "Groceries",
  "Entertainment",
  "Transport",
  "Health",
];

export const getCategoryIcon = (category) => {
  switch (category) {
    case "Salary":
      return "💰";
    case "Dining":
      return "🍴";
    case "Rent":
      return "🏠";
    case "Shopping":
      return "🛍️";
    case "Groceries":
      return "🛒";
    case "Entertainment":
      return "🎬";
    case "Transport":
      return "🚗";
    case "Health":
      return "💊";
    default:
      return "📦";
  }
};
