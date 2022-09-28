export function validateJSON(str: string): boolean {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}