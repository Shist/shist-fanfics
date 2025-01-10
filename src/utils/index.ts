export function formatDate(date: Date) {
  return date.toLocaleDateString("ru");
}

export function getFieldLabel(field: string): string {
  switch (field) {
    case "alpha":
      return "Альфа (α)";
    case "beta":
      return "Бета (β)";
    case "gamma":
      return "Гамма (γ)";
    case "delta":
      return "Дельта (δ)";
    case "epsilon":
      return "Эпсилон (ε)";
    default:
      throw new Error("Unknown attractor field passed to conver function!");
  }
}
