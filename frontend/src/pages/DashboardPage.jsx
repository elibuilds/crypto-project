import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  HiArrowDownTray,
  HiArrowTrendingUp,
  HiArrowsRightLeft,
  HiArrowUpTray,
  HiBell,
  HiChartBarSquare,
  HiChevronRight,
  HiEllipsisVertical,
  HiHome,
  HiMagnifyingGlass,
  HiMiniArrowTrendingDown,
  HiMiniArrowTrendingUp,
  HiPlusCircle,
  HiQuestionMarkCircle,
  HiSparkles,
  HiUserCircle,
} from 'react-icons/hi2'
import { cryptoApi } from '../lib/api'
import { useAuth } from '../context/AuthContext'

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
})

const percentFormatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
})

const navItems = [
  { label: 'Home', href: '/dashboard', icon: HiHome, active: true },
  { label: 'Profile', href: '/profile', icon: HiUserCircle },
  { label: 'Markets', href: '/dashboard#markets', icon: HiChartBarSquare },
  { label: 'Add asset', href: '/dashboard#add-crypto', icon: HiPlusCircle },
]

const formatMoney = (value) => currencyFormatter.format(Number(value) || 0)
const formatPercent = (value) => `${value >= 0 ? '+' : ''}${percentFormatter.format(Number(value) || 0)}%`

