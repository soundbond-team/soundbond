import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UidContext } from "../Appcontext";
import { get_number_follower } from "../../actions/insights.actions"
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

function NumberFollowers() {
    const numFollower = useSelector((state) => state.insightsReducer.getNumberFolllowerResponse);
    const dispatch = useDispatch();
    const uid = useContext(UidContext);
    const [diff,setDiff] = useState();
    const [dataBar, setDataBar] = useState({
        datasets: [
          {
            label: '',
            data: 0,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      });
    
    //API call
    useEffect(() => {
        dispatch(get_number_follower(uid)); 
    }, []);

    useEffect(() =>{
    
        if(numFollower){
          let values = [];
          let labels = []; 
          numFollower.map((e) => {
            e.map((i) => {
                values.push(i.nbFollowers);
                labels.push(i.month);
            }) 
          });
          setDiff((values[1]-values[0])/(values[0])*100);
          setDataBar({
            labels,
            datasets: [
              {
                label: 'Nombre de Followers',
                data: values,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
              },
            ],
          });
        }
    }, [numFollower])
    
    return(
        <>
        <div>
            <h4>Nombre de Followers</h4>
            <h6 style={{ color: 'red' }}>Evolution de {diff ? diff+' %' : null}</h6>
            <Bar data={dataBar}/>
        </div>
        </>
    )

    
}

export default NumberFollowers;
  