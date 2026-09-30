export interface LatLng {
  lat: number;
  lng: number;
}

export interface GisZoneGeometry {
  id: string;
  code: string;
  name: string;
  riskLevel: 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW';
  riskScore: number;
  center: LatLng;
  polygon: LatLng[];
  expandedPolygonH1: LatLng[];
  expandedPolygonH3: LatLng[];
  expandedPolygonH6: LatLng[];
  depthMeters: number;
  depthTier: '0-0.3m' | '0.3-0.6m' | '0.6-1.0m' | '1.0-1.5m' | '>1.5m';
}

export interface DepthContour {
  id: string;
  zoneId: string;
  depthRange: string;
  depthMeters: number;
  color: string;
  fillOpacity: number;
  polygon: LatLng[];
}

export interface RoadSegment {
  id: string;
  name: string;
  status: 'SAFE' | 'CAUTION' | 'UNSAFE' | 'CLOSED';
  depthMeters: number;
  closureRecommended: boolean;
  path: LatLng[];
}

export interface Hospital {
  id: string;
  name: string;
  lat: number;
  lng: number;
  bedsAvailable: number;
  hasTraumaCenter: boolean;
  elevation: number;
}

export const PUNE_MAP_CENTER: LatLng = { lat: 18.5312, lng: 73.8654 };
export const PUNE_DEFAULT_ZOOM = 13;

