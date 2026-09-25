// Page copy from the approved v2 design, which draws on sigtrackapp.com.
import { images, videos } from './media'
import { paths } from './site'

// ---------- Home ----------

export interface HeroSlide {
  name: string
  lead: string
  accent: string
  body: string
  mobileBody: string
  media: { type: 'image'; src: string; alt: string } | { type: 'video'; src: string; label: string }
}

export const heroSlides: HeroSlide[] = [
  {
    name: 'Drones',
    lead: 'Eyes in the',
    accent: 'sky.',
    body: 'Sigtrack Team Awareness Kits for Windows and Android — explore imagery and maps on the move.',
    mobileBody: 'Team Awareness Kits for Windows and Android — imagery and maps on the move.',
    media: { type: 'video', src: videos.droneFootage, label: 'Drone footage captured with Sigtrack' },
  },
  {
    name: 'Sigtrack Web',
    lead: 'Every teammate,',
    accent: 'on the map.',
    body: 'Group operatives, see each one as a marker and track them in real time.',
    mobileBody: 'See each operative as a marker and track them in real time.',
    media: { type: 'image', src: images.webMarkers, alt: 'Sigtrack Web showing team members as markers' },
  },
  {
    name: 'Radios',
    lead: 'Chat without',
    accent: 'the internet.',
    body: 'Silvus and Meshtastic integration keeps teams connected in forests, urban canyons and remote terrain.',
    mobileBody: 'Silvus and Meshtastic keep teams connected in remote terrain.',
    media: { type: 'image', src: images.silvusRadio, alt: 'Silvus radio in the field' },
  },
  {
    name: 'Desktop',
    lead: 'Track live.',
    accent: 'Replay later.',
    body: 'Real-time tracking, data visualization and history playback for debriefing.',
    mobileBody: 'Real-time tracking and history playback for debriefing.',
    media: { type: 'image', src: images.desktopTracking, alt: 'Sigtrack Desktop tracking view' },
  },
  {
    name: 'Response',
    lead: 'All-in-one',
    accent: 'response.',
    body: 'Connect radios, command trailers and drones seamlessly. Empowering emergency response anywhere.',
    mobileBody: 'Connect radios, command trailers and drones — anywhere.',
    media: { type: 'image', src: images.sigtrackRadioTable, alt: 'Sigtrack radio deployed in the field' },
  },
]

export const facts = [
  { n: '03', t: 'Platforms', d: 'Web, Android and Windows — dedicated versions for each.', short: 'Web, Android, Windows' },
  { n: '02', t: 'Radio systems', d: 'Silvus for bandwidth, Meshtastic for reach.', short: 'Silvus and Meshtastic' },
  { n: '4609', t: 'STANAG', d: 'Full Motion Video support to the NATO standard.', short: 'Full Motion Video support' },
  { n: '07', t: 'ISR roles', d: 'From data exploitation to dissemination and training.', short: 'Post-mission' },
]

export type DeviceFrame = 'browser' | 'phone' | 'laptop' | 'round'
export type CardTone = 'fog' | 'ice' | 'navy' | 'signal'

export const systemProducts: {
  name: string
  sub: string
  platform: string
  to: string
  desc: string
  short: string
  image: string
  frame: DeviceFrame
  tone: CardTone
}[] = [
  {
    name: 'Sigtrack',
    sub: 'Web',
    platform: 'Browser',
    to: paths.web,
    desc: 'Group and display team members, track each in real time, and chat over Meshtastic radio without internet.',
    short: 'Teams on the map, real-time tracking, offline chat.',
    image: images.webDashboard,
    frame: 'browser',
    tone: 'fog',
  },
  {
    name: 'Sigtrack',
    sub: 'Mobile',
    platform: 'Android',
    to: paths.mobile,
    desc: 'A field situation awareness kit with encrypted chat, drag-and-drop markers and waypoint sharing.',
    short: 'Encrypted chat, markers, waypoint sharing.',
    image: images.mobileRadioMap,
    frame: 'phone',
    tone: 'ice',
  },
  {
    name: 'Sigtrack',
    sub: 'Desktop',
    platform: 'Windows',
    to: paths.desktop,
    desc: 'Real-time tracking, history playback and custom markers, with Silvus and Meshtastic for offline communication.',
    short: 'Live tracking, history playback, markers.',
    image: images.desktopTracking,
    frame: 'laptop',
    tone: 'navy',
  },
  {
    name: 'The',
    sub: 'Radios',
    platform: 'Silvus · Meshtastic',
    to: paths.radios,
    desc: 'High-bandwidth Silvus for multimedia, and Meshtastic for reliable long-range burst messaging.',
    short: 'Bandwidth plus long-range reliability.',
    image: images.silvusRadio,
    frame: 'round',
    tone: 'signal',
  },
]

