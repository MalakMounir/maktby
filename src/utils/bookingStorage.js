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

// Initialize sample bookings data
const initializeSampleBookings = () => {
  const currentUser = getCurrentUser()
  const now = new Date()
  
  // Create dates for sample bookings
  const tomorrow = new Date(now)
  tomorrow.setDate(tomorrow.getDate() + 1)
  const nextWeek = new Date(now)
  nextWeek.setDate(nextWeek.getDate() + 7)
  const lastWeek = new Date(now)
  lastWeek.setDate(lastWeek.getDate() - 7)
  const lastMonth = new Date(now)
  lastMonth.setDate(lastMonth.getDate() - 30)
  
  const sampleBookings = [
    {
      id: 1001,
      userId: currentUser.id,
      listingId: 1,
      listingTitle: 'CoworkCascais - مساحة عمل مشتركة',
      listingImage: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80',
      customerName: currentUser.name,
      customerEmail: currentUser.email,
      customerPhone: currentUser.phone,
      date: tomorrow.toISOString().split('T')[0],
      startTime: '09:00',
      endTime: '17:00',
      hours: 8,
      price: 6.00,
      totalAmount: 50.40, // 8 * 6.00 * 1.05
      status: 'confirmed',
      bookingDate: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      paymentStatus: 'paid',
      notes: 'أحتاج إلى مساحة هادئة للعمل على مشروع مهم'
    },
    {
      id: 1002,
      userId: currentUser.id,
      listingId: 2,
      listingTitle: 'Golden Creative: مساحة عمل إبداعية - قاعة اجتماعات',
      listingImage: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80',
      customerName: currentUser.name,
      customerEmail: currentUser.email,
      customerPhone: currentUser.phone,
      date: nextWeek.toISOString().split('T')[0],
      startTime: '10:00',
      endTime: '14:00',
      hours: 4,
      price: 12.30,
      totalAmount: 51.66, // 4 * 12.30 * 1.05
      status: 'confirmed',
      bookingDate: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      paymentStatus: 'paid',
      notes: 'اجتماع فريق العمل'
    },
    {
      id: 1003,
      userId: currentUser.id,
      listingId: 3,
      listingTitle: 'Power Lunch @ JAM LISBON - عمل بعد الظهر + غداء',
      listingImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
      customerName: currentUser.name,
      customerEmail: currentUser.email,
      customerPhone: currentUser.phone,
      date: lastWeek.toISOString().split('T')[0],
      startTime: '12:00',
      endTime: '16:00',
      hours: 4,
      price: 15.00,
      totalAmount: 63.00, // 4 * 15.00 * 1.05
      status: 'completed',
      bookingDate: new Date(lastWeek.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      paymentStatus: 'paid',
      notes: ''
    },
    {
      id: 1004,
      userId: currentUser.id,
      listingId: 4,
      listingTitle: 'مساحة عمل هادئة في وسط المدينة',
      listingImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
      customerName: currentUser.name,
      customerEmail: currentUser.email,
      customerPhone: currentUser.phone,
      date: lastMonth.toISOString().split('T')[0],
      startTime: '08:00',
      endTime: '18:00',
      hours: 10,
      price: 8.50,
      totalAmount: 89.25, // 10 * 8.50 * 1.05
      status: 'cancelled',
      bookingDate: new Date(lastMonth.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      paymentStatus: 'refunded',
      notes: 'تم الإلغاء بسبب تغيير في الخطط'
    },
    {
      id: 1005,
      userId: currentUser.id,
      listingId: 5,
      listingTitle: 'مكتب خاص مع إطلالة رائعة',
      listingImage: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80',
      customerName: currentUser.name,
      customerEmail: currentUser.email,
      customerPhone: currentUser.phone,
      date: new Date(nextWeek.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      startTime: '13:00',
      endTime: '17:00',
      hours: 4,
      price: 25.00,
      totalAmount: 105.00, // 4 * 25.00 * 1.05
      status: 'confirmed',
      bookingDate: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      paymentStatus: 'paid',
      notes: 'اجتماع عمل مهم مع العملاء'
    },
    {
      id: 1006,
      userId: currentUser.id,
      listingId: 1,
      listingTitle: 'CoworkCascais - مساحة عمل مشتركة',
      listingImage: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80',
      customerName: currentUser.name,
      customerEmail: currentUser.email,
      customerPhone: currentUser.phone,
      date: lastMonth.toISOString().split('T')[0],
      startTime: '10:00',
      endTime: '15:00',
      hours: 5,
      price: 6.00,
      totalAmount: 31.50, // 5 * 6.00 * 1.05
      status: 'completed',
      bookingDate: new Date(lastMonth.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      paymentStatus: 'paid',
      notes: ''
    }
  ]
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleBookings))
  return sampleBookings
}

// Get all bookings for current user
export const getUserBookings = () => {
  const bookings = localStorage.getItem(STORAGE_KEY)
  const currentUser = getCurrentUser()
  
  if (!bookings) {
    // Initialize with sample data if no bookings exist
    const sampleBookings = initializeSampleBookings()
    return sampleBookings.filter(booking => booking.userId === currentUser.id)
  }
  
  const allBookings = JSON.parse(bookings)
  // Filter bookings for current user
  const userBookings = allBookings.filter(booking => booking.userId === currentUser.id)
  
  // If user has no bookings, initialize sample data
  if (userBookings.length === 0) {
    const sampleBookings = initializeSampleBookings()
    return sampleBookings.filter(booking => booking.userId === currentUser.id)
  }
  
  return userBookings
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

