// Utility functions for managing user bookings in localStorage

const STORAGE_KEY = 'maktby_user_bookings'
const CURRENT_USER_KEY = 'maktby_current_user'

// Get current user (mock for now)
export const getCurrentUser = () => {
  const user = localStorage.getItem(CURRENT_USER_KEY)
  if (user) {
    return JSON.parse(user)
  }
  // Default user for demo
  const defaultUser = {
    id: 'user_1',
    name: 'مالك منير',
    email: 'malek@example.com',
    phone: '+966501234567'
  }
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(defaultUser))
  return defaultUser
}

// Get all bookings for current user
export const getUserBookings = () => {
  const bookings = localStorage.getItem(STORAGE_KEY)
  if (!bookings) {
    return []
  }
  const allBookings = JSON.parse(bookings)
  const currentUser = getCurrentUser()
  // Filter bookings for current user
  return allBookings.filter(booking => booking.userId === currentUser.id)
}

// Save a new booking
export const saveBooking = (bookingData) => {
  const bookings = localStorage.getItem(STORAGE_KEY)
  const allBookings = bookings ? JSON.parse(bookings) : []
  const currentUser = getCurrentUser()
  
  // Calculate hours from start and end time
  const start = new Date(`${bookingData.date}T${bookingData.startTime}`)
  const end = new Date(`${bookingData.date}T${bookingData.endTime}`)
  const hours = Math.max(1, Math.round((end - start) / (1000 * 60 * 60)))
  
  const newBooking = {
    id: Date.now(), // Simple ID generation
    userId: currentUser.id,
    listingId: bookingData.listingId,
    listingTitle: bookingData.listingTitle,
    listingImage: bookingData.listingImage,
    customerName: currentUser.name,
    customerEmail: currentUser.email,
    customerPhone: currentUser.phone,
    date: bookingData.date,
    startTime: bookingData.startTime,
    endTime: bookingData.endTime,
    hours: hours,
    price: bookingData.price,
    totalAmount: bookingData.totalAmount,
    status: 'confirmed', // Auto-confirm for now
    bookingDate: new Date().toISOString(),
    paymentStatus: 'paid',
    notes: bookingData.notes || ''
  }
  
  allBookings.push(newBooking)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(allBookings))
  return newBooking
}

// Update booking status
export const updateBookingStatus = (bookingId, status) => {
  const bookings = localStorage.getItem(STORAGE_KEY)
  if (!bookings) return null
  
  const allBookings = JSON.parse(bookings)
  const bookingIndex = allBookings.findIndex(b => b.id === bookingId)
  
  if (bookingIndex === -1) return null
  
  allBookings[bookingIndex].status = status
  if (status === 'cancelled') {
    allBookings[bookingIndex].paymentStatus = 'refunded'
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(allBookings))
  return allBookings[bookingIndex]
}

// Get booking by ID
export const getBookingById = (bookingId) => {
  const bookings = localStorage.getItem(STORAGE_KEY)
  if (!bookings) return null
  
  const allBookings = JSON.parse(bookings)
  return allBookings.find(b => b.id === parseInt(bookingId))
}