export const usage = {
  military: {
    intro:
      'Full motion video exploitation with crucial metadata, visual and analytical tools, and ISR platform capabilities for mission-critical workflows.',
    items: [
      'View and analyze live-stream and archived video',
      'Playback, image and video clip capture',
      'FMV integrated across the ISR platform',
      'Cursor on Target (CoT)',
    ],
  },
  civilian: {
    intro:
      'Team Awareness Kits for Windows and Android — an imagery exploration application and mapping framework for mobile and laptop devices.',
    items: [
      'Online and offline mapping, fast rendering',
      'Collaborative mapping — points, drawings, KML',
      'Chat, file, photo and video sharing, streaming',
      'Navigation for walking, hiking and driving',
    ],
  },
}

export const uses = [
  {
    title: 'Search and rescue',
    body: 'Mark safe zones and hazards, then share them with every team in real time.',
    image: images.fieldTeam,
    alt: 'Response team gathered around Sigtrack equipment',
  },
  {
    title: 'Military exercises',
    body: 'Situational awareness and decision-making support for defense organizations.',
    image: images.fieldBriefing,
    alt: 'Military personnel at a Sigtrack briefing',
  },
  {
    title: 'Emergency response',
    body: 'Radios, command trailers and drones connected — anywhere.',
    image: images.commandSetup,
    alt: 'Radios connected to a laptop running Sigtrack',
  },
  {
    title: 'Remote team coordination',
    body: 'Keep teams in contact where conventional networks fail.',
    image: images.mobileWithRadio,
    alt: 'Sigtrack Mobile paired with a Meshtastic radio',
  },
  {
    title: 'Outdoor adventures',
    body: 'Navigation for walking, hiking and driving; mark landmarks along a trail.',
    image: images.mobileMapTypes,
    alt: 'Sigtrack Mobile map types including pedestrian and terrain maps',
  },
]

/** Two offset rows of field imagery on the home page ("In the field."). */
export const fieldRows = [
  [
    { src: images.fieldBriefing, w: 460 },
    { src: images.sigtrackRadioCloseup, w: 300 },
    { src: images.webMarkers, w: 520 },
    { src: images.meshtasticSetup, w: 300 },
  ],
  [
    { src: images.mobileWithRadio, w: 360 },
    { src: images.radioWorkbench, w: 520 },
    { src: images.silvusPromo, w: 280 },
    { src: images.fieldTeam, w: 460 },
  ],
]

// ---------- Capabilities ----------

