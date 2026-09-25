// Real Sigtrack imagery sourced from sigtrackapp.com, resized and re-encoded for the web.
import commandSetup from '../assets/images/command-setup.jpg'
import desktopCommunicate from '../assets/images/desktop-communicate.jpg'
import desktopGlobe from '../assets/images/desktop-globe.jpg'
import desktopSatellite from '../assets/images/desktop-satellite.jpg'
import desktopTracking from '../assets/images/desktop-tracking.jpg'
import desktopWestAfrica from '../assets/images/desktop-west-africa.jpg'
import desktopWorldMap from '../assets/images/desktop-world-map.jpg'
import fieldBriefing from '../assets/images/field-briefing.jpg'
import fieldTeam from '../assets/images/field-team.jpg'
import meshtasticDevice from '../assets/images/meshtastic-device.jpg'
import meshtasticSetup from '../assets/images/meshtastic-setup.jpg'
import mobileFieldKit from '../assets/images/mobile-field-kit.jpg'
import mobileGallery from '../assets/images/mobile-gallery.jpg'
import mobileMapTypes from '../assets/images/mobile-map-types.jpg'
import mobileMarkers from '../assets/images/mobile-markers.jpg'
import mobileRadioMap from '../assets/images/mobile-radio-map.jpg'
import mobileWithRadio from '../assets/images/mobile-with-radio.jpg'
import sigtrackEmblem from '../assets/images/sigtrack-emblem.png'
import radioWorkbench from '../assets/images/radio-workbench.jpg'
import sigtrackRadioCloseup from '../assets/images/sigtrack-radio-closeup.jpg'
import sigtrackRadioTable from '../assets/images/sigtrack-radio-table.jpg'
import sigtrackRadiosPair from '../assets/images/sigtrack-radios-pair.jpg'
import silvusPromo from '../assets/images/silvus-promo.jpg'
import silvusRadio from '../assets/images/silvus-radio.jpg'
import webDashboard from '../assets/images/web-dashboard.jpg'
import webMarkers from '../assets/images/web-markers.jpg'
import webMeshChat from '../assets/images/web-mesh-chat.jpg'
import webMeshMap from '../assets/images/web-mesh-map.jpg'
import webMeshtasticConnect from '../assets/images/web-meshtastic-connect.jpg'

/** Sigtrack "Eyes in the Sky" emblem, shown beside the wordmark. */
export const logo = sigtrackEmblem

export const images = {
  commandSetup,
  desktopCommunicate,
  desktopGlobe,
  desktopSatellite,
  desktopTracking,
  desktopWestAfrica,
  desktopWorldMap,
  fieldBriefing,
  fieldTeam,
  meshtasticDevice,
  meshtasticSetup,
  mobileFieldKit,
  mobileGallery,
  mobileMapTypes,
  mobileMarkers,
  mobileRadioMap,
  mobileWithRadio,
  radioWorkbench,
  sigtrackRadioCloseup,
  sigtrackRadioTable,
  sigtrackRadiosPair,
  silvusPromo,
  silvusRadio,
  webDashboard,
  webMarkers,
  webMeshChat,
  webMeshMap,
  webMeshtasticConnect,
}

// Videos are too large to bundle (15–120 MB), so they stream from the existing Sigtrack media host.
const VIDEO_HOST = 'https://sigtrackapp.com/images/0'

export const videos = {
  droneFootage: `${VIDEO_HOST}/8865252/WhatsAppVideo2024-05-17at11.26.34.mp4`,
  sigtrackDemo1: `${VIDEO_HOST}/9122219/SigtrackVideo1.mp4`,
  sigtrackDemo2: `${VIDEO_HOST}/9122213/SigtrackVideo2.mp4`,
  sigtrackDemo3: `${VIDEO_HOST}/9122210/SigtrackVideo3.mov`,
}
