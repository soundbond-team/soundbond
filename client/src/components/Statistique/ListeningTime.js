import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UidContext } from "../Appcontext";
import { get_time_listening } from "../../actions/insights.actions"
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, CategoryScale,
  LinearScale,
  BarElement,
  Title, } from 'chart.js';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function ListeningTime() {
    const timeListening = useSelector((state) => state.insightsReducer.getTimeListeningResponse);
    const dispatch = useDispatch();
    const uid = useContext(UidContext);
    const [dataBar, setDataBar] = useState({
        datasets: [
          {
            label: '',
            data: 0,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      });
    const [alignment, setAlignment] = useState('d');
    
    //API call
    useEffect(() => {
        dispatch(get_time_listening(uid, "d")); 
    }, []);

    useEffect(() =>{
        let typeT = '';
        //Fonction de conversion 
        function msToTime(ms) {
          let seconds = (ms / 1000).toFixed(1);
          let minutes = (ms / (1000 * 60)).toFixed(1);
          let hours = (ms / (1000 * 60 * 60)).toFixed(1);
          let days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
          if (seconds < 60){
            typeT="Secondes"
            return seconds;
          } 
          else if (minutes < 60){
            typeT="Minute(s)"
            return minutes;
          } 
          else if (hours < 24){
            typeT="Heure(s)"
            return hours;
          } 
          else{
            typeT="Jour(s)"
            return days
          } 
        }
    
        if(timeListening){
          let values = [];
          let labels = []; 
          timeListening.map(e => {
            values.push(msToTime(e.duree));
            labels.push(e.date); 
          });
          setDataBar({
            labels,
            datasets: [
              {
                label: 'Durée d\'écoute en ' + typeT,
                data: values,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
              },
            ],
          });
        }
    }, [timeListening])
    
    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
      ) => {
        console.log("timelaps: ", newAlignment);
        dispatch(get_time_listening(uid, newAlignment))
        setAlignment(newAlignment);
    };
    
    return(
        <>
        <div>
            <h4>Durée d'écoute</h4>
            <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
            >
                <ToggleButton value="d">JOUR</ToggleButton>
                <ToggleButton value="m">MOIS</ToggleButton>
                <ToggleButton value="y">ANNEE</ToggleButton>
                </ToggleButtonGroup>
            <Bar data={dataBar}/>
        </div>
        </>
    )

    
}

export default ListeningTime;
  