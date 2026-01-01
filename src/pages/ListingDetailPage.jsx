import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { mockListings } from '../data/mockData'
import './ListingDetailPage.css'

function ListingDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const listing = mockListings.find(l => l.id === parseInt(id))
  const [selectedImage, setSelectedImage] = useState(0)
  const [bookingData, setBookingData] = useState({
    date: '',
    startTime: '8:00',
    endTime: '17:00'
  })

  if (!listing) {
    return <div>القائمة غير موجودة</div>
  }

  const handleBooking = () => {
    // Save booking data to localStorage temporarily
    localStorage.setItem('pendingBooking', JSON.stringify({
      listingId: parseInt(id),
      date: bookingData.date,
      startTime: bookingData.startTime,
      endTime: bookingData.endTime
    }))
    navigate(`/booking/${id}`)
  }

  return (
    <div className="listing-detail-page">
      <Header />
      <div className="detail-container">
        <div className="detail-content">
          <div className="image-section">
            <div className="main-image">
              <img src={listing.images[selectedImage]} alt={listing.title} />
              <button className="view-photos-btn">عرض جميع الصور ({listing.images.length})</button>
            </div>
            <div className="thumbnail-gallery">
              {listing.images.map((img, index) => (
                <div
                  key={index}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={img} alt={`${listing.title} ${index + 1}`} />
                </div>
              ))}
            </div>
            <div className="description-section">
              <p className="description-text">{listing.description}</p>
              <p className="description-quote">ادخل. افعل ما يجب فعله. كرر.</p>
            </div>
          </div>

          <div className="booking-section">
            <div className="booking-card">
              <h2 className="listing-title">{listing.title}</h2>
              <div className="price-section">
                <span className="price">€{listing.price.toFixed(2)}</span>
                <span className="price-unit">للساعة</span>
              </div>
              <div className="provider-info">
                <span className="provider-icon">🏢</span>
                <span>{listing.provider}</span>
              </div>

              <div className="booking-form">
                <div className="form-group">
                  <label>اختر التاريخ</label>
                  <input
                    type="date"
                    value={bookingData.date}
                    onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>وقت البداية</label>
                  <select
                    value={bookingData.startTime}
                    onChange={(e) => setBookingData({...bookingData, startTime: e.target.value})}
                  >
                    {Array.from({length: 24}, (_, i) => {
                      const hour = i.toString().padStart(2, '0')
                      return <option key={i} value={`${hour}:00`}>{hour}:00</option>
                    })}
                  </select>
                </div>
                <div className="form-group">
                  <label>وقت النهاية</label>
                  <select
                    value={bookingData.endTime}
                    onChange={(e) => setBookingData({...bookingData, endTime: e.target.value})}
                  >
                    {Array.from({length: 24}, (_, i) => {
                      const hour = i.toString().padStart(2, '0')
                      return <option key={i} value={`${hour}:00`}>{hour}:00</option>
                    })}
                  </select>
                </div>
                <p className="no-charge-note">لن يتم خصم المبلغ بعد</p>
                <button className="book-btn" onClick={handleBooking}>
                  احجز الآن
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListingDetailPage

