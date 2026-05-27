import type { ReactNode } from 'react'

interface Props {
  title: string
  children?: ReactNode
  background?: string
  selected?: boolean
}

export default function BaseNode({
  title,
  children,
  background = '#ffffff',
  selected = false,
}: Props) {
  return (
    <div
      style={{
        minWidth: 220,

        padding: 16,

        borderRadius: 14,

        border: selected
          ? '2px solid #2563eb'
          : '1px solid #d1d5db',

        background,

        transition:
          'all 0.15s ease',

        transform: selected
          ? 'scale(1.02)'
          : 'scale(1)',

        boxShadow: selected
          ? '0 0 0 4px rgba(37,99,235,0.15)'
          : '0 2px 6px rgba(0,0,0,0.08)',

        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          fontWeight: 700,
          marginBottom: 10,
          fontSize: 15,
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize: 14,
          color: '#374151',
        }}
      >
        {children}
      </div>
    </div>
  )
}
