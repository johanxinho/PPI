import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import Icon, { IconButton } from '../components/Icon'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function submit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { data, error: authError } = await supabase.auth.signInWithPassword({ email: email.trim(), password })
    if (authError) {
      setLoading(false)
      return setError(authError.message)
    }
    if (!data.user.email_confirmed_at) {
      await supabase.auth.signOut()
      setLoading(false)
      return setError('Confirma tu correo electrónico antes de iniciar sesión.')
    }
    setLoading(false)
    navigate('/')
  }

  return (
    <div className="auth-shell">
      <aside className="auth-aside">
        <span className="eyebrow">DonayViste · comunidad circular</span>
        <h1>Lo que cuidas, vuelve a servir.</h1>
        <p>Ingresa para comprar, publicar y compartir uniformes que todavía tienen mucho por dar.</p>
      </aside>
      <main className="auth-panel">
        <section className="auth-form">
          <span className="eyebrow">Bienvenida de vuelta</span>
          <h2>Inicia sesión</h2>
          <p style={{ textAlign: 'left' }}>Continúa en tu comunidad DonayViste.</p>
          <form onSubmit={submit}>
            <label>Correo electrónico<input type="email" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" /></label>
            <label>Contraseña
              <div className="password-field">
                <input type={show ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required autoComplete="current-password" />
                <IconButton label={show ? 'Ocultar contraseña' : 'Mostrar contraseña'} onClick={() => setShow(!show)}>
                  <Icon name={show ? 'eyeOff' : 'eye'} decorative />
                </IconButton>
              </div>
            </label>
            {error && <div className="form-error">{error}</div>}
            <button className="button primary" disabled={loading}>{loading ? 'Ingresando…' : 'Iniciar sesión'}</button>
          </form>
          <Link className="auth-secondary-btn" to="/recuperar-password">¿Olvidaste tu contraseña?</Link>
          <p>¿Aún no tienes cuenta? <Link to="/register">Créala aquí</Link></p>
        </section>
      </main>
    </div>
  )
}
