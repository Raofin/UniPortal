import React from 'react'
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Tabs,
  Tab,
  Input,
  Chip,
  Card,
  CardBody,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@heroui/react'
import { Icon } from '@iconify/react'

// Core interfaces for file management
interface FileItem {
  id: string
  title: string
  type: 'pdf' | 'docx' | 'pptx' | 'txt' | 'zip' | 'jpg' | 'png'
  course: string
  section: string
  lastUpdated: string
  size: string
  starred?: boolean
}

interface Section {
  id: string
  name: string
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'default'
}

// Component for displaying the file list with actions
const FileList: React.FC<{
  files: FileItem[]
  sections: Section[]
  onStarToggle: (id: string) => void
  onDelete: (id: string) => void
}> = ({ files, sections, onStarToggle, onDelete }) => {
  // Get appropriate icon based on file type
  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <Icon icon="lucide:file-text" className="text-danger" />
      case 'docx':
        return <Icon icon="lucide:file-text" className="text-primary" />
      case 'pptx':
        return <Icon icon="lucide:file-presentation" className="text-warning" />
      case 'txt':
        return <Icon icon="lucide:file" className="text-success" />
      case 'zip':
        return <Icon icon="lucide:folder-archive" className="text-secondary" />
      case 'jpg':
      case 'png':
        return <Icon icon="lucide:image" className="text-primary" />
      default:
        return <Icon icon="lucide:file" className="text-default-500" />
    }
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  // Show empty state if no files
  if (files.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Icon icon="lucide:file-question" className="mb-4 h-16 w-16 text-default-300" />
        <h3 className="mb-2 text-xl font-medium">No files found</h3>
        <p className="mb-4 max-w-md text-default-500">Upload files by dragging and dropping or using the browse button</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {files.map((file) => (
        <Card key={file.id} shadow="sm" className="border border-divider transition-all duration-200 hover:border-primary">
          <CardBody className="p-4">
            <div className="flex items-start gap-3">
              <div className="rounded-md bg-default-100 p-2">{getFileIcon(file.type)}</div>
              <div className="flex-grow">
                <div className="flex items-start justify-between">
                  <h3 className="mb-1 text-sm font-medium">{file.title}</h3>
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    className="text-default-400 hover:text-warning-500"
                    onPress={() => onStarToggle(file.id)}
                  >
                    <Icon icon={file.starred ? 'lucide:star' : 'lucide:star'} className={file.starred ? 'fill-warning-500 text-warning-500' : ''} />
                  </Button>
                </div>
                <div className="mb-2 flex flex-wrap gap-2">
                  <Chip size="sm" variant="flat" color={sections.find((s) => s.id === file.section)?.color || 'primary'}>
                    {sections.find((s) => s.id === file.section)?.name || file.section}
                  </Chip>
                  <Chip size="sm" variant="flat" color="default">
                    {file.course}
                  </Chip>
                  <span className="text-xs text-default-500">{file.size}</span>
                </div>
                <p className="text-xs text-default-400">Last updated: {formatDate(file.lastUpdated)}</p>
                <div className="mt-2 flex gap-1">
                  <Button size="sm" variant="flat" color="primary" startContent={<Icon icon="lucide:eye" width={16} height={16} />}>
                    View
                  </Button>
                  <Button size="sm" variant="light" startContent={<Icon icon="lucide:download" width={16} height={16} />}>
                    Download
                  </Button>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button size="sm" variant="light" isIconOnly>
                        <Icon icon="lucide:more-vertical" width={16} height={16} />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="File actions">
                      <DropdownItem key="rename" startContent={<Icon icon="lucide:edit" width={16} height={16} />}>
                        Rename
                      </DropdownItem>
                      <DropdownItem key="move" startContent={<Icon icon="lucide:folder" width={16} height={16} />}>
                        Move to section
                      </DropdownItem>
                      <DropdownItem
                        key="delete"
                        startContent={<Icon icon="lucide:trash-2" width={16} height={16} />}
                        className="text-danger"
                        onPress={() => onDelete(file.id)}
                      >
                        Delete
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  )
}

// Component for file upload area with drag and drop support
const UploadArea: React.FC<{
  isDragging: boolean
  onDragOver: (e: React.DragEvent) => void
  onDragLeave: () => void
  onDrop: (e: React.DragEvent) => void
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void
  fileInputRef: React.RefObject<HTMLInputElement>
}> = ({ isDragging, onDragOver, onDragLeave, onDrop, onFileSelect, fileInputRef }) => (
  <div
    className={`rounded-lg border-2 border-dashed p-6 text-center transition-colors ${isDragging ? 'border-primary bg-primary-50' : 'border-divider'}`}
    onDragOver={onDragOver}
    onDragLeave={onDragLeave}
    onDrop={onDrop}
  >
    <Icon icon="lucide:upload-cloud" className={`mx-auto mb-2 h-10 w-10 ${isDragging ? 'text-primary' : 'text-default-400'}`} />
    <p className={`${isDragging ? 'text-primary' : 'text-default-600'}`}>Drag and drop files here to upload</p>
    <p className="mb-3 mt-1 text-xs text-default-400">Supported formats: PDF, DOCX, PPTX, TXT, ZIP, JPG, PNG (Max 100MB)</p>
    <input
      type="file"
      ref={fileInputRef}
      onChange={onFileSelect}
      className="hidden"
      accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.zip,.rar,.jpg,.jpeg,.png"
    />
    <Button color="primary" variant="flat" startContent={<Icon icon="lucide:upload" />} onPress={() => fileInputRef.current?.click()}>
      Browse Files
    </Button>
  </div>
)

export const FloatingResources: React.FC = () => {
  // State management for resources functionality
  const [isOpen, setIsOpen] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState<'all' | 'recent' | 'starred'>('all')
  const [searchQuery, setSearchQuery] = React.useState('')
  const [isDragging, setIsDragging] = React.useState(false)
  const [isAddingSectionModalOpen, setIsAddingSectionModalOpen] = React.useState(false)
  const [newSectionName, setNewSectionName] = React.useState('')
  const [selectedSection, setSelectedSection] = React.useState<string | null>(null)
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const [isSpinning, setIsSpinning] = React.useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)
  const [isMobileView, setIsMobileView] = React.useState(window.innerWidth < 768)

  // Handle window resize for responsive layout
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Initialize sections with default categories
  const [sections, setSections] = React.useState<Section[]>([
    { id: 'algorithms', name: 'Algorithms', color: 'primary' },
    { id: 'database', name: 'Database Systems', color: 'secondary' },
    { id: 'datastructures', name: 'Data Structures', color: 'success' },
    { id: 'networks', name: 'Computer Networks', color: 'warning' },
  ])

  // Initialize files with sample data
  const [files, setFiles] = React.useState<FileItem[]>([
    {
      id: '1',
      title: 'Advanced Algorithms Lecture Notes',
      type: 'pdf',
      course: 'Advanced Algorithms',
      section: 'algorithms',
      lastUpdated: '2023-10-18',
      size: '2.4 MB',
      starred: true,
    },
    {
      id: '2',
      title: 'Database Project Documentation',
      type: 'docx',
      course: 'Database Systems',
      section: 'database',
      lastUpdated: '2023-10-15',
      size: '1.8 MB',
    },
    {
      id: '3',
      title: 'Data Structures Presentation',
      type: 'pptx',
      course: 'Data Structures',
      section: 'datastructures',
      lastUpdated: '2023-10-10',
      size: '4.2 MB',
      starred: true,
    },
    {
      id: '4',
      title: 'Computer Networks Study Guide',
      type: 'txt',
      course: 'Computer Networks',
      section: 'networks',
      lastUpdated: '2023-10-05',
      size: '0.5 MB',
    },
    {
      id: '5',
      title: 'Programming Assignment Code',
      type: 'zip',
      course: 'Advanced Algorithms',
      section: 'algorithms',
      lastUpdated: '2023-09-28',
      size: '3.7 MB',
    },
    {
      id: '6',
      title: 'ER Diagram for Library System',
      type: 'png',
      course: 'Database Systems',
      section: 'database',
      lastUpdated: '2023-10-12',
      size: '1.2 MB',
    },
    {
      id: '7',
      title: 'Binary Tree Implementation',
      type: 'zip',
      course: 'Data Structures',
      section: 'datastructures',
      lastUpdated: '2023-10-08',
      size: '2.1 MB',
    },
    {
      id: '8',
      title: 'Network Protocols Cheatsheet',
      type: 'pdf',
      course: 'Computer Networks',
      section: 'networks',
      lastUpdated: '2023-09-30',
      size: '1.5 MB',
      starred: true,
    },
  ])

  // File upload handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0]
      const fileExtension = file.name.split('.').pop()?.toLowerCase() || ''

      let fileType: FileItem['type'] = 'txt'
      if (['pdf'].includes(fileExtension)) fileType = 'pdf'
      else if (['doc', 'docx'].includes(fileExtension)) fileType = 'docx'
      else if (['ppt', 'pptx'].includes(fileExtension)) fileType = 'pptx'
      else if (['zip', 'rar'].includes(fileExtension)) fileType = 'zip'
      else if (['jpg', 'jpeg', 'png'].includes(fileExtension)) fileType = 'png'

      const newFile: FileItem = {
        id: `new-${Date.now()}`,
        title: file.name,
        type: fileType,
        course: 'Unknown Course',
        section: selectedSection || 'algorithms',
        lastUpdated: new Date().toISOString().split('T')[0],
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      }

      setFiles([newFile, ...files])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      const fileExtension = file.name.split('.').pop()?.toLowerCase() || ''

      let fileType: FileItem['type'] = 'txt'
      if (['pdf'].includes(fileExtension)) fileType = 'pdf'
      else if (['doc', 'docx'].includes(fileExtension)) fileType = 'docx'
      else if (['ppt', 'pptx'].includes(fileExtension)) fileType = 'pptx'
      else if (['zip', 'rar'].includes(fileExtension)) fileType = 'zip'
      else if (['jpg', 'jpeg', 'png'].includes(fileExtension)) fileType = 'png'

      const newFile: FileItem = {
        id: `new-${Date.now()}`,
        title: file.name,
        type: fileType,
        course: 'Unknown Course',
        section: selectedSection || 'algorithms',
        lastUpdated: new Date().toISOString().split('T')[0],
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      }

      setFiles([newFile, ...files])
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // Filter and sort files based on active tab and search query
  const filteredFiles = React.useMemo(() => {
    return files
      .filter((file) => {
        if (activeTab === 'recent') return true
        if (activeTab === 'starred') return file.starred
        return true
      })
      .filter((file) => !selectedSection || file.section === selectedSection)
      .filter((file) => {
        if (!searchQuery) return true
        const query = searchQuery.toLowerCase()
        return file.title.toLowerCase().includes(query) || file.course.toLowerCase().includes(query)
      })
      .sort((a, b) => {
        if (activeTab === 'recent') {
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
        }
        return 0
      })
      .slice(0, activeTab === 'recent' ? 5 : undefined)
  }, [files, activeTab, searchQuery, selectedSection])

  // Section management handlers
  const handleAddSection = () => {
    if (newSectionName.trim()) {
      const newSection: Section = {
        id: newSectionName.toLowerCase().replace(/\s+/g, '-'),
        name: newSectionName.trim(),
        color: ['primary', 'secondary', 'success', 'warning', 'danger'][Math.floor(Math.random() * 5)] as Section['color'],
      }

      setSections([...sections, newSection])
      setNewSectionName('')
      setIsAddingSectionModalOpen(false)
      setSelectedSection(newSection.id)
    }
  }

  const toggleStarFile = (fileId: string) => {
    setFiles(files.map((file) => (file.id === fileId ? { ...file, starred: !file.starred } : file)))
  }

  const handleDeleteFile = (fileId: string) => {
    setFiles(files.filter((file) => file.id !== fileId))
  }

  // Modal management
  const handleModalClose = React.useCallback(() => {
    setIsOpen(false)
    setTimeout(() => {
      setActiveTab('all')
      setSearchQuery('')
      setIsDragging(false)
      setSelectedSection(null)
    }, 100)
  }, [])

  const handleClick = () => {
    setIsSpinning(true)
    setIsOpen(true)
    setTimeout(() => setIsSpinning(false), 500)
  }

  return (
    <>
      <Button data-resources-button className="hidden" onPress={() => setIsOpen(true)} />

      {isOpen && (
        <Modal
          isOpen={isOpen}
          onOpenChange={handleModalClose}
          size="5xl"
          scrollBehavior="inside"
          hideCloseButton={true}
          classNames={{
            base: 'h-[90vh] md:h-[80vh]',
          }}
        >
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    isIconOnly
                    variant="light"
                    className="md:hidden"
                    onPress={() => setIsSidebarOpen(!isSidebarOpen)}
                    aria-label="Toggle sidebar"
                  >
                    <Icon icon="lucide:menu" />
                  </Button>
                  <h2 className="flex items-center gap-2 text-xl font-semibold">
                    <Icon icon="lucide:folder-open" className="text-primary" />
                    Resources Manager
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="ml-auto rounded-full p-2 text-danger transition-colors hover:bg-danger-100"
                  aria-label="Close resources"
                >
                  <Icon icon="lucide:x" style={{ fontSize: 22 }} className="text-danger" />
                </button>
              </div>
            </ModalHeader>

            <ModalBody className="p-0">
              <div className="flex h-full relative">
                {/* Sidebar with sections and filters */}
                <div
                  className={`absolute inset-y-0 left-0 z-20 w-full transform bg-default-50 transition-transform duration-200 ease-in-out md:relative md:z-0 md:w-1/4 md:translate-x-0 ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
                  }`}
                >
                  <div className="flex h-full flex-col border-r border-divider">
                    <div className="flex items-center justify-between border-b border-divider p-3 md:hidden">
                      <h3 className="font-medium">Sections</h3>
                      <Button isIconOnly variant="light" onClick={() => setIsSidebarOpen(false)} aria-label="Close sidebar">
                        <Icon icon="lucide:x" style={{ fontSize: 20 }} />
                      </Button>
                    </div>
                    <div className="flex h-full flex-col p-4">
                      <div className="mb-4">
                        <Input
                          placeholder="Search files..."
                          startContent={<Icon icon="lucide:search" className="text-default-400" />}
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          isClearable
                          onClear={() => setSearchQuery('')}
                        />
                      </div>

                      <div className="mb-4">
                        <Tabs
                          selectedKey={activeTab}
                          onSelectionChange={(key) => setActiveTab(key as 'all' | 'recent' | 'starred')}
                          variant="light"
                          color="primary"
                          fullWidth
                        >
                          <Tab
                            key="all"
                            title={
                              <div className="flex items-center gap-2">
                                <Icon icon="lucide:layers" />
                                <span>All</span>
                              </div>
                            }
                          />
                          <Tab
                            key="recent"
                            title={
                              <div className="flex items-center gap-2">
                                <Icon icon="lucide:clock" />
                                <span>Recent</span>
                              </div>
                            }
                          />
                          <Tab
                            key="starred"
                            title={
                              <div className="flex items-center gap-2">
                                <Icon icon="lucide:star" />
                                <span>Starred</span>
                              </div>
                            }
                          />
                        </Tabs>
                      </div>

                      <div className="mb-2 flex items-center justify-between">
                        <h3 className="text-sm font-medium text-default-600">Sections</h3>
                        <Button size="sm" variant="light" isIconOnly onPress={() => setIsAddingSectionModalOpen(true)}>
                          <Icon icon="lucide:plus" />
                        </Button>
                      </div>

                      <div className="space-y-1 overflow-y-auto">
                        <Button
                          fullWidth
                          variant={selectedSection === null ? 'flat' : 'light'}
                          color={selectedSection === null ? 'primary' : 'default'}
                          className="justify-start"
                          startContent={<Icon icon="lucide:folder" />}
                          onPress={() => {
                            setSelectedSection(null)
                            if (isMobileView) setIsSidebarOpen(false)
                          }}
                        >
                          All Sections
                        </Button>

                        {sections.map((section) => (
                          <Button
                            key={section.id}
                            fullWidth
                            variant={selectedSection === section.id ? 'flat' : 'light'}
                            color={selectedSection === section.id ? section.color : 'default'}
                            className="justify-start"
                            startContent={<Icon icon="lucide:folder" />}
                            onPress={() => {
                              setSelectedSection(section.id)
                              if (isMobileView) setIsSidebarOpen(false)
                            }}
                          >
                            {section.name}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main content area with file list */}
                <div className="flex w-full flex-col md:w-3/4">
                  <div className="border-b border-divider p-4">
                    <UploadArea
                      isDragging={isDragging}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onFileSelect={handleFileSelect}
                      fileInputRef={fileInputRef}
                    />
                  </div>

                  <div className="flex-grow overflow-y-auto p-4">
                    <FileList files={filteredFiles} sections={sections} onStarToggle={toggleStarFile} onDelete={handleDeleteFile} />
                  </div>
                </div>
              </div>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}

      {/* Add Section Modal */}
      {isAddingSectionModalOpen && (
        <Modal
          isOpen={isAddingSectionModalOpen}
          onOpenChange={(open) => {
            setIsAddingSectionModalOpen(open)
            if (!open) setNewSectionName('')
          }}
          size="sm"
          hideCloseButton={true}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex items-center justify-between">
                  <h2>Add New Section</h2>
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddingSectionModalOpen(false)
                      setNewSectionName('')
                    }}
                    className="ml-auto rounded-full p-2 text-danger transition-colors hover:bg-danger-100"
                    aria-label="Close add section"
                  >
                    <Icon icon="lucide:x" style={{ fontSize: 22 }} className="text-danger" />
                  </button>
                </ModalHeader>
                <ModalBody>
                  <Input
                    label="Section Name"
                    placeholder="e.g., Machine Learning"
                    value={newSectionName}
                    onChange={(e) => setNewSectionName(e.target.value)}
                    autoFocus
                  />
                </ModalBody>
                <ModalFooter>
                  <Button variant="light" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button color="primary" onPress={handleAddSection}>
                    Add Section
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </>
  )
}
