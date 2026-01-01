import { Link } from 'react-router-dom'
import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <div className="logo-icon">💼</div>
          <div className="logo-text">
            <span className="logo-main">مكتبي</span>
            <span className="logo-sub">maktby</span>
          </div>
        </Link>
        
        <nav className="nav">
          <Link to="/my-bookings" className="nav-link">حجوزاتي</Link>
          <Link to="/dashboard" className="nav-link">لوحة التحكم</Link>
          <Link to="/contact" className="nav-link">اتصل بنا</Link>
          <Link to="/inbox" className="nav-link">الرسائل</Link>
          <div className="language-selector">
            <button className="lang-btn active">AR</button>
            <button className="lang-btn">EN</button>
          </div>
          <div className="user-avatar">م.م</div>
        </nav>
      </div>
    </header>
  )
}

export default Header

