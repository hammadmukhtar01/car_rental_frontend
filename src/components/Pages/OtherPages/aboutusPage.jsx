import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AboutusPage = () => {
  const [icons, setIcons] = useState([]);

  useEffect(() => {
    // Fetch icons when the component mounts
    const fetchIcons = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/simpleFeature/all');
        console.log("Vehicles Page data is: ", response.data);
        setIcons(response.data.simpleFeaturesData);
      } catch (error) {
        console.error('Error fetching icons:', error);
      }
    };

    fetchIcons();
  }, []);

  return (
    <div style={{padding: "20px"}}>
      <h2>Icon Gallery</h2>
      <table>
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Icon Name</th>
            <th>Icon</th>
          </tr>
        </thead>
        <tbody>
          {icons.map((icon, index) => (
            <tr key={icon._id}>
              <td>{index + 1}</td>
              <td>{icon.name}</td>
              <td>
                <img
                  src={`data:${icon.icon.contentType};base64,${btoa(
                    String.fromCharCode(...new Uint8Array(icon.icon.iconData.data))
                  )}`}
                  alt={icon.filename}
                  style={{ width: '50px', height: '50px' }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AboutusPage;
