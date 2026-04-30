export const formatDateToIso = (date: string | Date | undefined): string => {
    if (!date) return '';
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';

    return d.toISOString().split('T')[0]; //retorna apenas a parte da data no formato ISO (YYYY-MM-DD)
}
