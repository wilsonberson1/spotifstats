
import React, { useEffect, useState } from 'react'
import { buildAuthorizeURL, getAccessTokenFromHash, spotifyGet } from './api'

export default function App() {
  const [token, setToken] = useState(null)
  const [profile, setProfile] = useState(null)
  const [artists, setArtists] = useState([])
  const [tracks, setTracks] = useState([])
  const [minutes, setMinutes] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const t = getAccessTokenFromHash()
    if (t?.token) {
      setToken(t.token)
      window.history.replaceState({}, document.title, window.location.pathname)
    }
  }, [])

  async function loadAll() {
    if (!token) return
    setLoading(true)
    setError(null)
    try {
      const currentYear = new Date().getFullYear()
      // Aproximação: top do ano = medium_term (~6m). Spotify não tem YTD real.
      const [me, topA, topT, recent] = await Promise.all([
        spotifyGet(token, '/me'),
        spotifyGet(token, '/me/top/artists', { time_range: 'medium_term', limit: 10 }),
        spotifyGet(token, '/me/top/tracks', { time_range: 'medium_term', limit: 10 }),
        spotifyGet(token, '/me/player/recently-played', { limit: 50 })
      ])
      setProfile(me)
      setArtists(topA.items || [])
      setTracks(topT.items || [])
      // Tempo: filtra apenas execuções do ano corrente (dentro do que a API retorna)
      const filtered = (recent.items || []).filter(it => {
        const d = new Date(it.played_at)
        return d.getFullYear() === currentYear
      })
      const totalMs = filtered.reduce((acc, it) => acc + (it.track?.duration_ms || 0), 0)
      setMinutes(Math.round(totalMs / 60000))
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadAll() }, [token])

  return (
    <>
      <header>
        <h1>SpotiStats Public — Ano Corrente <small className="badge">aprox.</small></h1>
        <nav>
          <a href="/sobre.html">Sobre</a>
          <a href="/politica-de-privacidade.html">Privacidade</a>
          <a href="/contato.html">Contato</a>
        </nav>
        {!token && (
          <button className="primary" onClick={() => (window.location.href = buildAuthorizeURL())}>
            Entrar com Spotify
          </button>
        )}
      </header>

      <main>
        {!token && (
          <div className="card" style={{ marginBottom: 16 }}>
            <p>Entre com sua conta do Spotify para ver seus artistas e músicas mais ouvidas neste ano (aprox.). Nenhum dado é armazenado.</p>
          </div>
        )}

        {token && (
          <>
            <div className="grid" style={{ marginBottom: 16 }}>
              <div className="card">
                <h3 style={{ marginTop: 0 }}>Tempo ouvido (ano corrente — aprox.)</h3>
                {loading ? <p>Carregando…</p> : <p style={{ fontSize: 28, fontWeight: 800 }}>{minutes} min</p>}
                {error && <p style={{ color: '#be123c' }}>{String(error)}</p>}
              </div>
              <div className="card">
                <h3 style={{ marginTop: 0 }}>Top Artistas (ano corrente — aprox.)</h3>
                <ul>
                  {artists.map((a, i) => <li key={a.id}>{i + 1}. {a.name}</li>)}
                </ul>
              </div>
              <div className="card">
                <h3 style={{ marginTop: 0 }}>Top Músicas (ano corrente — aprox.)</h3>
                <ul>
                  {tracks.map((t, i) => <li key={t.id}>{i + 1}. {t.name} — <span style={{ color: '#64748b' }}>{(t.artists||[]).map(a => a.name).join(', ')}</span></li>)}
                </ul>
              </div>
            </div>

            <div className="card">
              <button className="primary" onClick={loadAll} disabled={loading}>
                {loading ? 'Atualizando…' : 'Atualizar agora'}
              </button>
            </div>
          </>
        )}
      </main>

      <footer>
        <p>© {new Date().getFullYear()} SpotiStats Public — nenhum dado é armazenado. Ano corrente (aprox.) baseado na API Spotify.</p>
      </footer>
    </>
  )
}
