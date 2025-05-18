import React from 'react'
import { Button, Tooltip } from '@heroui/react'
import { Icon } from '@iconify/react'
import { useTheme } from '@heroui/use-theme'
import { motion } from 'framer-motion'

export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme()
  const isDark = theme === 'dark'
  const [isSpinning, setIsSpinning] = React.useState(false)

  const handleClick = () => {
    setIsSpinning(true)
    setTheme(isDark ? 'light' : 'dark')
    // Reset spinning after animation
    setTimeout(() => setIsSpinning(false), 500)
  }

  return (
    <Tooltip content={`Switch to ${isDark ? 'light' : 'dark'} theme`}>
      <Button
        isIconOnly
        variant="light"
        size="lg"
        onPress={handleClick}
        className="relative h-12 w-12 overflow-hidden rounded-full"
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      >
        <motion.div
          initial={false}
          animate={{
            backgroundColor: isDark ? 'rgba(251, 191, 36, 0.1)' : 'rgba(99, 102, 241, 0.1)',
            scale: 1,
            rotate: isSpinning ? 360 : 0,
          }}
          whileHover={{
            backgroundColor: isDark ? 'rgba(251, 191, 36, 0.2)' : 'rgba(99, 102, 241, 0.2)',
            scale: 1.1,
          }}
          transition={{
            backgroundColor: {
              duration: 0.2,
            },
            scale: {
              duration: 0.2,
            },
            rotate: {
              duration: 0.5,
              ease: [0.4, 0, 0.2, 1],
            },
          }}
          className="flex h-full w-full items-center justify-center rounded-full"
        >
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
              filter: 'blur(4px)',
            }}
            animate={{
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
            }}
            transition={{
              duration: 0.3,
              ease: 'easeOut',
            }}
          >
            <Icon icon={isDark ? 'lucide:sun' : 'lucide:moon'} width={24} height={24} className={isDark ? 'text-warning' : 'text-primary'} />
          </motion.div>
        </motion.div>
      </Button>
    </Tooltip>
  )
}
