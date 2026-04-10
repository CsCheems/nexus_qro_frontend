export function formatDate(date: string) {
    if (!date) return "";
    return new Date(date).toLocaleDateString("es-MX", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

export function truncateText(text: string, maxLength = 120) {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
}