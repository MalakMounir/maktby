import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { mockListings } from '../data/mockData'
import { saveBooking } from '../utils/bookingStorage'
import './BookingPage.css'

function BookingPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const listing = mockListings.find(l => l.id === parseInt(id))
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardName: 'مالك منير',
    street: '123 شارع المثال',
    apt: 'A 42',
    postalCode: '00100',
    city: 'الرياض',
    saveCard: false
  })
  const [bookingData, setBookingData] = useState(null)

  useEffect(() => {
    // Load booking data from localStorage
    const pendingBooking = localStorage.getItem('pendingBooking')
    if (pendingBooking) {
      setBookingData(JSON.parse(pendingBooking))
    }
  }, [])

  if (!listing) {
    return <div>القائمة غير موجودة</div>
  }

  if (!bookingData) {
    return (
      <div className="booking-page">
        <Header />
        <div className="booking-container">
          <div className="booking-content">
            <div className="error-message">
              <p>لم يتم العثور على بيانات الحجز. يرجى العودة واختيار التاريخ والوقت.</p>
              <button onClick={() => navigate(`/listing/${id}`)}>العودة</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const calculateHours = () => {
    const start = new Date(`${bookingData.date}T${bookingData.startTime}`)
    const end = new Date(`${bookingData.date}T${bookingData.endTime}`)
    const hours = Math.max(1, Math.round((end - start) / (1000 * 60 * 60)))
    return hours
  }

  const hours = calculateHours()
  const subtotal = listing.price * hours
  const serviceFee = subtotal * 0.05
  const total = subtotal + serviceFee

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' }
    return date.toLocaleDateString('ar-SA', options)
  }

  const formatTime = (timeString) => {
    return timeString
  }

  const handleCompleteBooking = () => {
    if (!paymentData.cardNumber || paymentData.cardNumber.length < 16) {
      alert('يرجى إدخال رقم بطاقة صحيح')
      return
    }

    // Save booking
    const savedBooking = saveBooking({
      listingId: listing.id,
      listingTitle: listing.title,
      listingImage: listing.image,
      date: bookingData.date,
      startTime: bookingData.startTime,
      endTime: bookingData.endTime,
      price: listing.price,
      totalAmount: total
    })

    // Clear pending booking
    localStorage.removeItem('pendingBooking')

    // Navigate to my bookings page
    navigate('/my-bookings', { state: { bookingSuccess: true } })
  }

  return (
    <div className="booking-page">
      <Header />
      <div className="booking-container">
        <div className="booking-content">
          <div className="booking-form-section">
            <h1 className="page-title">إكمال طلب الحجز</h1>
            
            <div className="location-info">
              <h3>موقع القائمة:</h3>
              <p>80، شارع 24 يوليو، لشبونة، البرتغال</p>
            </div>

            <div className="payment-section">
              <h2 className="section-title">الدفع</h2>
              
              <div className="card-input-group">
                <div className="card-number-field">
                  <span className="card-icon">💳</span>
                  <input
                    type="text"
                    placeholder="رقم البطاقة"
                    value={paymentData.cardNumber}
                    onChange={(e) => setPaymentData({...paymentData, cardNumber: e.target.value})}
                    maxLength="19"
                  />
                </div>
                <button className="autofill-btn">رابط التعبئة التلقائية</button>
              </div>

              <div className="save-card-section">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={paymentData.saveCard}
                    onChange={(e) => setPaymentData({...paymentData, saveCard: e.target.checked})}
                  />
                  <span>حفظ تفاصيل البطاقة للطلبات المستقبلية</span>
                </label>
                <p className="disclaimer">
                  أصرح لمكتبي بإرسال تعليمات إلى المؤسسة المالية التي أصدرت بطاقتي لخصم المدفوعات من حساب بطاقتي وفقًا لشروط اتفاقيتي معك.
                </p>
              </div>
            </div>

            <div className="billing-section">
              <h2 className="section-title">تفاصيل الفوترة</h2>
              
              <div className="form-grid">
                <div className="form-group">
                  <label>اسم حامل البطاقة</label>
                  <input
                    type="text"
                    value={paymentData.cardName}
                    onChange={(e) => setPaymentData({...paymentData, cardName: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>عنوان الشارع</label>
                  <input
                    type="text"
                    value={paymentData.street}
                    onChange={(e) => setPaymentData({...paymentData, street: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>الشقة (اختياري)</label>
                  <input
                    type="text"
                    value={paymentData.apt}
                    onChange={(e) => setPaymentData({...paymentData, apt: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>الرمز البريدي</label>
                  <input
                    type="text"
                    value={paymentData.postalCode}
                    onChange={(e) => setPaymentData({...paymentData, postalCode: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>المدينة</label>
                  <input
                    type="text"
                    value={paymentData.city}
                    onChange={(e) => setPaymentData({...paymentData, city: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="booking-summary">
            <div className="summary-card">
              <div className="summary-image">
                <img src={listing.image} alt={listing.title} />
              </div>
              <h2 className="summary-title">{listing.title}</h2>
              
              <div className="booking-breakdown">
                <h3 className="breakdown-title">تفاصيل الحجز</h3>
                
                <div className="breakdown-item">
                  <div className="breakdown-label">بداية الحجز:</div>
                  <div className="breakdown-value">
                    <div>{formatTime(bookingData.startTime)}</div>
                    <div>{formatDate(bookingData.date)}</div>
                  </div>
                </div>
                
                <div className="breakdown-item">
                  <div className="breakdown-label">نهاية الحجز:</div>
                  <div className="breakdown-value">
                    <div>{formatTime(bookingData.endTime)}</div>
                    <div>{formatDate(bookingData.date)}</div>
                  </div>
                </div>
                
                <div className="breakdown-item">
                  <div className="breakdown-label">التكلفة المفصلة:</div>
                  <div className="breakdown-value">
                    €{listing.price.toFixed(2)} × {hours} ساعة
                  </div>
                </div>
                
                <div className="breakdown-item">
                  <div className="breakdown-label">المجموع الفرعي:</div>
                  <div className="breakdown-value">€{subtotal.toFixed(2)}</div>
                </div>
                
                <div className="breakdown-item">
                  <div className="breakdown-label">رسوم الحجز/الخدمة:</div>
                  <div className="breakdown-value">€{serviceFee.toFixed(2)}</div>
                </div>
                
                <div className="breakdown-total">
                  <div className="breakdown-label">الإجمالي:</div>
                  <div className="breakdown-value total">€{total.toFixed(2)}</div>
                </div>
                
                <p className="vat-note">* يشمل إجمالي ضريبة القيمة المضافة</p>
              </div>

              <button className="complete-booking-btn" onClick={handleCompleteBooking}>
                تأكيد الحجز والدفع
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingPage

