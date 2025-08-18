"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit, Plus, Trash2 } from 'lucide-react'
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
import { AddEditSkillForm } from "@/components/profile/skills/add-edit-skill-form"

export default function SkillsListPage() {
  const [skills, setSkills] = useState<Skill[]>([
    {
      id: "skill1",
      name: "React",
      category: "frameworks-libraries",
      level: "expert",
      tags: ["Frontend", "JavaScript", "UI Development"],
      yearsOfExperience: 5,
      description: "Extensive experience building complex SPAs and design systems.",
    },
    {
      id: "skill2",
      name: "Python",
      category: "programming-languages",
      level: "advanced",
      tags: ["Backend", "Scripting", "Data Analysis"],
      yearsOfExperience: 7,
      description: "Used for backend services, data processing, and automation scripts.",
    },
    {
      id: "skill3",
      name: "Figma",
      category: "design",
      level: "expert",
      tags: ["UI/UX", "Prototyping", "Design Systems"],
      yearsOfExperience: 4,
      description: "Proficient in creating high-fidelity prototypes and collaborative design workflows.",
    },
  ])

  const [showAddSkillModal, setShowAddSkillModal] = useState(false)
  const [showEditSkillModal, setShowEditSkillModal] = useState(false)
  const [currentSkillToEdit, setCurrentSkillToEdit] = useState<Skill | null>(null)
  const [skillToDeleteId, setSkillToDeleteId] = useState<string | null>(null)

  const handleAddSkill = (newSkill: Skill) => {
    setSkills([...skills, { ...newSkill, id: uuidv4() }])
    setShowAddSkillModal(false)
  }

  const handleEditSkill = (updatedSkill: Skill) => {
    setSkills(skills.map((skill) => (skill.id === updatedSkill.id ? updatedSkill : skill)))
    setShowEditSkillModal(false)
    setCurrentSkillToEdit(null)
  }

  const handleDeleteSkill = () => {
    if (skillToDeleteId) {
      setSkills(skills.filter((skill) => skill.id !== skillToDeleteId))
      setSkillToDeleteId(null)
    }
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">My Skills</CardTitle>
          <Dialog open={showAddSkillModal} onOpenChange={setShowAddSkillModal}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add New Skill
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <AddEditSkillForm onAdd={handleAddSkill} onClose={() => setShowAddSkillModal(false)} mode="add" />
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent className="space-y-6">
          {skills.map((skill) => (
            <div key={skill.id} className="flex items-start space-x-4 border-b pb-4 last:border-b-0 last:pb-0">
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{skill.name}</h3>
                <p className="text-gray-600 text-sm">
                  {skill.level} in {skill.category.replace(/-/g, ' ')}
                  {skill.yearsOfExperience ? ` (${skill.yearsOfExperience} years)` : ''}
                </p>
                {skill.description && <p className="text-sm text-gray-700 mt-1">{skill.description}</p>}
                <div className="flex flex-wrap gap-1 mt-2">
                  {skill.tags.map((tag, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex space-x-2">
                <Dialog
                  open={showEditSkillModal && currentSkillToEdit?.id === skill.id}
                  onOpenChange={(open) => {
                    setShowEditSkillModal(open)
                    if (!open) setCurrentSkillToEdit(null)
                  }}
                >
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={() => setCurrentSkillToEdit(skill)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  {currentSkillToEdit?.id === skill.id && (
                    <DialogContent className="sm:max-w-[600px]">
                      <AddEditSkillForm
                        onEdit={handleEditSkill}
                        onClose={() => {
                          setShowEditSkillModal(false)
                          setCurrentSkillToEdit(null)
                        }}
                        mode="edit"
                        editData={currentSkillToEdit}
                      />
                    </DialogContent>
                  )}
                </Dialog>
                <AlertDialog
                  open={skillToDeleteId === skill.id}
                  onOpenChange={(open) => {
                    if (!open) setSkillToDeleteId(null)
                  }}
                >
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-600"
                      onClick={() => setSkillToDeleteId(skill.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your skill entry.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeleteSkill}>Delete</AlertDialogAction>
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
