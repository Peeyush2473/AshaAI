import React, { useState, useEffect } from 'react';

// react-leaflet se components ab window object se aayenge
const { MapContainer, TileLayer, GeoJSON, Popup } = window.ReactLeaflet;

// --- MOCK DATA (Asli app mein yeh API se aayega) ---

// 1. Bhopal Wards ke liye Mock GeoJSON
const bhopalGeoJSON = {
  "type": "FeatureCollection",
  "features": [
    { "type": "Feature", "properties": { "ward_id": 1, "ward_name": "Ward 1" }, "geometry": { "type": "Polygon", "coordinates": [ [ [77.3, 23.2], [77.4, 23.2], [77.4, 23.3], [77.3, 23.3], [77.3, 23.2] ] ] } },
    { "type": "Feature", "properties": { "ward_id": 2, "ward_name": "Ward 2" }, "geometry": { "type": "Polygon", "coordinates": [ [ [77.4, 23.2], [77.5, 23.2], [77.5, 23.3], [77.4, 23.3], [77.4, 23.2] ] ] } },
    { "type": "Feature", "properties": { "ward_id": 3, "ward_name": "Ward 3" }, "geometry": { "type": "Polygon", "coordinates": [ [ [77.3, 23.3], [77.4, 23.3], [77.4, 23.4], [77.3, 23.4], [77.3, 23.3] ] ] } }
  ]
};

// 2. Health Data ka Mockup
const wardHealthData = {
  1: { risk: 'High', screenings: 152, highRiskCases: 25 },
  2: { risk: 'Low', screenings: 98, highRiskCases: 3 },
  3: { risk: 'Medium', screenings: 120, highRiskCases: 12 },
};

// --- COMPONENT LOGIC ---

const Heatmap = () => {
  const [mapData, setMapData] = useState(null);

  useEffect(() => {
    // Data fetch aur merge karne ka simulation
    const mergedData = {
      ...bhopalGeoJSON,
      features: bhopalGeoJSON.features.map(feature => ({
        ...feature,
        properties: {
          ...feature.properties,
          ...wardHealthData[feature.properties.ward_id]
        }
      }))
    };
    setMapData(mergedData);
  }, []);

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'High': return '#c62828';
      case 'Medium': return '#f57c00';
      case 'Low': return '#2e7d32';
      default: return '#9e9e9e';
    }
  };

  const styleGeoJSON = (feature) => ({
    fillColor: getRiskColor(feature.properties.risk),
    weight: 1,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.7
  });

  const onEachFeature = (feature, layer) => {
    const { ward_name, risk, screenings, highRiskCases } = feature.properties;
    if (ward_name) {
      layer.bindPopup(`
        <strong>${ward_name}</strong><br/>
        Risk Level: <strong>${risk || 'N/A'}</strong><br/>
        Total Screenings: ${screenings || 0}<br/>
        High-Risk Cases: ${highRiskCases || 0}
      `);
    }
  };

  const Legend = () => (
    <div className="leaflet-bottom leaflet-right">
      <div className="legend-container">
        <h4>Risk Level</h4>
        <div><span className="legend-color-box" style={{backgroundColor: '#c62828'}}></span> High</div>
        <div><span className="legend-color-box" style={{backgroundColor: '#f57c00'}}></span> Medium</div>
        <div><span className="legend-color-box" style={{backgroundColor: '#2e7d32'}}></span> Low</div>
      </div>
    </div>
  );

  if (!mapData) {
    return <div className="loading-map">Loading Map Data...</div>;
  }
  
  const mapPosition = [23.2599, 77.4126];

  return (
    <div className="map-container-wrapper">
      <MapContainer center={mapPosition} zoom={12} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        <GeoJSON 
          data={mapData} 
          style={styleGeoJSON} 
          onEachFeature={onEachFeature}
        />
        {/* Legend ko MapContainer ke andar daalna zaroori hai */}
      </MapContainer>
      <Legend /> 
    </div>
  );
};

export default Heatmap;

