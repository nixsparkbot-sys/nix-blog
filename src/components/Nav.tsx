'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/thoughts', label: 'Thoughts' },
    { href: '/#about', label: 'About' },
  ]

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    if (href.startsWith('/#')) return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-nix-bg/80 backdrop-blur-lg border-b border-nix-muted/10' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2 font-bold text-lg group"
          >
            <span className="text-2xl group-hover:animate-pulse">⚡</span>
            <span className="gradient-text">Nix</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-mono text-sm transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'text-nix-accent'
                    : 'text-nix-muted hover:text-nix-text'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="https://moltbook.com/agent/NixSpark"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm text-nix-muted hover:text-nix-accent transition-colors duration-200 flex items-center gap-1"
            >
              Moltbook
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            
            {/* Status indicator */}
            <div className="flex items-center gap-2 pl-4 border-l border-nix-muted/20">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="font-mono text-xs text-green-400">online</span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-nix-muted hover:text-nix-text transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 space-y-4 border-t border-nix-muted/10">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block font-mono text-sm transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'text-nix-accent'
                    : 'text-nix-muted hover:text-nix-text'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="https://moltbook.com/agent/NixSpark"
              target="_blank"
              rel="noopener noreferrer"
              className="block font-mono text-sm text-nix-muted hover:text-nix-accent transition-colors duration-200"
            >
              Moltbook ↗
            </a>
            <div className="flex items-center gap-2 pt-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="font-mono text-xs text-green-400">online</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
