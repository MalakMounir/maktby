import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { divIcon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import Header from '../components/Header'
import { mockListings } from '../data/mockData'
import './ListingsPage.css'

// Function to create custom marker icon with title and price
const createCustomIcon = (title, price) => {
  // Truncate title if too long
  const truncatedTitle = title.length > 20 ? title.substring(0, 20) + '...' : title
  
  const iconHtml = `
    <div class="custom-marker">
      <div class="custom-marker-content">
        <div class="custom-marker-title">${truncatedTitle}</div>
        <div class="custom-marker-price">€${price}</div>
      </div>
      <div class="custom-marker-pin"></div>
    </div>
  `

  return divIcon({
    html: iconHtml,
    className: 'custom-marker-container',
    iconSize: [140, 65],
    iconAnchor: [70, 65],
    popupAnchor: [0, -65]
  })
}

function ListingsPage() {
  const navigate = useNavigate()
  const [listings] = useState(mockListings)
  const [sortBy, setSortBy] = useState('newest')
  const [activeFilter, setActiveFilter] = useState('listingType')
  
  // Calculate center of all listings
  const centerLat = listings.reduce((sum, l) => sum + l.location.lat, 0) / listings.length
  const centerLng = listings.reduce((sum, l) => sum + l.location.lng, 0) / listings.length

  return (
    <div className="listings-page">
      <Header />
      <div className="listings-container">
        <div className="listings-header">
          <h2 className="results-count">{listings.length} نتيجة</h2>
          <div className="filters-bar">
            <div className="filter-buttons">
              <button 
                className={`filter-btn ${activeFilter === 'listingType' ? 'active' : ''}`}
                onClick={() => setActiveFilter('listingType')}
              >
                نوع القائمة
              </button>
              <button 
                className={`filter-btn ${activeFilter === 'dates' ? 'active' : ''}`}
                onClick={() => setActiveFilter('dates')}
              >
                التواريخ
              </button>
              <button 
                className={`filter-btn ${activeFilter === 'price' ? 'active' : ''}`}
                onClick={() => setActiveFilter('price')}
              >
                السعر
              </button>
              <button 
                className={`filter-btn ${activeFilter === 'category' ? 'active' : ''}`}
                onClick={() => setActiveFilter('category')}
              >
                الفئة
              </button>
              <button 
                className={`filter-btn ${activeFilter === 'more' ? 'active' : ''}`}
                onClick={() => setActiveFilter('more')}
              >
                المزيد من الفلاتر
              </button>
            </div>
            <div className="sort-section">
              <label>ترتيب حسب:</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="newest">الأحدث</option>
                <option value="price-low">السعر: من الأقل للأعلى</option>
                <option value="price-high">السعر: من الأعلى للأقل</option>
                <option value="rating">التقييم</option>
              </select>
            </div>
          </div>
        </div>

        <div className="listings-content">
          <div className="listings-grid">
            {listings.map((listing) => (
              <Link key={listing.id} to={`/listing/${listing.id}`} className="listing-card">
                <div className="listing-image">
                  <img src={listing.image} alt={listing.title} />
                  <div className="listing-price">€{listing.price} للساعة</div>
                </div>
                <div className="listing-info">
                  <h3 className="listing-title">{listing.title}</h3>
                  <p className="listing-provider">{listing.provider}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="map-section">
            <MapContainer
              center={[centerLat, centerLng]}
              zoom={13}
              style={{ height: '100%', width: '100%', borderRadius: '16px' }}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {listings.map((listing) => (
                <Marker
                  key={listing.id}
                  position={[listing.location.lat, listing.location.lng]}
                  icon={createCustomIcon(listing.title, listing.price)}
                  eventHandlers={{
                    click: () => {
                      navigate(`/listing/${listing.id}`)
                    }
                  }}
                >
                  <Popup>
                    <div className="map-popup">
                      <h4>{listing.title}</h4>
                      <p className="map-popup-provider">{listing.provider}</p>
                      <p className="map-popup-price">€{listing.price} للساعة</p>
                      <button 
                        className="map-popup-btn"
                        onClick={() => navigate(`/listing/${listing.id}`)}
                      >
                        عرض التفاصيل
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListingsPage

