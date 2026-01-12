"use client";

import { useState, ReactNode } from "react";

interface TabItem {
  key: string;
  title: string;
  content: ReactNode;
}

export default function Tabs({ tabs, theme = 'light' }: { tabs: TabItem[]; theme?: 'light' | 'dark' }) {
  const [active, setActive] = useState<string>(tabs[0]?.key || '');

  return (
    <div>
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2 overflow-auto">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                active === tab.key
                  ? theme === 'dark'
                    ? 'bg-gray-800 text-white'
                    : 'bg-white shadow-sm text-gray-900'
                  : theme === 'dark'
                  ? 'text-gray-400 hover:text-white hover:bg-gray-700/30'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>
      </div>

      <div>
        {tabs.map(tab => (
          <div key={tab.key} style={{ display: active === tab.key ? 'block' : 'none' }}>
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
}
