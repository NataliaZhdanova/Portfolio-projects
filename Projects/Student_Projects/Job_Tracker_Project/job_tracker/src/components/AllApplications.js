// import * as React from 'react'; 
// import { useState, useEffect, useRef } from "react";
// import classes from "./AllCompanies.module.css";
// import NewApplicationForm from './NewApplicationCard';
// import { getAuthToken } from '../utils/auth.js';
// import { getUserId } from '../utils/userId.js';

// export default function AllApplications() {
    
//     const [applicationData, setApplicationData] = useState([]);
//     const [isAddingApplication, setIsAddingApplication] = useState(false);
//     const [editingApplication, setEditingApplication] = useState(null);
//     const [editedTitle, setEditedTitle] = useState('');
//     const [editedUrl, setEditedUrl] = useState('');
//     const [editedRequirements, setEditedRequirements] = useState('');
//     const [editedKeywords, setEditedKeywords] = useState('');

//     const token = getAuthToken();
//     const userId = getUserId();
  
//     const fetchData = async () => {
//       try {
//         const response = await fetch('http://localhost:9000/applications/all' + userId, {
//           method: "GET",
//           headers: {
//             "Authorization": "Bearer " + token, 
//           }
//         }); 
//         const data = await response.json();
//         setApplicationData(data);
//       } catch (error) {
//         console.error('Error fetching application data:', error);
//       }
//     };

// // Delete an application from the database

//     const deleteApplication = async (applicationid) => {
//       try {
//         const response = await fetch('http://localhost:9000/applications/delete/' + applicationid, {
//           method: "DELETE",
//           headers: {
//             "Authorization": "Bearer " + token, 
//           }
//         });
//         const data = await response.json();
//         fetchData();
//         return data;
//       } catch (error) {
//         console.error('Error deleting application:', error);
//       }
//     };

// // Update an application in the database

//     const updateApplication = async (applicationid) => {
//       try {
//         const response = await fetch('http://localhost:9000/applications/update/' + applicationid, {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             "Authorization": "Bearer " + token, 
//           },
//           body: JSON.stringify({
//             title: editedTitle,
//             url: editedUrl,
//             requirements: editedRequirements,
//             keywords: editedKeywords,
//           })
//         });
//         const data = await response.json();
//         fetchData();
//         return data; 
//       } catch (error) {
//         console.error('Error updating application:', error);
//       }
//     }; 

// // Use ref to store the function so that it can be called in useEffect

// const fetchDataRef = useRef(fetchData);

// // Call the function in useEffect

//     useEffect(() => {
//       fetchDataRef.current();
//     }, []);

// // Handlers for adding, editing, and deleting positions

//     const handleAddApplicationClick = () => {
//       setIsAddingApplication(true);
//     };

//     const handleEditClick = (application) => {
//       setEditingApplication(application);
//       setEditedTitle(application.title);
//       setEditedUrl(application.url);
//       setEditedRequirements(application.requirements);
//       setEditedKeywords(application.keywords);
//     }

//     const handleCancelClick = () => {
//       setEditingApplication(null);
//     }

//     const handleSaveClick = (applicationid) => {
//       updateApplication(applicationid);
//       setEditingApplication(null);
//     }

//     const handleDeleteClick = (applicationid) => {
//       deleteApplication(applicationid);
//     }
  
//     return (
//       <div>
//         <h1>Applications</h1>
//         <table>
//           <thead>
//             <tr>
//               <th>Company Name</th>
//               <th>Position Title</th>
//               <th>Position URL</th>
//               <th>Discovery Date</th>
//               <th>Application Status</th>
//               <th>Application Send Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {applicationData.map((application) => (
//               <tr key={application.applicationid}>
//                 <td>{position.companyname}</td>
//                 <td>{editingPosition === position ? <input type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} /> : position.title}</td>
//                 <td>{editingPosition === position ? <input type="text" value={editedUrl} onChange={(e) => setEditedUrl(e.target.value)} /> : position.url}</td>
//                 <td>{editingPosition === position ? <textarea rows="10" cols="50" value={editedRequirements} onChange={(e) => setEditedRequirements(e.target.value)} /> : position.requirements}</td>
//                 <td>{editingPosition === position ? <textarea rows="10" cols="50" value={editedKeywords} onChange={(e) => setEditedKeywords(e.target.value)} /> : position.keywords}</td>
//                 <td>{position.discoverydate}</td>
//                 <td>
//                   {editingPosition === position ? (
//                     <>
//                       <button onClick={() => handleSaveClick(position.positionid)}>Save</button>
//                       <button onClick={handleCancelClick}>Cancel</button>
//                     </>
//                   ) : (
//                     <>
//                     <button onClick={() => handleEditClick(application)}>Edit</button>
//                     <button onClick={() => handleDeleteClick(application.applicationid)}>Delete</button>
//                     </>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <br></br>
//         <div>
//         <br></br>      
//         <button className={classes.btn} type="button" id="addNewApplication" onClick={handleAddApplicationClick}>Add Application</button>
//         {isAddingApplication && (
//         <NewApplicationForm onCancel={() => setIsAddingApplication(false)} />
//         )}
//       </div>
//       </div>
      
      
//     );
//   };
    