'use client';



import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

import { Button } from '@astryxdesign/core/Button';
import { Icon } from '@astryxdesign/core/Icon';
import { NavIcon } from '@astryxdesign/core/NavIcon';
import { Section } from '@astryxdesign/core/Section';
import { TopNav, TopNavHeading, TopNavItem } from '@astryxdesign/core/TopNav';

import { House } from 'lucide-react';

const navItems = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Services',
    href: '/services',
  },
  {
    label: 'About',
    href: '/about',
  },
];

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('loggedInUser'));
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setIsLoggedIn(false);
    router.push('/login');
  };

  const navigateTo = (path: string) => {
    router.push(path);
  };

  const isActive = (path: string) => pathname === path;

  return (
    <Section
      variant="transparent"
      padding={0}
      width="100%"
      className="w-full bg-slate-950 text-white"
    >
      <div className="w-full bg-slate-950 text-white [&_*]:!text-white">
        <TopNav
          label="Main navigation"
          heading={
            <TopNavHeading
              heading="My App"
              headingHref="/"
              logo={
                <NavIcon
                  icon={
                    <Icon icon={House} size="sm" color="inherit" />
                  }
                />
              }
            />
          }
          centerContent={
            <>
              {navItems.map((item) => (
                <TopNavItem
                  key={item.href}
                  label={item.label}
                  href={item.href}
                  isSelected={isActive(item.href)}
                />
              ))}
            </>
          }
          endContent={
            <>
              <Button
                label="Search"
                variant="ghost"
                isIconOnly
                onClick={() => navigateTo('/search')}
                icon={
                  <Icon icon="search" color="inherit" />
                }
              />
              {isLoggedIn ? (
                <>
                  <Button
                    label="Profile"
                    variant={isActive('/profile') ? 'primary' : 'ghost'}
                    onClick={() => navigateTo('/profile')}
                  />
                  <Button label="Logout" variant="secondary" onClick={handleLogout} />
                </>
              ) : (
                <>
                  <Button
                    label="Login"
                    variant={isActive('/login') ? 'primary' : 'ghost'}
                    onClick={() => navigateTo('/login')}
                  />
                  <Button
                    label="Register"
                    variant={isActive('/form-two-column') ? 'primary' : 'ghost'}
                    onClick={() => navigateTo('/form-two-column')}
                  />
                </>
              )}
            </>
          }
        />
      </div>
    </Section>
  );
}
