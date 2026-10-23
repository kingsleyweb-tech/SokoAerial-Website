import { SimSection } from '../Sim/SimSection'

export function SymbolDemoSection({ id = 'symbol-demo' }: { id?: string }) {
  return (
    <SimSection
      sim="symbols"
      id={id}
      tone="light"
      chip="See it work · Sigtrack Web"
      title={
        <>
          A tactical report, <em className="serif">start to finish.</em>
        </>
      }
      lead="Sigtrack Web’s tactical symbol workflow, recreated as a lightweight animation (no video). It plays on its own; hover over or tap a label for details."
      summary={[
        'Open Tactical Symbols and select a symbol.',
        'Choose FOB Incident Report or Operations Report.',
        'Drag the symbol onto the map.',
        'Give the report a title and details; the position comes from the map.',
        'Save. The symbol stays on the map; select it for the report and its coordinates.',
      ]}
    />
  )
}
