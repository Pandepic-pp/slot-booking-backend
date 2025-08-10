function createUTCDate(dateString) {
  const date = new Date(dateString + 'T00:00:00.000Z');
  return date;
}

// Helper function to get next 7 days in YYYY-MM-DD format
function getNext7Days() {
  const days = [];
  const today = new Date();
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    // Format as YYYY-MM-DD to match frontend
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    days.push(`${year}-${month}-${day}`);
  }
  
  return days;
}

// Helper function to generate time slots (should match frontend)
function generateTimeSlots() {
  const slots = [];
  // Generate slots from 6 AM to 11 PM to match frontend
  for (let h = 0; h <= 23; h++) {
    for (let m = 0; m < 60; m += 15) {
      slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    }
  }
  return slots;
}

module.exports = {generateTimeSlots, getNext7Days, createUTCDate};