export const PUNE_ZONES_GEOMETRY: GisZoneGeometry[] = [
  {
    id: 'zone-riverside',
    code: 'Z-01',
    name: 'Riverside Ward (Bund Garden Basin)',
    riskLevel: 'CRITICAL',
    riskScore: 87,
    center: { lat: 18.5365, lng: 73.8791 },
    depthMeters: 1.25,
    depthTier: '1.0-1.5m',
    polygon: [
      { lat: 18.5402, lng: 73.8725 },
      { lat: 18.5418, lng: 73.8795 },
      { lat: 18.5392, lng: 73.8868 },
      { lat: 18.5358, lng: 73.8895 },
      { lat: 18.5312, lng: 73.8850 },
      { lat: 18.5328, lng: 73.8762 },
      { lat: 18.5368, lng: 73.8720 },
    ],
    expandedPolygonH1: [
      { lat: 18.5415, lng: 73.8710 },
      { lat: 18.5435, lng: 73.8805 },
      { lat: 18.5405, lng: 73.8885 },
      { lat: 18.5348, lng: 73.8915 },
      { lat: 18.5298, lng: 73.8860 },
      { lat: 18.5315, lng: 73.8745 },
      { lat: 18.5375, lng: 73.8705 },
    ],
    expandedPolygonH3: [
      { lat: 18.5430, lng: 73.8695 },
      { lat: 18.5452, lng: 73.8818 },
      { lat: 18.5420, lng: 73.8905 },
      { lat: 18.5335, lng: 73.8935 },
      { lat: 18.5285, lng: 73.8875 },
      { lat: 18.5300, lng: 73.8730 },
      { lat: 18.5385, lng: 73.8690 },
    ],
    expandedPolygonH6: [
      { lat: 18.5442, lng: 73.8680 },
      { lat: 18.5468, lng: 73.8830 },
      { lat: 18.5432, lng: 73.8920 },
      { lat: 18.5325, lng: 73.8950 },
      { lat: 18.5270, lng: 73.8890 },
      { lat: 18.5285, lng: 73.8715 },
      { lat: 18.5395, lng: 73.8675 },
    ],
  },
  {
    id: 'zone-sangamwadi',
    code: 'Z-02',
    name: 'Sangamwadi Confluence Axis',
    riskLevel: 'CRITICAL',
    riskScore: 81,
    center: { lat: 18.5284, lng: 73.8642 },
    depthMeters: 1.10,
    depthTier: '1.0-1.5m',
    polygon: [
      { lat: 18.5345, lng: 73.8585 },
      { lat: 18.5370, lng: 73.8648 },
      { lat: 18.5325, lng: 73.8715 },
      { lat: 18.5260, lng: 73.8688 },
      { lat: 18.5242, lng: 73.8622 },
      { lat: 18.5280, lng: 73.8575 },
    ],
    expandedPolygonH1: [
      { lat: 18.5358, lng: 73.8572 },
      { lat: 18.5385, lng: 73.8660 },
      { lat: 18.5338, lng: 73.8730 },
      { lat: 18.5248, lng: 73.8702 },
      { lat: 18.5228, lng: 73.8610 },
      { lat: 18.5270, lng: 73.8560 },
    ],
    expandedPolygonH3: [
      { lat: 18.5370, lng: 73.8560 },
      { lat: 18.5400, lng: 73.8672 },
      { lat: 18.5350, lng: 73.8745 },
      { lat: 18.5235, lng: 73.8715 },
      { lat: 18.5215, lng: 73.8598 },
      { lat: 18.5260, lng: 73.8548 },
    ],
    expandedPolygonH6: [
      { lat: 18.5385, lng: 73.8548 },
      { lat: 18.5415, lng: 73.8685 },
      { lat: 18.5362, lng: 73.8760 },
      { lat: 18.5222, lng: 73.8728 },
      { lat: 18.5202, lng: 73.8585 },
      { lat: 18.5250, lng: 73.8535 },
    ],
  },
  {
    id: 'zone-deccan',
    code: 'Z-03',
    name: 'Deccan Gymkhana & Pulachi Wadi',
    riskLevel: 'HIGH',
    riskScore: 74,
    center: { lat: 18.5165, lng: 73.8415 },
    depthMeters: 0.85,
    depthTier: '0.6-1.0m',
    polygon: [
      { lat: 18.5225, lng: 73.8370 },
      { lat: 18.5250, lng: 73.8445 },
      { lat: 18.5198, lng: 73.8490 },
      { lat: 18.5135, lng: 73.8455 },
      { lat: 18.5115, lng: 73.8385 },
      { lat: 18.5160, lng: 73.8355 },
    ],
    expandedPolygonH1: [
      { lat: 18.5238, lng: 73.8358 },
      { lat: 18.5265, lng: 73.8458 },
      { lat: 18.5210, lng: 73.8505 },
      { lat: 18.5122, lng: 73.8468 },
      { lat: 18.5100, lng: 73.8372 },
      { lat: 18.5150, lng: 73.8340 },
    ],
    expandedPolygonH3: [
      { lat: 18.5250, lng: 73.8345 },
      { lat: 18.5280, lng: 73.8470 },
      { lat: 18.5222, lng: 73.8520 },
      { lat: 18.5110, lng: 73.8480 },
      { lat: 18.5085, lng: 73.8360 },
      { lat: 18.5140, lng: 73.8328 },
    ],
    expandedPolygonH6: [
      { lat: 18.5265, lng: 73.8332 },
      { lat: 18.5295, lng: 73.8485 },
      { lat: 18.5235, lng: 73.8535 },
      { lat: 18.5098, lng: 73.8492 },
      { lat: 18.5070, lng: 73.8348 },
      { lat: 18.5130, lng: 73.8315 },
    ],
  },
  {
    id: 'zone-yerwada',
    code: 'Z-04',
    name: 'Yerwada Flood Plain',
    riskLevel: 'HIGH',
    riskScore: 65,
    center: { lat: 18.5528, lng: 73.8821 },
    depthMeters: 0.65,
    depthTier: '0.6-1.0m',
    polygon: [
      { lat: 18.5585, lng: 73.8755 },
      { lat: 18.5615, lng: 73.8855 },
      { lat: 18.5538, lng: 73.8925 },
      { lat: 18.5465, lng: 73.8865 },
      { lat: 18.5490, lng: 73.8775 },
    ],
    expandedPolygonH1: [
      { lat: 18.5598, lng: 73.8742 },
      { lat: 18.5630, lng: 73.8868 },
      { lat: 18.5550, lng: 73.8940 },
      { lat: 18.5452, lng: 73.8878 },
      { lat: 18.5478, lng: 73.8762 },
    ],
    expandedPolygonH3: [
      { lat: 18.5612, lng: 73.8730 },
      { lat: 18.5645, lng: 73.8882 },
      { lat: 18.5562, lng: 73.8955 },
      { lat: 18.5438, lng: 73.8890 },
      { lat: 18.5465, lng: 73.8748 },
    ],
    expandedPolygonH6: [
      { lat: 18.5625, lng: 73.8718 },
      { lat: 18.5660, lng: 73.8895 },
      { lat: 18.5575, lng: 73.8970 },
      { lat: 18.5425, lng: 73.8902 },
      { lat: 18.5452, lng: 73.8735 },
    ],
  },
  {
    id: 'zone-shivajinagar',
    code: 'Z-05',
    name: 'Shivajinagar Lowlands',
    riskLevel: 'MODERATE',
    riskScore: 58,
    center: { lat: 18.5312, lng: 73.8445 },
    depthMeters: 0.45,
    depthTier: '0.3-0.6m',
    polygon: [
      { lat: 18.5365, lng: 73.8415 },
      { lat: 18.5390, lng: 73.8515 },
      { lat: 18.5318, lng: 73.8545 },
      { lat: 18.5260, lng: 73.8475 },
      { lat: 18.5285, lng: 73.8400 },
    ],
    expandedPolygonH1: [
      { lat: 18.5378, lng: 73.8402 },
      { lat: 18.5405, lng: 73.8528 },
      { lat: 18.5330, lng: 73.8560 },
      { lat: 18.5248, lng: 73.8488 },
      { lat: 18.5272, lng: 73.8388 },
    ],
    expandedPolygonH3: [
      { lat: 18.5390, lng: 73.8390 },
      { lat: 18.5420, lng: 73.8540 },
      { lat: 18.5342, lng: 73.8572 },
      { lat: 18.5235, lng: 73.8500 },
      { lat: 18.5260, lng: 73.8375 },
    ],
    expandedPolygonH6: [
      { lat: 18.5402, lng: 73.8378 },
      { lat: 18.5435, lng: 73.8552 },
      { lat: 18.5355, lng: 73.8585 },
      { lat: 18.5222, lng: 73.8512 },
      { lat: 18.5248, lng: 73.8362 },
    ],
  },
  {
    id: 'zone-koregaon',
    code: 'Z-06',
    name: 'Koregaon Park Nullah Corridor',
    riskLevel: 'MODERATE',
    riskScore: 48,
    center: { lat: 18.5361, lng: 73.8938 },
    depthMeters: 0.35,
    depthTier: '0.3-0.6m',
    polygon: [
      { lat: 18.5425, lng: 73.8875 },
      { lat: 18.5465, lng: 73.8985 },
      { lat: 18.5395, lng: 73.9065 },
      { lat: 18.5315, lng: 73.8995 },
      { lat: 18.5340, lng: 73.8895 },
    ],
    expandedPolygonH1: [
      { lat: 18.5438, lng: 73.8862 },
      { lat: 18.5480, lng: 73.8998 },
      { lat: 18.5408, lng: 73.9080 },
      { lat: 18.5302, lng: 73.9008 },
      { lat: 18.5328, lng: 73.8882 },
    ],
    expandedPolygonH3: [
      { lat: 18.5450, lng: 73.8850 },
      { lat: 18.5495, lng: 73.9010 },
      { lat: 18.5420, lng: 73.9095 },
      { lat: 18.5290, lng: 73.9020 },
      { lat: 18.5315, lng: 73.8870 },
    ],
    expandedPolygonH6: [
      { lat: 18.5462, lng: 73.8838 },
      { lat: 18.5510, lng: 73.9022 },
      { lat: 18.5432, lng: 73.9110 },
      { lat: 18.5278, lng: 73.9032 },
      { lat: 18.5302, lng: 73.8858 },
    ],
  },
  {
    id: 'zone-katraj',
    code: 'Z-07',
    name: 'Katraj Lake Downstream Nullah',
    riskLevel: 'LOW',
    riskScore: 32,
    center: { lat: 18.4575, lng: 73.8677 },
    depthMeters: 0.22,
    depthTier: '0-0.3m',
    polygon: [
      { lat: 18.4625, lng: 73.8605 },
      { lat: 18.4655, lng: 73.8725 },
      { lat: 18.4545, lng: 73.8765 },
      { lat: 18.4495, lng: 73.8675 },
      { lat: 18.4535, lng: 73.8585 },
    ],
    expandedPolygonH1: [
      { lat: 18.4638, lng: 73.8592 },
      { lat: 18.4670, lng: 73.8738 },
      { lat: 18.4558, lng: 73.8780 },
      { lat: 18.4482, lng: 73.8688 },
      { lat: 18.4522, lng: 73.8572 },
    ],
    expandedPolygonH3: [
      { lat: 18.4650, lng: 73.8580 },
      { lat: 18.4685, lng: 73.8750 },
      { lat: 18.4570, lng: 73.8795 },
      { lat: 18.4470, lng: 73.8700 },
      { lat: 18.4510, lng: 73.8560 },
    ],
    expandedPolygonH6: [
      { lat: 18.4662, lng: 73.8568 },
      { lat: 18.4700, lng: 73.8762 },
      { lat: 18.4582, lng: 73.8810 },
      { lat: 18.4458, lng: 73.8712 },
      { lat: 18.4498, lng: 73.8548 },
    ],
  },
  {
    id: 'zone-hadapsar',
    code: 'Z-08',
    name: 'Hadapsar Industrial & IT Belt',
    riskLevel: 'LOW',
    riskScore: 24,
    center: { lat: 18.5089, lng: 73.9259 },
    depthMeters: 0.15,
    depthTier: '0-0.3m',
    polygon: [
      { lat: 18.5145, lng: 73.9175 },
      { lat: 18.5175, lng: 73.9315 },
      { lat: 18.5055, lng: 73.9365 },
      { lat: 18.5005, lng: 73.9235 },
      { lat: 18.5060, lng: 73.9155 },
    ],
    expandedPolygonH1: [
      { lat: 18.5158, lng: 73.9162 },
      { lat: 18.5190, lng: 73.9328 },
      { lat: 18.5068, lng: 73.9380 },
      { lat: 18.4992, lng: 73.9248 },
      { lat: 18.5048, lng: 73.9142 },
    ],
    expandedPolygonH3: [
      { lat: 18.5170, lng: 73.9150 },
      { lat: 18.5205, lng: 73.9340 },
      { lat: 18.5080, lng: 73.9395 },
      { lat: 18.4980, lng: 73.9260 },
      { lat: 18.5035, lng: 73.9130 },
    ],
    expandedPolygonH6: [
      { lat: 18.5182, lng: 73.9138 },
      { lat: 18.5220, lng: 73.9352 },
      { lat: 18.5092, lng: 73.9410 },
      { lat: 18.4968, lng: 73.9272 },
      { lat: 18.5022, lng: 73.9118 },
    ],
  },
];

