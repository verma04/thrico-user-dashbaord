"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Edit, Plus, Trash2 } from 'lucide-react'
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { v4 as uuidv4 } from "uuid"
import AddEducationForm from "@/components/profile/education/add-education-form"
import EditEducationForm from "@/components/profile/education/edit-education-form"

export default function EducationListPage() {
  const [educationEntries, setEducationEntries] = useState([
    {
      id: "edu1",
      degree: "Master of Design",
      school: "Stanford University",
      period: "2016 - 2018",
      grade: "A",
      activities: "Design Club President",
      description: "Focused on human-computer interaction and design thinking.",
    },
    {
      id: "edu2",
      degree: "Bachelor of Arts in Graphic Design",
      school: "Rhode Island School of Design",
      period: "2012 - 2016",
      grade: "B+",
      activities: "Student Art Collective",
      description: "Specialized in visual communication and typography.",
    },
  ])

  const [showAddEducationModal, setShowAddEducationModal] = useState(false)
  const [showEditEducationModal, setShowEditEducationModal] = useState(false)
  const [currentEducationToEdit, setCurrentEducationToEdit] = useState<any>(null)
  const [educationToDeleteId, setEducationToDeleteId] = useState<string | null>(null)

  const handleAddEducation = (newEdu: any) => {
    setEducationEntries([...educationEntries, { ...newEdu, id: uuidv4() }])
    setShowAddEducationModal(false)
  }

  const handleEditEducation = (updatedEdu: any) => {
    setEducationEntries(educationEntries.map((edu) => (edu.id === updatedEdu.id ? updatedEdu : edu)))
    setShowEditEducationModal(false)
    setCurrentEducationToEdit(null)
  }

  const handleDeleteEducation = () => {
    if (educationToDeleteId) {
      setEducationEntries(educationEntries.filter((edu) => edu.id !== educationToDeleteId))
      setEducationToDeleteId(null)
    }
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">My Education</CardTitle>
          <Dialog open={showAddEducationModal} onOpenChange={setShowAddEducationModal}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add New Education
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Education</DialogTitle>
              </DialogHeader>
              <AddEducationForm onSave={handleAddEducation} onCancel={() => setShowAddEducationModal(false)} />
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent className="space-y-6">
          {educationEntries.map((edu) => (
            <div key={edu.id} className="flex items-start space-x-4 border-b pb-4 last:border-b-0 last:pb-0">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-6 h-6 text-gray-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{edu.degree}</h3>
                <p className="text-gray-600">{edu.school}</p>
                <p className="text-sm text-gray-500">{edu.period}</p>
              </div>
              <div className="flex space-x-2">
                <Dialog
                  open={showEditEducationModal && currentEducationToEdit?.id === edu.id}
                  onOpenChange={(open) => {
                    setShowEditEducationModal(open)
                    if (!open) setCurrentEducationToEdit(null)
                  }}
                >
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={() => setCurrentEducationToEdit(edu)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  {currentEducationToEdit?.id === edu.id && (
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>Edit Education</DialogTitle>
                      </DialogHeader>
                      <EditEducationForm
                        educationData={currentEducationToEdit}
                        onSave={handleEditEducation}
                        onCancel={() => {
                          setShowEditEducationModal(false)
                          setCurrentEducationToEdit(null)
                        }}
                      />
                    </DialogContent>
                  )}
                </Dialog>
                <AlertDialog
                  open={educationToDeleteId === edu.id}
                  onOpenChange={(open) => {
                    if (!open) setEducationToDeleteId(null)
                  }}
                >
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-600"
                      onClick={() => setEducationToDeleteId(edu.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your education entry.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeleteEducation}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      <div className="mt-6 flex justify-end">
        <Link href="/">
          <Button variant="outline">Back to Profile</Button>
        </Link>
      </div>
    </div>
  )
}