const DashboardPage = () => {
  const { user, signOut } = useAuth()
  const [assets, setAssets] = useState([])
  const [gainers, setGainers] = useState([])
  const [newListings, setNewListings] = useState([])
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [formError, setFormError] = useState('')
  const [formSuccess, setFormSuccess] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    price: '',
    image: '',
    change24h: '',
  })

  const loadDashboardData = async () => {
    setError('')
    const [allAssets, topGainers, newestAssets] = await Promise.all([
      cryptoApi.list(),
      cryptoApi.gainers(),
      cryptoApi.newest(),
    ])

    setAssets(allAssets)
    setGainers(topGainers.slice(0, 4))
    setNewListings(newestAssets.slice(0, 4))
  }

  useEffect(() => {
    let ignore = false

    const initialize = async () => {
      try {
        await loadDashboardData()
      } catch (err) {
        if (!ignore) {
          setError(err.message)
        }
      } finally {
        if (!ignore) {
          setIsLoading(false)
        }
      }
    }

    initialize()

    return () => {
      ignore = true
    }
  }, [])

  const filteredAssets = search.trim()
    ? assets.filter((asset) => {
        const term = search.trim().toLowerCase()
        return (
          asset.name.toLowerCase().includes(term) ||
          asset.symbol.toLowerCase().includes(term)
        )
      })
    : assets

  const totalBalance = assets.reduce((sum, asset) => sum + (Number(asset.price) || 0), 0)
  const positiveAssets = assets.filter((asset) => Number(asset.change24h) >= 0).length
  const averageMove = assets.length
    ? assets.reduce((sum, asset) => sum + Number(asset.change24h || 0), 0) / assets.length
    : 0

  const handleFormChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleAddCrypto = async (event) => {
    event.preventDefault()
    setFormError('')
    setFormSuccess('')
    setIsSaving(true)

    try {
      await cryptoApi.create(formData)
      setFormSuccess('Asset added successfully.')
      setFormData({
        name: '',
        symbol: '',
        price: '',
        image: '',
        change24h: '',
      })
      await loadDashboardData()
    } catch (err) {
      setFormError(err.message)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className='min-h-screen bg-[radial-gradient(circle_at_top,#ffffff_0%,#eef4ff_45%,#e8eef9_100%)] p-4 text-slate-900 md:p-6'>
      <div className='mx-auto grid min-h-[calc(100vh-2rem)] max-w-[1500px] grid-cols-1 overflow-hidden rounded-[32px] border border-white/60 bg-white/85 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur 2xl:grid-cols-[240px_minmax(0,1fr)_360px]'>
        <aside className='flex flex-col border-b border-slate-200/70 bg-white/90 p-6 2xl:border-b-0 2xl:border-r'>
          <div className='flex items-center gap-3'>
            <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2d5bff] text-xl font-bold text-white shadow-lg shadow-blue-200'>
              C
            </div>
            <div>
              <p className='text-xs font-semibold uppercase tracking-[0.25em] text-slate-400'>Workspace</p>
              <p className='text-lg font-semibold'>Crypto App</p>
            </div>
          </div>

          <nav className='mt-10 space-y-2'>
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                    item.active
                      ? 'bg-[#edf3ff] text-[#2453ff]'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className='h-5 w-5' />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className='mt-10 rounded-[28px] bg-slate-950 p-5 text-white'>
            <p className='text-sm font-semibold'>Signed in</p>
            <p className='mt-2 text-xl font-semibold'>{user?.name}</p>
            <p className='mt-1 text-sm text-slate-300'>{user?.email}</p>
            <Link
              to='/profile'
              className='mt-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium hover:bg-white/15'
            >
              View profile
              <HiChevronRight className='h-4 w-4' />
            </Link>
          </div>

          <button
            onClick={() => void signOut()}
            className='mt-auto rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm font-semibold text-slate-700 transition hover:bg-slate-100'
          >
            Log out
          </button>
        </aside>

        <main className='min-w-0 border-b border-slate-200/70 2xl:border-b-0 2xl:border-r'>
          <header className='flex flex-col gap-4 border-b border-slate-200/70 px-6 py-5 lg:flex-row lg:items-center lg:justify-between'>
            <div>
              <p className='text-sm font-semibold uppercase tracking-[0.25em] text-slate-400'>Portfolio</p>
              <h1 className='mt-2 text-4xl font-semibold tracking-tight'>Home</h1>
            </div>

            <div className='flex flex-wrap items-center gap-3'>
              <label className='flex min-w-[260px] flex-1 items-center gap-3 rounded-full bg-slate-100 px-4 py-3 text-slate-500 lg:max-w-[320px]'>
                <HiMagnifyingGlass className='h-5 w-5' />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder='Search for an asset'
                  className='w-full bg-transparent text-sm outline-none placeholder:text-slate-400'
                />
              </label>
              <div className='flex items-center gap-2'>
                {[HiBell, HiQuestionMarkCircle, HiSparkles].map((Icon, index) => (
                  <button
                    key={index}
                    className='flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200'
                  >
                    <Icon className='h-5 w-5' />
                  </button>
                ))}
              </div>
            </div>
          </header>

          <section className='px-6 py-6'>
            <div className='grid gap-6 lg:grid-cols-[1.4fr_1fr]'>
              <div className='rounded-[28px] bg-[linear-gradient(135deg,#0f172a_0%,#16254b_55%,#2453ff_100%)] p-6 text-white shadow-[0_18px_45px_rgba(36,83,255,0.28)]'>
                <p className='text-sm font-medium text-blue-100'>Total balance</p>
                <h2 className='mt-3 text-5xl font-semibold tracking-tight'>{formatMoney(totalBalance)}</h2>
                <div className='mt-10 grid gap-4 md:grid-cols-3'>
                  <div className='rounded-2xl bg-white/10 p-4'>
                    <p className='text-xs uppercase tracking-[0.25em] text-blue-100'>Assets</p>
                    <p className='mt-2 text-2xl font-semibold'>{assets.length}</p>
                  </div>
                  <div className='rounded-2xl bg-white/10 p-4'>
                    <p className='text-xs uppercase tracking-[0.25em] text-blue-100'>Positive today</p>
                    <p className='mt-2 text-2xl font-semibold'>{positiveAssets}</p>
                  </div>
                  <div className='rounded-2xl bg-white/10 p-4'>
                    <p className='text-xs uppercase tracking-[0.25em] text-blue-100'>Avg move</p>
                    <p className='mt-2 text-2xl font-semibold'>{formatPercent(averageMove)}</p>
                  </div>
                </div>
              </div>

              <div className='grid gap-4'>
                <div className='rounded-[28px] border border-slate-200 bg-slate-50 p-5'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='text-sm font-semibold text-slate-500'>Top gainers</p>
                      <p className='mt-1 text-2xl font-semibold'>Live movers</p>
                    </div>
                    <HiArrowTrendingUp className='h-6 w-6 text-emerald-500' />
                  </div>
                  <div className='mt-5 space-y-3'>
                    {gainers.map((asset) => (
                      <div key={asset._id} className='flex items-center justify-between rounded-2xl bg-white px-4 py-3'>
                        <div>
                          <p className='font-semibold'>{asset.symbol}</p>
                          <p className='text-sm text-slate-500'>{asset.name}</p>
                        </div>
                        <p className='font-semibold text-emerald-600'>{formatPercent(asset.change24h)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className='rounded-[28px] border border-slate-200 bg-slate-50 p-5'>
                  <p className='text-sm font-semibold text-slate-500'>New listings</p>
                  <div className='mt-4 space-y-3'>
                    {newListings.map((asset) => (
                      <div key={asset._id} className='flex items-center justify-between rounded-2xl bg-white px-4 py-3'>
                        <div>
                          <p className='font-semibold'>{asset.name}</p>
                          <p className='text-sm text-slate-500'>{asset.symbol}</p>
                        </div>
                        <p className='text-sm font-medium text-slate-500'>
                          {new Date(asset.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className='mt-6 space-y-6'>
              <section id='markets' className='rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm'>
                <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
                  <div>
                    <p className='text-sm font-semibold text-slate-500'>Market overview</p>
                    <h3 className='mt-1 text-2xl font-semibold'>Tracked crypto prices</h3>
                  </div>
                  <Link
                    to='/profile'
                    className='inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200'
                  >
                    Protected profile
                    <HiChevronRight className='h-4 w-4' />
                  </Link>
                </div>

                {isLoading ? (
                  <p className='mt-8 text-sm text-slate-500'>Loading dashboard data...</p>
                ) : error ? (
                  <p className='mt-8 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600'>{error}</p>
                ) : (
                  <div className='mt-6 overflow-x-auto'>
                    <table className='w-full min-w-[680px] text-left'>
                      <thead>
                        <tr className='border-b border-slate-200 text-xs uppercase tracking-[0.2em] text-slate-400'>
                          <th className='pb-4 font-medium'>Asset</th>
                          <th className='pb-4 font-medium'>Price</th>
                          <th className='pb-4 font-medium'>24h</th>
                          <th className='pb-4 font-medium'>Added</th>
                          <th className='pb-4 font-medium'>Source</th>
                          <th className='pb-4 font-medium text-right'>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredAssets.map((asset) => {
                          const isPositive = Number(asset.change24h) >= 0
                          return (
                            <tr key={asset._id} className='border-b border-slate-100 last:border-b-0'>
                              <td className='py-4'>
                                <div className='flex items-center gap-3'>
                                  <div className='flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 font-semibold text-slate-700'>
                                    {asset.symbol.slice(0, 2)}
                                  </div>
                                  <div>
                                    <p className='font-semibold text-slate-900'>{asset.name}</p>
                                    <p className='text-sm text-slate-500'>{asset.symbol}</p>
                                  </div>
                                </div>
                              </td>
                              <td className='py-4 font-semibold text-slate-900'>{formatMoney(asset.price)}</td>
                              <td className='py-4'>
                                <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-semibold ${
                                  isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                                }`}>
                                  {isPositive ? <HiMiniArrowTrendingUp className='h-4 w-4' /> : <HiMiniArrowTrendingDown className='h-4 w-4' />}
                                  {formatPercent(asset.change24h)}
                                </span>
                              </td>
                              <td className='py-4 text-sm text-slate-500'>{new Date(asset.createdAt).toLocaleDateString()}</td>
                              <td className='py-4 text-sm text-slate-500'>{asset.image ? 'Image linked' : 'Manual entry'}</td>
                              <td className='py-4 text-right'>
                                <button className='rounded-full bg-[#2453ff] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1843dd]'>
                                  Buy
                                </button>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>

              <section id='add-crypto' className='rounded-[28px] border border-slate-200 bg-slate-50 p-6'>
                <div className='flex items-start justify-between gap-3'>
                  <div>
                    <p className='text-sm font-semibold text-slate-500'>Admin action</p>
                    <h3 className='mt-1 text-2xl font-semibold'>Add a new cryptocurrency</h3>
                  </div>
                  <div className='rounded-2xl bg-white p-3 text-[#2453ff] shadow-sm'>
                    <HiPlusCircle className='h-6 w-6' />
                  </div>
                </div>

                <form onSubmit={handleAddCrypto} className='mt-6 max-w-3xl space-y-4'>
                  <div className='grid gap-4 sm:grid-cols-2'>
                    <label className='block'>
                      <span className='mb-2 block text-sm font-semibold text-slate-700'>Name</span>
                      <input
                        name='name'
                        value={formData.name}
                        onChange={handleFormChange}
                        placeholder='Bitcoin'
                        className='w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#2453ff]'
                        required
                      />
                    </label>
                    <label className='block'>
                      <span className='mb-2 block text-sm font-semibold text-slate-700'>Symbol</span>
                      <input
                        name='symbol'
                        value={formData.symbol}
                        onChange={handleFormChange}
                        placeholder='BTC'
                        className='w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm uppercase outline-none focus:border-[#2453ff]'
                        required
                      />
                    </label>
                  </div>

                  <div className='grid gap-4 sm:grid-cols-2'>
                    <label className='block'>
                      <span className='mb-2 block text-sm font-semibold text-slate-700'>Price</span>
                      <input
                        name='price'
                        type='number'
                        step='0.01'
                        value={formData.price}
                        onChange={handleFormChange}
                        placeholder='69124.44'
                        className='w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#2453ff]'
                        required
                      />
                    </label>
                    <label className='block'>
                      <span className='mb-2 block text-sm font-semibold text-slate-700'>24h change</span>
                      <input
                        name='change24h'
                        type='number'
                        step='0.01'
                        value={formData.change24h}
                        onChange={handleFormChange}
                        placeholder='2.50'
                        className='w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#2453ff]'
                        required
                      />
                    </label>
                  </div>

                  <label className='block'>
                    <span className='mb-2 block text-sm font-semibold text-slate-700'>Image URL</span>
                    <input
                      name='image'
                      value={formData.image}
                      onChange={handleFormChange}
                      placeholder='https://...'
                      className='w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#2453ff]'
                    />
                  </label>

                  {formError ? <p className='rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600'>{formError}</p> : null}
                  {formSuccess ? <p className='rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-600'>{formSuccess}</p> : null}

                  <button
                    type='submit'
                    disabled={isSaving}
                    className='w-full rounded-full bg-[#2453ff] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1843dd] disabled:cursor-not-allowed disabled:opacity-70'
                  >
                    {isSaving ? 'Saving asset...' : 'Create cryptocurrency'}
                  </button>
                </form>
              </section>
            </div>
          </section>
        </main>

        <aside className='bg-slate-50/80 p-6'>
          <div className='rounded-[28px] border border-slate-200 bg-white p-5'>
            <div className='inline-flex rounded-full bg-slate-100 p-1'>
              {['Buy', 'Sell', 'Convert'].map((label, index) => (
                <button
                  key={label}
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    index === 0 ? 'bg-slate-950 text-white' : 'text-slate-700'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className='mt-6'>
              <p className='text-sm font-semibold text-slate-500'>Available to trade</p>
              <h3 className='mt-3 text-6xl font-light tracking-tight text-slate-900'>
                {assets.length}
                <span className='ml-2 text-4xl text-slate-300'>assets</span>
              </h3>
              <p className='mt-3 flex items-center gap-2 text-sm font-semibold text-[#2453ff]'>
                <HiArrowTrendingUp className='h-4 w-4' />
                Live backend requests active
              </p>
            </div>

            <div className='mt-8 space-y-4'>
              {[
                { label: 'Pay with', value: 'Wallet balance', icon: HiArrowsRightLeft },
                { label: 'Buy', value: gainers[0]?.name || 'Top gainer', icon: HiArrowUpTray },
                { label: 'Track', value: newListings[0]?.name || 'Newest listing', icon: HiArrowDownTray },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.label} className='flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3'>
                    <div className='flex items-center gap-3'>
                      <div className='rounded-2xl bg-[#edf3ff] p-3 text-[#2453ff]'>
                        <Icon className='h-5 w-5' />
                      </div>
                      <div>
                        <p className='font-semibold text-slate-900'>{item.label}</p>
                        <p className='text-sm text-slate-500'>{item.value}</p>
                      </div>
                    </div>
                    <HiChevronRight className='h-5 w-5 text-slate-400' />
                  </div>
                )
              })}
            </div>

            <button className='mt-8 w-full rounded-full bg-[#2453ff] px-5 py-3 text-sm font-semibold text-white hover:bg-[#1843dd]'>
              Top up wallet
            </button>
          </div>

          <div className='mt-6 rounded-[28px] border border-slate-200 bg-white p-5'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-semibold text-slate-500'>Quick actions</p>
                <p className='mt-1 text-2xl font-semibold'>Move funds</p>
              </div>
              <button className='rounded-full bg-slate-100 p-2 text-slate-500'>
                <HiEllipsisVertical className='h-5 w-5' />
              </button>
            </div>

            <div className='mt-5 space-y-4'>
              {[
                { label: 'Send crypto', icon: HiArrowUpTray },
                { label: 'Receive crypto', icon: HiArrowDownTray },
                { label: 'Deposit cash', icon: HiArrowsRightLeft },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.label}
                    className='flex w-full items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-left hover:bg-slate-100'
                  >
                    <span className='flex items-center gap-3'>
                      <span className='rounded-2xl bg-[#2453ff] p-3 text-white'>
                        <Icon className='h-5 w-5' />
                      </span>
                      <span className='font-semibold text-slate-900'>{item.label}</span>
                    </span>
                    <HiChevronRight className='h-5 w-5 text-slate-400' />
                  </button>
                )
              })}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default DashboardPage
