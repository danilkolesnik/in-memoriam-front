// formatDateInput.js
export function DateValidate(value, previousValue) {
  // Удаляем все символы, кроме цифр и точек
  value = value.replace(/[^0-9.]/g, "");

  // Если удалили точку и меняем длину строки, автоматически переформатируем
  if (value.length === 2 || value.length === 5) {
    if (previousValue.length < value.length) {
      value += ".";
    }
  }

  // Ограничиваем длину до 10 символов (ДД.ММ.ГГГГ)
  if (value.length > 10) {
    value = value.slice(0, 10);
  }

  // Проверка валидности введенной даты
  const parts = value.split(".");
  if (parts.length > 0) {
    const day = parseInt(parts[0], 10);
    if (day > 31) parts[0] = "31";
  }
  if (parts.length > 1) {
    const month = parseInt(parts[1], 10);
    if (month > 12) parts[1] = "12";
  }
  if (parts.length > 2 && parts[2].length === 4) {
    const currentYear = new Date().getFullYear();
    let year = parseInt(parts[2], 10);
    if (year > currentYear) parts[2] = currentYear.toString();
    else if (year < 1000) parts[2] = "1000";
  }

  // Собираем дату обратно
  return parts.join(".");
}
