import React from 'react'
import { Navbar as HeroNavbar, NavbarBrand, NavbarContent, NavbarItem, Button, Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react'
import { Icon } from '@iconify/react'
import { NotificationCenter } from './notification-center'
import { ProfilePopup } from './profile-popup'

interface NavbarProps {
  onNavigate: (section: string) => void
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <HeroNavbar
      className="fixed left-0 right-0 top-0 z-50 border-b border-divider/10 bg-background/50 shadow-sm backdrop-blur-md"
      shouldHideOnScroll={false}
    >
      <NavbarBrand className="cursor-pointer" onClick={scrollToTop}>
        <Icon icon="lucide:graduation-cap" width={24} height={24} className="text-primary" />
        <p className="ml-2 font-semibold text-inherit">UniPortal</p>
      </NavbarBrand>

      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        <NavbarItem>
          <Button variant="light" onPress={() => onNavigate('calendar')} startContent={<Icon icon="lucide:calendar" width={18} height={18} />}>
            Calendar
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            variant="light"
            onPress={() => onNavigate('assignments')}
            startContent={<Icon icon="lucide:clipboard-list" width={18} height={18} />}
          >
            Assignments
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button variant="light" onPress={() => onNavigate('grades')} startContent={<Icon icon="lucide:bar-chart-2" width={18} height={18} />}>
            Grades
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button variant="light" onPress={() => onNavigate('timeline')} startContent={<Icon icon="lucide:timer" width={18} height={18} />}>
            Timeline
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end" className="gap-2">
        <NavbarItem className="sm:hidden">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button isIconOnly variant="light" aria-label="Navigation menu">
                <Icon icon="lucide:menu" width={20} height={20} />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Navigation menu">
              <DropdownItem
                key="calendar"
                startContent={<Icon icon="lucide:calendar" width={18} height={18} />}
                onPress={() => onNavigate('calendar')}
              >
                Calendar
              </DropdownItem>
              <DropdownItem
                key="assignments"
                startContent={<Icon icon="lucide:clipboard-list" width={18} height={18} />}
                onPress={() => onNavigate('assignments')}
              >
                Assignments
              </DropdownItem>
              <DropdownItem
                key="grades"
                startContent={<Icon icon="lucide:bar-chart-2" width={18} height={18} />}
                onPress={() => onNavigate('grades')}
              >
                Grades
              </DropdownItem>
              <DropdownItem
                key="timeline"
                startContent={<Icon icon="lucide:timer" width={18} height={18} />}
                onPress={() => onNavigate('timeline')}
              >
                Timeline
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
        <NavbarItem>
          <NotificationCenter />
        </NavbarItem>
        <NavbarItem>
          <ProfilePopup
            trigger={
              <Avatar
                isBordered
                color="primary"
                src="/images/me.jpg"
                size="sm"
                className="h-8 w-8 cursor-pointer"
              />
            }
          />
        </NavbarItem>
      </NavbarContent>
    </HeroNavbar>
  )
}
