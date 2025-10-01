export function getCurrencySymbol(code: string): string {
  switch (code.toUpperCase()) {
    case "INR":
      return "₹";
    case "USD":
      return "$";
    case "EUR":
      return "€";
    case "GBP":
      return "£";
    case "JPY":
      return "¥";
    case "AUD":
      return "A$";
    case "CAD":
      return "C$";
    case "CNY":
      return "¥";
    case "RUB":
      return "₽";
    default:
      return code; // fallback to code if symbol not found
  }
}