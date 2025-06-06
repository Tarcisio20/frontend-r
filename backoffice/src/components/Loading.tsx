'use client'

import theme from '@/lib/theme'

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex flex-col items-center justify-center">
     <div style={{
        width: '60px',
        height: '60px',
        border: '6px solid #e5e5e5',
        borderTopColor: `${theme.colors["color-tertiary"]}`,
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',

     }}></div>
    </div>
  )
}

export default LoadingScreen
