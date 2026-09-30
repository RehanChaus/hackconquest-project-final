import React, { useEffect, useRef, useState } from 'react';
import { useMap } from '@vis.gl/react-google-maps';
import { 
  PUNE_ZONES_GEOMETRY, 
  PUNE_FLOOD_DEPTH_CONTOURS, 
  PUNE_ROAD_CORRIDORS, 
  PUNE_EVACUATION_ROUTES,
  PUNE_HOSPITALS,
  LatLng
} from '../../data/puneGisData';
import { useCommand } from '../../context/CommandContext';

interface GoogleMapLayersProps {
  mapType: 'hybrid' | 'roadmap' | 'terrain';
  radarActive: boolean;
  radarStep: number;
  compareActive: boolean;
  compareDividerPct: number;
  depthLayerActive: boolean;
  vulnerabilityActive: boolean;
  onSelectSensor: (sensor: any) => void;
  onSelectRoad: (road: any) => void;
  onSelectHospital: (hospital: any) => void;
}

export const GoogleMapLayers: React.FC<GoogleMapLayersProps> = ({
  radarActive,
  radarStep,
  depthLayerActive,
  onSelectSensor,
  onSelectRoad,
  onSelectHospital,
}) => {
  const map = useMap();
  const {
    zones,
    sensors,
    incidents,
    resources,
    shelters,
    selectedZone,
    setSelectedZone,
    setSelectedZoneDrawerOpen,
    setSelectedIncident,
    setSelectedIncidentDrawerOpen,
    mapLayers,
    timelineIndex,
    isFlashFloodTriggered,
    isRecalculatingRoute,
  } = useCommand();

  // Storage for native google.maps overlays to manage clean teardowns
  const polygonsRef = useRef<google.maps.Polygon[]>([]);
  const depthPolygonsRef = useRef<google.maps.Polygon[]>([]);
  const roadLinesRef = useRef<google.maps.Polyline[]>([]);
  const routeLinesRef = useRef<google.maps.Polyline[]>([]);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const radarCircleRef = useRef<google.maps.Circle[]>([]);

  // 1. Manage Flood Risk Polygons
  useEffect(() => {
    if (!map) return;

    // Clear existing polygons
    polygonsRef.current.forEach(p => p.setMap(null));
    polygonsRef.current = [];

    if (!mapLayers.floodRisk) return;

    PUNE_ZONES_GEOMETRY.forEach(zoneGeo => {
      const liveZone = zones.find(z => z.id === zoneGeo.id);
      const riskLevel = liveZone ? liveZone.riskLevel : zoneGeo.riskLevel;
      const isSelected = selectedZone?.id === zoneGeo.id;

      // Select polygon coordinate set based on forecast timeline
      let coords: LatLng[] = zoneGeo.polygon;
      if (timelineIndex === 1) coords = zoneGeo.expandedPolygonH1;
      else if (timelineIndex === 2) coords = zoneGeo.expandedPolygonH3;
      else if (timelineIndex >= 3) coords = zoneGeo.expandedPolygonH6;

      let fillColor = '#20A464';
      let strokeColor = '#20A464';
      let fillOpacity = 0.25;

      if (riskLevel === 'CRITICAL') {
        fillColor = '#DC4545';
        strokeColor = '#DC4545';
        fillOpacity = isSelected ? 0.48 : 0.38;
      } else if (riskLevel === 'HIGH') {
        fillColor = '#ED7A2C';
        strokeColor = '#ED7A2C';
        fillOpacity = isSelected ? 0.42 : 0.32;
      } else if (riskLevel === 'MODERATE') {
        fillColor = '#E5A824';
        strokeColor = '#E5A824';
        fillOpacity = isSelected ? 0.38 : 0.28;
      }

      const polygon = new google.maps.Polygon({
        paths: coords,
        strokeColor,
        strokeOpacity: isSelected ? 1 : 0.85,
        strokeWeight: isSelected ? 3 : 2,
        fillColor,
        fillOpacity,
        map,
        zIndex: isSelected ? 20 : 10,
      });

      polygon.addListener('click', () => {
        if (liveZone) {
          setSelectedZone(liveZone);
          setSelectedZoneDrawerOpen(true);
        }
      });

      polygon.addListener('mouseover', () => {
        polygon.setOptions({
          fillOpacity: Math.min(0.6, fillOpacity + 0.12),
          strokeWeight: 3.5,
        });
      });

      polygon.addListener('mouseout', () => {
        polygon.setOptions({
          fillOpacity,
          strokeWeight: isSelected ? 3 : 2,
        });
      });

      polygonsRef.current.push(polygon);
    });

    return () => {
      polygonsRef.current.forEach(p => p.setMap(null));
      polygonsRef.current = [];
    };
  }, [map, zones, selectedZone, timelineIndex, mapLayers.floodRisk, setSelectedZone, setSelectedZoneDrawerOpen]);

  // 2. Manage Flood Depth Layer
  useEffect(() => {
    if (!map) return;

    depthPolygonsRef.current.forEach(p => p.setMap(null));
    depthPolygonsRef.current = [];

    if (!depthLayerActive) return;

    PUNE_FLOOD_DEPTH_CONTOURS.forEach(contour => {
      const polygon = new google.maps.Polygon({
        paths: contour.polygon,
        strokeColor: contour.color,
        strokeOpacity: 0.9,
        strokeWeight: 1.5,
        fillColor: contour.color,
        fillOpacity: contour.fillOpacity,
        map,
        zIndex: 15,
      });

      polygon.addListener('click', (e: google.maps.MapMouseEvent) => {
        // Trigger depth info in parent
        onSelectRoad({
          name: `Depth Contour: ${contour.depthRange}`,
          status: 'FLOOD_DEPTH',
          depthMeters: contour.depthMeters,
          closureRecommended: contour.depthMeters > 0.6,
        });
      });

      depthPolygonsRef.current.push(polygon);
    });

    return () => {
      depthPolygonsRef.current.forEach(p => p.setMap(null));
      depthPolygonsRef.current = [];
    };
  }, [map, depthLayerActive, onSelectRoad]);

  // 3. Manage Road Intelligence Overlays
  useEffect(() => {
    if (!map) return;

    roadLinesRef.current.forEach(r => r.setMap(null));
    roadLinesRef.current = [];

    PUNE_ROAD_CORRIDORS.forEach(road => {
      let strokeColor = '#20A464'; // Safe
      if (road.status === 'CAUTION') strokeColor = '#E5A824';
      if (road.status === 'UNSAFE' || road.status === 'CLOSED') strokeColor = '#DC4545';

      const polyline = new google.maps.Polyline({
        path: road.path,
        strokeColor,
        strokeOpacity: 0.9,
        strokeWeight: 5,
        map,
        zIndex: 25,
      });

      polyline.addListener('click', () => {
        onSelectRoad(road);
      });

      roadLinesRef.current.push(polyline);
    });

    return () => {
      roadLinesRef.current.forEach(r => r.setMap(null));
      roadLinesRef.current = [];
    };
  }, [map, onSelectRoad]);

  // 4. Manage Evacuation Routes
  useEffect(() => {
    if (!map) return;

    routeLinesRef.current.forEach(r => r.setMap(null));
    routeLinesRef.current = [];

    // Render Route A (Unsafe / Flooded via underpass)
    const lineA = new google.maps.Polyline({
      path: PUNE_EVACUATION_ROUTES.routeA_Unsafe.path,
      strokeColor: '#DC4545',
      strokeOpacity: 0.65,
      strokeWeight: 3.5,
      map,
      zIndex: 28,
    });
    routeLinesRef.current.push(lineA);

    // If flash flood is triggered and recalculating, show transition
    if (isFlashFloodTriggered && !isRecalculatingRoute) {
      // Recalculated Route D is active
      const lineD = new google.maps.Polyline({
        path: PUNE_EVACUATION_ROUTES.routeD_Recalculated.path,
        strokeColor: '#20A464',
        strokeOpacity: 0.95,
        strokeWeight: 5,
        map,
        zIndex: 32,
      });
      routeLinesRef.current.push(lineD);
    } else {
      // Standard Recommended Route C
      const lineC = new google.maps.Polyline({
        path: PUNE_EVACUATION_ROUTES.routeC_Recommended.path,
        strokeColor: isFlashFloodTriggered ? '#DC4545' : '#1677C8',
        strokeOpacity: 0.9,
        strokeWeight: 4.5,
        map,
        zIndex: 30,
      });
      routeLinesRef.current.push(lineC);
    }

    return () => {
      routeLinesRef.current.forEach(r => r.setMap(null));
      routeLinesRef.current = [];
    };
  }, [map, isFlashFloodTriggered, isRecalculatingRoute]);

  // 5. Manage Markers (Incidents, Sensors, Shelters, Hospitals, Resources)
  useEffect(() => {
    if (!map) return;

    markersRef.current.forEach(m => m.setMap(null));
    markersRef.current = [];

    // Incident Markers
    if (mapLayers.incidents) {
      incidents.forEach(inc => {
        const isCrit = inc.severity === 'CRITICAL';
        const marker = new google.maps.Marker({
          position: { lat: inc.lat, lng: inc.lng },
          map,
          title: inc.title,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: isCrit ? 9 : 7,
            fillColor: isCrit ? '#DC4545' : '#ED7A2C',
            fillOpacity: 1,
            strokeColor: '#FFFFFF',
            strokeWeight: 2.5,
          },
          zIndex: 40,
        });

        marker.addListener('click', () => {
          setSelectedIncident(inc);
          setSelectedIncidentDrawerOpen(true);
        });

        markersRef.current.push(marker);
      });
    }

    // Shelters Markers
    if (mapLayers.shelters) {
      shelters.forEach(sh => {
        const marker = new google.maps.Marker({
          position: { lat: sh.lat, lng: sh.lng },
          map,
          title: `Shelter: ${sh.name}`,
          icon: {
            path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
            scale: 6,
            fillColor: '#20A464',
            fillOpacity: 1,
            strokeColor: '#FFFFFF',
            strokeWeight: 2,
          },
          zIndex: 35,
        });
        markersRef.current.push(marker);
      });
    }

    // Hospitals Markers
    PUNE_HOSPITALS.forEach(hosp => {
      const marker = new google.maps.Marker({
        position: { lat: hosp.lat, lng: hosp.lng },
        map,
        title: hosp.name,
        icon: {
          path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
          scale: 5,
          fillColor: '#1677C8',
          fillOpacity: 1,
          strokeColor: '#FFFFFF',
          strokeWeight: 1.8,
        },
        zIndex: 34,
      });

      marker.addListener('click', () => {
        onSelectHospital(hosp);
      });

      markersRef.current.push(marker);
    });

    // Water Sensors
    if (mapLayers.waterLevel) {
      sensors.forEach(s => {
        const marker = new google.maps.Marker({
          position: { lat: s.lat, lng: s.lng },
          map,
          title: `Sensor ${s.code}: ${s.value}${s.unit}`,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 6,
            fillColor: '#16A6C9',
            fillOpacity: 1,
            strokeColor: '#FFFFFF',
            strokeWeight: 2,
          },
          zIndex: 38,
        });

        marker.addListener('click', () => {
          onSelectSensor(s);
        });

        markersRef.current.push(marker);
      });
    }

    // Resources
    if (mapLayers.resources) {
      resources.forEach(res => {
        const marker = new google.maps.Marker({
          position: { lat: res.lat, lng: res.lng },
          map,
          title: `${res.callsign} (${res.type})`,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 5.5,
            fillColor: '#12324A',
            fillOpacity: 1,
            strokeColor: '#3B9CE2',
            strokeWeight: 2,
          },
          zIndex: 36,
        });
        markersRef.current.push(marker);
      });
    }

    return () => {
      markersRef.current.forEach(m => m.setMap(null));
      markersRef.current = [];
    };
  }, [
    map,
    incidents,
    shelters,
    sensors,
    resources,
    mapLayers.incidents,
    mapLayers.shelters,
    mapLayers.waterLevel,
    mapLayers.resources,
    setSelectedIncident,
    setSelectedIncidentDrawerOpen,
    onSelectSensor,
    onSelectHospital,
  ]);

  // 6. Manage Rainfall Radar Simulation Overlay
  useEffect(() => {
    if (!map) return;

    radarCircleRef.current.forEach(c => c.setMap(null));
    radarCircleRef.current = [];

    if (!radarActive) return;

    // Cloudburst center moving downstream over Mutha river basin
    const radarCenterLat = 18.5300 + radarStep * 0.002;
    const radarCenterLng = 73.8600 + radarStep * 0.003;

    // 3 Concentric Doppler precipitation bands
    const outerBand = new google.maps.Circle({
      strokeColor: '#70BFFF',
      strokeOpacity: 0.6,
      strokeWeight: 1,
      fillColor: '#70BFFF',
      fillOpacity: 0.22,
      map,
      center: { lat: radarCenterLat, lng: radarCenterLng },
      radius: 4200,
      zIndex: 5,
    });

    const midBand = new google.maps.Circle({
      strokeColor: '#E5A824',
      strokeOpacity: 0.7,
      strokeWeight: 1.5,
      fillColor: '#E5A824',
      fillOpacity: 0.32,
      map,
      center: { lat: radarCenterLat, lng: radarCenterLng },
      radius: 2400,
      zIndex: 6,
    });

    const coreBand = new google.maps.Circle({
      strokeColor: '#DC4545',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#DC4545',
      fillOpacity: 0.42,
      map,
      center: { lat: radarCenterLat, lng: radarCenterLng },
      radius: 1100,
      zIndex: 7,
    });

    radarCircleRef.current = [outerBand, midBand, coreBand];

    return () => {
      radarCircleRef.current.forEach(c => c.setMap(null));
      radarCircleRef.current = [];
    };
  }, [map, radarActive, radarStep]);

  return null;
};
