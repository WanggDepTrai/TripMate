function convertToDate(dateStr: Date) {
   // Parse the input date string
   const date = new Date(dateStr);

   // Check if the date is valid
   if (isNaN(date.getTime())) {
      throw new Error('Invalid date format');
   }

   // Get the ISO string and remove the timezone offset part
   const isoString = date.toISOString();

   return isoString;
}
export { convertToDate };
