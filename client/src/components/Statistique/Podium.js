import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UidContext } from "../Appcontext";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { most_listened_users } from "../../actions/insights.actions"
import LeaderboardIcon from '@mui/icons-material/Leaderboard';


function Podium() {
    const mostListened = useSelector((state) => state.insightsReducer.getMostListenedResponse);
    const dispatch = useDispatch();
    const uid = useContext(UidContext);
    let current_year = new Date().getFullYear();


    useEffect(() => {
        //API call 
        dispatch(most_listened_users(uid));
    }, [])    

    return (
        <>
        <div>
        <div style={{display: "flex", flexDirection:"row"}}>
            <LeaderboardIcon style={{marginRight:"10"}}/>
            <h4>Les utilisateurs que j'écoute le plus sur l'année {current_year}</h4>
        </div>
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            { mostListened !== null ? 
                mostListened.map((data, index) => {
                return(
                    <div key={index}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt={data.username} />
                            </ListItemAvatar>
                            <ListItemText primary={data.username}/>
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </div>
                )
                })
                : 
                null
            }
          </List>
        </div>
        </>   
    ) 
  

}

export default Podium;
