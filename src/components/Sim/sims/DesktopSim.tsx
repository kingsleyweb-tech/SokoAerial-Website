import type { CSSProperties } from "react";
import sim from "../../../styles/Sim.module.css";
import styles from "../../../styles/SimProducts.module.css";
import { Icon, MiniMap, type IconName } from "../draw";
import { along, type Pt } from "../geom";
import { Hotspot } from "../Hotspot";
import { SimStage, type SimFrame, type SimStep } from "../SimStage";

const steps: SimStep[] = [
  {
    label: "Live updates",
    caption:
      "Team members and assets move on the map in real time: a constantly updated view of operations.",
    duration: 5000,
  },
  {
    label: "History playback",
    caption:
      "Replay movement history for post-operation analysis, training and debriefing.",
    duration: 5000,
  },
  {
    label: "Customise a marker",
    caption:
      "Drop a marker, then give it a note, an icon and a colour that say what it is at a glance.",
    duration: 5000,
  },
  {
    label: "Share it",
    caption:
      "Markers are shared in real time, so joint teams stay synchronised.",
    duration: 4000,
  },
  {
    label: "Mesh radio",
    caption:
      "Silvus and Meshtastic radios link the devices without relying on a central node.",
    duration: 5000,
  },
];

const units: {
  id: string;
  kind: "person" | "vehicle";
  color: string;
  route: Pt[];
}[] = [
  {
    id: "Alpha 1",
    kind: "person",
    color: "#4c8dff",
    route: [
      [14, 72],
      [28, 64],
      [40, 60],
      [50, 48],
    ],
  },
  {
    id: "Alpha 2",
    kind: "person",
    color: "#4c8dff",
    route: [
      [18, 26],
      [32, 34],
      [44, 30],
      [56, 24],
    ],
  },
  {
    id: "Truck 1",
    kind: "vehicle",
    color: "#f2a93b",
    route: [
      [86, 84],
      [74, 72],
      [66, 64],
    ],
  },
  {
    id: "Bravo 1",
    kind: "person",
    color: "#ff6b70",
    route: [
      [88, 18],
      [80, 34],
      [78, 48],
    ],
  },
];

const END = 0.7;
const marker = { x: 36, y: 44 };
const icons: IconName[] = ["pin", "sos", "camera"];
const colors = ["#ff6b70", "#f2a93b", "#4c8dff"];
const note = "Bridge closed. Use the east road.";

const at = (p: Pt): CSSProperties => ({ left: `${p[0]}%`, top: `${p[1]}%` });

function Glyph({ name }: { name: IconName }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <Icon name={name} x={12} y={12} />
    </svg>
  );
}

