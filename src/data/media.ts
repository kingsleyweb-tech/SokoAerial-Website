// Real Sigtrack imagery sourced from sigtrackapp.com, resized and re-encoded for the web.
import commandSetup from '../assets/images/command-setup.webp'
import desktopCommunicate from '../assets/images/desktop-communicate.webp'
import desktopGlobe from '../assets/images/desktop-globe.webp'
import desktopSatellite from '../assets/images/desktop-satellite.webp'
import desktopTracking from '../assets/images/desktop-tracking.webp'
import desktopWestAfrica from '../assets/images/desktop-west-africa.webp'
import desktopWorldMap from '../assets/images/desktop-world-map.webp'
import fieldBriefing from '../assets/images/field-briefing.webp'
import fieldTeam from '../assets/images/field-team.webp'
import meshtasticDevice from '../assets/images/meshtastic-device.webp'
import meshtasticSetup from '../assets/images/meshtastic-setup.webp'
import mobileFieldKit from '../assets/images/mobile-field-kit.webp'
import mobileGallery from '../assets/images/mobile-gallery.webp'
import mobileMapTypes from '../assets/images/mobile-map-types.webp'
import mobileMarkers from '../assets/images/mobile-markers.webp'
import mobileRadioMap from '../assets/images/mobile-radio-map.webp'
import mobileWithRadio from '../assets/images/mobile-with-radio.webp'
import sigtrackEmblem from '../assets/images/sigtrack-emblem.webp'
import radioWorkbench from '../assets/images/radio-workbench.webp'
import sigtrackRadioCloseup from '../assets/images/sigtrack-radio-closeup.webp'
import sigtrackRadioTable from '../assets/images/sigtrack-radio-table.webp'
import sigtrackRadiosPair from '../assets/images/sigtrack-radios-pair.webp'
import silvusPromo from '../assets/images/silvus-promo.webp'
import silvusRadio from '../assets/images/silvus-radio.webp'
import webDashboard from '../assets/images/web-dashboard.webp'
import webGhanaTeams from '../assets/images/web-ghana-teams.webp'
import webMarkers from '../assets/images/web-markers.webp'
import webMeshChat from '../assets/images/web-mesh-chat.webp'
import webMeshMap from '../assets/images/web-mesh-map.webp'
// Newer field photos and product screenshots supplied directly by the Sigtrack team.
import fieldCommandTruck from '../assets/images/field-command-truck.webp'
import flashChat from '../assets/images/flash-chat.webp'
import flashDesktopCall from '../assets/images/flash-desktop-call.webp'
import flashMobileCall from '../assets/images/flash-mobile-call.webp'
import flashShare from '../assets/images/flash-share.webp'
import watcherCockpit from '../assets/images/watcher-cockpit.webp'
import watcherMap from '../assets/images/watcher-map.webp'
import watcherTelemetry from '../assets/images/watcher-telemetry.webp'
import webCommandWall from '../assets/images/web-command-wall.webp'
import webTacticalSymbols from '../assets/images/web-tactical-symbols.webp'

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
  webGhanaTeams,
  webMarkers,
  webMeshChat,
  webMeshMap,
  webTacticalSymbols,
}

// Videos stream from Cloudinary's CDN; f_auto,q_auto picks the codec and quality per browser.
// The cloud name is public (it is in every delivery URL); API keys live in .env for uploads only.
const VIDEO_HOST = 'https://res.cloudinary.com/lxjudwn8/video/upload/f_auto,q_auto/sigtrack'

export const videos = {
  sigtrackDemo1: `${VIDEO_HOST}/demo-1.mp4`,
  sigtrackDemo2: `${VIDEO_HOST}/demo-2.mp4`,
  sigtrackDemo3: `${VIDEO_HOST}/demo-3.mp4`,
  webClip1: `${VIDEO_HOST}/web-clip-1.mp4`,
  webClip2: `${VIDEO_HOST}/web-clip-2.mp4`,
}
