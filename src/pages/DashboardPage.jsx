import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { mockBookings } from '../data/mockBookings'
import { mockListings } from '../data/mockData'
import './DashboardPage.css'

function DashboardPage() {
  const navigate = useNavigate()
  const [bookings] = useState(mockBookings)
  const [filterStatus, setFilterStatus] = useState('all') // all, pending, confirmed, cancelled, completed
  const [filterDate, setFilterDate] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBooking, setSelectedBooking] = useState(null)

  // Calculate statistics
  const stats = useMemo(() => {
    const totalBookings = bookings.length
    const pendingBookings = bookings.filter(b => b.status === 'pending').length
    const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length
    const completedBookings = bookings.filter(b => b.status === 'completed').length
    const totalRevenue = bookings
      .filter(b => b.paymentStatus === 'paid' && b.status !== 'cancelled')
      .reduce((sum, b) => sum + b.totalAmount, 0)
    const todayBookings = bookings.filter(b => b.date === new Date().toISOString().split('T')[0]).length

    return {
      totalBookings,
      pendingBookings,
      confirmedBookings,
      completedBookings,
      totalRevenue,
      todayBookings
    }
  }, [bookings])

  // Filter bookings
  const filteredBookings = useMemo(() => {
    return bookings.filter(booking => {
      const matchesStatus = filterStatus === 'all' || booking.status === filterStatus
      const matchesDate = !filterDate || booking.date === filterDate
      const matchesSearch = !searchQuery || 
        booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.listingTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.customerEmail.toLowerCase().includes(searchQuery.toLowerCase())

      return matchesStatus && matchesDate && matchesSearch
    })
  }, [bookings, filterStatus, filterDate, searchQuery])

  // Handle booking actions
  const handleApprove = (bookingId) => {
    // In real app, this would make an API call
    alert(`تم تأكيد الحجز #${bookingId}`)
  }

  const handleReject = (bookingId) => {
    // In real app, this would make an API call
    if (window.confirm('هل أنت متأكد من رفض هذا الحجز؟')) {
      alert(`تم رفض الحجز #${bookingId}`)
    }
  }

  const handleCancel = (bookingId) => {
    // In real app, this would make an API call
    if (window.confirm('هل أنت متأكد من إلغاء هذا الحجز؟')) {
      alert(`تم إلغاء الحجز #${bookingId}`)
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

  return (
    <div className="dashboard-page">
      <Header />
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">لوحة تحكم مساحات العمل</h1>
          <p className="dashboard-subtitle">إدارة الحجوزات والمراقبة</p>
        </div>

        {/* Statistics Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <h3 className="stat-value">{stats.totalBookings}</h3>
              <p className="stat-label">إجمالي الحجوزات</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">⏳</div>
            <div className="stat-content">
              <h3 className="stat-value">{stats.pendingBookings}</h3>
              <p className="stat-label">قيد الانتظار</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <h3 className="stat-value">{stats.confirmedBookings}</h3>
              <p className="stat-label">مؤكدة</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-content">
              <h3 className="stat-value">€{stats.totalRevenue.toFixed(2)}</h3>
              <p className="stat-label">إجمالي الإيرادات</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📅</div>
            <div className="stat-content">
              <h3 className="stat-value">{stats.todayBookings}</h3>
              <p className="stat-label">حجوزات اليوم</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">✔️</div>
            <div className="stat-content">
              <h3 className="stat-value">{stats.completedBookings}</h3>
              <p className="stat-label">مكتملة</p>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="dashboard-filters">
          <div className="filter-group">
            <label>البحث:</label>
            <input
              type="text"
              placeholder="ابحث بالاسم، البريد الإلكتروني، أو عنوان المساحة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-group">
            <label>الحالة:</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="filter-select"
            >
              <option value="all">الكل</option>
              <option value="pending">قيد الانتظار</option>
              <option value="confirmed">مؤكد</option>
              <option value="completed">مكتمل</option>
              <option value="cancelled">ملغي</option>
            </select>
          </div>

          <div className="filter-group">
            <label>التاريخ:</label>
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="filter-date"
            />
          </div>

          {filterDate && (
            <button
              className="clear-filter-btn"
              onClick={() => setFilterDate('')}
            >
              مسح التاريخ
            </button>
          )}
        </div>

        {/* Bookings Table */}
        <div className="bookings-section">
          <h2 className="section-title">الحجوزات ({filteredBookings.length})</h2>
          
          <div className="bookings-table-container">
            <table className="bookings-table">
              <thead>
                <tr>
                  <th>رقم الحجز</th>
                  <th>المساحة</th>
                  <th>العميل</th>
                  <th>التاريخ والوقت</th>
                  <th>المدة</th>
                  <th>المبلغ</th>
                  <th>حالة الحجز</th>
                  <th>حالة الدفع</th>
                  <th>الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="no-bookings">
                      لا توجد حجوزات تطابق المعايير المحددة
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map((booking) => (
                    <tr key={booking.id} className={selectedBooking === booking.id ? 'selected' : ''}>
                      <td>#{booking.id}</td>
                      <td>
                        <div className="listing-info">
                          <strong>{booking.listingTitle}</strong>
                        </div>
                      </td>
                      <td>
                        <div className="customer-info">
                          <div className="customer-name">{booking.customerName}</div>
                          <div className="customer-email">{booking.customerEmail}</div>
                          <div className="customer-phone">{booking.customerPhone}</div>
                        </div>
                      </td>
                      <td>
                        <div className="datetime-info">
                          <div className="booking-date">{formatDate(booking.date)}</div>
                          <div className="booking-time">
                            {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
                          </div>
                        </div>
                      </td>
                      <td>{booking.hours} ساعة</td>
                      <td>
                        <div className="amount-info">
                          <strong>€{booking.totalAmount.toFixed(2)}</strong>
                          <small>€{booking.price}/ساعة</small>
                        </div>
                      </td>
                      <td>{getStatusBadge(booking.status)}</td>
                      <td>{getPaymentStatusBadge(booking.paymentStatus)}</td>
                      <td>
                        <div className="action-buttons">
                          {booking.status === 'pending' && (
                            <>
                              <button
                                className="btn-approve"
                                onClick={() => handleApprove(booking.id)}
                              >
                                ✓ تأكيد
                              </button>
                              <button
                                className="btn-reject"
                                onClick={() => handleReject(booking.id)}
                              >
                                ✗ رفض
                              </button>
                            </>
                          )}
                          {booking.status === 'confirmed' && (
                            <button
                              className="btn-cancel"
                              onClick={() => handleCancel(booking.id)}
                            >
                              إلغاء
                            </button>
                          )}
                          <button
                            className="btn-view"
                            onClick={() => setSelectedBooking(selectedBooking === booking.id ? null : booking.id)}
                          >
                            {selectedBooking === booking.id ? 'إخفاء' : 'تفاصيل'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Booking Details Modal/Expansion */}
          {selectedBooking && (
            <div className="booking-details">
              {(() => {
                const booking = bookings.find(b => b.id === selectedBooking)
                if (!booking) return null
                return (
                  <div className="details-card">
                    <h3>تفاصيل الحجز #{booking.id}</h3>
                    <div className="details-grid">
                      <div className="detail-item">
                        <label>المساحة:</label>
                        <span>{booking.listingTitle}</span>
                      </div>
                      <div className="detail-item">
                        <label>العميل:</label>
                        <span>{booking.customerName}</span>
                      </div>
                      <div className="detail-item">
                        <label>البريد الإلكتروني:</label>
                        <span>{booking.customerEmail}</span>
                      </div>
                      <div className="detail-item">
                        <label>الهاتف:</label>
                        <span>{booking.customerPhone}</span>
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
                )
              })()}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DashboardPage