export const capabilityAreas = [
  {
    label: 'Full Motion Video',
    short: 'FMV',
    tag: 'Military',
    head: 'Full motion video',
    accent: 'exploitation.',
    image: images.desktopSatellite,
    body: 'Takes advantage of crucial metadata, provides visual and analytical processing tools, and ISR platform capabilities to support mission-critical workflows. FMV is fully integrated into Sigtrack ISR.',
    items: [
      'View and analyze live-stream and archived videos',
      'Intuitive playback controls',
      'Image and video clip capture, analysis tools',
      'Cursor on Target (CoT)',
    ],
  },
  {
    label: 'ISR post-mission',
    short: 'ISR',
    tag: 'Military',
    head: 'Intelligence, surveillance,',
    accent: 'reconnaissance.',
    image: images.desktopWestAfrica,
    body: 'Sigtrack is an ISR post-mission software with a pivotal role across analysis, reporting, archiving and dissemination.',
    items: [
      'Data analysis and exploitation',
      'Mission reporting and debriefing',
      'Data archiving and management',
      'Intelligence dissemination',
    ],
  },
  {
    label: 'Mapping',
    short: 'Mapping',
    tag: 'Civilian',
    head: 'Imagery and maps,',
    accent: 'on the move.',
    image: images.webMeshMap,
    body: 'Team Awareness Kits for Windows and Android — an imagery exploration application and mapping framework for mobile and laptop devices.',
    items: [
      'Online and offline mapping, most standard formats',
      'Fast rendering engine',
      'Collaborative mapping — points, drawings, locations of interest, KML',
      'Navigation — walking/hiking and driving',
    ],
  },
  {
    label: 'Collaboration',
    short: 'Collaboration',
    tag: 'Civilian',
    head: 'Share what',
    accent: 'the team sees.',
    image: images.webMeshChat,
    body: 'Communication and sharing tools built into the map, across Sigtrack’s platforms.',
    items: ['Chat, file sharing, photo sharing', 'Video sharing and streaming', 'Encrypted chat (Sigtrack Mobile)', 'Marker and waypoint sharing'],
  },
  {
    label: 'Radio connectivity',
    short: 'Radio',
    tag: 'Both',
    head: 'Connected',
    accent: 'without the network.',
    image: images.silvusRadio,
    body: 'Cell phone, WiFi and civilian radio controls and interface — plus Silvus and Meshtastic integration for offline communication.',
    items: [
      'Cell phone, WiFi and civilian radio interface',
      'Silvus: high-bandwidth multimedia',
      'Meshtastic: long-range burst messages',
      'Chat without internet connection',
    ],
  },
  {
    label: 'Multi-platform',
    short: 'Platforms',
    tag: 'Both',
    head: 'Web, mobile',
    accent: 'and desktop.',
    image: images.desktopWorldMap,
    body: 'Dedicated versions for mobile, web and desktop, so personnel can reach Sigtrack in the field, at a command center or in an office.',
    items: ['Sigtrack Web — browser', 'Sigtrack Mobile — Android', 'Sigtrack Desktop — Windows', 'Support for drones and command trailers'],
  },
]

export const stanagTopics = [
  { full: 'Video formats and compression', short: 'Formats and compression' },
  { full: 'Metadata and annotation', short: 'Metadata and annotation' },
  { full: 'Transmission and streaming', short: 'Transmission and streaming' },
  { full: 'Quality and performance requirements', short: 'Quality and performance' },
  { full: 'Interoperability and compatibility', short: 'Interoperability' },
]

/** Sigtrack's roles as ISR post-mission software (sigtrackapp.com/about-us). */
export const isrRoles = [
  { title: 'Data analysis and exploitation', short: 'Data analysis & exploitation', body: 'Processing and extracting insight from data collected on ISR missions.' },
  { title: 'Mission reporting and debriefing', short: 'Mission reporting & debriefing', body: 'Detailed reports and debriefings for mission crews.' },
  { title: 'Data archiving and management', short: 'Data archiving & management', body: 'Large datasets archived securely, accessible and shareable.' },
  { title: 'Intelligence dissemination', short: 'Intelligence dissemination', body: 'Intelligence products shared with relevant stakeholders.' },
  { title: 'Training and simulation', short: 'Training & simulation', body: 'Mission simulation and scenario rehearsal for readiness.' },
  { title: 'System maintenance and upgrade', short: 'Maintenance & upgrade', body: 'Monitoring performance, maintenance and upgrades.' },
  { title: 'Security and encryption', short: 'Security & encryption', body: 'Safeguarding sensitive data and supporting compliance.' },
]

export const dualUse = [
  { military: 'Full motion video exploitation', civilian: 'Imagery exploration and mapping framework', mShort: 'FMV exploitation', cShort: 'Imagery & mapping framework' },
  { military: 'Live-stream and archived video analysis', civilian: 'Online and offline mapping', mShort: 'Live & archived video', cShort: 'Online & offline maps' },
  { military: 'Playback, image and clip capture', civilian: 'Collaborative mapping — points, drawings, KML', mShort: 'Clip capture & analysis', cShort: 'Collaborative mapping' },
  { military: 'ISR platform sharing', civilian: 'Chat, file, photo and video sharing, streaming', mShort: 'ISR platform sharing', cShort: 'Chat, file & video sharing' },
  { military: 'Cursor on Target (CoT)', civilian: 'Cell phone, WiFi and civilian radio interface', mShort: 'Cursor on Target', cShort: 'Phone, WiFi & radio interface' },
]