export const PUNE_FLOOD_DEPTH_CONTOURS: DepthContour[] = [
  // Deep channel contour (>1.5m)
  {
    id: 'depth-c1',
    zoneId: 'zone-riverside',
    depthRange: '>1.5m',
    depthMeters: 1.62,
    color: '#0A355C',
    fillOpacity: 0.65,
    polygon: [
      { lat: 18.5385, lng: 73.8760 },
      { lat: 18.5398, lng: 73.8820 },
      { lat: 18.5375, lng: 73.8855 },
      { lat: 18.5345, lng: 73.8830 },
      { lat: 18.5355, lng: 73.8770 },
    ],
  },
  // 1.0 - 1.5m contour
  {
    id: 'depth-c2',
    zoneId: 'zone-riverside',
    depthRange: '1.0-1.5m',
    depthMeters: 1.25,
    color: '#0F5594',
    fillOpacity: 0.55,
    polygon: [
      { lat: 18.5395, lng: 73.8745 },
      { lat: 18.5410, lng: 73.8810 },
      { lat: 18.5385, lng: 73.8860 },
      { lat: 18.5335, lng: 73.8845 },
      { lat: 18.5340, lng: 73.8755 },
    ],
  },
  // 0.6 - 1.0m contour (Sangamwadi confluence)
  {
    id: 'depth-c3',
    zoneId: 'zone-sangamwadi',
    depthRange: '0.6-1.0m',
    depthMeters: 0.88,
    color: '#1677C8',
    fillOpacity: 0.45,
    polygon: [
      { lat: 18.5330, lng: 73.8610 },
      { lat: 18.5350, lng: 73.8660 },
      { lat: 18.5305, lng: 73.8690 },
      { lat: 18.5265, lng: 73.8660 },
      { lat: 18.5285, lng: 73.8605 },
    ],
  },
  // 0.3 - 0.6m contour (Deccan)
  {
    id: 'depth-c4',
    zoneId: 'zone-deccan',
    depthRange: '0.3-0.6m',
    depthMeters: 0.52,
    color: '#3B9CE2',
    fillOpacity: 0.38,
    polygon: [
      { lat: 18.5205, lng: 73.8395 },
      { lat: 18.5225, lng: 73.8445 },
      { lat: 18.5175, lng: 73.8465 },
      { lat: 18.5145, lng: 73.8425 },
      { lat: 18.5165, lng: 73.8385 },
    ],
  },
  // 0 - 0.3m shallow contour (Shivajinagar)
  {
    id: 'depth-c5',
    zoneId: 'zone-shivajinagar',
    depthRange: '0-0.3m',
    depthMeters: 0.22,
    color: '#70BFFF',
    fillOpacity: 0.28,
    polygon: [
      { lat: 18.5340, lng: 73.8435 },
      { lat: 18.5365, lng: 73.8495 },
      { lat: 18.5305, lng: 73.8520 },
      { lat: 18.5275, lng: 73.8465 },
      { lat: 18.5295, lng: 73.8420 },
    ],
  },
];

