"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, Edit, Plus, Trash2 } from 'lucide-react'
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


export default function ExperienceListPage() {
  const [experiences, setExperiences] = useState([
    {
      id: "exp1",
      title: "Senior Product Designer",
      company: "Figma",
      period: "2022 - Present",
      description: "Leading design for core product features, managing design system, and mentoring junior designers.",
      employmentType: "full-time",
      location: "San Francisco, CA",
      currentlyWorking: true,
      startDate: "2022-01-01T00:00:00.000Z",
      locationType: "on-site",
    },
    {
      id: "exp2",
      title: "Product Designer",
      company: "Stripe",
      period: "2020 - 2022",
      description: "Designed payment flows and dashboard experiences for small business customers.",
      employmentType: "full-time",
      location: "San Francisco, CA",
      currentlyWorking: false,
      duration: ["2020-01-01T00:00:00.000Z", "2022-12-31T00:00:00.000Z"],
      locationType: "on-site",
    },
    {
      id: "exp3",
      title: "UX Designer",
      company: "Airbnb",
      period: "2018 - 2020",
      description: "Worked on host onboarding and listing optimization features.",
      employmentType: "full-time",
      location: "San Francisco, CA",
      currentlyWorking: false,
      duration: ["2018-01-01T00:00:00.000Z", "2020-12-31T00:00:00.000Z"],
      locationType: "on-site",
    },
  ])

  const [showAddExperienceModal, setShowAddExperienceModal] = useState(false)
  const [showEditExperienceModal, setShowEditExperienceModal] = useState(false)
  const [currentExperienceToEdit, setCurrentExperienceToEdit] = useState<any>(null)
  const [experienceToDeleteId, setExperienceToDeleteId] = useState<string | null>(null)

  const handleAddExperience = (newExp: any) => {
    setExperiences([...experiences, { ...newExp, id: uuidv4() }])
    setShowAddExperienceModal(false)
  }

  const handleEditExperience = (updatedExp: any) => {
    setExperiences(experiences.map((exp) => (exp.id === updatedExp.id ? updatedExp : exp)))
    setShowEditExperienceModal(false)
    setCurrentExperienceToEdit(null)
  }

  const handleDeleteExperience = () => {
    if (experienceToDeleteId) {
      setExperiences(experiences.filter((exp) => exp.id !== experienceToDeleteId))
      setExperienceToDeleteId(null)
    }
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">My Experience</CardTitle>
          <Dialog open={showAddExperienceModal} onOpenChange={setShowAddExperienceModal}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add New Experience
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Experience</DialogTitle>
              </DialogHeader>
              <AddExperienceForm onSave={handleAddExperience} onCancel={() => setShowAddExperienceModal(false)} />
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent className="space-y-6">
          {experiences.map((job) => (
            <div key={job.id} className="flex items-start space-x-4 border-b pb-4 last:border-b-0 last:pb-0">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-6 h-6 text-gray-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{job.title}</h3>
                <p className="text-gray-600">{job.company}</p>
                <p className="text-sm text-gray-500 mb-2">{job.period}</p>
                <p className="text-sm text-gray-700">{job.description}</p>
              </div>
              <div className="flex space-x-2">
                <Dialog
                  open={showEditExperienceModal && currentExperienceToEdit?.id === job.id}
                  onOpenChange={(open) => {
                    setShowEditExperienceModal(open)
                    if (!open) setCurrentExperienceToEdit(null)
                  }}
                >
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={() => setCurrentExperienceToEdit(job)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  {currentExperienceToEdit?.id === job.id && (
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>Edit Experience</DialogTitle>
                      </DialogHeader>
                      <EditExperienceForm
                        experienceData={currentExperienceToEdit}
                        onSave={handleEditExperience}
                        onCancel={() => {
                          setShowEditExperienceModal(false)
                          setCurrentExperienceToEdit(null)
                        }}
                      />
                    </DialogContent>
                  )}
                </Dialog>
                <AlertDialog
                  open={experienceToDeleteId === job.id}
                  onOpenChange={(open) => {
                    if (!open) setExperienceToDeleteId(null)
                  }}
                >
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-600"
                      onClick={() => setExperienceToDeleteId(job.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your experience entry.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeleteExperience}>Delete</AlertDialogAction>
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
