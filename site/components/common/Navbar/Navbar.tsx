import { FC, useState, useEffect } from 'react'
import Link from 'next/link'
import s from './Navbar.module.css'
import throttle from 'lodash.throttle'
import { Logo, Container, Button } from '@components/ui'
import { Searchbar, UserNav } from '@components/common'
import cn from 'clsx'
interface Link {
  href: string
  label: string
}

interface NavbarProps {
  scrolled: boolean
  links?: Link[]
}
const Navbar: FC<NavbarProps> = ({ scrolled, links }) => {
  const [search, setSearch] = useState<boolean>(false)
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = throttle(() => {
      const offset = 0
      const { scrollTop } = document.documentElement
      const scrolled = scrollTop > offset

      if (hasScrolled !== scrolled) {
        setHasScrolled(scrolled)
      }
    }, 200)

    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [hasScrolled])

  return (
    <div
      className={cn(
        s.root,
        { 'shadow-magical': hasScrolled },
        hasScrolled || search ? 'bg-primary' : 'bg-transparent'
      )}
    >
      <Container clean className="mx-auto max-w-8xl px-6">
        <div className={s.nav}>
          <div className="flex items-center flex-1">
            <Link href="/">
              <a className={s.logo} aria-label="Logo">
                <Logo color={hasScrolled || search ? 'black' : 'white'} />
              </a>
            </Link>
            {scrolled && (
              <nav className={s.navMenu}>
                <Link href="/search">
                  <a className={s.link}>All</a>
                </Link>
                {links?.map((l) => (
                  <Link href={l.href} key={l.href}>
                    <a className={s.link}>{l.label}</a>
                  </Link>
                ))}
              </nav>
            )}
          </div>

          <div className="flex items-center justify-end flex-1 space-x-8">
            {process.env.COMMERCE_SEARCH_ENABLED && search ? (
              <div className="hidden lg:flex">
                <Searchbar />
              </div>
            ) : (
              <Button variant="naked" onClick={() => setSearch(!search)}>
                {hasScrolled ? (
                  <img src="/images/icons/search.svg" />
                ) : (
                  <img src="/images/icons/search-white.svg" />
                )}
              </Button>
            )}
            <UserNav className={!hasScrolled && !search ? s.navTopWhite : ''} />
          </div>
        </div>
        {process.env.COMMERCE_SEARCH_ENABLED && search && (
          <div className="flex pb-4 lg:px-6 lg:hidden">
            <Searchbar id="mobile-search" />
          </div>
        )}
      </Container>
    </div>
  )
}

export default Navbar
