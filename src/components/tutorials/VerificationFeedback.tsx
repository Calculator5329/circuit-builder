import type { VerificationResult } from '../../types/tutorial'

interface VerificationFeedbackProps {
  result: VerificationResult
}

export function VerificationFeedback({ result }: VerificationFeedbackProps) {
  if (result.passed) {
    return (
      <div style={{
        padding: '12px 14px',
        borderRadius: 4,
        background: '#052e16',
        border: '1px solid #166534',
      }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 12,
          color: '#22c55e',
          letterSpacing: '0.06em',
          marginBottom: 4,
        }}>
          ALL TESTS PASSED
        </div>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          color: '#4ade80',
          lineHeight: 1.5,
        }}>
          {result.rowResults.length}/{result.rowResults.length} rows correct
        </div>
      </div>
    )
  }

  const passedCount = result.rowResults.filter(r => r.passed).length

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{
        padding: '8px 12px',
        borderRadius: 4,
        background: '#2d0a0a',
        border: '1px solid #7f1d1d',
      }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 11,
          color: 'var(--danger)',
          letterSpacing: '0.06em',
        }}>
          {passedCount}/{result.rowResults.length} ROWS PASSED
        </div>
      </div>

      {/* Truth table */}
      <div style={{
        borderRadius: 4,
        border: '1px solid var(--border-dim)',
        overflowX: 'auto',
        overflowY: 'hidden',
        fontSize: 10,
        fontFamily: 'var(--font-mono)',
      }}>
        <table style={{ width: 'max-content', minWidth: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--bg-panel)' }}>
              <th style={thStyle}>#</th>
              {result.rowResults[0] && Object.keys(result.rowResults[0].row.inputs).map(k => (
                <th key={`in-${k}`} style={{ ...thStyle, color: '#8b5cf6' }}>{k}</th>
              ))}
              {result.rowResults[0] && Object.keys(result.rowResults[0].row.outputs).map(k => (
                <th key={`out-${k}`} style={{ ...thStyle, color: 'var(--text-bright)' }}>{k}</th>
              ))}
              <th style={thStyle}></th>
            </tr>
          </thead>
          <tbody>
            {result.rowResults.map((rr, i) => (
              <tr
                key={i}
                style={{
                  background: rr.passed ? 'transparent' : 'rgba(239,68,68,0.04)',
                }}
              >
                <td style={tdStyle}>{i + 1}</td>
                {Object.values(rr.row.inputs).map((v, j) => (
                  <td key={`in-${j}`} style={{ ...tdStyle, color: 'var(--text-dim)' }}>{v}</td>
                ))}
                {Object.entries(rr.row.outputs).map(([label, expected]) => {
                  const actual = rr.actual[label]
                  const match = actual === expected
                  return (
                    <td key={`out-${label}`} style={{
                      ...tdStyle,
                      color: match ? '#22c55e' : 'var(--danger)',
                      fontWeight: match ? 400 : 600,
                    }}>
                      {actual === null ? '?' : actual}
                      {!match && (
                        <span style={{ color: 'var(--text-dim)', fontWeight: 400 }}>
                          {' '}({expected})
                        </span>
                      )}
                    </td>
                  )
                })}
                <td style={tdStyle}>
                  <span style={{ color: rr.passed ? '#22c55e' : 'var(--danger)' }}>
                    {rr.passed ? '\u2713' : '\u2717'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const thStyle: React.CSSProperties = {
  padding: '5px 5px',
  textAlign: 'center',
  color: 'var(--text-dim)',
  fontWeight: 600,
  fontSize: 9,
  letterSpacing: '0.04em',
  borderBottom: '1px solid var(--border-dim)',
  whiteSpace: 'nowrap',
}

const tdStyle: React.CSSProperties = {
  padding: '4px 5px',
  textAlign: 'center',
  color: 'var(--text-primary)',
  borderBottom: '1px solid var(--border-dim)',
  whiteSpace: 'nowrap',
}
