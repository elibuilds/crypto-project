import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/navbar'
import Footer from '../components/Footer'
import { cryptoApi } from '../lib/api'

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
})

const compactCurrencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  notation: 'compact',
  maximumFractionDigits: 2,
})

const numberFormatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 2,
})

const formatMoney = (value) => currencyFormatter.format(value || 0)
const formatCompactMoney = (value) => compactCurrencyFormatter.format(value || 0)
const formatPercent = (value) => `${value >= 0 ? '+' : ''}${numberFormatter.format(value || 0)}%`

const CryptocurrenciesPage = () => {
  const [assets, setAssets] = useState([])
  const [gainers, setGainers] = useState([])
  const [newListings, setNewListings] = useState([])
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    const loadCryptos = async () => {
      try {
        const [data, topGainers, newestAssets] = await Promise.all([
          cryptoApi.list(),
          cryptoApi.gainers(),
          cryptoApi.newest(),
        ])
        if (!ignore) {
          setAssets(data)
          setGainers(topGainers.slice(0, 2))
          setNewListings(newestAssets.slice(0, 2))
        }
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

    loadCryptos()

    return () => {
      ignore = true
    }
  }, [])

  const term = search.trim().toLowerCase()
  const filteredAssets = term
    ? assets.filter(
        (asset) =>
          asset.name.toLowerCase().includes(term) ||
          asset.symbol.toLowerCase().includes(term),
      )
    : assets

  const totalTrackedPrice = assets.reduce((sum, asset) => sum + (asset.price || 0), 0)
  const averagePrice = assets.length ? totalTrackedPrice / assets.length : 0
  const gainersCount = assets.filter((asset) => asset.change24h > 0).length
  const btcAsset = assets.find((asset) => asset.symbol.toUpperCase() === 'BTC')
  const btcDominance = totalTrackedPrice > 0 && btcAsset ? (btcAsset.price / totalTrackedPrice) * 100 : 0

  const statCards = [
    { title: 'Tracked assets', value: `${assets.length}`, change: `${gainersCount} gainers`, positive: true },
    { title: 'Combined prices', value: formatCompactMoney(totalTrackedPrice), change: 'Live from API', positive: true },
    { title: 'Average price', value: formatMoney(averagePrice), change: assets.length ? 'Per listed asset' : 'No data', positive: averagePrice >= 0 },
    { title: 'BTC dominance', value: `${numberFormatter.format(btcDominance)}%`, change: 'Of tracked prices', positive: true },
  ]

  return (
    <div className='min-h-screen bg-white'>
      <Navbar />

      <main className='w-full max-w-screen-2xl border-x border-gray-200'>
        <section className='grid grid-cols-1 lg:grid-cols-4'>
          <div className='lg:col-span-3'>
            <div className='border-b border-gray-200 p-5'>
              <div className='grid grid-cols-1 items-center gap-6 xl:grid-cols-2'>
                <div>
                  <h1 className='text-5xl tracking-tight text-gray-900'>Explore crypto</h1>
                  <p className='mt-3 text-lg text-gray-800'>
                    Browse live cryptocurrency data from your backend API.
                  </p>
                </div>
                <div>
                  <input
                    type='search'
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder='Search for an asset'
                    className='flex h-13 w-full items-center rounded-full bg-gray-100 px-5 text-gray-600 outline-none focus:ring-2 focus:ring-blue-200'
                  />
                </div>
              </div>
            </div>

            <div className='border-b border-gray-200 p-7 lg:p-8'>
              <h2 className='text-3xl font-semibold tracking-tight text-gray-900'>Market stats</h2>
              <p className='mt-4 max-w-5xl text-xs text-gray-600'>
                These metrics are derived from the assets currently returned by your backend. As your database grows, this view will update automatically.
              </p>
              <span className='mt-4 inline-block text-xs text-blue-600'>API connected</span>

              <div className='mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4'>
                {statCards.map((card) => (
                  <div key={card.title} className='rounded-2xl bg-gray-100 p-5'>
                    <p className='text-[10px] text-gray-500'>{card.title}</p>
                    <p className='mt-2 text-sm font-semibold text-gray-900'>
                      {card.value}{' '}
                      <span className={card.positive ? 'text-green-600' : 'text-red-500'}>{card.change}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className='border-b border-gray-200 p-7 lg:p-8'>
              <h2 className='text-3xl font-semibold tracking-tight text-gray-900'>
                Crypto market prices <span className='text-sm font-normal text-gray-500'>{filteredAssets.length} assets</span>
              </h2>
              <div className='mt-4 flex flex-wrap gap-3'>
                <button className='rounded-full bg-gray-100 px-4 py-2 text-xs font-semibold text-gray-700'>All assets</button>
                <button className='rounded-full bg-gray-100 px-4 py-2 text-xs font-semibold text-gray-700'>24H</button>
                <button className='rounded-full bg-gray-100 px-4 py-2 text-xs font-semibold text-gray-700'>USD</button>
                <button className='rounded-full bg-gray-100 px-4 py-2 text-xs font-semibold text-gray-700'>{filteredAssets.length} rows</button>
              </div>

              <div className='mt-5 overflow-x-auto'>
                {isLoading ? (
                  <p className='py-10 text-sm text-gray-500'>Loading assets from the backend...</p>
                ) : error ? (
                  <p className='py-10 text-sm text-red-600'>{error}</p>
                ) : filteredAssets.length === 0 ? (
                  <p className='py-10 text-sm text-gray-500'>No assets matched your search.</p>
                ) : (
                  <table className='w-full min-w-max'>
                    <thead>
                      <tr className='text-left text-xs text-gray-500'>
                        <th className='py-3'>Asset</th>
                        <th className='py-3'>Market price</th>
                        <th className='py-3'>Change</th>
                        <th className='py-3'>Created</th>
                        <th className='py-3'>Image</th>
                        <th className='py-3 text-right'>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAssets.map((asset) => (
                        <tr key={asset._id || asset.symbol} className='border-t border-gray-200 text-sm'>
                          <td className='py-4'>
                            <p className='font-semibold text-gray-900'>{asset.name}</p>
                            <p className='text-[10px] text-gray-500'>{asset.symbol}</p>
                          </td>
                          <td className='py-4 text-gray-900'>{formatMoney(asset.price)}</td>
                          <td className={`py-4 ${asset.change24h < 0 ? 'text-red-500' : 'text-green-600'}`}>
                            {formatPercent(asset.change24h)}
                          </td>
                          <td className='py-4 text-gray-900'>
                            {asset.createdAt ? new Date(asset.createdAt).toLocaleDateString() : 'N/A'}
                          </td>
                          <td className='py-4 text-gray-900'>{asset.image ? 'Available' : 'N/A'}</td>
                          <td className='py-4 text-right'>
                            <button className='rounded-full bg-[#0052ff] px-5 py-2 text-xs font-semibold text-white'>Trade</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            <div className='bg-[#0052ff] p-10 text-white'>
              <div className='flex flex-col items-start justify-between gap-6 md:flex-row md:items-center'>
                <p className='max-w-2xl text-3xl leading-tight'>Create a demo account to explore crypto markets in this student project.</p>
                <Link to='/signup' className='rounded-full bg-white px-8 py-3 text-sm font-semibold text-gray-900'>
                  Start Trading
                </Link>
              </div>
            </div>
          </div>

          <aside className='border-l border-gray-200'>
            <div className='border-b border-gray-200 p-7 lg:p-8'>
              <div className='rounded-3xl bg-[#0052ff] p-6 text-white'>
                <p className='text-xl font-semibold'>Get started</p>
                <p className='mt-2 text-sm text-blue-100'>Create your account today</p>
                <Link to='/signup' className='mt-6 inline-block rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-gray-900'>
                  Sign up
                </Link>
              </div>
            </div>

            <div className='border-b border-gray-200 p-7 lg:p-8'>
              <div className='mb-10'>
                <h3 className='text-2xl font-semibold text-gray-900'>Top movers</h3>
                <div className='mt-4 space-y-3'>
                  {gainers.map((asset) => (
                    <div key={asset._id || asset.symbol} className='rounded-2xl bg-gray-100 p-4 text-xs text-gray-700'>
                      {asset.symbol} {formatPercent(asset.change24h)}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className='text-2xl font-semibold text-gray-900'>New listings</h3>
                <div className='mt-4 space-y-3'>
                  {newListings.map((asset) => (
                    <div key={asset._id || asset.symbol} className='rounded-2xl bg-gray-100 p-4 text-xs text-gray-700'>
                      {asset.symbol} Added {asset.createdAt ? new Date(asset.createdAt).toLocaleDateString() : 'recently'}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default CryptocurrenciesPage
