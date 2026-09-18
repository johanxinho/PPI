const icons = {
  phone: 'M6.8 4.9c.4-.4 1-.5 1.5-.3l2.2.9c.5.2.9.7 1 1.3l.3 2.1c.1.5-.1 1-.5 1.3L9.8 12c1.6 2.4 3.8 4.4 6.3 5.8l1.7-1.4c.4-.3.9-.4 1.4-.3l2.1.4c.6.1 1 .6 1.2 1.1l.8 2.2c.2.6.1 1.2-.3 1.6l-1.3 1.3c-.5.5-1.2.7-1.9.6-5.2-.7-10-3.5-13.4-8S2.9 7.9 3.8 2.8c.1-.7.5-1.3 1.1-1.6z',
  mail: 'M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5z M5.2 7.2 12 12.2l6.8-5',
  globe: 'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17z M3.5 12h17 M12 3.5c2.4 2.4 3.6 5.4 3.6 8.5S14.4 18.1 12 20.5C9.6 18.1 8.4 15.1 8.4 12S9.6 5.9 12 3.5z',
  pin: 'M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11z M12 10.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z',
  menu: 'M4 7h16 M4 12h16 M4 17h16',
  close: 'M6 6l12 12 M18 6 6 18',
  eye: 'M2.5 12S6 6.5 12 6.5 21.5 12 21.5 12 18 17.5 12 17.5 2.5 12 2.5 12z M12 9.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5z',
  eyeOff: 'M4 4l16 16 M9.5 9.7A3 3 0 0 0 12 15.5 M14.6 14.2A3 3 0 0 0 9.9 9.4 M6.2 6.7C4.2 8.1 2.5 12 2.5 12S6 17.5 12 17.5c1.5 0 2.8-.3 4-.8 M10.2 6.7C10.8 6.6 11.4 6.5 12 6.5 18 6.5 21.5 12 21.5 12s-.6 1.1-1.7 2.3',
}

export default function Icon({ name, size = 22, decorative = false, className = '' }) {
  const d = icons[name]
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={decorative ? 'true' : undefined}
      role={decorative ? 'presentation' : 'img'}
    >
      <path d={d} />
    </svg>
  )
}

export function IconButton({ label, onClick, children, className = '', type = 'button' }) {
  return (
    <button type={type} className={`icon-btn ${className}`} onClick={onClick} aria-label={label} title={label}>
      {children}
    </button>
  )
}
