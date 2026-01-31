import React, { useEffect, useState } from "react";

export default function Api() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/personal")
      .then((res) => res.json())
      .then((result) => {
        console.log(result.data); 
        setData(result.data);
      })
      .catch((err) => console.error("Error fetching API data:", err));
  }, []);

  return (
    <div>
      {data.map((item) => (
        <div key={item._id}>
          <h3>{item.name}</h3>
          <h3>{item.skills}</h3>
          {
            item.skills.map((skill, index) => (
              <p key={index}>{skill}</p>
            ))
          }
          {item.education.map((edu, index) =>(
            <div key={index}>
              <h4>{edu.degree}</h4>
              <p>{edu.college} - {edu.year}</p>
              p<p>{edu.percentage}</p>
            </div>

          ))}
       
          <p>{item.email}</p>
        </div>
      ))}
    </div>
  );
}
