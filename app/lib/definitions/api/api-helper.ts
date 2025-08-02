export function parseIdParam(idParam: string | string[] | undefined): number | null {
  if (!idParam) return null;
  const id = parseInt(Array.isArray(idParam) ? idParam[0] : idParam, 10);
  return isNaN(id) ? null : id;
}
