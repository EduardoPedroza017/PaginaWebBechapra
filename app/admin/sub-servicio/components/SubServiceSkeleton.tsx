import React from 'react'

export const SubServiceSkeleton: React.FC = () => {
  return (
    <div className="p-4 rounded-lg border bg-white dark:bg-slate-800 animate-pulse">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 w-3/4 mb-2 rounded" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 w-full mb-1 rounded" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 w-2/3 rounded" />
        </div>
      </div>
      <div className="mt-3 flex gap-2 justify-end">
        <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
    </div>
  )
}

export default SubServiceSkeleton
