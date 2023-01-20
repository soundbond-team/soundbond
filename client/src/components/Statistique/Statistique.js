import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UidContext } from "../Appcontext";
import { most_listened_users, top_trend, number_posts_during_period, get_time_listening } from "../../actions/insights.actions"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Doughnut, Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale,
  LinearScale,
  BarElement,
  Title, } from 'chart.js';
import insightsReducer from "../../reducers/insightsReducer";
import { number } from "prop-types";
import {faker} from "@faker-js/faker"; 

ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


function Statistique() {
  const mostListened = useSelector((state) => state.insightsReducer.getMostListenedResponse);
  const topTrend = useSelector((state) => state.insightsReducer.getTopTrendResponse);
  const numberPost = useSelector((state) => state.insightsReducer.getNumberPostResponse);
  const timeListening = useSelector((state) => state.insightsReducer.getMostListenedResponse);
  const dispatch = useDispatch();
  const uid = useContext(UidContext);
  let current_year = new Date().getFullYear();
  let [dataDoghnut, setDataDoghnut] = useState({
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  });
  const [labels, setLabels] = useState(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);
  const [dataBar, setDataBar] = useState({
    labels,
    datasets: [
      {
        label: '',
        data: labels.map(() => 0),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  });
  const [dataBar2, setDataBar2] = useState({
    labels,
    datasets: [
      {
        label: '',
        data: labels.map(() => 0),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  });

  function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber-1);
  
    return date.toLocaleString('en-US', { month: 'long' });
  }

  useEffect(() => {
    dispatch(most_listened_users(uid));
    dispatch(top_trend());
    dispatch(number_posts_during_period(uid)); 
    dispatch(get_time_listening(uid, "d")); 
  }, []);

  useEffect(() => {
    if(topTrend){
      let tags = []; 
      let occurence = []; 
      topTrend.map(e => {
        tags.push(e.tag); 
        occurence.push(e.apparition);
        console.log("e: ", e);
      });
      let temp = {
        labels: tags, 
        datasets:[
          {
            label: 'Top trends',
            data: occurence,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          }
        ]
      }; 
      setDataDoghnut(temp); 
    }
  }, [topTrend])
  
  useEffect(() =>{
    if(numberPost){
      let values = new Array(12).fill(0)
      labels.map((l, index) => {
        numberPost.map(e => {
          if(getMonthName(parseInt(e.month)) === l){
            values[index] = e.nbPost; 
          }
        })
      })
      setDataBar({
        labels,
        datasets: [
          {
            label: 'Nombre de posts',
            data: values,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      });
    }
  }, [numberPost])

  useEffect(() =>{
    //let label = timeListening.date; 
    if(timeListening){
      console.log("timeListening: ", timeListening)    
    }
  }, [timeListening])


  return (
    <>
    <div>
      <h4>Les utilisateurs que j'écoute le plus sur l'année {current_year}</h4>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        { mostListened !== null ? 
        mostListened.map((data, index) => {
          return(
            <div>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={index} />
                </ListItemAvatar>
                <ListItemText
                  primary={data.username}
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </div>
          )
        }): null}
      </List>
      
      <h4>Top Trend du mois</h4>
      <div>
        {
          topTrend !== null ? 
          <Doughnut data={dataDoghnut}/>: null
        }
      </div>

      <h4>Nombre de posts postés durant l'année {current_year}</h4>
      <Bar data={dataBar}/>  

    </div>
    </>
  );
}
export default Statistique;
