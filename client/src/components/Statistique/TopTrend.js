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
            'rgba(255, 29, 10, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 29, 10, 1)',
          ],
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
          let somme=0 ; 
          topTrend.map((e,index) => {
            if (index<9) {
              tags.push(e.tag); 
              occurence.push(e.apparition);
            }
            else{
              somme+=e.apparition;
              if(index === topTrend.length-1){
                tags.push('Autres'); 
                occurence.push(somme);
              }
            }
          });
          let temp = {
            labels: tags, 
            datasets:[
              {
                label: 'Top trends',
                data: occurence,
                backgroundColor: [
                  'rgba(243, 176, 195, 0.2)',
                  'rgba(255, 204, 182, 0.2)',
                  'rgba(255, 255, 181, 0.2)',
                  'rgba(255, 150, 138, 0.2)',
                  'rgba(212, 240, 240, 0.2)',
                  'rgba(143, 202, 202, 0.2)',
                  'rgba(151, 193, 169, 0.2)',
                  'rgba(204, 173, 178, 0.2)',
                  'rgba(183, 234, 247, 0.2)',
                  'rgba(147, 129, 255, 0.2)',
                ],
                borderColor: [
                  'rgba(243, 176, 195, 1)',
                  'rgba(255, 204, 182, 1)',
                  'rgba(255, 255, 181, 1)',
                  'rgba(255, 150, 138, 1)',
                  'rgba(212, 240, 240, 1)',
                  'rgba(143, 202, 202, 1)',
                  'rgba(151, 193, 169, 1)',
                  'rgba(204, 173, 178, 1)',
                  'rgba(183, 234, 247, 1)',
                  'rgba(147, 129, 255, 1)',
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
          <center>
          <h4>Top Trend du mois</h4>
          </center>
            {
                topTrend !== null ? 
                <Doughnut data={dataDoghnut}/>: null
            }
        </div>
    )   
}

export default TopTrend; 