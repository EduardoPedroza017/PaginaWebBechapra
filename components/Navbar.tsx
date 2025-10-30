"use client";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detectar scroll para efecto glassmorphism dinámico
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cerrar menú al hacer ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden"; // Prevenir scroll
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [open]);

  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/servicios", label: "Servicios" },
    { href: "/acerca-de", label: "Acerca de" },
  ];

  return (
    <>
      <nav 
        className={`nav glass-navbar ${scrolled ? "nav-scrolled" : ""}`}
        role="navigation" 
        aria-label="Main navigation"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          background: scrolled 
            ? "rgba(7, 12, 20, 0.85)" 
            : "rgba(7, 12, 20, 0.18)",
          backdropFilter: scrolled ? "blur(16px)" : "blur(8px)",
          borderBottom: scrolled 
            ? "1px solid rgba(255, 255, 255, 0.12)" 
            : "1px solid rgba(255, 255, 255, 0.06)",
          boxShadow: scrolled 
            ? "0 8px 32px rgba(0, 0, 0, 0.4)" 
            : "0 4px 16px rgba(0, 0, 0, 0.2)",
        }}
      >
        <div 
          className="nav-container"
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: scrolled ? "0.75rem 2rem" : "1rem 2rem",
            transition: "padding 0.3s ease",
          }}
        >
          {/* Logo con efecto glow mejorado */}
          <Link 
            href="/" 
            className="nav-logo"
            style={{
              fontWeight: 800,
              fontSize: "1.25rem",
              color: "white",
              textDecoration: "none",
              textShadow: "0 0 20px rgba(62, 232, 255, 0.5), 0 0 40px rgba(150, 86, 255, 0.3)",
              transition: "all 0.3s ease",
              letterSpacing: "-0.02em",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.textShadow = "0 0 30px rgba(62, 232, 255, 0.8), 0 0 60px rgba(150, 86, 255, 0.5)";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.textShadow = "0 0 20px rgba(62, 232, 255, 0.5), 0 0 40px rgba(150, 86, 255, 0.3)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            Bechapra
          </Link>

          {/* Desktop Menu */}
          <ul 
            className="nav-menu"
            style={{
              display: "flex",
              gap: "0.5rem",
              alignItems: "center",
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
          >
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link 
                  href={link.href}
                  className="nav-link"
                  style={{
                    color: "rgba(255, 255, 255, 0.85)",
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    padding: "0.5rem 1rem",
                    borderRadius: "8px",
                    transition: "all 0.2s ease",
                    textDecoration: "none",
                    position: "relative",
                    display: "inline-block",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "rgba(62, 232, 255, 1)";
                    e.currentTarget.style.background = "rgba(62, 232, 255, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(255, 255, 255, 0.85)";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a 
                href="https://bechapra.com.mx" 
                target="_blank" 
                rel="noreferrer" 
                className="neon-btn"
                style={{
                  fontSize: "0.9rem",
                  padding: "0.625rem 1.25rem",
                  background: "linear-gradient(135deg, rgba(62, 232, 255, 0.2), rgba(150, 86, 255, 0.2))",
                  border: "1px solid rgba(62, 232, 255, 0.4)",
                  borderRadius: "9999px",
                  color: "white",
                  fontWeight: 600,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.375rem",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 15px rgba(62, 232, 255, 0.3)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 25px rgba(62, 232, 255, 0.5)";
                  e.currentTarget.style.background = "linear-gradient(135deg, rgba(62, 232, 255, 0.3), rgba(150, 86, 255, 0.3))";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 15px rgba(62, 232, 255, 0.3)";
                  e.currentTarget.style.background = "linear-gradient(135deg, rgba(62, 232, 255, 0.2), rgba(150, 86, 255, 0.2))";
                }}
              >
                ¿Eres colaborador?
              </a>
            </li>
          </ul>

          {/* Mobile Menu Button con animación */}
          <button 
            onClick={() => setOpen(v => !v)}
            className="nav-link"
            aria-label="Toggle menu"
            aria-expanded={open}
            style={{
              display: "none",
              background: "rgba(62, 232, 255, 0.1)",
              border: "1px solid rgba(62, 232, 255, 0.3)",
              borderRadius: "8px",
              padding: "0.5rem",
              color: "white",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(62, 232, 255, 0.2)";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(62, 232, 255, 0.1)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay con animación slide-down */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(4px)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.3s ease",
          zIndex: 999,
          display: "none",
        }}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      <div
        className="glass-navbar"
        style={{
          position: "fixed",
          top: scrolled ? "60px" : "72px",
          left: 0,
          right: 0,
          background: "rgba(7, 12, 20, 0.95)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
          transform: open ? "translateY(0)" : "translateY(-100%)",
          opacity: open ? 1 : 0,
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          zIndex: 998,
          display: "none",
          maxHeight: "calc(100vh - 80px)",
          overflowY: "auto",
        }}
      >
        <ul
          style={{
            listStyle: "none",
            display: "flex",
            flexDirection: "column",
            gap: "0.25rem",
            margin: 0,
            padding: "1rem",
          }}
        >
          {navLinks.map((link, idx) => (
            <li 
              key={link.href}
              style={{
                animation: open ? `slideInFromTop 0.3s ease ${idx * 0.1}s both` : "none",
              }}
            >
              <Link 
                href={link.href}
                onClick={() => setOpen(false)}
                style={{
                  display: "block",
                  padding: "0.875rem 1rem",
                  color: "rgba(255, 255, 255, 0.9)",
                  fontSize: "1rem",
                  fontWeight: 500,
                  textDecoration: "none",
                  borderRadius: "8px",
                  transition: "all 0.2s ease",
                  background: "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(62, 232, 255, 0.15)";
                  e.currentTarget.style.color = "rgba(62, 232, 255, 1)";
                  e.currentTarget.style.transform = "translateX(8px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "rgba(255, 255, 255, 0.9)";
                  e.currentTarget.style.transform = "translateX(0)";
                }}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li 
            style={{
              marginTop: "0.5rem",
              animation: open ? `slideInFromTop 0.3s ease ${navLinks.length * 0.1}s both` : "none",
            }}
          >
            <a 
              href="https://bechapra.com.mx" 
              target="_blank" 
              rel="noreferrer"
              style={{
                display: "block",
                padding: "0.875rem 1rem",
                background: "linear-gradient(135deg, rgba(62, 232, 255, 0.2), rgba(150, 86, 255, 0.2))",
                border: "1px solid rgba(62, 232, 255, 0.4)",
                borderRadius: "12px",
                color: "white",
                fontSize: "1rem",
                fontWeight: 600,
                textAlign: "center",
                textDecoration: "none",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 15px rgba(62, 232, 255, 0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "linear-gradient(135deg, rgba(62, 232, 255, 0.3), rgba(150, 86, 255, 0.3))";
                e.currentTarget.style.transform = "scale(1.02)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "linear-gradient(135deg, rgba(62, 232, 255, 0.2), rgba(150, 86, 255, 0.2))";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              ¿Eres colaborador?
            </a>
          </li>
        </ul>
      </div>

      {/* Estilos para animaciones y responsive */}
      <style jsx>{`
        @keyframes slideInFromTop {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .nav-menu {
            display: none !important;
          }
          button.nav-link {
            display: flex !important;
          }
          .glass-navbar {
            display: block !important;
          }
          div[aria-hidden="true"] {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
}