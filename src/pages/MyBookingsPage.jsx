import { useState, useEffect, useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Header from '../components/Header'
import { getUserBookings, updateBookingStatus } from '../utils/bookingStorage'
import { mockListings } from '../data/mockData'
import './MyBookingsPage.css'

function MyBookingsPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [bookings, setBookings] = useState([])
  const [filterStatus, setFilterStatus] = useState('all') // all, upcoming, past, cancelled
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  useEffect(() => {
    // Load user bookings
    const userBookings = getUserBookings()
    setBookings(userBookings)
    
    // Show success message if coming from booking completion
    if (location.state?.bookingSuccess) {
      setShowSuccessMessage(true)
      setTimeout(() => setShowSuccessMessage(false), 5000)
      // Clear the state
      window.history.replaceState({}, document.title)
    }
  }, [location.state])

  // Filter bookings based on status and date
  const filteredBookings = useMemo(() => {
    const now = new Date()
    return bookings.filter(booking => {
      const bookingDate = new Date(`${booking.date}T${booking.endTime}`)
      const isPast = bookingDate < now
      const isUpcoming = bookingDate >= now

      if (filterStatus === 'all') return true
      if (filterStatus === 'upcoming') return isUpcoming && booking.status !== 'cancelled'
      if (filterStatus === 'past') return isPast && booking.status !== 'cancelled'
      if (filterStatus === 'cancelled') return booking.status === 'cancelled'
      
      return booking.status === filterStatus
    }).sort((a, b) => {
      // Sort by date, upcoming first
      const dateA = new Date(`${a.date}T${a.startTime}`)
      const dateB = new Date(`${b.date}T${b.startTime}`)
      return dateB - dateA
    })
  }, [bookings, filterStatus])

  // Calculate statistics
  const stats = useMemo(() => {
    const now = new Date()
    const upcoming = bookings.filter(b => {
      const bookingDate = new Date(`${b.date}T${b.endTime}`)
      return bookingDate >= now && b.status !== 'cancelled'
    }).length
    const past = bookings.filter(b => {
      const bookingDate = new Date(`${b.date}T${b.endTime}`)
      return bookingDate < now && b.status !== 'cancelled'
    }).length
    const cancelled = bookings.filter(b => b.status === 'cancelled').length

    return { upcoming, past, cancelled, total: bookings.length }
  }, [bookings])

  const handleCancelBooking = (bookingId) => {
    if (window.confirm('هل أنت متأكد من إلغاء هذا الحجز؟')) {
      const updated = updateBookingStatus(bookingId, 'cancelled')
      if (updated) {
        setBookings(prev => prev.map(b => b.id === bookingId ? updated : b))
        alert('تم إلغاء الحجز بنجاح')
      }
    }
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { label: 'قيد الانتظار', class: 'status-pending' },
      confirmed: { label: 'مؤكد', class: 'status-confirmed' },
      cancelled: { label: 'ملغي', class: 'status-cancelled' },
      completed: { label: 'مكتمل', class: 'status-completed' }
    }
    const config = statusConfig[status] || statusConfig.pending
    return <span className={`status-badge ${config.class}`}>{config.label}</span>
  }

  const getPaymentStatusBadge = (paymentStatus) => {
    const paymentConfig = {
      paid: { label: 'مدفوع', class: 'payment-paid' },
      pending: { label: 'قيد الدفع', class: 'payment-pending' },
      refunded: { label: 'مسترد', class: 'payment-refunded' }
    }
    const config = paymentConfig[paymentStatus] || paymentConfig.pending
    return <span className={`payment-badge ${config.class}`}>{config.label}</span>
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' }
    return date.toLocaleDateString('ar-SA', options)
  }

  const formatTime = (timeString) => {
    return timeString
  }

  const getListingImage = (listingId) => {
    const listing = mockListings.find(l => l.id === listingId)
    return listing?.image || 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80'
  }

  return (
    <div className="my-bookings-page">
      <Header />
      <div className="bookings-container">
        <div className="bookings-header">
          <h1 className="page-title">حجوزاتي</h1>
          <p className="page-subtitle">إدارة حجوزاتك وتاريخ الحجوزات</p>
        </div>

        {/* Success Message */}
        {showSuccessMessage && (
          <div className="success-message">
            <span className="success-icon">✅</span>
            <span>تم تأكيد حجزك بنجاح!</span>
            <button className="close-success" onClick={() => setShowSuccessMessage(false)}>✕</button>
          </div>
        )}

        {/* Statistics Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📅</div>
            <div className="stat-content">
              <h3 className="stat-value">{stats.upcoming}</h3>
              <p className="stat-label">حجوزات قادمة</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <h3 className="stat-value">{stats.past}</h3>
              <p className="stat-label">حجوزات سابقة</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">❌</div>
            <div className="stat-content">
              <h3 className="stat-value">{stats.cancelled}</h3>
              <p className="stat-label">ملغاة</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <h3 className="stat-value">{stats.total}</h3>
              <p className="stat-label">إجمالي الحجوزات</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bookings-filters">
          <div className="filter-buttons">
            <button
              className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
              onClick={() => setFilterStatus('all')}
            >
              الكل
            </button>
            <button
              className={`filter-btn ${filterStatus === 'upcoming' ? 'active' : ''}`}
              onClick={() => setFilterStatus('upcoming')}
            >
              القادمة
            </button>
            <button
              className={`filter-btn ${filterStatus === 'past' ? 'active' : ''}`}
              onClick={() => setFilterStatus('past')}
            >
              السابقة
            </button>
            <button
              className={`filter-btn ${filterStatus === 'cancelled' ? 'active' : ''}`}
              onClick={() => setFilterStatus('cancelled')}
            >
              الملغاة
            </button>
          </div>
        </div>

        {/* Bookings List */}
        <div className="bookings-section">
          <h2 className="section-title">
            {filterStatus === 'all' && 'جميع الحجوزات'}
            {filterStatus === 'upcoming' && 'الحجوزات القادمة'}
            {filterStatus === 'past' && 'الحجوزات السابقة'}
            {filterStatus === 'cancelled' && 'الحجوزات الملغاة'}
            <span className="count-badge">({filteredBookings.length})</span>
          </h2>

          {filteredBookings.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📋</div>
              <h3>لا توجد حجوزات</h3>
              <p>لم يتم العثور على حجوزات تطابق المعايير المحددة</p>
              <button className="browse-btn" onClick={() => navigate('/listings')}>
                تصفح المساحات المتاحة
              </button>
            </div>
          ) : (
            <div className="bookings-grid">
              {filteredBookings.map((booking) => {
                const listing = mockListings.find(l => l.id === booking.listingId)
                const bookingDate = new Date(`${booking.date}T${booking.endTime}`)
                const isUpcoming = bookingDate >= new Date() && booking.status !== 'cancelled'

                return (
                  <div key={booking.id} className="booking-card">
                    <div className="booking-image">
                      <img src={booking.listingImage || getListingImage(booking.listingId)} alt={booking.listingTitle} />
                      <div className="booking-status-overlay">
                        {getStatusBadge(booking.status)}
                      </div>
                    </div>
                    
                    <div className="booking-content">
                      <h3 className="booking-title">{booking.listingTitle}</h3>
                      
                      <div className="booking-info">
                        <div className="info-item">
                          <span className="info-icon">📅</span>
                          <div className="info-text">
                            <div className="info-label">التاريخ</div>
                            <div className="info-value">{formatDate(booking.date)}</div>
                          </div>
                        </div>
                        
                        <div className="info-item">
                          <span className="info-icon">🕐</span>
                          <div className="info-text">
                            <div className="info-label">الوقت</div>
                            <div className="info-value">
                              {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
                            </div>
                          </div>
                        </div>
                        
                        <div className="info-item">
                          <span className="info-icon">⏱️</span>
                          <div className="info-text">
                            <div className="info-label">المدة</div>
                            <div className="info-value">{booking.hours} ساعة</div>
                          </div>
                        </div>
                        
                        <div className="info-item">
                          <span className="info-icon">💰</span>
                          <div className="info-text">
                            <div className="info-label">المبلغ</div>
                            <div className="info-value">€{booking.totalAmount.toFixed(2)}</div>
                          </div>
                        </div>
                      </div>

                      <div className="booking-meta">
                        {getPaymentStatusBadge(booking.paymentStatus)}
                        <span className="booking-id">#{booking.id}</span>
                      </div>

                      <div className="booking-actions">
                        {isUpcoming && booking.status !== 'cancelled' && (
                          <button
                            className="btn-cancel"
                            onClick={() => handleCancelBooking(booking.id)}
                          >
                            إلغاء الحجز
                          </button>
                        )}
                        <button
                          className="btn-view"
                          onClick={() => setSelectedBooking(selectedBooking === booking.id ? null : booking.id)}
                        >
                          {selectedBooking === booking.id ? 'إخفاء التفاصيل' : 'عرض التفاصيل'}
                        </button>
                        {listing && (
                          <button
                            className="btn-listing"
                            onClick={() => navigate(`/listing/${booking.listingId}`)}
                          >
                            عرض المساحة
                          </button>
                        )}
                      </div>

                      {selectedBooking === booking.id && (
                        <div className="booking-details">
                          <h4>تفاصيل الحجز</h4>
                          <div className="details-grid">
                            <div className="detail-item">
                              <label>المساحة:</label>
                              <span>{booking.listingTitle}</span>
                            </div>
                            <div className="detail-item">
                              <label>التاريخ:</label>
                              <span>{formatDate(booking.date)}</span>
                            </div>
                            <div className="detail-item">
                              <label>الوقت:</label>
                              <span>{formatTime(booking.startTime)} - {formatTime(booking.endTime)}</span>
                            </div>
                            <div className="detail-item">
                              <label>المدة:</label>
                              <span>{booking.hours} ساعة</span>
                            </div>
                            <div className="detail-item">
                              <label>السعر للساعة:</label>
                              <span>€{booking.price.toFixed(2)}</span>
                            </div>
                            <div className="detail-item">
                              <label>المبلغ الإجمالي:</label>
                              <span><strong>€{booking.totalAmount.toFixed(2)}</strong></span>
                            </div>
                            <div className="detail-item">
                              <label>حالة الحجز:</label>
                              <span>{getStatusBadge(booking.status)}</span>
                            </div>
                            <div className="detail-item">
                              <label>حالة الدفع:</label>
                              <span>{getPaymentStatusBadge(booking.paymentStatus)}</span>
                            </div>
                            <div className="detail-item">
                              <label>تاريخ الحجز:</label>
                              <span>{new Date(booking.bookingDate).toLocaleString('ar-SA')}</span>
                            </div>
                            {booking.notes && (
                              <div className="detail-item full-width">
                                <label>ملاحظات:</label>
                                <span>{booking.notes}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MyBookingsPage

