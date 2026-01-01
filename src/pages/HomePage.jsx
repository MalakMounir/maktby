import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import './HomePage.css'

function HomePage() {
  const navigate = useNavigate()
  const [searchData, setSearchData] = useState({
    listingType: '',
    category: '',
    location: '',
    dates: ''
  })

  const handleSearch = (e) => {
    e.preventDefault()
    navigate('/listings')
  }

  return (
    <div className="homepage">
      <Header />
      <div className="hero-section">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="hero-title">اعمل من أي مكان، في أي وقت</h1>
            <p className="hero-subtitle">اكتشف واحجز أفضل الأماكن للعمل عن بُعد</p>
            
            <form className="search-bar" onSubmit={handleSearch}>
              <select 
                className="search-field"
                value={searchData.listingType}
                onChange={(e) => setSearchData({...searchData, listingType: e.target.value})}
              >
                <option value="">نوع القائمة</option>
                <option value="coworking">مساحة عمل مشتركة</option>
                <option value="office">مكتب</option>
                <option value="meeting">قاعة اجتماعات</option>
              </select>
              
              <select 
                className="search-field"
                value={searchData.category}
                onChange={(e) => setSearchData({...searchData, category: e.target.value})}
              >
                <option value="">الفئة</option>
                <option value="quiet">هادئ</option>
                <option value="creative">إبداعي</option>
                <option value="professional">احترافي</option>
              </select>
              
              <div className="search-field location-field">
                <span className="search-icon">🔍</span>
                <input 
                  type="text" 
                  placeholder="الموقع"
                  value={searchData.location}
                  onChange={(e) => setSearchData({...searchData, location: e.target.value})}
                />
              </div>
              
              <div className="search-field date-field">
                <span className="search-icon">📅</span>
                <input 
                  type="text" 
                  placeholder="التواريخ"
                  value={searchData.dates}
                  onChange={(e) => setSearchData({...searchData, dates: e.target.value})}
                />
              </div>
              
              <button type="submit" className="search-btn">بحث</button>
            </form>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title">كيف يعمل مكتبي؟</h2>
          <p className="section-subtitle">ثلاث خطوات بسيطة وتبدأ العمل من المكان المثالي</p>
          
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-image">
                <img src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&q=80" alt="اختر مكتب" />
              </div>
              <div className="step-number">1</div>
              <h3 className="step-title">اختر المكتب الأقرب إليك</h3>
              <p className="step-description">تصفح مئات المساحات المتاحة في مدينتك واختر المكان الذي يناسبك</p>
            </div>
            
            <div className="step-card">
              <div className="step-image">
                <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80" alt="أكد الحجز" />
              </div>
              <div className="step-number">2</div>
              <h3 className="step-title">أكد حجزك</h3>
              <p className="step-description">احجز بسهولة وأمان خلال ثوانٍ معدودة بدون تعقيدات</p>
            </div>
            
            <div className="step-card">
              <div className="step-image">
                <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80" alt="اعمل" />
              </div>
              <div className="step-number">3</div>
              <h3 className="step-title">اعمل في أي وقت، من أي مكان!</h3>
              <p className="step-description">استمتع بمساحة عمل مريحة ومهنية مع كل ما تحتاجه لإنجاز عملك</p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Features Section */}
      <section className="product-features">
        <div className="container">
          <h2 className="section-title">لماذا مكتبي؟</h2>
          <p className="section-subtitle">منصة مصممة خصيصاً لجيل زد في منطقة الشرق الأوسط وشمال أفريقيا</p>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3 className="feature-title">حجز فوري</h3>
              <p className="feature-description">احجز مساحة العمل في ثوانٍ بدون انتظار أو تعقيدات</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📍</div>
              <h3 className="feature-title">أماكن متنوعة</h3>
              <p className="feature-description">من المقاهي الهادئة إلى مساحات العمل المشتركة الاحترافية</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3 className="feature-title">أسعار مناسبة</h3>
              <p className="feature-description">خطط مرنة وأسعار تناسب ميزانيتك مع خصومات حصرية</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🌐</div>
              <h3 className="feature-title">في مدينتك</h3>
              <p className="feature-description">اكتشف أفضل الأماكن في مدينتك مع تقييمات حقيقية من المستخدمين</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3 className="feature-title">آمن ومضمون</h3>
              <p className="feature-description">نظام دفع آمن وضمان استرداد الأموال في حالة الإلغاء</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3 className="feature-title">سهل الاستخدام</h3>
              <p className="feature-description">واجهة بسيطة وسريعة مصممة لتجربة مستخدم ممتازة</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="container">
          <div className="service-card">
            <div className="service-image">
              <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&q=80" alt="شريك معنا" />
            </div>
            <div className="service-content">
              <h2 className="service-title">شريك معنا</h2>
              <p className="service-description">
                انضم إلى مكتبي ووسع قاعدة عملائك بدون أي تكاليف. نحن نربطك بالآلاف من الباحثين عن مساحات عمل في منطقتك. 
                ابدأ الآن واجعل مساحتك جزءاً من شبكة العمل المرنة في المنطقة.
              </p>
              <button className="service-btn" onClick={() => navigate('/listings')}>
                ابدأ الآن
              </button>
            </div>
          </div>
          
          <div className="service-card reverse">
            <div className="service-image">
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80" alt="اعمل في مكاتبنا" />
            </div>
            <div className="service-content">
              <h2 className="service-title">اعمل في مكاتبنا</h2>
              <p className="service-description">
                الحرية الكاملة لتناسب العمل مع حياتك. استمتع بأسعار ممتازة، مزايا حصرية، وخصومات على المقاهي والمطاعم. 
                انضم إلى مجتمع من المحترفين الشباب الذين يغيرون طريقة العمل في المنطقة.
              </p>
              <button className="service-btn" onClick={() => navigate('/listings')}>
                ابدأ الآن
              </button>
            </div>
          </div>
          
          <div className="service-card">
            <div className="service-image">
              <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80" alt="تعرف علينا" />
            </div>
            <div className="service-content">
              <h2 className="service-title">تعرف علينا</h2>
              <p className="service-description">
                تعرف على فريقنا ومهمة ورؤية شركتنا. نحن نؤمن بقوة العمل المرن ونبني مستقبل العمل في منطقة الشرق الأوسط 
                وشمال أفريقيا. اكتشف قصتنا وكيف نغير طريقة عمل جيل زد.
              </p>
              <button className="service-btn">من نحن</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="footer-logo">
                <div className="logo-icon">💼</div>
                <div className="logo-text">
                  <span className="logo-main">مكتبي</span>
                  <span className="logo-sub">maktby</span>
                </div>
              </div>
              <p className="footer-tagline">اعمل من أي مكان، في أي وقت</p>
              <p className="footer-copyright">© 2024 مكتبي. جميع الحقوق محفوظة.</p>
            </div>
            
            <div className="footer-links">
              <div className="footer-column">
                <h4 className="footer-heading">عن المنصة</h4>
                <a href="#" className="footer-link">من نحن</a>
                <a href="#" className="footer-link">تصفح القوائم</a>
                <a href="#" className="footer-link">أضف قائمة جديدة</a>
              </div>
              
              <div className="footer-column">
                <h4 className="footer-heading">القانونية</h4>
                <a href="#" className="footer-link">شروط الخدمة</a>
                <a href="#" className="footer-link">سياسة الخصوصية</a>
                <a href="#" className="footer-link">سياسة الكوكيز</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage

