export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})
}