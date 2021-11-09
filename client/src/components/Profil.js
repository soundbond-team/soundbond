import React, { useState} from "react";
import Modal from "react-bootstrap/Modal";
import ModalHeader from "react-bootstrap/ModalHeader";
import { Link } from 'react-router-dom'
import Avatar from "@material-ui/core/Avatar";
import Follow from "../components/Follow";

function Profil (props) {
    const [show] = useState(false);
    const followers = props.user.map(Follow);

return (
<div style={{maxWidth:"550px",margin:"0px auto"}}>
           <div style={{
              margin:"18px 0px",
               borderBottom:"1px solid grey"
           }}>

         
           <div style={{
               display:"flex",
               justifyContent:"space-around",
              
           }}>
               
               <div>
                   <h4>{props.username}</h4>
                   <h5>@{props.username}</h5>
                   <div style={{display:"flex",justifyContent:"space-between",width:"150%"}}>
                       <h6> posts</h6>

                       <Modal show={show} onHide={followers} size="sm" centered>
                            <ModalHeader closeButton>
                            <Modal.Title>followers</Modal.Title>
                            </ModalHeader>
                            <Modal.Body>
                            {props.Fallow.map((d, index) => (
                                <div key={index}>
                                    <Link to={`profile/${d.id}`}>
                                        <Avatar className="follow_avatar" src={d.profile_picture} />
                                        <span className="follow_username">@{d.username}</span>
                                    </Link>
                                </div>
                            ))}
                            </Modal.Body>
                       </Modal>

                       <h6> following</h6>
                   </div>
                   <Follow idToFollow={props.user}/>  
                </div>
            </div>      
        </div>
    </div>   
);

 }
    export default Profil ;