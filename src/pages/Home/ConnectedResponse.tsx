import { SimSection } from '../../components/Sim/SimSection'

export function ConnectedResponse() {
  return (
    <SimSection
      sim="system"
      id="ecosystem"
      chip="The Sigtrack system"
      title={
        <>
          From the field to command, <em className="serif">one operational GIS.</em>
        </>
      }
      lead="Sigtrack is an operational GIS developed by Soko Aerial Robotics within the Ghana Armed Forces, with extensions for civilian use. It is more than software: a system of connected devices, links and tools for monitoring large activities securely, in real time. Hover over or tap any part to see its role."
      summary={[
        'Field operators (Sigtrack Watch, Sigtrack Mobile, body cams and drones) report positions, alerts and video.',
        'Information travels over cellular, satellite, radio mesh, or offline Wi-Fi and peer to peer.',
        'A drone keeps a site under surveillance; its ground control station (Soko Watcher) sends the view to Sigtrack.',
        'Sigtrack brings it together on one map, with AI processing for analytics and reports.',
        'The command centre works from Sigtrack Web and Desktop and sends orders back to teams and mobile patrols.',
      ]}
    />
  )
}
