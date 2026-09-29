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
// Newer field photos and product screenshots supplied directly by the Sigtrack team.
import fieldCommandTruck from '../assets/images/field-command-truck.jpg'
import flashChat from '../assets/images/flash-chat.jpg'
import flashDesktopCall from '../assets/images/flash-desktop-call.jpg'
import flashMobileCall from '../assets/images/flash-mobile-call.jpg'
import flashShare from '../assets/images/flash-share.jpg'
import flashTransfers from '../assets/images/flash-transfers.jpg'
import watcherCockpit from '../assets/images/watcher-cockpit.jpg'
import watcherMap from '../assets/images/watcher-map.jpg'
import watcherTelemetry from '../assets/images/watcher-telemetry.jpg'
import webCommandWall from '../assets/images/web-command-wall.jpg'
import webTacticalSymbols from '../assets/images/web-tactical-symbols.jpg'

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
  fieldCommandTruck,
  fieldTeam,
  flashChat,
  flashDesktopCall,
  flashMobileCall,
  flashShare,
  flashTransfers,
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
  watcherCockpit,
  watcherMap,
  watcherTelemetry,
  webCommandWall,
  webDashboard,
  webMarkers,
  webMeshChat,
  webMeshMap,
  webMeshtasticConnect,
  webTacticalSymbols,
}

// Videos stream from Cloudinary's CDN; f_auto,q_auto picks the codec and quality per browser.
// The cloud name is public (it is in every delivery URL); API keys live in .env for uploads only.
const VIDEO_HOST = 'https://res.cloudinary.com/lxjudwn8/video/upload/f_auto,q_auto/sigtrack'

export const videos = {
  droneFootage: `${VIDEO_HOST}/drone-footage.mp4`,
  sigtrackDemo1: `${VIDEO_HOST}/demo-1.mp4`,
  sigtrackDemo2: `${VIDEO_HOST}/demo-2.mp4`,
  sigtrackDemo3: `${VIDEO_HOST}/demo-3.mp4`,
  webClip1: `${VIDEO_HOST}/web-clip-1.mp4`,
  webClip2: `${VIDEO_HOST}/web-clip-2.mp4`,
}
