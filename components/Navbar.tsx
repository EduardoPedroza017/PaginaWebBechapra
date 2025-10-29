"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  
  return (
    <nav className="nav">
      <div className="nav-container">
        <Link href="/" className="nav-logo">
          Bechapra
        </Link>

        {/* Desktop Menu */}
        <ul className="nav-menu">
          <li><Link href="/" className="nav-link">Pag. Principal</Link></li>
          <li><Link href="/servicios" className="nav-link">Servicios</Link></li>
          <li><Link href="/acerca-de" className="nav-link">Acerca de</Link></li>
          <li>
            <a 
              href="https://bechapra.com.mx" 
              target="_blank" 
              rel="noreferrer" 
              className="btn btn-primary btn-small"
            >
              ¿Eres colaborador?
            </a>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setOpen(v => !v)} 
          className="nav-link md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden" style={{ 
          background: 'var(--surface)',
          borderTop: '1px solid var(--border-color)',
          padding: '1rem'
        }}>
          <ul style={{ 
            listStyle: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}>
            <li>
              <Link 
                href="/" 
                onClick={() => setOpen(false)} 
                className="nav-link"
                style={{ display: 'block', padding: '0.5rem' }}
              >
                Pag. Principal
              </Link>
            </li>
            <li>
              <Link 
                href="/servicios" 
                onClick={() => setOpen(false)} 
                className="nav-link"
                style={{ display: 'block', padding: '0.5rem' }}
              >
                Servicios
              </Link>
            </li>
            <li>
              <Link 
                href="/acerca-de" 
                onClick={() => setOpen(false)} 
                className="nav-link"
                style={{ display: 'block', padding: '0.5rem' }}
              >
                Acerca de
              </Link>
            </li>
            <li>
              <a 
                href="https://bechapra.com.mx" 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-primary btn-small"
                style={{ display: 'inline-block', marginTop: '0.5rem' }}
              >
                ¿Eres colaborador?
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}