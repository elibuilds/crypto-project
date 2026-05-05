import React from 'react'

const assets = [
    {
        rank: 1,
        name: 'Bitcoin',
        symbol: 'BTC',
        price: 67432.18,
        change: 2.41,
        color: '#F7931A',
        icon: '₿',
        sparkline: [40, 45, 42, 48, 55, 52, 58, 60, 57, 62, 65, 63],
    },
    {
        rank: 2,
        name: 'Ethereum',
        symbol: 'ETH',
        price: 3521.87,
        change: 1.82,
        color: '#627EEA',
        icon: 'Ξ',
        sparkline: [30, 32, 35, 33, 38, 40, 37, 42, 44, 43, 46, 45],
    },
    {
        rank: 3,
        name: 'Solana',
        symbol: 'SOL',
        price: 142.55,
        change: 5.13,
        color: '#9945FF',
        icon: '◎',
        sparkline: [20, 25, 22, 30, 28, 35, 38, 40, 36, 42, 45, 48],
    },
    {
        rank: 4,
        name: 'XRP',
        symbol: 'XRP',
        price: 0.6234,
        change: -0.85,
        color: '#23292F',
        icon: '✕',
        sparkline: [45, 42, 44, 40, 38, 35, 37, 34, 36, 33, 35, 34],
    },
    {
        rank: 5,
        name: 'Cardano',
        symbol: 'ADA',
        price: 0.4521,
        change: 3.27,
        color: '#0033AD',
        icon: '₳',
        sparkline: [15, 18, 17, 22, 20, 25, 28, 26, 30, 32, 35, 34],
    },
    {
        rank: 6,
        name: 'Dogecoin',
        symbol: 'DOGE',
        price: 0.0832,
        change: -1.45,
        color: '#C3A634',
        icon: 'Ð',
        sparkline: [30, 28, 32, 29, 26, 28, 25, 27, 24, 26, 23, 22],
    },
    {
        rank: 7,
        name: 'Avalanche',
        symbol: 'AVAX',
        price: 35.42,
        change: 4.67,
        color: '#E84142',
        icon: 'A',
        sparkline: [20, 22, 25, 28, 26, 30, 33, 35, 32, 38, 40, 42],
    },
    {
        rank: 8,
        name: 'Polkadot',
        symbol: 'DOT',
        price: 7.18,
        change: 1.12,
        color: '#E6007A',
        icon: '●',
        sparkline: [25, 27, 26, 30, 28, 32, 31, 34, 33, 36, 35, 37],
    },
]

const MiniSparkline = ({ data, positive }) => {
    const max = Math.max(...data)
    const min = Math.min(...data)
    const range = max - min || 1
    const w = 100
    const h = 32
    const points = data
        .map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`)
        .join(' ')

    return (
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className='shrink-0'>
            <polyline
                points={points}
                fill='none'
                stroke={positive ? '#05B169' : '#DF3347'}
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    )
}

const formatPrice = (price) => {
    if (price >= 1000) return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    if (price >= 1) return `$${price.toFixed(2)}`
    return `$${price.toFixed(4)}`
}

const AssetTable = () => {
    return (
        <section id='explore' className='bg-white py-16 lg:py-24'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='text-center mb-12'>
                    <h2 className='text-3xl sm:text-4xl font-bold text-cb-dark'>Today's cryptocurrency prices</h2>
                    <p className='mt-3 text-cb-gray text-lg'>The global crypto market cap is $2.47T</p>
                </div>

                {/* Table */}
                <div className='overflow-x-auto rounded-2xl border border-cb-border'>
                    <table className='w-full'>
                        <thead>
                            <tr className='bg-cb-bg-alt border-b border-cb-border'>
                                <th className='text-left text-xs font-semibold text-cb-gray uppercase tracking-wider px-6 py-4 w-12'>#</th>
                                <th className='text-left text-xs font-semibold text-cb-gray uppercase tracking-wider px-6 py-4'>Name</th>
                                <th className='text-right text-xs font-semibold text-cb-gray uppercase tracking-wider px-6 py-4'>Price</th>
                                <th className='text-right text-xs font-semibold text-cb-gray uppercase tracking-wider px-6 py-4 hidden sm:table-cell'>Change</th>
                                <th className='text-right text-xs font-semibold text-cb-gray uppercase tracking-wider px-6 py-4 hidden md:table-cell'>Chart</th>
                                <th className='text-right text-xs font-semibold text-cb-gray uppercase tracking-wider px-6 py-4'>Trade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assets.map((asset, index) => (
                                <tr
                                    key={asset.symbol}
                                    className='border-b border-cb-border last:border-b-0 hover:bg-gray-50/70 transition-colors group cursor-pointer'
                                >
                                    <td className='px-6 py-4 text-sm text-cb-gray-light'>{asset.rank}</td>
                                    <td className='px-6 py-4'>
                                        <div className='flex items-center gap-3'>
                                            <div
                                                className='w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0'
                                                style={{ backgroundColor: asset.color }}
                                            >
                                                {asset.icon}
                                            </div>
                                            <div>
                                                <p className='text-sm font-semibold text-cb-dark'>{asset.name}</p>
                                                <p className='text-xs text-cb-gray-light'>{asset.symbol}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='px-6 py-4 text-right text-sm font-medium text-cb-dark'>{formatPrice(asset.price)}</td>
                                    <td className={`px-6 py-4 text-right text-sm font-medium hidden sm:table-cell ${asset.change >= 0 ? 'text-cb-green' : 'text-cb-red'}`}>
                                        {asset.change >= 0 ? '+' : ''}{asset.change.toFixed(2)}%
                                    </td>
                                    <td className='px-6 py-4 text-right hidden md:table-cell'>
                                        <div className='flex justify-end'>
                                            <MiniSparkline data={asset.sparkline} positive={asset.change >= 0} />
                                        </div>
                                    </td>
                                    <td className='px-6 py-4 text-right'>
                                        <button className='px-4 py-1.5 text-xs font-semibold text-cb-blue border border-cb-blue/30 rounded-full hover:bg-cb-blue hover:text-white transition-all duration-200'>
                                            Trade
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className='text-center mt-8'>
                    <a href='#' className='inline-flex items-center gap-1 text-sm font-medium text-cb-blue hover:text-cb-blue-hover transition-colors'>
                        View all prices
                        <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    )
}

export default AssetTable
