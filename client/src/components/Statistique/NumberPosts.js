import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UidContext } from "../Appcontext";
import { number_posts_during_period, get_number_likes } from "../../actions/insights.actions"
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
    const numberLikes = useSelector((state) => state.insightsReducer.getNumberLikesResponse);
    const dispatch = useDispatch();
    const uid = useContext(UidContext);
    let current_year = new Date().getFullYear();
    const [labels, setLabels] = useState(['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']);
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

    //API calls
    useEffect(() => {
      dispatch(number_posts_during_period(uid)); 
      dispatch(get_number_likes(uid)); 
    }, []);

    function getMonthName(monthNumber) {
        const date = new Date();
        date.setMonth(monthNumber-1);
        return date.toLocaleString('en-US', { month: 'long' });
    }    
    
    useEffect(() =>{
        if(numberPost && numberLikes){
          let values = new Array(12).fill(0);
          let valuesLikes = new Array(12).fill(0);
          
          //Définion du tableau pour le graphique (nombre de posts)
          labels.map((l, index) => {
            numberPost.map(e => {
              if(getMonthName(parseInt(e.month)) === l){
                values[index] = e.nbPost; 
              }
            });
          })

          //Définion du tableau pour le graphique (nombre de likes)
          labels.map((l, index) => {
            numberLikes.map(e => {
              if(getMonthName(parseInt(e.month)) === l){
                valuesLikes[index] = e.nbLike; 
              }
            });
          });

          setDataBar({
            labels,
            datasets: [
              {
                label: 'Nombre de posts',
                data: values,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
              },
              {
                label: 'Nombre de likes',
                data: valuesLikes,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
              }
            ],
          });
        }
      }, [numberPost, numberLikes])

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
