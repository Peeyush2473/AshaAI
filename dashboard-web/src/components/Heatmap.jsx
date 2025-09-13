import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';  // Correct: Direct imports
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';  // Essential: Import Leaflet styles

// Fix default marker icons (prevents icon errors)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Mock GeoJSON for Bhopal Wards (from your code)
const bhopalGeoJSON = {
  "type": "FeatureCollection",
  "features": [
    { "type": "Feature", "properties": { "ward_id": 1, "ward_name": "Ward 1" }, "geometry": { "type": "Polygon", "coordinates": [[[77.3, 23.2], [77.4, 23.2], [77.4, 23.3], [77.3, 23.3], [77.3, 23.2]]] } },
    { "type": "Feature", "properties": { "ward_id": 2, "ward_name": "Ward 2" }, "geometry": { "type": "Polygon", "coordinates": [[[77.4, 23.2], [77.5, 23.2], [77.5, 23.3], [77.4, 23.3], [77.4, 23.2]]] } },
    { "type": "Feature", "properties": { "ward_id": 3, "ward_name": "Ward 3" }, "geometry": { "type": "Polygon", "coordinates": [[[77.3, 23.3], [77.4, 23.3], [77.4, 23.4], [77.3, 23.4], [77.3, 23.3]]] } }
  ]
};

// Mock Health Data (from your code)
const wardHealthData = {
  1: { risk: 'High', screenings: 152, highRiskCases: 25 },
  2: { risk: 'Low', screenings: 98, highRiskCases: 3 },
  3: { risk: 'Medium', screenings: 120, highRiskCases: 12 },
};

const Heatmap = () => {
  const [mapData, setMapData] = useState(null);

  useEffect(() => {
    // Simulate data fetch and merge
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
    <div className="legend-container" style={{ position: 'absolute', bottom: '20px', right: '20px', background: 'white', padding: '10px', borderRadius: '5px' }}>
      <h4>Risk Level</h4>
      <div><span style={{ display: 'inline-block', width: '15px', height: '15px', backgroundColor: '#c62828', marginRight: '5px' }}></span> High</div>
      <div><span style={{ display: 'inline-block', width: '15px', height: '15px', backgroundColor: '#f57c00', marginRight: '5px' }}></span> Medium</div>
      <div><span style={{ display: 'inline-block', width: '15px', height: '15px', backgroundColor: '#2e7d32', marginRight: '5px' }}></span> Low</div>
    </div>
  );

  if (!mapData) {
    return <div className="loading-map">Loading Map Data...</div>;
  }

  const mapPosition = [23.2599, 77.4126]; // Bhopal coordinates

  return (
    <div className="map-container-wrapper" style={{ height: '500px', width: '100%', position: 'relative' }}>
      <MapContainer center={mapPosition} zoom={12} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        <GeoJSON data={mapData} style={styleGeoJSON} onEachFeature={onEachFeature} />
      </MapContainer>
      <Legend />
    </div>
  );
};

export default Heatmap;