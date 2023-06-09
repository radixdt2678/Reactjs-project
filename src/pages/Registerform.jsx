import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, FormField,TextArea, Radio } from "semantic-ui-react";
import Select from "react-select";
import Header from "../components/header";
import { State, City } from "country-state-city";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "../pages/style.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from 'yup';


export default function Registerform() {

   const [firstname, setFirstname] = useState("");
   const [lastname, setlastname] = useState("");
   const [email, setemail] = useState("");
   const [phone, setphone] = useState("");
   const [state, setstate] = useState("");
   const [stateData, setStateData] = useState([]);
   const [cityData, setCityData] = useState([]);
   const [city, setCity] = useState("");
   const [gender, setValue] = useState(null);
   const [address, setAddress] = useState("");
   const [zipcode, setZipcode] = useState("");
   const [website, setWebsite] = useState("");
   const [postImage, setPostImage] = useState("");
   const [cloudinaryImage, setCloudinaryImage] = useState("");   

   const userSchema = yup.object({

      firstname: yup.string().required("Enter the First Name"),
      lastname: yup.string("Enter the Last Name"),   
      email: yup.string('Not a proper email').email().required("Input Valid Email Address"),      
      state: yup.string().required("Select State"),
      city: yup.string().required("Select City "),
      address: yup.string().required("Address Required"),
      gender : yup.string().required("Select required"),
      zipcode: yup.string().max(6).required("Enter required"),
      website: yup.string().required("Enter Domain Sites")

    })

async function validateForm() {

   var dataObject = {
      firstname,
      lastname,
      email,     
      city: city.name,
      state: state.name,
      gender,
      address,
      zipcode,
      website,
      cloudinaryImage 
    }  

    const isValid = await userSchema.isValid(dataObject)

    if (isValid) {
      alert('Form is Valid...!')
      postData();
    } else {
      alert('Form is Invalid...!')
    }
  }

   const postData = () => { 
         axios.post("http://localhost:3003/user", {
            firstname,
            lastname,
            email,
            phone ,
            city: city.name,
            state: state.name,
            gender,
            address,
            zipcode,
            website,
            cloudinaryImage           
         
         }).then(refreshPage).then(showToastMessage);
   };
   

   /* phone number */

   let handleOnChange = value => {
    setphone(value);
  };

  
   
    /* state and City */
   
   useEffect(() => {
      const data = State.getAllStates();
      let filteredData = [];
      for (let item of data) {
         if (item?.countryCode === "IN") filteredData.push(item);
      }
      setStateData(filteredData);
   }, []);

   const handleState = (value) => {
      let filteredData = [];
      const data = City.getAllCities();
      for (let item of data) {
         if (
            value?.countryCode === item?.countryCode &&
            value?.isoCode === item?.stateCode
         ) {
            filteredData.push(item);
         }
      }
      setCityData(filteredData);
   };
// 


/*  */

const handleUpload = (e) => {
   e.preventDefault();
   const formData = new FormData ();
   formData.append("file", postImage);
   formData.append("upload_preset", "wl597iy4");

   axios.post("https://api.cloudinary.com/v1_1/daqoq4ynd/image/upload",
    formData
  )
   .then((response) => {
     console.log(response);
     setCloudinaryImage(response.data.secure_url);
   })
   .catch((error) => {
     console.log(error);
   });
 };



/* for Localstorage store image  */
/* var addImage = [];
   addImage.push(postImage);
   localStorage.setItem("postImage", JSON.stringify(addImage)); */
 
/* Convret tobe base64 Image */

/* const convertToBase64 = (file) => {
   return new Promise((resolve, reject) => {
     const fileReader = new FileReader();
     fileReader.readAsDataURL(file);
     fileReader.onload = () => {
       resolve(fileReader.result);
     };
     fileReader.onerror = (error) => {
       reject(error);
     };
   });
 }; */

/* const handleFileUpload = async (e) => {
   const file = e.target.files[0];
   const base64 = await convertToBase64(file);
   setPostImage((base64));
}; */

/* const handleFileUpload = (event) => {
   let value = URL.createObjectURL(event.target.files[0]);
   setPostImage([value]);
}; */

 // const fileUploadLimit = 1048576; // 1MB in bytes. Formula: 1MB = 1 * 1024 * 1024.

const handleChange = (event, {value}) =>{ 
   localStorage.setItem(state, JSON.stringify(value));
   setValue(value)
};



   function refreshPage() {
      window.location.reload(true);
  } 
//   
// const ErroToastMessage = () => {
//    toast.error('Not Registered Invalid Form Filled All Fields !', {
//        position: toast.POSITION.TOP_CENTER
//    });
// };

const showToastMessage = () => {
   toast.success('Registered SuccessFully !', {
       position: toast.POSITION.TOP_CENTER,
   });
};
/*  */


   return (
      <>
         <Header />
         <section className="pt-5 mt-5 ">
            <div className="container mt-2 pt-5">
               <h1 className="text-uppercase pb-5 fs-1">Registration Form</h1>
               <div className="row d-flex justify-content-center align-items-center h-100">
                  <div className="col-12 bg-secondary pt-3 pb-3 ">
                     <div className="card">
                        <div className="card-body  text-black">
                           <div className="row">
                              <div className="col-lg-6 p-3">
                                 <h3 className="fw-normal mb-5 fs-2">
                                    General Infomation
                                 </h3>
                                 <Form className="create-form "  >
                                    <Form.Field>
                                       <label className="fs-4 pb-1">First Name</label>
                                       <input
                                    
                                          placeholder="First Name"
                                          onChange={(e) =>
                                             setFirstname(e.target.value)
                                          }
                                          className="form-control"
                                          
                                       />
                                    </Form.Field>
                                       <Form.Field>
                                          <label className="fs-4 pb-1">Last Name</label>
                                          <input
                                             placeholder="Last Name"
                                             onChange={(e) =>
                                                setlastname(e.target.value)
                                             }
                                             className="form-control"
                                             required
                                          />
                                       </Form.Field>
                                    <Form.Field>
                                       <label className="fs-4 pb-1">Email</label>
                                       <input
                                          value={email}
                                          placeholder="Email"
                                          onChange={(e) =>                                             
                                             setemail(e.target.value)
                                          }
                                          
                                          className="form-control invalid:bg-red-200 invalid:text-red-800"
                                          required
                                       />
                                          
                                    </Form.Field>
                                   <label htmlFor="" className="mb-1">Phone</label>
                                    <PhoneInput
                                        country={'in'}
                                        value={phone}
                                        defaultMask="india"
                                        onChange={handleOnChange}
                                        
                                        />
                                   
                                    <FormField>
                                       <label className="fs-4 pb-1">State</label>
                                       <Select
                                          className="text-black"
                                          placeholder={"Select state"}
                                          value={state}
                                          options={stateData}
                                          defaultInputValue="Gujarat"
                                          getOptionLabel={(options) =>
                                             options.name
                                          }
                                          getOptionValue={(options) =>
                                             options.name
                                          }
                                          onChange={(e) => {
                                             setstate(e);
                                             handleState(e);
                                          }}
                                       />
                                    </FormField>
                                    <FormField>
                                       <label className="fs-4 pb-1">City</label>
                                       <Select
                                          placeholder={"Select city"}
                                          value={city}
                                          options={cityData}
                                          getOptionLabel={(options) =>
                                             options.name
                                          }
                                          getOptionValue={(options) =>
                                             options.name
                                          }
                                          onChange={(e) => {
                                             setCity(e);
                                          }}
                                       />
                                    </FormField>
                                 </Form>
                              </div>
                              <div className="col-lg-6 bg-info-subtle text-black ">
                                 <div className="py-4 px-5">
                                    <h3 className="fw-normal mb-5 fs-2">
                                     Contact INFO
                                    </h3>
                                                                     
                                       <div className="d-flex flex-column">
                                          <label htmlFor="address" className="pb-2 fs-4">Address</label>
                                          <TextArea
                                             className='mb-3 p-2 border-secondary-subtle'
                                             placeholder={"Enter Your Address"}
                                             value={address}
                                             onChange={(e) => setAddress(e.target.value)}                                          
                                          >                                     
                                          </TextArea>
                                       </div>
                                       <Form.Field>
                                          <label htmlFor="" className="fs-4 pb-1">Gender:</label>  <b>{gender}</b>
                                       </Form.Field>
                                       <div className="d-flex gap-3 align-items-center pt-3 pb-3">
                                             <Form.Field>
                                             <Radio
                                             className="fs-4"
                                                label='Male'
                                                name='radioGroup'
                                                value='male'
                                                checked={gender === 'male'}
                                                onChange={handleChange}
                                             />
                                          </Form.Field>
                                          <Form.Field>
                                             <Radio
                                                className="fs-4"
                                                label='Female'
                                                name='radioGroup'
                                                value='female'
                                                checked={gender === 'female'}
                                                onChange={handleChange}
                                             />
                                          </Form.Field>
                                       </div>
                                       <div className="row mt-3 mb-5">
                                          <Form.Field className="col-6">
                                             <label className="fs-4 pb-3">Zip Code</label>
                                             <input  
                                                type="tel"
                                                maxLength={6}                                         
                                                onChange={(e) =>
                                                   setZipcode(e.target.value)
                                                }
                                                className="form-control"
                                                required
                                             />
                                          </Form.Field>
                                          <Form.Field className="col-6 pb-2">
                                                <label className="fs-4 pb-3 ">WebSites</label>
                                                <input                                             
                                                   onChange={(e) =>
                                                      setWebsite(e.target.value)
                                                   }
                                                   className="form-control"
                                                   required
                                                />
                                          </Form.Field>
                                       </div>

                                    <div >
                                       <div className="">
                                          <div>
                                                <label htmlFor="" className="fs-4 pb-3 ">Profile Picture</label><br/>
                                             <input  type="file"
                                             className="fs-4 mb-3 border border-black shadow bg-white  w-100"
                                                label="Image"
                                                name="myFile"                                      
                                                accept=".jpeg, .png, .jpg"
                                                onChange= {(e)=> setPostImage(e.target.files[0])}
                                                /* onChange={(e) => handleFileUpload(e)} */ />
                                          </div>                                    
                                                <button onClick={handleUpload} className="btn btn-primary">Upload</button>                                         
                                       </div>
                                       
                                       <img src={cloudinaryImage} alt="" className="mt-4 shadow" height={200} />
                                       
                                       
                                    </div>

                                       <button
                                           onClick={() => {
                                                validateForm()
                                             }}                                       
                                          type="submit"
                                          value="Submit"
                                          className="btn btn-primary px-5 py-2 fs-5 text-uppercase fw-semibold mt-3"
                                       >
                                       Register
                                             <ToastContainer/>
                                          
                                       </button>                                  
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </>
   );
}

/* function Registerform () {
    
} */

/* export default Registerform */
