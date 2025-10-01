"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Plus, Edit3, Trash2, ArrowUpDown, Icon, ArrowLeft } from 'lucide-react'
import { useRouter } from "next/navigation"

import { AddEducationForm } from "./add-education-form"
import { EditEducationForm } from "./edit-education-form"

interface EducationListProps {
  education: Education[];
  onAdd: (education: Education) => void;
  onEdit: (education: Education) => void;
  onDelete: (id: string) => void;
}

export function EducationList({ education, onAdd, onEdit, onDelete }: EducationListProps) {
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [editingEducation, setEditingEducation] = useState<Education | null>(null)
  const router = useRouter()

  const formatDuration = (duration: [string, string]) => {
    const start = new Date(duration[0])
    const end = new Date(duration[1])
    
    const startMonth = start.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    const endMonth = end.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    
    const diffInMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())
    const years = Math.floor(diffInMonths / 12)
    const months = diffInMonths % 12
    
    let durationText = ""
    if (years > 0) durationText += `${years} year${years > 1 ? 's' : ''}`
    if (months > 0) durationText += `${years > 0 ? ' ' : ''}${months} month${months > 1 ? 's' : ''}`
    
    return { dateRange: `${startMonth} - ${endMonth}`, duration: durationText }
  }

  const handleAdd = (newEducation: Education) => {
    onAdd(newEducation)
    setShowAddDialog(false)
  }

  const handleEdit = (updatedEducation: Education) => {
    onEdit(updatedEducation)
    setEditingEducation(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2"
            onClick={() => router.back()}
            aria-label="Go back"
          >
            <ArrowLeft />
          </Button>
          My Education.
        </h3>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ArrowUpDown className="h-4 w-4" />
          </Button>
          
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Plus className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <AddEducationForm
                onAdd={handleAdd}
                onCancel={() => setShowAddDialog(false)}
              />
            </DialogContent>
          </Dialog>

          <Button variant="outline" size="icon" className="h-8 w-8">
            <Edit3 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {education.length === 0 ? (
        <Card className="border-dashed border-2 border-gray-200">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-gray-400 mb-4">
              <Plus className="h-12 w-12" />
            </div>
            <h4 className="text-lg font-medium text-gray-600 mb-2">No education added yet</h4>
            <p className="text-gray-500 text-center mb-4">Add your educational background to complete your profile</p>
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button>Add Education</Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <AddEducationForm
                  onAdd={handleAdd}
                  onCancel={() => setShowAddDialog(false)}
                />
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {education.map((item) => {
            const { dateRange, duration } = formatDuration(item.duration)
            
            return (
              <Card key={item.id} className="border border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12 flex-shrink-0">
                      <AvatarImage src={item.school.logo || "/placeholder.svg"} />
                      <AvatarFallback className="bg-gray-100">
                        {item.school.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 mb-1">{item.degree}</h4>
                          <p className="text-gray-600 mb-2">{item.school.name}</p>
                          <p className="text-sm text-gray-500 mb-1">{dateRange}</p>
                          {duration && (
                            <p className="text-sm text-gray-400 mb-3">{duration}</p>
                          )}
                          <p className="text-sm text-gray-600 mb-2">
                            <span className="font-medium">Grade:</span> {item.grade}
                          </p>
                          <p className="text-sm text-gray-600 mb-2">
                            <span className="font-medium">Activities:</span> {item.activities}
                          </p>
                          {item.description && (
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Description:</span> {item.description}
                            </p>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2 ml-4">
                          <Dialog open={editingEducation?.id === item.id} onOpenChange={(open) => !open && setEditingEducation(null)}>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setEditingEducation(item)}
                              >
                                <Edit3 className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                              <EditEducationForm
                                education={item}
                                onSave={handleEdit}
                                onCancel={() => setEditingEducation(null)}
                              />
                            </DialogContent>
                          </Dialog>

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Education</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this education entry? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => onDelete(item.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
