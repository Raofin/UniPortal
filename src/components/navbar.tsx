import React from "react";
import { Navbar as HeroNavbar, NavbarBrand, NavbarContent, NavbarItem, Button, Avatar } from "@heroui/react";
import { Icon } from "@iconify/react";
import { ThemeSwitcher } from "./theme-switcher";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Badge } from "@heroui/react";
import { NotificationCenter } from "./notification-center";
import { ProfilePopup } from "./profile-popup";

interface NavbarProps {
  onNavigate: (section: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  return (
    <HeroNavbar 
      className="bg-background/70 backdrop-blur-md border-b border-divider"
      position="sticky"
      shouldHideOnScroll={false}
    >
      <NavbarBrand>
        <Icon icon="lucide:graduation-cap" width={24} height={24} className="text-primary" />
        <p className="font-semibold text-inherit ml-2">UniPortal</p>
      </NavbarBrand>
      
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Button
            variant="light"
            onPress={() => onNavigate("calendar")}
            startContent={<Icon icon="lucide:calendar" />}
          >
            Calendar
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            variant="light"
            onPress={() => onNavigate("assignments")}
            startContent={<Icon icon="lucide:clipboard-list" />}
          >
            Assignments
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            variant="light"
            onPress={() => onNavigate("grades")}
            startContent={<Icon icon="lucide:bar-chart-2" />}
          >
            Grades
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            variant="light"
            onPress={() => onNavigate("notes")}
            startContent={<Icon icon="lucide:file-text" />}
          >
            Notes
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            variant="light"
            onPress={() => onNavigate("timeline")}
            startContent={<Icon icon="lucide:timeline" />}
          >
            Timeline
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            variant="light"
            onPress={() => onNavigate("conversations")}
            startContent={<Icon icon="lucide:message-circle" />}
          >
            Messages
          </Button>
        </NavbarItem>
      </NavbarContent>
      
      <NavbarContent justify="end">
        <NavbarItem className="hidden sm:flex">
          <ThemeSwitcher />
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
                src="https://img.heroui.chat/image/avatar?w=200&h=200&u=1"
                size="sm"
                className="cursor-pointer"
              />
            }
          />
        </NavbarItem>
      </NavbarContent>
    </HeroNavbar>
  );
};