import React from 'react'
import { Button, Tooltip } from '@heroui/react'
import { Icon } from '@iconify/react'
import { useTheme } from '@heroui/use-theme'
import { motion } from 'framer-motion'

export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <Tooltip content={`Switch to ${isDark ? 'light' : 'dark'} theme`}>
      <Button
        isIconOnly
        variant="light"
        onPress={() => setTheme(isDark ? 'light' : 'dark')}
        className="relative overflow-hidden"
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      >
        <motion.div
          initial={false}
          animate={{
            rotate: isDark ? [0, 360] : [360, 0],
            scale: [1, 1.2, 1],
            backgroundColor: isDark ? 'rgba(251, 191, 36, 0.1)' : 'rgba(99, 102, 241, 0.1)',
          }}
          transition={{
            rotate: {
              duration: 0.5,
              ease: [0.4, 0, 0.2, 1],
            },
            scale: {
              duration: 0.3,
              times: [0, 0.5, 1],
              ease: 'easeInOut',
            },
            backgroundColor: {
              duration: 0.3,
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
            <Icon icon={isDark ? 'lucide:sun' : 'lucide:moon'} width={20} height={20} className={isDark ? 'text-warning' : 'text-primary'} />
          </motion.div>
        </motion.div>
      </Button>
    </Tooltip>
  )
}
