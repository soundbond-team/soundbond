import React,{useEffect} from 'react';
import {useSelector,useDispatch} from "react-redux";
import Profil from "../../components/Profil";
//import Follow from "../../components/Follow";
import Grid from "@material-ui/core/Grid";
import { getAllUser } from '../../actions/users.actions';


function UsersProfile() {

  const dispatch = useDispatch();
    const allUsers = useSelector((state) => state.usersReducer);
    //const dispatch = useDispatch();
    console.log("blabla");
    console.log(allUsers);

    useEffect(() => {

      dispatch(getAllUser());
      // eslint-disable-next-line
    }, []);
    
    return (
      <>
      
    
        <div className="container">
          {
            <Grid container direction="column-reverse" spacing={3}>
              {allUsers.length > 0 ? (
                allUsers.map((i, index) => (
                  <Grid key={index} item>
                    <Profil user={i.id} username = {i.username}/>
                  </Grid>
                ))
              ) : (
                <p></p>
              )}
            </Grid>
          }
        </div>


      </>
    );
    
}

export default UsersProfile;