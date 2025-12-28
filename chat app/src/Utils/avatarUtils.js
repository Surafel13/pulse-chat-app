export const getColorFromInitials = (name) => {
    if (!name) return '#667eea';
    const colors = [
        '#e53e3e', '#dd6b20', '#d69e2e', '#38a169', '#319795',
        '#3182ce', '#667eea', '#805ad5', '#d53f8c', '#718096'
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash % colors.length);
    return colors[index];
};

export const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : '?';
};