function Scene({ f }: { f: SimFrame }) {
  const travel =
    f.step === 0
      ? (END * f.t) / steps[0].duration
      : f.step === 1
        ? f.p(300, 4200) * END
        : END;
  const playback = f.step === 1;
  const pos = (u: (typeof units)[number]) => along(u.route, travel);

  const markerOn = f.step >= 2 ? (f.step === 2 ? f.p(300, 300) : 1) : 0;
  const iconIdx = f.step === 2 && f.t < 1500 ? 0 : 1;
  const colorIdx = f.step === 2 && f.t < 2300 ? 2 : 0;
  const typed =
    f.step === 2
      ? Math.round(note.length * f.p(2800, 1600))
      : f.step > 2
        ? note.length
        : 0;
  const shareA = f.step === 3 ? f.t > 600 : f.step > 3;
  const shareB = f.step === 3 ? f.t > 1200 : f.step > 3;
  const shared = f.step === 3 ? f.t > 2000 : f.step > 3;
  const mesh = f.step === 4;

  const clock = playback
    ? `08:${String(Math.round(travel * 60)).padStart(2, "0")}`
    : "09:41";

  return (
    <div className={styles.win}>
      <div className={styles.winBar} aria-hidden="true">
        <span>Sigtrack Desktop</span>
        <i />
        <i />
        <i />
      </div>
      <div className={styles.winBody} data-compact={f.compact || undefined}>
        {!f.compact && (
          <div className={styles.winTools} aria-hidden="true">
            {(["map", "people", "pin", "radio"] as const).map((n, i) => (
              <span
                key={n}
                data-on={
                  (i === 0 && f.step < 2) ||
                  (i === 2 && (f.step === 2 || f.step === 3)) ||
                  (i === 3 && mesh) ||
                  undefined
                }
              >
                <Glyph name={n} />
              </span>
            ))}
          </div>
        )}

        <div className={styles.winMap}>
          <svg
            className={sim.canvas}
            viewBox="0 0 400 300"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
          >
            <MiniMap W={400} H={300} tone="dark" />
          </svg>
          <svg
            className={sim.canvas}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {(playback || f.step === 0) &&
              units.map((u) => {
                const pts: Pt[] = [];
                for (let i = 0; i <= 20; i++)
                  pts.push(along(u.route, (travel * i) / 20));
                return (
                  <polyline
                    key={u.id}
                    points={pts.map((p) => p.join(",")).join(" ")}
                    className={styles.track}
                    stroke={u.color}
                    opacity={playback ? 0.9 : 0.35}
                  />
                );
              })}
            {mesh &&
              units.flatMap((a, i) =>
                units.slice(i + 1).map((b, j) => {
                  const [x1, y1] = pos(a);
                  const [x2, y2] = pos(b);
                  return (
                    <line
                      key={`${i}-${j}`}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      className={`${styles.meshDark} ${sim.flow}`}
                      opacity={f.p(200 + (i + j) * 200, 400)}
                    />
                  );
                }),
              )}
          </svg>

          {units.map((u) => (
            <span
              key={u.id}
              className={styles.unit}
              data-kind={u.kind}
              style={{ ...at(pos(u)), "--c": u.color } as CSSProperties}
            >
              {shared && f.step === 3 && <i className={sim.pulse} />}
              {!f.compact && <b>{u.id}</b>}
            </span>
          ))}

          {markerOn > 0.02 && (
            <span
              className={styles.deskMarker}
              style={{
                ...at([marker.x, marker.y]),
                background: colors[colorIdx],
                opacity: markerOn,
              }}
            >
              <Glyph name={icons[iconIdx]} />
              {typed > 0 && !f.compact && <em>{note.slice(0, typed)}</em>}
            </span>
          )}

          {playback && (
            <div className={styles.playback}>
              <Glyph name="video" />
              <span>{clock}</span>
              <div className={styles.scrub}>
                <i style={{ width: `${(travel / END) * 100}%` }} />
              </div>
              <span>08:42</span>
            </div>
          )}

          {f.step === 0 && (
            <Hotspot
              x={0.5}
              y={0.1}
              label="Live updates"
              title="Live updates"
              shown={f.p(600, 300)}
            >
              Track team members, assets or other entities in real time.
            </Hotspot>
          )}
          {f.step === 1 && (
            <Hotspot
              x={0.5}
              y={0.1}
              label="History playback"
              title="History playback"
            >
              Replay movement history for post-operation analysis, training and
              debriefing. Past movements show travel patterns for planning
              routes.
            </Hotspot>
          )}
          {(f.step === 2 || f.step === 3) && (
            <Hotspot
              x={marker.x / 100}
              y={marker.y / 100 - 0.12}
              label="Marker"
              title="Versatile marker system"
              shown={markerOn}
            >
              Drop markers anywhere to highlight points of interest, hazards or
              waypoints. Notes, icons and colours convey detail at a glance.
            </Hotspot>
          )}
          {mesh && (
            <Hotspot
              x={0.5}
              y={0.1}
              label="No central node"
              title="Silvus mesh networking"
              shown={f.p(800, 300)}
            >
              Devices communicate without relying on a central node, for robust
              channels in dense forests, urban canyons or remote terrain.
            </Hotspot>
          )}
        </div>

        <aside className={styles.winPanel}>
          {f.step < 2 && (
            <>
              <div className={styles.winHead}>
                {playback ? "History" : "Units"}
                <span>{playback ? "Playback" : "Live"}</span>
              </div>
              {units.slice(0, f.compact ? 3 : 4).map((u, i) => (
                <div key={u.id} className={styles.winRow}>
                  <i style={{ background: u.color }} />
                  {u.id}
                  <span>
                    {playback
                      ? clock
                      : `${(Math.floor(f.t / 1000) + i) % 4}s ago`}
                  </span>
                </div>
              ))}
            </>
          )}
          {(f.step === 2 || f.step === 3) && (
            <>
              <div className={styles.winHead}>
                Marker
                <span>{shared ? "Shared" : "Editing"}</span>
              </div>
              {!(f.compact && f.step === 3) && (
                <>
                  <div className={styles.winField}>
                    <label>Icon</label>
                    <div className={styles.swatches}>
                      {icons.map((n, i) => (
                        <span key={n} data-on={i === iconIdx || undefined}>
                          <Glyph name={n} />
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className={styles.winField}>
                    <label>Colour</label>
                    <div className={styles.swatches}>
                      {colors.map((c, i) => (
                        <span
                          key={c}
                          data-on={i === colorIdx || undefined}
                          style={{ background: c }}
                        />
                      ))}
                    </div>
                  </div>
                </>
              )}
              <div className={styles.winField}>
                <label>Note</label>
                <p className={styles.winNote}>
                  {note.slice(0, typed)}
                  {f.step === 2 && <span className={sim.blink}>|</span>}
                </p>
              </div>
              {f.step === 3 && (
                <div className={styles.winField}>
                  <label>Share with</label>
                  <div className={styles.swatches}>
                    <b data-on={shareA || undefined}>Alpha</b>
                    <b data-on={shareB || undefined}>Bravo</b>
                  </div>
                </div>
              )}
            </>
          )}
          {mesh && (
            <>
              <div className={styles.winHead}>
                Radios
                <span>Mesh</span>
              </div>
              {[
                { n: "Silvus", d: "Images, video, documents" },
                { n: "Meshtastic", d: "Long range, low power" },
              ].map((r, i) => (
                <div
                  key={r.n}
                  className={styles.winRadio}
                  style={{ opacity: f.p(300 + i * 400, 300) }}
                >
                  <Glyph name="radio" />
                  <div>
                    <strong>{r.n}</strong>
                    <span>{r.d}</span>
                  </div>
                  <em>{f.t > 1200 + i * 400 ? "linked" : "…"}</em>
                </div>
              ))}
            </>
          )}
        </aside>
      </div>
    </div>
  );
}

export default function DesktopSim() {
  return (
    <SimStage
      label="Sigtrack Desktop: live tracking, history playback, shared markers and mesh radio"
      steps={steps}
      ratio="1000 / 600"
      compactRatio="400 / 600"
      render={(f) => <Scene f={f} />}
    />
  );
}
