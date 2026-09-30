import React from 'react';
import { GoogleSatelliteMap } from './GoogleSatelliteMap';

export const GisCommandMap: React.FC = () => {
  return (
    <div className="w-full h-full relative overflow-hidden rounded-2xl">
      <GoogleSatelliteMap />
    </div>
  );
};

export default GisCommandMap;
