import React from 'react';
// Sample Projects
export const sampleProjects = [{
  id: '1',
  name: 'Offshore Wind Farm Installation',
  location: 'North Sea',
  country: 'Netherlands',
  type: 'energy' as const,
  description: 'Installation of 15 wind turbines in the North Sea, including foundations, towers, and electrical connections.',
  status: 'ongoing' as const
}, {
  id: '2',
  name: 'Mining Equipment Transport',
  location: 'Perth',
  country: 'Australia',
  type: 'mining' as const,
  description: 'Transportation of heavy mining equipment from port to inland mining site, including loading, transport, and installation.',
  status: 'ongoing' as const
}, {
  id: '3',
  name: 'Oil Platform Decommissioning',
  location: 'Gulf of Mexico',
  country: 'USA',
  type: 'oil&gas' as const,
  description: 'Safe decommissioning and removal of an aging oil platform, including dismantling, lifting, and transport operations.',
  status: 'finished' as const
}];
// Sample Work Method Statements
export const sampleWorkMethods = [{
  id: '101',
  documentNumber: 'WMS-2023-001',
  revision: 'A',
  title: 'Wind Turbine Installation Procedure',
  operationTypes: ['Marine', 'Installation', 'Lifting'],
  date: '2023-05-15',
  location: 'North Sea Sector 4',
  projectId: '1'
}, {
  id: '102',
  documentNumber: 'WMS-2023-002',
  revision: 'B',
  title: 'Foundation Pile Driving',
  operationTypes: ['Marine', 'Installation'],
  date: '2023-04-20',
  location: 'North Sea Sector 4',
  projectId: '1'
}, {
  id: '103',
  documentNumber: 'WMS-2023-003',
  revision: 'A',
  title: 'Heavy Haul Transport Protocol',
  operationTypes: ['Transport', 'Skidding'],
  date: '2023-06-10',
  location: 'Perth to Kalgoorlie Route',
  projectId: '2'
}];
// Sample Cargo Items
export const sampleCargoes = [{
  id: '201',
  tagNumber: 'WT-101',
  description: 'Wind Turbine Blade',
  dimensions: {
    length: 8500,
    width: 350,
    height: 150
  },
  weight: 22000,
  attachments: [{
    type: 'pdf',
    url: 'https://example.com/specs.pdf',
    name: 'Blade_Specs.pdf'
  }],
  workMethodId: '101'
}, {
  id: '202',
  tagNumber: 'WT-102',
  description: 'Wind Turbine Nacelle',
  dimensions: {
    length: 1200,
    width: 400,
    height: 350
  },
  weight: 85000,
  attachments: [{
    type: 'pdf',
    url: 'https://example.com/specs.pdf',
    name: 'Nacelle_Specs.pdf'
  }, {
    type: 'image',
    url: 'https://www.energy.gov/sites/default/files/styles/full_article_width/public/2021-08/land-based-wind-photo-01.jpg',
    name: 'Nacelle_Image.jpg'
  }],
  workMethodId: '101'
}, {
  id: '203',
  tagNumber: 'FP-101',
  description: 'Foundation Pile',
  dimensions: {
    length: 5000,
    width: 200,
    height: 200
  },
  weight: 32000,
  attachments: [],
  workMethodId: '102'
}, {
  id: '204',
  tagNumber: 'ME-101',
  description: 'Excavator CAT 390F',
  dimensions: {
    length: 1180,
    width: 400,
    height: 500
  },
  weight: 90000,
  attachments: [{
    type: 'image',
    url: 'https://s7d2.scene7.com/is/image/Caterpillar/CM20200421-32550-21794',
    name: 'Excavator.jpg'
  }],
  workMethodId: '103'
}];
// Sample Operations
export const sampleOperations = [{
  id: '301',
  selectedOperation: 'Lifting',
  selectedEquipment: 'Offshore Crane',
  description: 'Lifting the wind turbine blade from transport vessel to installation position',
  workMethodId: '101'
}, {
  id: '302',
  selectedOperation: 'Installation',
  selectedEquipment: 'Hydraulic Torque Wrench',
  description: 'Secure the blade to the hub using specified bolt torque sequence',
  workMethodId: '101'
}, {
  id: '303',
  selectedOperation: 'Pile Driving',
  selectedEquipment: 'Hydraulic Hammer',
  description: 'Drive foundation pile to required depth using hydraulic hammer',
  workMethodId: '102'
}, {
  id: '304',
  selectedOperation: 'Transport',
  selectedEquipment: 'Multi-axle Trailer',
  description: 'Transport excavator from port to site using multi-axle trailer with police escort',
  workMethodId: '103'
}];