import React from 'react'
import { Card, CardBody, CardHeader, Button, Chip } from '@heroui/react'
import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'

interface FileItem {
  id: string
  title: string
  type: 'pdf' | 'docx' | 'pptx' | 'txt' | 'zip'
  course: string
  lastUpdated: string
  size: string
}

export const NotesAndFiles: React.FC = () => {
  const [files] = React.useState<FileItem[]>([
    {
      id: '1',
      title: 'Advanced Algorithms Lecture Notes',
      type: 'pdf',
      course: 'Advanced Algorithms',
      lastUpdated: '2023-10-18',
      size: '2.4 MB',
    },
    {
      id: '2',
      title: 'Database Project Documentation',
      type: 'docx',
      course: 'Database Systems',
      lastUpdated: '2023-10-15',
      size: '1.8 MB',
    },
    {
      id: '3',
      title: 'Data Structures Presentation',
      type: 'pptx',
      course: 'Data Structures',
      lastUpdated: '2023-10-10',
      size: '4.2 MB',
    },
    {
      id: '4',
      title: 'Computer Networks Study Guide',
      type: 'txt',
      course: 'Computer Networks',
      lastUpdated: '2023-10-05',
      size: '0.5 MB',
    },
    {
      id: '5',
      title: 'Programming Assignment Code',
      type: 'zip',
      course: 'Advanced Algorithms',
      lastUpdated: '2023-09-28',
      size: '3.7 MB',
    },
  ])

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
      default:
        return <Icon icon="lucide:file" className="text-default-500" />
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  // Drag and drop functionality (mocked)
  const [isDragging, setIsDragging] = React.useState(false)

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
    // In a real app, we would handle file upload here
  }

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Notes & Files</h2>
        <Button color="primary" startContent={<Icon icon="lucide:upload" />}>
          Upload
        </Button>
      </CardHeader>

      <CardBody>
        <div
          className={`mb-6 rounded-lg border-2 border-dashed p-6 text-center transition-colors ${isDragging ? 'border-primary bg-primary-50' : 'border-divider'}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Icon icon="lucide:upload-cloud" className={`mx-auto mb-2 h-10 w-10 ${isDragging ? 'text-primary' : 'text-default-400'}`} />
          <p className={`${isDragging ? 'text-primary' : 'text-default-600'}`}>Drag and drop files here to upload</p>
          <p className="mt-1 text-xs text-default-400">Supported formats: PDF, DOCX, PPTX, TXT, ZIP (Max 10MB)</p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {files.map((file, index) => (
            <motion.div
              key={file.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              whileHover={{ scale: 1.01 }}
            >
              <Card shadow="sm" className="border border-divider">
                <CardBody className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-md bg-default-100 p-2">{getFileIcon(file.type)}</div>

                    <div className="flex-grow">
                      <h3 className="mb-1 text-sm font-medium">{file.title}</h3>
                      <div className="mb-2 flex flex-wrap gap-2">
                        <Chip size="sm" variant="flat" color="primary">
                          {file.course}
                        </Chip>
                        <span className="text-xs text-default-500">{file.size}</span>
                      </div>
                      <p className="text-xs text-default-400">Last updated: {formatDate(file.lastUpdated)}</p>
                    </div>

                    <div className="flex gap-1">
                      <Button isIconOnly size="sm" variant="light" aria-label="Download file">
                        <Icon icon="lucide:download" size={16} />
                      </Button>
                      <Button isIconOnly size="sm" variant="light" aria-label="View file">
                        <Icon icon="lucide:eye" size={16} />
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      </CardBody>
    </Card>
  )
}
