import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { passwordError } from '../lib/password'

export default function Register() {
  const [form, setForm] = useState({ first: '', last: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const set = (k, v) => setForm({ ...form, [k]: v })

  async function submit(e) {
    e.preventDefault()
    setError('')
    const weak = passwordError(form.password)
    if (weak) return setError(weak)
    if (form.password !== form.confirm) return setError('Las contraseñas no coinciden.')
    setLoading(true)
    const { error: signError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        emailRedirectTo: `${window.location.origin}/login`,
        data: { first_name: form.first.trim(), last_name: form.last.trim() },
      },
    })
    setLoading(false)
    if (signError) return setError(signError.message)
    setSuccess(true)
  }

  if (success) {
    return (
      <div className="auth-shell">
        <aside className="auth-aside"><h1>Una nueva historia comienza.</h1></aside>
        <main className="auth-panel">
          <section className="auth-form">
            <span className="eyebrow">Cuenta creada</span>
            <h2>Revisa tu correo</h2>
            <div className="form-success">Te enviamos un enlace de confirmación a <b>{form.email}</b>. Ábrelo para activar tu cuenta y luego podrás iniciar sesión.</div>
            <p><Link to="/login">Volver a iniciar sesión</Link></p>
          </section>
        </main>
      </div>
    )
  }

  return (
    <div className="auth-shell">
      <aside className="auth-aside">
        <span className="eyebrow">Únete a la comunidad</span>
        <h1>Una prenda puede hacer una gran diferencia.</h1>
        <p>Crea tu cuenta y participa en una economía escolar más cercana y sostenible.</p>
      </aside>
      <main className="auth-panel">
        <section className="auth-form">
          <span className="eyebrow">Crear cuenta</span>
          <h2>Únete a DonayViste</h2>
          <form onSubmit={submit}>
            <label>Nombre<input value={form.first} onChange={e => set('first', e.target.value)} required autoComplete="given-name" /></label>
            <label>Apellido<input value={form.last} onChange={e => set('last', e.target.value)} required autoComplete="family-name" /></label>
            <label>Correo electrónico<input type="email" value={form.email} onChange={e => set('email', e.target.value)} required autoComplete="email" /></label>
            <label>Contraseña<input type="password" minLength="10" value={form.password} onChange={e => set('password', e.target.value)} required autoComplete="new-password" /></label>
            <small className="field-hint">Mínimo 10 caracteres, con mayúscula, minúscula y número.</small>
            <label>Confirmar contraseña<input type="password" minLength="10" value={form.confirm} onChange={e => set('confirm', e.target.value)} required autoComplete="new-password" /></label>
            {error && <div className="form-error">{error}</div>}
            <button className="button primary" disabled={loading}>{loading ? 'Creando cuenta…' : 'Crear mi cuenta'}</button>
          </form>
          <p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
        </section>
      </main>
    </div>
  )
}
