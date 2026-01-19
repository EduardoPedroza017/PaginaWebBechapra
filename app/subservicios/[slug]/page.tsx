import React from 'react'
import { redirect, notFound } from 'next/navigation'

type Props = { params: { slug: string } }

export default async function LegacySubservice({ params }: Props){
  const { slug } = await params
  const API = process.env.NEXT_PUBLIC_API_URL;

  try{
    // Try to find a sub_service_page by handle
    const pageRes = await fetch(`${API}/api/sub_service_pages/${encodeURIComponent(slug)}`)
    if (pageRes.ok){
      const page = await pageRes.json()
      // if page has subservice_id, fetch subservice to get parent service
      if (page.subservice_id){
        try{
          const subRes = await fetch(`${API}/api/sub_services/${page.subservice_id}`)
          if (subRes.ok){
            const sub = await subRes.json()
            if (sub.service_id){
              // fetch parent service to get slug
              const pres = await fetch(`${API}/api/services/cards/${sub.service_id}`)
              if (pres.ok){
                const parent = await pres.json()
                if (parent.slug){
                  // redirect to canonical URL
                  redirect(`/servicios/${parent.slug}/${page.handle}`)
                }
              }
            }
          }
        }catch(e){}
      }
      // no parent found — render same path at /servicios/<handle>
      redirect(`/servicios/${page.handle}`)
    }
  }catch(err){ console.error('legacy subservice lookup failed', err) }

  // if nothing found, show 404
  return notFound()
}
