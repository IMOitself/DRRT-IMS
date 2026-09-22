export function getInitials(name) {
    if (!name) return "";
    return name
        .trim()
        .split(/\s+/)
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();
}

export function formatDate(dateString) {
    if (!dateString) return "";

    // YYYY-MM-DD
    const parts = dateString.split("-");
    if (parts.length === 3) {
        const [year, month, day] = parts.map(Number);
        if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
            const date = new Date(year, month - 1, day);
            return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
            });
        }
    }

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}
export function formatTime(timeString) {
    if (!timeString) return "";

    // HH:MM (24 hour)
    const [hour, minute] = timeString.split(":").map(Number);
    if (isNaN(hour) || isNaN(minute)) return timeString;

    const ampm = hour >= 12 ? "PM" : "AM";
    return `${hour % 12 || 12}:${String(minute).padStart(2, "0")} ${ampm}`;
}
