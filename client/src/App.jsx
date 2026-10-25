import { useEffect, useMemo, useState } from 'react'
import './App.css'
const API_URL = 'https://YOUR-QUICKBITE-SERVICE.onrender.com'

const categories = ['All', 'Burger', 'Pizza', 'Indian', 'Drinks', 'Desserts']

function App() {
  const [foods, setFoods] = useState([])
  const [cart, setCart] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`${API_URL}/foods`)
      .then((response) => {
        if (!response.ok) throw new Error('Unable to load food items')
        return response.json()
      })
      .then((data) => setFoods(Array.isArray(data) ? data : []))
      .catch(() => setError('Could not connect to the food server. Please make sure the backend is running.'))
      .finally(() => setLoading(false))
  }, [])

  const filteredFoods = useMemo(() => {
    return foods.filter((food) => {
      const name = (food.name || '').toLowerCase()
      const matchesSearch = name.includes(search.toLowerCase())
      const matchesCategory =
        category === 'All' ||
        (food.category || '').toLowerCase() === category.toLowerCase()

      return matchesSearch && matchesCategory
    })
  }, [foods, search, category])

  const addToCart = (food) => {
    setCart((current) => {
      const existing = current.find((item) => item._id === food._id)

      if (existing) {
        return current.map((item) =>
          item._id === food._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [...current, { ...food, quantity: 1 }]
    })
  }

  const changeQuantity = (id, amount) => {
    setCart((current) =>
      current
        .map((item) =>
          item._id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const total = cart.reduce(
    (sum, item) => sum + Number(item.price || 0) * item.quantity,
    0
  )

  const formatPrice = (price) =>
    `₹${Number(price || 0).toLocaleString('en-IN')}`

  return (
    <div className="app">
      <header className="navbar">
        <a href="#home" className="brand">
          <span className="brand-icon">🍔</span>
          <span>Quick<span className="brand-highlight">Bite</span></span>
        </a>

        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#menu">Our Menu</a>
          <a href="#cart">Your Cart</a>
        </nav>

        <a href="#cart" className="cart-button">
          🛒 Cart <span>{cartCount}</span>
        </a>
      </header>

      <main>
        <section className="hero-section" id="home">
          <div className="hero-content">
            <span className="eyebrow">🍽️ FRESH · FAST · DELICIOUS</span>
            <h1>Good food.<br />Good mood.</h1>
            <p>
              Your favourite meals, freshly prepared and delivered
              straight to your cravings.
            </p>
            <a className="primary-button" href="#menu">
              Explore Menu <span>→</span>
            </a>

            <div className="hero-stats">
              <div><strong>Fresh</strong><span>Every day</span></div>
              <div><strong>Fast</strong><span>Easy ordering</span></div>
              <div><strong>Yummy</strong><span>Happy bites</span></div>
            </div>
          </div>

          <div className="hero-art">
            <div className="hero-circle"></div>
            <div className="hero-food">🍔</div>
            <span className="floating-food food-one">🍟</span>
            <span className="floating-food food-two">🍕</span>
            <span className="floating-food food-three">🥤</span>
            <div className="hero-badge">
              <span>😋</span>
              <div><strong>Made with love</strong><small>For every craving</small></div>
            </div>
          </div>
        </section>

        <section className="menu-section" id="menu">
          <div className="section-heading">
            <div>
              <span className="eyebrow">WHAT'S COOKING?</span>
              <h2>Explore our menu<span>.</span></h2>
              <p>Find something delicious for every mood.</p>
            </div>

            <label className="search-box">
              <span>⌕</span>
              <input
                type="search"
                placeholder="Search your favourite food..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>
          </div>

          <div className="category-list">
            {categories.map((item) => (
              <button
                key={item}
                className={`category-button ${category === item ? 'active' : ''}`}
                onClick={() => setCategory(item)}
              >
                {item === 'All' ? '🍽️' :
                  item === 'Burger' ? '🍔' :
                  item === 'Pizza' ? '🍕' :
                  item === 'Indian' ? '🍛' :
                  item === 'Drinks' ? '🥤' : '🍰'} {item}
              </button>
            ))}
          </div>

          {loading && <p className="status-message">Loading delicious food...</p>}

          {error && (
            <div className="error-message">
              <p>{error}</p>
              <button onClick={() => window.location.reload()}>Try again</button>
            </div>
          )}

          {!loading && !error && filteredFoods.length === 0 && (
            <div className="status-message">
              <p>No food items found.</p>
              <span>Try another search or category.</span>
            </div>
          )}

          <div className="food-grid">
            {filteredFoods.map((food, index) => (
              <article className="food-card" key={food._id || food.name}>
                <div className={`food-image food-color-${index % 4}`}>
                  {food.image ? (
                    <img src={food.image} alt={food.name} />
                  ) : (
                    <span className="food-emoji">
                      {food.category?.toLowerCase() === 'burger' ? '🍔' :
                       food.category?.toLowerCase() === 'pizza' ? '🍕' :
                       food.category?.toLowerCase() === 'indian' ? '🍛' :
                       food.category?.toLowerCase() === 'drinks' ? '🥤' :
                       food.category?.toLowerCase() === 'desserts' ? '🍰' :
                       ['🍔', '🍕', '🍟', '🍗', '🥗', '🍝'][index % 6]}
                    </span>
                  )}
                  <span className="food-tag">Fresh & tasty</span>
                </div>

                <div className="food-info">
                  <span className="food-category">{food.category || 'Special'}</span>
                  <h3>{food.name}</h3>
                  <p>{food.description || 'Deliciously prepared just for you.'}</p>

                  <div className="food-bottom">
                    <strong>{formatPrice(food.price)}</strong>
                    <button
                      className="add-button"
                      onClick={() => addToCart(food)}
                      disabled={Number(food.stock ?? 1) <= 0}
                    >
                      {Number(food.stock ?? 1) <= 0 ? 'Sold out' : '+ Add'}
                    </button>
                  </div>
                  {food.stock !== undefined && (
                    <small className="stock-info">
                      {food.stock > 0 ? `${food.stock} available` : 'Out of stock'}
                    </small>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="cart-section" id="cart">
          <div className="cart-heading">
            <span className="eyebrow">YOUR ORDER</span>
            <h2>Your shopping cart<span>.</span></h2>
          </div>

          {cart.length === 0 ? (
            <div className="empty-cart">
              <span>🛒</span>
              <h3>Your cart is waiting!</h3>
              <p>Add your favourite food from the menu to get started.</p>
              <a href="#menu" className="primary-button">Browse Menu →</a>
            </div>
          ) : (
            <div className="cart-panel">
              {cart.map((item) => (
                <div className="cart-item" key={item._id}>
                  <div className="cart-item-icon">🍽️</div>
                  <div className="cart-item-name">
                    <strong>{item.name}</strong>
                    <span>{formatPrice(item.price)} each</span>
                  </div>
                  <div className="quantity-controls">
                    <button onClick={() => changeQuantity(item._id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => changeQuantity(item._id, 1)}
                      disabled={item.stock !== undefined && item.quantity >= item.stock}
                    >+</button>
                  </div>
                  <strong className="line-total">
                    {formatPrice(Number(item.price || 0) * item.quantity)}
                  </strong>
                </div>
              ))}

              <div className="cart-total">
                <span>Total amount</span>
                <strong>{formatPrice(total)}</strong>
              </div>
              <button
                className="checkout-button"
                onClick={() => window.alert('Your cart is ready! Online checkout will be added in a future version.')}
              >
                Proceed to Checkout →
              </button>
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <a href="#home" className="brand">
          <span className="brand-icon">🍔</span>
          <span>Quick<span className="brand-highlight">Bite</span></span>
        </a>
        <p>Good food, good mood. Made for food lovers. ❤️</p>
        <span>© 2026 QuickBite</span>
      </footer>
    </div>
  )
}

export default App
