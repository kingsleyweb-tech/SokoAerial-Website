import type { TacticalSymbol } from './symbols'

export function SymbolGlyph({ symbol, className }: { symbol: TacticalSymbol; className?: string }) {
  const long = symbol.glyph.length > 2
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <rect width="64" height="64" fill="#000" />
      <path
        d="M8 64V30C8 15 18.5 6 32 6s24 9 24 24v34Z"
        fill={symbol.civilian ? '#ffa1ff' : '#80e0ff'}
        stroke="#000"
        strokeWidth="2"
      />
      {symbol.glyph && (
        <text
          x="32"
          y={long ? 44 : 46}
          textAnchor="middle"
          fontFamily="Arial, Helvetica, sans-serif"
          fontWeight="700"
          fontSize={long ? 13 : 20}
          fill="#000"
        >
          {symbol.glyph}
        </text>
      )}
    </svg>
  )
}
