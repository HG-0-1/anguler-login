// Custom filter to format timestamp into human-readable format
app.filter('formatTimestamp', function() {
    return function(input) {
        if (!input) {
            return '';
        }

        var date;
        
        // Handle different timestamp formats
        if (typeof input === 'string') {
            date = new Date(input);
        } else if (typeof input === 'number') {
            date = new Date(input * 1000); // Assuming milliseconds
        } else {
            return '';
        }

        // Check if date is valid
        if (isNaN(date.getTime())) {
            return '';
        }

        // Format: "Monday, January 15, 2024 at 2:30 PM"
        var options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        };

        return date.toLocaleDateString('en-US', options);
    };
});
