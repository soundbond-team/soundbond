import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UidContext } from "../Appcontext";
import { top_trend } from "../../actions/insights.actions"
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
  
ChartJS.register(ArcElement, Tooltip, Legend);

function TopTrend() {
    const topTrend = useSelector((state) => state.insightsReducer.getTopTrendResponse);
    const dispatch = useDispatch();
    const uid = useContext(UidContext);
    let [dataDoghnut, setDataDoghnut] = useState({
      datasets: [
        {
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
      ]
    });

    //API call 
    useEffect(() => {
        dispatch(top_trend());
    }, []); 
    
    useEffect(() => {
        if(topTrend){
          let tags = []; 
          let occurence = []; 
          topTrend.map(e => {
            tags.push(e.tag); 
            occurence.push(e.apparition);
          });
          let temp = {
            labels: tags, 
            datasets:[
              {
                label: 'Top trends',
                data: occurence,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 2, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 2, 235, 1)',
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
    
    return(
        <div>
            <h4>Top Trend du mois</h4>
            {
                topTrend !== null ? 
                <Doughnut data={dataDoghnut}/>: null
            }
        </div>
    )   
}

export default TopTrend; 