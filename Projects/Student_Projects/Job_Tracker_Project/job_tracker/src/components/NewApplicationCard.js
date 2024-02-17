// import { useState, useEffect, useRef } from "react";
// import { Form, useSubmit } from 'react-router-dom'
// import classes from "./NewPositionForm.module.css";
// import { getAuthToken } from '../utils/auth.js';
// import { getUserId } from '../utils/userId.js';

// function NewApplicationForm({ onCancel }) {
//   const [companyData, setCompanyData] = useState([]);
//   const token = getAuthToken();
//   const userId = getUserId();

//   // Fetch all companies from the database

//   const fetchData = async () => {
//     try {
//       const response = await fetch('http://localhost:9000/companies/all/' + userId, {
//         method: "GET",
//         headers: {
//           "Authorization": "Bearer " + token, 
//         }
//       }); 
//       const data = await response.json();
//       setCompanyData(data);
//       return data
//      } catch (error) {
//       console.error('Error fetching company data:', error);
//     }
//   };

//   // Use ref to store the function so that it can be called in useEffect

//   const fetchDataRef = useRef(fetchData);

//   // Call the function in useEffect
  
//   useEffect(() => {
//     fetchDataRef.current();
//   }, []);

//   const submit = useSubmit();
//     const handleSubmit = (e) => {
//     e.preventDefault();
 
//     submit(e.currentTarget.form);
//     e.currentTarget.form.reset(); 
//   };

// return (
//       <div className={classes.addnewform}>
//         <h1>Add new Application</h1>
//             <Form id="newApplicationForm"  action="/applications" method="POST" className={classes.form}>
            
//                 <div className="form-control">
//                     <label htmlFor="companyName">Select Company:</label><br/>
//                     <select id="companyName" name="companyName" value={selectedOption} onChange={handleOptionChange}>
//                     {companyData.map((company) => (
//                       <option value={company.companyid}>
//                         {company.companyname}
//                       </option>
//                     ))}

//                     </select>
//                 </div>
//                 <br/>
//                 <div className="form-control">
//                     <label htmlFor="positionName">Select Position:</label><br/>
//                     <select id="positionName" name="positionName" value={selectedOption} onChange={handleOptionChange}>
//                     {positionData.map((position) => (
//                       <option value={position.positionid}>
//                         {position.title}
//                       </option>
//                     ))}
//                     </select>
//                 </div>
//                 <br/>
//                 <div className="form-control">
//                     <label htmlFor="applicationStatus">Application Status:</label><br/>
//                     <select id="applicationStatus" name="applicationStatus" value={selectedOption} onChange={handleOptionChange}>
//                         <option value="Sent">Sent</option>
//                         <option value="Rejected">Rejected</option>
//                         <option value="Phone Interview">Phone Interview</option>
//                         <option value="HR Interview">HR Interview</option>
//                         <option value="Technical Interview">Technical Interview</option>
//                         <option value="CEO Interview">CEO Interview</option>
//                         <option value="Offer">Offer</option>
//                         <option value="Offer Accepted">Offer Accepted</option>
//                     </select>
//                 </div>
//                 <br/>
//                 <div className="form-control">
//                     <label htmlFor="sendDate">Application Send Date:</label><br/>
//                     <input type="text" id="sendDate" name="sendDate" required /><br/><br/>
//                 </div>
//                 <button className={classes.btn} type="submit" onClick={handleSubmit}>SAVE</button>
//                 <button className={classes.btn} onClick={onCancel}>Cancel</button>
//             </Form>
            
//         </div>
//   );
// }

// export default NewApplicationForm;

