import React, { useState, useEffect } from "react";
import { Form, FormField,TextArea, Radio } from "semantic-ui-react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { State, City } from "country-state-city";
import axios from "axios";
import Header from "../components/header";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

export default function Update() {

  const [id, setId] = useState();
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
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

/* image localstorage */

/*  */

  useEffect(() => {
    setId(localStorage.getItem("id"));
    setFirstName(localStorage.getItem("firstname"));
    setLastName(localStorage.getItem("lastname"));
    setemail(localStorage.getItem('email'))
    setphone(localStorage.getItem('phone')) 
    const lastSelected = JSON.stringify(localStorage.getItem('state') ?? "[]"); 
   //  console.log(state);
   //  console.log(lastSelected);

    setstate(lastSelected);
   
   //  setstate(localStorage.getItem("state"));
    setCity(localStorage.getItem("city"));
    setAddress(localStorage.getItem("address"));
    setValue(localStorage.getItem("gender"));
    setZipcode(localStorage.getItem("zipcode"));
    setWebsite(localStorage.getItem("website"));
    setCloudinaryImage(localStorage.getItem("cloudinaryImage"));
  }, []);

  const navigate = useNavigate();

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log("id....", id);
    axios
      .put(`http://localhost:3003/user/${id}`, {
        id: id,
        firstname: firstname,
        lastname: lastname,
        phone: phone,
        email: email,
        city: city.name,
        state: state.name,
        gender,
        address,
        zipcode,
        website,
        cloudinaryImage
      })
      .then(() => {
        navigate("/listemp");
        toast.success('UPDATED SucessFully..!',{position: toast.POSITION.TOP_CENTER});
      });
  };
// 

// 
const handleChange = (event, {value}) => setValue(value);
//   

  let handleOnChange = value => {
    setphone(value);
  };

  return (
    <>
        <Header />
         <section className="pt-5 mt-5 ">
            <div className="container mt-2 pt-5">
               <h1 className="text-uppercase pb-5 fs-1">Update Form</h1>
               <div className="mb-3">
                  <Link to="/listemp">
                     <button className="btn fs-3 btn-primary">Back</button>
                  </Link>
               </div>
               <div className="row d-flex justify-content-center align-items-center h-100">
                  <div className="col-12 bg-secondary pt-3 pb-3 ">
                     <div className="card">
                        <div className="card-body  text-black">
                           <div className="row">
                              <div className="col-lg-6 p-3">
                                 <h3 className="fw-normal mb-5 fs-2">
                                    General Infomation
                                 </h3>
                                 <Form className="create-form ">
                                    <Form.Field>
                                       <label className="fs-4 pb-2">First Name</label>
                                       <input
                                          placeholder="First Name"
                                          value={firstname}
                                          onChange={(e) =>
                                            setFirstName(e.target.value)
                                          }
                                          className="form-control"
                                          required
                                       />
                                    </Form.Field>
                                    <Form.Field>
                                       <label className="fs-4 pb-2">Last Name</label>
                                       <input
                                          placeholder="Last Name"
                                          value={lastname}
                                          onChange={(e) =>
                                            setLastName(e.target.value)
                                          }
                                          className="form-control"
                                          required
                                       />
                                    </Form.Field>
                                    <Form.Field>
                                       <label className="fs-4 pb-2">email</label>
                                       <input
                                          placeholder="Email"
                                          value={email}
                                          onChange={(e) =>
                                             setemail(e.target.value)
                                          }
                                          className="form-control"
                                          required
                                       />
                                    </Form.Field>
                                   <label htmlFor="" className="mb-1 fs-4 pb-2">Phone</label>
                                    <PhoneInput
                                        country={'us'}
                                        value={phone}
                                        onChange={handleOnChange}
                                        
                                        />    
                                   
                                    <FormField>
                                       <label className="fs-4 pb-2">State</label>
                                       <Select
                                          className="text-black"
                                          placeholder={"Select state"}
                                          value={state}
                                          options={stateData}
                                          
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
                                       <label className="fs-4 pb-2">City</label>
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
                                       Contact Details
                                    </h3>
                                    <div className="d-flex flex-column">
                                       <label htmlFor="address" className="fs-4 pb-2">Address</label>
                                       <TextArea
                                          className='fs-4 mb-3 p-2'
                                          placeholder={"Enter Your Address"}
                                          value={address}
                                          onChange={(e) => setAddress(e.target.value)}                                          
                                       >                                     
                                       </TextArea>
                                    </div>
                                    <Form.Field>
                                       <h2 className="fs-4 pb-2"> Gender:</h2> {/* <b>{gender}</b> */}
                                    </Form.Field>
                                    <div className="d-flex gap-3 align-items-center pt-1 pb-3">
                                          <Form.Field>
                                          <Radio
                                          className="fs-4 "
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
                                    <div className="row mt-2 mb-5">
                                        <Form.Field className="col-6">
                                          <label className="pb-2 fs-4">Zip Code</label>
                                          <input  
                                           
                                          value={zipcode}                                         
                                             onChange={(e) =>
                                                setZipcode(e.target.value)
                                             }
                                             className="fs-4 form-control"
                                             required
                                          />
                                       </Form.Field>
                                       <Form.Field className="col-6 fs-4">
                                             <label className="pb-2">WebSites</label>
                                             <input    
                                                value={website}                                         
                                                onChange={(e) =>
                                                   setWebsite(e.target.value)
                                                }
                                                className="form-control fs-4"
                                                required
                                             />
                                       </Form.Field>
                                      

                                    </div>
                                    <div className="pt-2 pb-5">

                                        <label htmlFor="" className="fs-4 pb-2">Profile Picture</label><br/>
                                        <input  type="file"
                                          className="fs-4 border border-black shadow bg-white"
                                          label="Image"
                                                                                
                                          // accept=".jpeg, .png, .jpg"
                                          onChange= {(e)=> setPostImage(e.target.files[0])}
                                          /* onChange={(e) => handleFileUpload(e)} */ />

                                          <button onClick={handleUpload}>Upload</button>
                                          
                                          
                                          <img src={cloudinaryImage} alt="" className="mt-4 shadow" height={200} />
                                          
                                          
                                       </div>
                                    <button variant="contained" className="btn btn-primary shadow px-4 py-2 fs-5" onClick={handleUpdate}>
                                    Update
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
