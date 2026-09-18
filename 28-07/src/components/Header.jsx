import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/AuthContext'
import Icon, { IconButton } from './Icon'
import '../styles/Header.css'

export default function Header() {
  const { user, profile, signOut } = useAuth()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const name = profile?.nombre || user?.user_metadata?.first_name || user?.email?.split('@')[0] || 'Mi cuenta'

  async function logout() {
    await signOut()
    navigate('/')
  }

  const close = () => setOpen(false)

  return (
    <header className="app-header">
      <nav className="nav-container">
        <Link className="brand" to="/" onClick={close}>Donay<span>Viste</span><i aria-hidden="true">↻</i></Link>
        <IconButton className="menu-toggle" label={open ? 'Cerrar menú' : 'Abrir menú'} onClick={() => setOpen(!open)}>
          <Icon name={open ? 'close' : 'menu'} decorative />
        </IconButton>
        <div className={`nav-menu ${open ? 'open' : ''}`}>
          <div className="nav-buttons">
            <NavLink end to="/" onClick={close}>Inicio</NavLink>
            <NavLink to="/compra" onClick={close}>Comprar</NavLink>
            <NavLink to="/venta" onClick={close}>Vender</NavLink>
            <NavLink to="/donar" onClick={close}>Donar</NavLink>
            <NavLink to="/donaciones" onClick={close}>Donaciones</NavLink>
            <NavLink to="/contacto" onClick={close}>Contacto</NavLink>
          </div>
          <div className="user-section">
            {user ? (
              <>
                <Link to="/perfil" onClick={close} className="user-chip"><b>{name.slice(0, 1).toUpperCase()}</b><span>{name}</span></Link>
                <button className="logout-btn" onClick={logout}>Salir</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={close}>Iniciar sesión</Link>
                <Link className="primary-nav" to="/register" onClick={close}>Crear cuenta</Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}
