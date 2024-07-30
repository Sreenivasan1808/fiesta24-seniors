const XLSX = require('xlsx');
const studentModel = require("./models/studentmodel");
const soloeventModel = require("./models/soloeventmodel");
const groupeventModel=require("./models/groupevents")

// Sample JSON data
const download = async (req, res) => {
    try {
        if(req.query.type=="solo"){
            const participants = await soloeventModel.find({ EventName: req.query.eventName });
            let jsonData = [];
            
            for (let i = 0; i < participants.length; i++) {
                const rollno = participants[i].Rollno; // Extract the Rollno
                const data = await studentModel.findOne({ Rollno: rollno });
                console.log(data);
                if (data) {
                    jsonData.push({Rollno:data.Rollno,Name:data.name,Branch:data.branch,Year:data.year});
                }
            }

            

            // Convert JSON data to worksheet
            const worksheet = XLSX.utils.json_to_sheet(jsonData);

            // Create a new workbook
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Student Data');

            // Write the workbook to a buffer
            const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });

            // Set headers to trigger file download
            res.setHeader('Content-Disposition', `attachment; filename=${req.query.eventName}_student_data.xlsx`);
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

            // Send the buffer as response
            res.send(buffer);
        }
        else{
            const participants = await groupeventModel.find({ event: req.query.eventName });
            let jsonData = [];
            console.log(participants)
            for (let i = 0; i < participants.length; i++) {
                const teamMembers = participants[i].members;
                const teamName=participants[i].teamName
                for(let j=0;j<teamMembers.length;j++)
                {
                    const rollno=teamMembers[j]
                    const data = await studentModel.findOne({ Rollno: rollno });
                    console.log(data);
                    if (data) {
                        jsonData.push({TeamName:teamName,Rollno:data.Rollno,Name:data.name,Branch:data.branch,Year:data.year});
                    }
                }
            }

            

            // Convert JSON data to worksheet
            const worksheet = XLSX.utils.json_to_sheet(jsonData);

            // Create a new workbook
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Student Data');

            // Write the workbook to a buffer
            const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });

            // Set headers to trigger file download
            res.setHeader('Content-Disposition', `attachment; filename=${req.query.eventName}_student_data.xlsx`);
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

            // Send the buffer as response
            res.send(buffer);
        }
    } catch (error) {
        console.error(error); // Log error for debugging
        res.status(500).send('Error generating file');
    }
};

module.exports = {
    download: download
};
