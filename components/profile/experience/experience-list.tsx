"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit3, Trash2, ArrowUpDown, MapPin, Clock } from 'lucide-react'
import { Experience } from "../../types/experience"
import { AddExperienceForm } from "./add-experience-form"
import { EditExperienceForm } from "./edit-experience-form"

interface ExperienceListProps {
  experience: Experience[];
  onAdd: (experience: Experience) => void;
  onEdit: (experience: Experience) => void;
  onDelete: (id: string) => void;
}

export function ExperienceList({ experience, onAdd, onEdit, onDelete }: ExperienceListProps) {
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null)

  const formatDuration = (exp: Experience) => {
    if (exp.currentlyWorking && exp.startDate) {
      const start = new Date(exp.startDate)
      const now = new Date()
      
      const startMonth = start.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      const nowMonth = now.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      
      const diffInMonths = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth())
      const years = Math.floor(diffInMonths / 12)
      const months = diffInMonths % 12
      
      let durationText = ""
      if (years > 0) durationText += `${years} year${years > 1 ? 's' : ''}`
      if (months > 0) durationText += `${years > 0 ? ' ' : ''}${months} month${months > 1 ? 's' : ''}`
      
      return { dateRange: `${startMonth} - Present`, duration: durationText }
    } else if (exp.duration) {
      const start = new Date(exp.duration[0])
      const end = new Date(exp.duration[1])
      
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
    
    return { dateRange: "", duration: "" }
  }

  const handleAdd = (newExperience: Experience) => {
    onAdd(newExperience)
    setShowAddDialog(false)
  }

  const handleEdit = (updatedExperience: Experience) => {
    onEdit(updatedExperience)
    setEditingExperience(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-semibold text-gray-800">Experience</h3>
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
              <AddExperienceForm
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

      {experience.length === 0 ? (
        <Card className="border-dashed border-2 border-gray-200">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-gray-400 mb-4">
              <Plus className="h-12 w-12" />
            </div>
            <h4 className="text-lg font-medium text-gray-600 mb-2">No experience added yet</h4>
            <p className="text-gray-500 text-center mb-4">Add your work experience to complete your profile</p>
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button>Add Experience</Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <AddExperienceForm
                  onAdd={handleAdd}
                  onCancel={() => setShowAddDialog(false)}
                />
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {experience.map((item) => {
            const { dateRange, duration } = formatDuration(item)
            
            return (
              <Card key={item.id} className="border border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12 flex-shrink-0">
                      <AvatarImage src={item.company.logo || "/placeholder.svg"} />
                      <AvatarFallback className="bg-gray-100">
                        {item.company.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 mb-1">{item.title}</h4>
                          <p className="text-gray-600 mb-2">
                            {item.company.name} · {item.employmentType}
                          </p>
                          
                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{dateRange}</span>
                            </div>
                            {duration && (
                              <span className="text-gray-400">· {duration}</span>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-2 mb-2">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{item.location.name}</span>
                            <Badge variant="secondary" className="text-xs">
                              {item.locationType}
                            </Badge>
                          </div>
                          
                          {item.currentlyWorking && (
                            <Badge variant="default" className="bg-green-100 text-green-800 text-xs">
                              Currently Working
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2 ml-4">
                          <Dialog open={editingExperience?.id === item.id} onOpenChange={(open) => !open && setEditingExperience(null)}>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setEditingExperience(item)}
                              >
                                <Edit3 className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                              <EditExperienceForm
                                experience={item}
                                onSave={handleEdit}
                                onCancel={() => setEditingExperience(null)}
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
                                <AlertDialogTitle>Delete Experience</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this experience entry? This action cannot be undone.
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