export const PUNE_ROAD_CORRIDORS: RoadSegment[] = [
  {
    id: 'road-underpass',
    name: 'Riverside Road Underpass',
    status: 'UNSAFE',
    depthMeters: 0.82,
    closureRecommended: true,
    path: [
      { lat: 18.5385, lng: 73.8745 },
      { lat: 18.5372, lng: 73.8778 },
      { lat: 18.5358, lng: 73.8812 },
    ],
  },
  {
    id: 'road-bund-bridge',
    name: 'Bund Garden Old Bridge',
    status: 'CAUTION',
    depthMeters: 0.28,
    closureRecommended: false,
    path: [
      { lat: 18.5410, lng: 73.8790 },
      { lat: 18.5380, lng: 73.8820 },
      { lat: 18.5355, lng: 73.8850 },
    ],
  },
  {
    id: 'road-deccan-flyover',
    name: 'Deccan Elevated Flyover (JM Road)',
    status: 'SAFE',
    depthMeters: 0.0,
    closureRecommended: false,
    path: [
      { lat: 18.5240, lng: 73.8430 },
      { lat: 18.5265, lng: 73.8480 },
      { lat: 18.5285, lng: 73.8520 },
    ],
  },
  {
    id: 'road-sangam-bridge',
    name: 'Sangam Bridge Confluence Crossing',
    status: 'CAUTION',
    depthMeters: 0.35,
    closureRecommended: false,
    path: [
      { lat: 18.5330, lng: 73.8610 },
      { lat: 18.5305, lng: 73.8655 },
      { lat: 18.5270, lng: 73.8690 },
    ],
  },
  {
    id: 'road-ambedkar',
    name: 'Dr. Ambedkar Road Arterial Corridor',
    status: 'SAFE',
    depthMeters: 0.0,
    closureRecommended: false,
    path: [
      { lat: 18.5350, lng: 73.8750 },
      { lat: 18.5320, lng: 73.8680 },
      { lat: 18.5295, lng: 73.8580 },
      { lat: 18.5280, lng: 73.8515 },
    ],
  },
];

