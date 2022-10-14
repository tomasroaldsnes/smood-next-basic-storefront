import { FC, useState } from 'react'
import Link from 'next/link'
import s from './Navbar.module.css'
import NavbarRoot from './NavbarRoot'
import { Logo, Container, Button } from '@components/ui'
import { Searchbar, UserNav } from '@components/common'

interface Link {
  href: string
  label: string
}

interface NavbarProps {
  links?: Link[]
}
const Navbar: FC<NavbarProps> = ({ links }) => {
  const [search, setSearch] = useState<boolean>(false)
  return (
    <NavbarRoot>
      <Container clean className="mx-auto max-w-8xl px-6">
        <div className={s.nav}>
          <div className="flex items-center flex-1">
            <Link href="/">
              <a className={s.logo} aria-label="Logo">
                <Logo />
              </a>
            </Link>
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
          </div>
          {/* {process.env.COMMERCE_SEARCH_ENABLED && (
            <div id="search" className="justify flex-1 hidden lg:flex">
              {search ? (
                <Searchbar />
              ) : (
                <div onClick={() => setSearch(!search)}>
                  <img src="/images/icons/search.svg" />
                </div>
              )}
            </div>
          )} */}
          <div className="flex items-center justify-end flex-1 space-x-8">
            {process.env.COMMERCE_SEARCH_ENABLED && search ? (
              <Searchbar />
            ) : (
              <Button variant="naked" onClick={() => setSearch(!search)}>
                <img src="/images/icons/search.svg" />
              </Button>
            )}
            <UserNav />
          </div>
        </div>
      </Container>
    </NavbarRoot>
  )
}

export default Navbar
