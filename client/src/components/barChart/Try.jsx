import React, { useEffect, useState } from "react";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, Cell } from 'recharts';
import axios from "axios";

const CustomBarChart = () => {
  const [data, setData] = useState([]);

  const getMostUsedArticles = async () => {
    try {
      const response = await axios.get('http://localhost:5000/getTopAndLeastUsedArticles', {
        withCredentials: true,
      });
      setData(response.data);
      console.log(response.data); 
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMostUsedArticles();
  }, []);

  // Sort data to ensure top-used articles are first
  const sortedData = [...data].sort((a, b) => b.nombreUtilisation - a.nombreUtilisation);
  const topArticles = sortedData.slice(0, 3).map(item => item.nomArticle);

  // Custom legend component
  const CustomLegend = () => (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', marginRight: 20 }}>
        <div style={{ width: 12, height: 12, backgroundColor: '#007bff', marginRight: 5 }}></div>
        <span>Les plus utilisés</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ width: 12, height: 12, backgroundColor: '#dc3545', marginRight: 5 }}></div>
        <span>Les moins utilisés</span>
      </div>
    </div>
  );

  return (
    <>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={sortedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nomArticle" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="nombreUtilisation" isAnimationActive={false}>
            {
              sortedData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={topArticles.includes(entry.nomArticle) ? "#007bff" : "#dc3545"} // Primary color for top three, danger for others
                />
              ))
            }
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <CustomLegend />
    </>
  );
};

export default CustomBarChart;