// ---------- Gallery ----------

export type GalleryCategory = 'field' | 'web' | 'mobile' | 'desktop'

export interface GalleryItem {
  src: string
  alt: string
  caption: string
  category: GalleryCategory
}

/** Gallery images from sigtrackapp.com; categories follow the live gallery. */
export const galleryItems: GalleryItem[] = [
  { src: images.fieldBriefing, alt: 'Military personnel at a Sigtrack briefing', caption: 'Sigtrack in the field', category: 'field' },
  { src: images.webDashboard, alt: 'Sigtrack Web team dashboard', caption: 'Sigtrack Web', category: 'web' },
  { src: images.webMeshMap, alt: 'Mesh radio network on the Sigtrack Web map', caption: 'Mesh radio network on the map', category: 'web' },
  { src: images.webMeshChat, alt: 'Sigtrack Web Meshtastic chat', caption: 'Chat without internet', category: 'web' },
  { src: images.webMarkers, alt: 'Team members as markers in Sigtrack Web', caption: 'Team members as markers', category: 'web' },
  { src: images.mobileMarkers, alt: 'Custom markers on the Sigtrack Mobile map', caption: 'Custom markers on the map', category: 'mobile' },
  { src: images.mobileRadioMap, alt: 'Sigtrack Mobile satellite map with radio controls', caption: 'Sigtrack Mobile', category: 'mobile' },
  { src: images.mobileGallery, alt: 'Sigtrack Mobile photo gallery', caption: 'Sigtrack Mobile gallery', category: 'mobile' },
  { src: images.mobileMapTypes, alt: 'Sigtrack Mobile map type selector', caption: 'Sigtrack Mobile map types', category: 'mobile' },
  { src: images.desktopTracking, alt: 'Sigtrack Desktop tracking view', caption: 'Sigtrack Desktop tracking', category: 'desktop' },
  { src: images.desktopWestAfrica, alt: 'Sigtrack Desktop map of West Africa', caption: 'Sigtrack Desktop', category: 'desktop' },
  { src: images.desktopGlobe, alt: 'Sigtrack Desktop globe view', caption: 'Sigtrack Desktop globe', category: 'desktop' },
  { src: images.commandSetup, alt: 'Radios connected to a laptop running Sigtrack', caption: 'Field deployment', category: 'desktop' },
]

export const galleryCategoryLabels: Record<GalleryCategory, string> = {
  field: 'Field',
  web: 'Web',
  mobile: 'Mobile',
  desktop: 'Desktop',
}

// ---------- Products ----------

export const webFeatures = [
  { title: 'Group and display team members', body: 'Organize operatives into groups and visualize team structures directly in the platform.', x: 14, y: 22 },
  { title: 'Each member as a marker', body: 'Pinpoint the location of every team member as a distinct marker on the map.', x: 46, y: 40 },
  { title: 'Connect to Meshtastic radio', body: 'Direct communication between operatives without traditional internet connectivity.', x: 78, y: 18 },
  { title: 'Chat without internet', body: 'Offline messaging over Meshtastic radio.', x: 84, y: 66 },
  { title: 'Track each member in real time', body: 'Real-time tracking of every member through the connected radio systems.', x: 30, y: 70 },
]

// Screens are centred in the portrait phone (x/y = focus point as a fraction of the image, default 0.5);
// zoom trims the bezels and system bars baked into some screenshots.
export const mobileFeatures = [
  {
    title: 'Silvus + Meshtastic radio',
    body: 'Robust channels in the most challenging environments.',
    screen: { src: images.mobileRadioMap, zoom: 1.12 },
  },
  {
    title: 'Field Situation Awareness Kit',
    body: 'Vital information at operatives’ fingertips.',
    screen: { src: images.mobileFieldKit },
  },
  {
    title: 'Encrypted chatting',
    body: 'Secure messaging that safeguards sensitive data.',
    screen: { src: images.mobileWithRadio },
  },
  {
    title: 'Custom markers & images',
    body: 'Drag and drop markers or images onto the map.',
    screen: { src: images.mobileMarkers, x: 0.1, y: 0.62, zoom: 1.35 },
  },
  {
    title: 'Waypoint sharing',
    body: 'Direct teammates to rendezvous points and objectives.',
    screen: { src: images.mobileMapTypes, x: 0.52, zoom: 1.12 },
  },
]