export const PUNE_EVACUATION_ROUTES = {
  routeC_Recommended: {
    id: 'route-c',
    name: 'Recommended Corridor (via Dr. Ambedkar Road to Shelter S-04)',
    durationMin: 11,
    distanceKm: 4.7,
    safetyScore: 92,
    status: 'SAFE',
    color: '#1677C8',
    path: [
      { lat: 18.5365, lng: 73.8790 },
      { lat: 18.5350, lng: 73.8745 },
      { lat: 18.5320, lng: 73.8670 },
      { lat: 18.5298, lng: 73.8585 },
      { lat: 18.5290, lng: 73.8510 }, // Shelter S-04
    ],
  },
  routeA_Unsafe: {
    id: 'route-a',
    name: 'Route A (via Riverside Underpass - FLOODED)',
    durationMin: 19,
    distanceKm: 3.2,
    safetyScore: 18,
    status: 'UNSAFE',
    color: '#DC4545',
    path: [
      { lat: 18.5365, lng: 73.8790 },
      { lat: 18.5385, lng: 73.8745 },
      { lat: 18.5372, lng: 73.8778 }, // Submerged underpass
      { lat: 18.5358, lng: 73.8812 },
      { lat: 18.5310, lng: 73.8650 },
      { lat: 18.5290, lng: 73.8510 },
    ],
  },
  routeD_Recalculated: {
    id: 'route-d',
    name: 'Route D (AI Recalculated Safe Corridor via Deccan Flyover)',
    durationMin: 14,
    distanceKm: 5.4,
    safetyScore: 96,
    status: 'SAFE',
    color: '#20A464',
    path: [
      { lat: 18.5365, lng: 73.8790 },
      { lat: 18.5390, lng: 73.8850 },
      { lat: 18.5440, lng: 73.8820 },
      { lat: 18.5420, lng: 73.8680 },
      { lat: 18.5350, lng: 73.8540 },
      { lat: 18.5290, lng: 73.8510 }, // Shelter S-04
    ],
  },
};

export const PUNE_HOSPITALS: Hospital[] = [
  {
    id: 'hosp-sassoon',
    name: 'Sassoon General Medical Hospital',
    lat: 18.5255,
    lng: 73.8690,
    bedsAvailable: 84,
    hasTraumaCenter: true,
    elevation: 552,
  },
  {
    id: 'hosp-jeevan',
    name: 'Jeevan Raksha Memorial Trauma Hospital',
    lat: 18.5380,
    lng: 73.8760,
    bedsAvailable: 32,
    hasTraumaCenter: true,
    elevation: 546,
  },
  {
    id: 'hosp-deccan',
    name: 'Deccan Speciality Care Hospital',
    lat: 18.5170,
    lng: 73.8420,
    bedsAvailable: 46,
    hasTraumaCenter: true,
    elevation: 554,
  },
  {
    id: 'hosp-noble',
    name: 'Noble Multispeciality Hospital',
    lat: 18.5080,
    lng: 73.9270,
    bedsAvailable: 95,
    hasTraumaCenter: false,
    elevation: 562,
  },
];
