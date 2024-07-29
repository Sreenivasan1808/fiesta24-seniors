const XLSX = require('xlsx');
// Sample JSON data
const download = async (req, res) => {
    try {
        const jsonData = [
            { name: 'John Doe', roll_no: '101' },
            { name: 'Jane Smith', roll_no: '102' },
            { name: 'Alice Johnson', roll_no: '103' }
        ];
        
        // Convert JSON data to worksheet
        const worksheet = XLSX.utils.json_to_sheet(jsonData);

        // Create a new workbook
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Student Data');

        // Write the workbook to a buffer
        const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });

        // Set headers to trigger file download
        res.setHeader('Content-Disposition', 'attachment; filename=student_data.xlsx');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

        // Send the buffer as response
        res.send(buffer);
    } catch (error) {
        res.status(500).send('Error generating file');
    }
};

module.exports={
    download:download
}