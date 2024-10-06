import React from 'react'

const PatientIdentification = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 max-w-xs ml-10">
      <a href="#">
        <img className="rounded-t-lg" src="" alt="" />
      </a>
      <div className="p-4">
        <a href="#">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            Rs 100
          </h5>
          <h3 style={{ color: '#3b82f6', fontSize: '18px', fontWeight: '500' }}>
            chalana
          </h3>
          <h3 style={{ color: '#705227', fontSize: '18px', fontWeight: '500' }}>
            specializations
          </h3>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-sm">
          description
        </p>
      </div>
    </div>
  )
}

export default PatientIdentification