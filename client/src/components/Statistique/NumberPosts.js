import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UidContext } from "../Appcontext";
import { number_posts_during_period } from "../../actions/insights.actions"
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, CategoryScale,
    LinearScale,
    Title, 
    PointElement,
    LineElement,} from 'chart.js';
  
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
  
function NumberPosts() {
    const numberPost = useSelector((state) => state.insightsReducer.getNumberPostResponse);
    const dispatch = useDispatch();
    const uid = useContext(UidContext);
    let current_year = new Date().getFullYear();
    const [labels, setLabels] = useState(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);
    const [dataBar, setDataBar] = useState({
      labels,
      datasets: [
        {
          label: '',
          data: labels.map(() => 0),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    });
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: false,
          },
        },
    };


    useEffect(() => {
        dispatch(number_posts_during_period(uid)); 
    }, []);

    function getMonthName(monthNumber) {
        const date = new Date();
        date.setMonth(monthNumber-1);
        return date.toLocaleString('en-US', { month: 'long' });
    }    
    
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
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                  },
            ],
          });
        }
      }, [numberPost])

      return(
        <>
        <div>
            <h4>Nombre de posts publiés durant l'année {current_year}</h4>
            <Line options={options} data={dataBar} />  
        </div>
        </>  
      )
}

export default NumberPosts; 
