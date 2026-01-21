"use client";

import React from 'react';
import DashboardLayout from '../layout/DashboardLayout';
import QuickActions from '../../dashboard/QuickActions';
import { WebVitalsWidget } from '@/lib/utils/web-vitals';
import CookieConsentAdmin from '../../cookie/CookieConsentAdminNew';

export default function AdminPageShell({ children, containerClassName = '' }: { children: React.ReactNode; containerClassName?: string }) {
  return (
    <div className={containerClassName}>
      <div className="flex-1 flex flex-col">
        <DashboardLayout>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">{children}</div>

            <aside className="lg:col-span-1 space-y-6">
              <div className="sticky top-6">
                <QuickActions />
                <div className="mt-4">
                  <WebVitalsWidget />
                </div>
                <div className="mt-4">
                  <CookieConsentAdmin />
                </div>
              </div>
            </aside>
          </div>
        </DashboardLayout>
      </div>
    </div>
  );
}
