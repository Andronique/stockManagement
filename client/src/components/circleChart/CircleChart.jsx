import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const MyPieChart = () => {
  const [data, setData] = useState([]);
  const getMostUsedArticles = async () => {

    await axios.get('http://localhost:5000/getInkConsumptionByPAC', {
        withCredentials: true,
      }).then((res)=>{
        setData(res.data);console.log('mandeha', res.data)
      }).catch((err)=>console.log(err))
   
  };
  useEffect(() => {
    getMostUsedArticles();
  }, []);
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF3333', '#66CCFF'];


  // Custom label function
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    console.log(data[1].beneficiaire);
    
    const { beneficiaire, totalEncreConsommée } = data[index] || {};

    return (
      <text
        x={x}
        y={y}
        fill="black"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize={12}
      >
        {beneficiaire ? `${beneficiaire}: ${totalEncreConsommée}` : ''}
      </text>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={150}
          dataKey="totalEncreConsommée"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};


export default MyPieChart;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

// // Custom label function
// const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, index, data }) => {
//   const RADIAN = Math.PI / 180;
//   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//   const x = cx + radius * Math.cos(-midAngle * RADIAN);
//   const y = cy + radius * Math.sin(-midAngle * RADIAN);

//   return (
//     <text
//       x={x}
//       y={y}
//       fill="black"
//       textAnchor={x > cx ? 'start' : 'end'}
//       dominantBaseline="central"
//       fontSize={12}
//     >
//       {`${data[index].beneficiaire}: ${data[index].totalEncreConsommée}`}
//     </text>
//   );
// };

// function MyPieChart() {
//   const [data, setData] = useState([]);

//   const getMostUsedArticles = async () => {
//     try {
//       await axios.get('http://localhost:5000/getInkConsumptionByPAC', {
//         withCredentials: true,
//       }).then((res)=>{setData(res.data) ; console.log('mandeha' ,data)})
//       .catch((err)=>{console.log(err);})
  
//     } catch (err) {
//       console.log(err)
//     }
//   };

//   useEffect(() => {
//     getMostUsedArticles();
//   }, []);

//   return (
//     <ResponsiveContainer width="100%" height={400}>
//       <PieChart>
//         <Pie
//           data={data}
//           cx="50%"
//           cy="50%"
//           labelLine={false}
//           label={(props) => renderCustomizedLabel({ ...props, data })} // Pass data to the label function
//           outerRadius={150}
//           dataKey="totalEncreConsommée"
//         >
//           {data.map((entry, index) => (
//             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//           ))}
//         </Pie>
//         <Tooltip />
//       </PieChart>
//     </ResponsiveContainer>
//   );
// }

// export default MyPieChart;
