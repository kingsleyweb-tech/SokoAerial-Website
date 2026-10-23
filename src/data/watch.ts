import wearActiveZone from '../assets/images/wear-active-zone.webp'
import wearAutoTracking from '../assets/images/wear-auto-tracking.webp'
import wearBattery from '../assets/images/wear-battery.webp'
import wearCreateZone from '../assets/images/wear-create-zone.webp'
import wearLocator from '../assets/images/wear-locator.webp'
import wearMapType from '../assets/images/wear-map-type.webp'
import wearQuickActions from '../assets/images/wear-quick-actions.webp'
import wearWeather from '../assets/images/wear-weather.webp'
import watchOnWrist from '../assets/images/watch-on-wrist.webp'

export interface WatchCallout {
  x: number
  y: number
  title: string
  text: string
}

export interface WatchScreen {
  id: string
  label: string
  title: string
  image: string
  alt: string
  intro: string
  callouts: WatchCallout[]
}

export const watchScreens: WatchScreen[] = [
  {
    id: 'locator',
    label: 'Locator',
    title: 'Emergency locator',
    image: wearLocator,
    alt: 'Sigtrack Watch Emergency Locator screen: coordinates, satellite map with a blue position dot, SOS button and side buttons',
    intro: 'The home screen: where you are, and help one press away.',
    callouts: [
      { x: 0.35, y: 0.13, title: 'Live GPS coordinates', text: 'Latitude, longitude and speed.' },
      { x: 0.71, y: 0.13, title: 'Battery status', text: 'Connectivity and battery status, always on screen.' },
      { x: 0.1, y: 0.5, title: 'SOS', text: 'SOS emergency trigger button.' },
      { x: 0.4, y: 0.56, title: 'Your position', text: 'Real-time map with the user’s position shown as a blue dot.' },
      { x: 0.87, y: 0.67, title: 'Quick-access buttons', text: 'Floating action buttons for quick access to the watch’s tools.' },
    ],
  },
  {
    id: 'map-type',
    label: 'Map type',
    title: 'Map type selector',
    image: wearMapType,
    alt: 'Sigtrack Watch Map Type list: Normal, Satellite, Terrain and Hybrid, with Hybrid selected',
    intro: 'Switch the base map to suit the ground you are working on.',
    callouts: [
      { x: 0.33, y: 0.35, title: 'Four map types', text: 'Normal, Satellite, Terrain and Hybrid views.' },
      { x: 0.3, y: 0.6, title: 'Terrain-aware planning', text: 'Terrain-aware operational planning, optimised for tactical and urban environments.' },
    ],
  },
  {
    id: 'quick-actions',
    label: 'Quick actions',
    title: 'Quick action radial menu',
    image: wearQuickActions,
    alt: 'Sigtrack Watch radial menu: a red close button in the centre ringed by power, call, alert, battery, health, group, settings and weather icons',
    intro: 'Every tool in one ring around the centre of the screen.',
    callouts: [
      { x: 0.5, y: 0.5, title: 'Cancel / close', text: 'Central cancel and close control.' },
      { x: 0.25, y: 0.25, title: 'Power and connectivity', text: 'Power and connectivity control.' },
      { x: 0.5, y: 0.15, title: 'Emergency call', text: 'Emergency call and alert trigger.' },
      { x: 0.85, y: 0.5, title: 'Health', text: 'Health monitoring shortcut.' },
      { x: 0.25, y: 0.75, title: 'Group / team', text: 'Group and team coordination access.' },
      { x: 0.5, y: 0.85, title: 'Settings', text: 'System settings shortcut.' },
    ],
  },
  {
    id: 'create-zone',
    label: 'Geofence',
    title: 'Geofence patrol zone',
    image: wearCreateZone,
    alt: 'Sigtrack Watch Create Zone form: description field, radius slider set to 639 meters, circle boundary option and Create Zone button',
    intro: 'Define an operational or restricted zone straight from the wrist.',
    callouts: [
      { x: 0.5, y: 0.29, title: 'Zone description', text: 'Zone description and labelling.' },
      { x: 0.5, y: 0.52, title: 'Radius', text: 'Adjustable radius slider, in metres.' },
      { x: 0.4, y: 0.7, title: 'Boundary on the map', text: 'Visual boundary on the map.' },
      { x: 0.5, y: 0.86, title: 'Create zone', text: 'Define operational or restricted zones, used for geofencing and alerts.' },
    ],
  },
  {
    id: 'active-zone',
    label: 'Active zone',
    title: 'Active zone visualization',
    image: wearActiveZone,
    alt: 'Sigtrack Watch map showing an enabled geofence zone around the user’s position',
    intro: 'The enabled zone, watched live.',
    callouts: [
      { x: 0.5, y: 0.5, title: 'Enabled geofence', text: 'Shows the enabled geofence area, with live monitoring inside the operational boundary.' },
      { x: 0.1, y: 0.5, title: 'Entry / exit alerts', text: 'Automatic alert trigger on exit or entry.' },
    ],
  },
  {
    id: 'battery',
    label: 'Battery',
    title: 'Battery status dashboard',
    image: wearBattery,
    alt: 'Sigtrack Watch battery dashboard: 53% level, status Charging, health Good, charger USB',
    intro: 'Know how long the watch will last before you head out.',
    callouts: [
      { x: 0.5, y: 0.33, title: 'Battery level', text: 'Battery percentage and health status.' },
      { x: 0.22, y: 0.68, title: 'Charging state', text: 'Charging state and power source.' },
      { x: 0.6, y: 0.68, title: 'Battery health', text: 'Predictive battery condition monitoring.' },
    ],
  },
  {
    id: 'weather',
    label: 'Weather',
    title: 'Weather intelligence module',
    image: wearWeather,
    alt: 'Sigtrack Watch weather screen: 29°, mostly clear, location, sunrise, UV index and wind',
    intro: 'Conditions where you stand, for operational planning.',
    callouts: [
      { x: 0.2, y: 0.32, title: 'Current conditions', text: 'Current temperature and conditions.' },
      { x: 0.26, y: 0.55, title: 'Location-based', text: 'Location-based weather data.' },
      { x: 0.5, y: 0.84, title: 'Wind, UV, sunrise', text: 'Wind speed, UV index and sunrise time, for operational planning support.' },
    ],
  },
  {
    id: 'auto-tracking',
    label: 'Auto-tracking',
    title: 'Auto-tracking settings',
    image: wearAutoTracking,
    alt: 'Sigtrack Watch tracking settings: High Accuracy, Battery Optimization and Background Tracking toggles',
    intro: 'Tracking that adjusts its interval to how you move.',
    callouts: [
      { x: 0.86, y: 0.22, title: 'High accuracy', text: 'High-accuracy GPS toggle.' },
      { x: 0.86, y: 0.5, title: 'Battery optimisation', text: 'Battery optimisation mode: intelligent interval adjustment reduces battery consumption.' },
      { x: 0.86, y: 0.78, title: 'Background tracking', text: 'Background tracking when the screen is off.' },
    ],
  },
]

export const watchSystemFeatures = [
  'Send SOS',
  'Auto-detect emergencies',
  'Call',
  'Camera for gathering intel',
  'Receive alerts of nearby incidents',
]

export const watchPhoto = {
  src: watchOnWrist,
  alt: 'Two Sigtrack watches worn on the wrist, one round and one rugged rectangular, both running the Emergency Locator',
}
