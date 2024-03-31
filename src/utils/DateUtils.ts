export function subtractDays(date: Date, days: number): Date {
  const daysAgo = new Date(date.getTime() - days * 24 * 60 * 60 * 1000)
  return daysAgo
}
