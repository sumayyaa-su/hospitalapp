// const express = require('express');
// const router = express.Router();
// const path = require('path');
// const fs = require('fs');
// const filePath = path.join(__dirname, 'hospital.json');

// //to read hospital data from json files
// const readhospitaldata=() =>{
//     const data=fs.readFileSync(filepath, 'utf8');
//     return JSON.parse(data);
// };
// //to write hospital data back to the json files
// const writehospitaldata=(hospitaldata) => {
//     const data=fs.writeFileSync(filePath, JSON.stringify( hospitaldata,data,null,2),'utf8');
// };
// //get operation
// router.get('/',(req,res)=>{
//     res.sendFile(path.join(__dirname,"hospital.json"))
// });
// //post operation
// router.post('/add',(req,res)=>{
//     const newhospital=req.body;
//     let hospitaldata=readhospitaldata();
//     hospitaldata.push(newhospital);
//     writehospitaldata(hospitaldata)
//     res.send('post successful')
// })
// // put operation
// router.put('/edit/:id', (req, res) => {
//     const hospitalId = parseInt(req.params.id); // Get the ID from the URL
//     const updatedhospitaldata = req.body; // Get the updated data from the request body
//     let hospitaldata = readhospitaldata(); // Read the current hospitals data
//     const hospitalIndex = hospitaldata.findIndex(hospital => hospital.id === hospitalId);// Find the hospital by ID
//     hospitaldata[hospitalIndex] = { ...hospitaldata[hospitalIndex], ...updatedhospitaldata }; // Update the hospital record 
//     // hospitalsData.splice(1,1,updatedHospitalData)
//     writehospitaldata(hospitaldata);// Write the updated data back to the file
//     res.send('Hospital data updated successfully'); // Respond with success message
//   });


// //   deteltion operation

// router.delete('/delete/:id', (req, res) => {
//     const hospitalId = parseInt(req.params.id); // Get the ID from the URL
//     let hospitaldata = readhospitaldata();
//     const hospitalIndex = hospitaldata.findIndex(hospital => hospital.id === hospitalId); // Find the hospital by ID
//     hospitaldata.pop(hospitaldata);
//     writehospitaldata(hospitaldata); 
//     res.status(200).send('Hospital deleted successfully');
//   });




const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const filePath = path.join(__dirname, 'hospital.json');

// Read hospital data from JSON file
const readHospitalData = () => {
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
};

// Write hospital data back to JSON file
const writeHospitalData = (hospitalData) => {
  fs.writeFileSync(filePath, JSON.stringify(hospitalData, null, 2), 'utf8');
};

// GET operation
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "hospital.json"));
});

// POST operation
router.post('/add', (req, res) => {
  const newHospital = req.body;
  let hospitalData = readHospitalData();
  hospitalData.push(newHospital);
  writeHospitalData(hospitalData);
  res.send('Post successful');
});

// PUT operation
router.put('/edit/:id', (req, res) => {
  const hospitalId = parseInt(req.params.id);
  const updatedHospitalData = req.body;
  let hospitalData = readHospitalData();
  const hospitalIndex = hospitalData.findIndex(hospital => hospital.id === hospitalId);
  if (hospitalIndex === -1) {
    return res.status(404).send('Hospital not found');
  }
  hospitalData[hospitalIndex] = { ...hospitalData[hospitalIndex], ...updatedHospitalData };
  writeHospitalData(hospitalData);
  res.send('Hospital data updated successfully');
});

// DELETE operation
router.delete('/delete/:id', (req, res) => {
  const hospitalId = parseInt(req.params.id);
  let hospitalData = readHospitalData();
  const hospitalIndex = hospitalData.findIndex(hospital => hospital.id === hospitalId);
  if (hospitalIndex === -1) {
    return res.status(404).send('Hospital not found');
  }
  hospitalData.splice(hospitalIndex, 1);
  writeHospitalData(hospitalData);
  res.status(200).send('Hospital deleted successfully');
});



module.exports = router;