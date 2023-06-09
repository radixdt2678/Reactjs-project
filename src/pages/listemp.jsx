import React from 'react';
// import { Table, TableRow , TableCell , TableHeader , TableBody } from "semantic-ui-react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { deleteUser } from '../api/service';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';


class Listemp extends React.Component {
    
    
        state = {
            isLoading: true,
            users: [],
            error: null
        };
        getFetchUsers() {
            this.setState({
                loading: true
            }, () => {
                fetch("http://localhost:3003/user").then(res => res.json()).then(result => this.setState({
                    loading: false,
                    users: result
                })).catch(console.log);
            });
        }
        componentDidMount() {
            this.getFetchUsers();
        }
       
        render() 
        {

            const setToLocalStorage = (
                id,firstname,lastname,email,phone,state,city,address,
                gender, zipcode,website,
                cloudinaryImage
              ) => {
                localStorage.setItem("id", id);
                localStorage.setItem("firstname", firstname);
                localStorage.setItem("lastname", lastname);
                localStorage.setItem("email", email);
                localStorage.setItem("phone", phone);
                localStorage.setItem("state", state);
                localStorage.setItem("city", city);
                localStorage.setItem("address", address);
                localStorage.setItem("gender", gender);
                localStorage.setItem("zipcode", zipcode);
                localStorage.setItem("website", website);
                localStorage.setItem("cloudinaryImage", cloudinaryImage);
              };

            const showToastMessage = () => {
                toast.success('SuccessFully Deleted Data !', {
                    position: toast.POSITION.TOP_CENTER
                });
            };

            function refreshPage() {
                window.location.reload(true);
            }

            const {
                users,
            } = this.state;            

            return (
                <section className='mt-5 pt-5'>
                    <div className='container pt-5 mt-5'>
                        <h1 className='fs-1 text-center border-bottom shadow mb-5 text-uppercase'>All User</h1>
                       <div className='d-flex flex-wrap gap-3 justify-content-center'>
                        {
                                    users.map(user => {
                                        const {
                                            firstname,lastname,email,phone,state,city,address,gender,
                                            zipcode,website,cloudinaryImage,
                                        } = user;
                                        return (                                       

                                            <div className="row d-flex justify-content-center align-items-center col-lg-6 col-12 ">
                                                <div className=" mb-4 mb-lg-0">
                                                    <div className="card mb-3 shadow ">
                                                    <div className="row g-0">
                                                        <div className="col-md-4 gradient-custom text-center text-white p-2">
                                                            <img src={cloudinaryImage}
                                                                alt="Avatar" className="img-fluid my-5 rounded-circle border border-3 border-white p-1  object-fit-contain" height={250} width={150} />
                                                            <h1>{firstname}</h1>
                                                            <h1>{lastname}</h1>
                                                            <div className='d-flex gap-5 justify-content-center align-items-center pt-3'>
                                                                <Link to="/Update" title='Update'>
                                                                <FontAwesomeIcon icon={faPenToSquare} className='fs-1 '
                                                                onClick={() =>
                                                                    setToLocalStorage(
                                                                    user.id, user.firstname,user.lastname,
                                                                    user.email,user.phone, user.state,
                                                                    user.city, user.address,
                                                                    user.gender,  user.zipcode,
                                                                    user.website, user.cloudinaryImage
                                                                    )}                                                                
                                                                ></FontAwesomeIcon>
                                                            </Link>
                                                            <Link title='Delete'>
                                                                <FontAwesomeIcon icon={faTrash} className='fs-2'
                                                                onClick={() => deleteUser(user.id).then(refreshPage).then(showToastMessage)}
                                                                ></FontAwesomeIcon>
                                                            </Link>
                                                            
                                                            </div>                                                                                                                  
                                                        </div>
                                                        <div className="col-md-8">
                                                        <div className="card-body p-4">
                                                            <h2>Information</h2>
                                                            <hr className="mt-0 mb-4"/>
                                                            <div className=" pt-1 align-items-center">
                                                                <div className="col-12 mb-3 p-1">
                                                                    <h4>Email</h4>
                                                                    <div className='d-flex align-items-center gap-2 border rounded p-2'>
                                                                        <FontAwesomeIcon icon={faGlobe} className='text-primary'/>
                                                                        <p className="text-muted">{email}</p>
                                                                    </div>
                                                                    
                                                                </div>
                                                                <div className="col-12 mb-3 p-1">
                                                                    <h4>Phone</h4>
                                                                    <div className='d-flex align-items-center gap-2 border rounded p-2'>
                                                                        <FontAwesomeIcon icon={faPhone} />
                                                                        <p className="text-muted">{phone}</p>
                                                                    </div>
                                                                    
                                                                </div>
                                                            </div>
                                                            <h2>Location</h2>
                                                            <hr className="mt-0 mb-4"/>
                                                            <div className="row pt-1">
                                                            <div className="col-6 mb-3">
                                                                <h4>State</h4>
                                                                <p className="text-muted">{state}</p>
                                                            </div>
                                                            <div className="col-6 mb-3">
                                                                <h4>City</h4>
                                                                <p className="text-muted">{city}</p>
                                                            </div>
                                                            </div>
                                                            <div className='mb-3 col-12'>
                                                                <h4>Address</h4>
                                                                <div className='d-flex align-items-center gap-2 '>
                                                                    <FontAwesomeIcon icon={faLocationDot} />
                                                                    <p className='overflow-x-scroll h-50'>{address}</p>
                                                                </div>
                                                            </div>
                                                            <div className="row pt-1">
                                                            <div className="col-6 mb-3">
                                                                <h4>Gender</h4>
                                                                <p className="text-muted">{gender}</p>
                                                            </div>
                                                            <div className="col-6 mb-3">
                                                                <h4>Pin Code</h4>
                                                                <p className="text-muted">{zipcode}</p>
                                                            </div>
                                                            </div>
                                                            <div className='mb-3'>
                                                                <h4>Website</h4>
                                                                <div className='d-flex align-items-center gap-2'>
                                                                <i class="fa-brands fa-firefox-browser"></i>
                                                                <p>{website}</p>
                                                                </div>
                                                             
                                                            </div>
                                                            <div className="d-flex justify-content-end pt-2 border-top ">
                                                            <a href="#!"><i className="fab fa-facebook-f fa-lg me-3"></i></a>
                                                            <a href="#!"><i className="fab fa-twitter fa-lg me-3"></i></a>
                                                            <a href="#!"><i className="fab fa-instagram fa-lg"></i></a>
                                                            </div>
                                                        </div>
                                                        </div>
                                                    </div>
                                                    </div>
                                                </div>
                                            </div>                                                                               
                                        );
                                    })
                            } 
                        </div>
                    </div>
                </section>
                
    
                );
            }
        }

export default Listemp;