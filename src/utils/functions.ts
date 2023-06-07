export function formatDate(datetime: Date): string {
  const date = new Date(datetime);
  const dateString: string = date.toLocaleDateString('en-US', {year:"numeric",month:'2-digit',day:'2-digit'});

  return dateString;
}