export const awarenessKit = [
  { a: 'Terrain', b: 'mapping' },
  { a: 'Asset', b: 'tracking' },
  { a: 'Threat', b: 'identification' },
  { a: 'Mission', b: 'planning' },
]

export const desktopModes = [
  {
    label: 'Track',
    image: images.desktopWestAfrica,
    items: [
      { t: 'Live updates', b: 'Track team members, assets or other entities in real time — a constantly updated view of operations.' },
      { t: 'Data visualization', b: 'Visualize past movements and analyze travel patterns to plan and optimize routes.' },
      { t: 'History playback', b: 'Replay movement history for post-operation analysis, training and debriefing.' },
    ],
  },
  {
    label: 'Communicate',
    image: images.desktopCommunicate,
    items: [
      { t: 'Silvus radios', b: 'Reliable mesh networking — devices communicate without relying on a central node.' },
      { t: 'Meshtastic radios', b: 'Long-range, low-power communication; open source and adaptable.' },
      { t: 'Uninterrupted connectivity', b: 'Robust channels even in dense forests, urban canyons or remote terrain.' },
    ],
  },
  {
    label: 'Mark',
    image: images.desktopGlobe,
    items: [
      { t: 'Versatile marker system', b: 'Drop markers anywhere to highlight points of interest, hazards or waypoints.' },
      { t: 'Marker customization', b: 'Notes, icons and colors convey detailed information at a glance.' },
      { t: 'Sharing and collaboration', b: 'Share markers in real time so joint teams stay synchronized.' },
    ],
  },
]

export const radioComparison = [
  { key: 'Frequency', silvus: 'High frequencies', mesh: 'Lower frequencies', sShort: 'High', mShort: 'Lower' },
  { key: 'Strength', silvus: 'High speed, high bandwidth', mesh: 'Reliability and coverage', sShort: 'Speed, bandwidth', mShort: 'Reliability, coverage' },
  { key: 'Data', silvus: 'Images, PDFs, documents, messages, videos', mesh: 'Burst messages', sShort: 'Images, PDFs, docs, messages, video', mShort: 'Burst messages' },
  { key: 'Network', silvus: 'Mesh networking without a central node', mesh: 'Long range, low power; open source', sShort: 'Mesh, no central node', mShort: 'Long range, low power, open source' },
  { key: 'Best for', silvus: 'Rich multimedia communication', mesh: 'Dependable messaging, extended field ops', sShort: 'Rich multimedia', mShort: 'Dependable messaging' },
  { key: 'Works with', silvus: 'Sigtrack Mobile · Desktop', mesh: 'Sigtrack Web · Mobile · Desktop', sShort: 'Mobile · Desktop', mShort: 'Web · Mobile · Desktop' },
]

// ---------- About ----------

export const aboutChapters = [
  {
    kicker: 'Who',
    title: 'A drone, software and radio company.',
    body: 'Sigtrack excels in designing drones and software solutions while specializing in seamless radio connectivity.',
  },
  {
    kicker: 'What',
    title: 'Team Awareness Kits and ISR software.',
    body: 'Imagery exploration and mapping software for Windows and Android, and ISR post-mission software — delivered as Sigtrack Web, Sigtrack Mobile and Sigtrack Desktop, with Silvus and Meshtastic radio integration.',
  },
  {
    kicker: 'Why',
    title: 'Awareness where networks fail.',
    body: 'In dynamic, ever-evolving operational landscapes, real-time situational awareness is paramount. Teams often work in dense forests, urban canyons and remote terrain where communication infrastructure is lacking.',
  },
  {
    kicker: 'How',
    title: 'Video, maps and mesh radio.',
    body: 'Full Motion Video support to STANAG 4609, online and offline mapping, real-time tracking and history playback, encrypted chat — and a dual-radio approach combining Silvus bandwidth with Meshtastic reliability.',
  },
  {
    kicker: 'For',
    title: 'Empowering emergency response anywhere.',
    body: 'By supporting drones and command trailers across platforms, Sigtrack enhances situational awareness and decision-making — for defense organizations and across industries.',
  },
]
