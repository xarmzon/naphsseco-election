import React from 'react'

export interface ISpinner {
  bg?: 'primary' | 'yellow'
  size?: 'small' | 'medium' | 'large'
  showLoadingText?: boolean
}

const Spinner = ({
  bg = 'yellow',
  size = 'small',
  showLoadingText = false,
}: ISpinner) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <span
        className={`block ${size === 'small' && 'h-1 w-3'} 
      ${size === 'large' && 'h-3 w-10'}
      animate-spin rounded-full ${bg === 'yellow' && 'bg-yellow-300'}
      ${bg === 'primary' && 'bg-primary'}
      `}
      />
      {showLoadingText && (
        <p className="mt-6 font-bold text-primary/60">Loading....</p>
      )}
    </div>
  )
}

export default Spinner
