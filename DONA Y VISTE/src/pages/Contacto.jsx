import Icon from '../components/Icon'
import '../styles/Contacto.css'

const channels = [
  { icon: 'phone', label: 'Teléfono', value: '336-4824793', href: 'tel:3364824793' },
  { icon: 'mail', label: 'Correo', value: 'donayviste@gmail.com', href: 'mailto:donayviste@gmail.com' },
  { icon: 'globe', label: 'Sitio web', value: 'www.Donayviste.com', href: 'https://juanusuga033.github.io/PPI/' },
  { icon: 'pin', label: 'Ubicación', value: 'Santo Domingo — Medellín' },
]

export default function Contacto() {
  const shield = `${import.meta.env.BASE_URL}catalog/uniforme-15-page-4.jpeg`
  return (
    <div className="contacto-page">
      <div className="contacto-container">
        <div className="contacto-info">
          <h1>DonayViste</h1>
          <p className="subtitle">Contáctanos</p>
          {channels.map(item => (
            <div className="info-item" key={item.label}>
              <span className="icon" aria-hidden="true"><Icon name={item.icon} decorative /></span>
              {item.href
                ? <a href={item.href}>{item.value}</a>
                : <span>{item.value}</span>}
            </div>
          ))}
        </div>
        <div className="contacto-logo">
          <div className="shield">
            <img src={shield} alt="Escudo de la I.E. La Candelaria" />
          </div>
        </div>
      </div>
    </div>
  )
}
