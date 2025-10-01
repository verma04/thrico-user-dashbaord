import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pencil } from 'lucide-react'
import React from "react"
import { Formik, Form, Field } from "formik"
import { useUpdateProfileDetails } from "@/components/grapqhl/queries"
import * as Yup from "yup"

import { location as LocationType } from "@/lib/types"
import { GooglePlacesInput } from "@/components/google-places-input"

interface EditProfileModalProps {
  open: boolean
  setOpen: (open: boolean) => void
  firstName: string
  setFirstName: (val: string) => void
  lastName: string
  setLastName: (val: string) => void
  headline: string
  setHeadline: (val: string) => void
  location?: LocationType | null
  setLocation?: (val: LocationType) => void
  onSave: () => void
}

export function EditProfileModal({
  open,
  setOpen,
  firstName,
  lastName,
  headline,
  location = null,
  setLocation,
}: EditProfileModalProps) {

  const [update , {loading}] = useUpdateProfileDetails({
    onCompleted: (data) => {
     if(data.updateProfileDetails){
       setOpen(false)
     }
    },
    onError: (error) => {
      console.error("Error updating profile:", error)
    },
  })

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    headline: Yup.string().required("Headline is required"),
    location: Yup.object().shape({
      name: Yup.string().required("Location is required"),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      address: Yup.string().required(),
    }).nullable().required("Location is required"),
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="ml-2">
          <Pencil className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <Formik
          initialValues={{ firstName, lastName, headline, location }}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={values => {
            update({
              ...values,
              location: values.location,
            })
          }}
        >
          {({ isSubmitting, errors, touched, setFieldValue, values }) => (
            <Form className="space-y-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Field as={Input} id="firstName" name="firstName" required />
                {errors.firstName && touched.firstName && (
                  <div className="text-red-500 text-xs">{errors.firstName}</div>
                )}
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Field as={Input} id="lastName" name="lastName" required />
                {errors.lastName && touched.lastName && (
                  <div className="text-red-500 text-xs">{errors.lastName}</div>
                )}
              </div>
              <div>
                <Label htmlFor="headline">Headline</Label>
                <Field as={Input} id="headline" name="headline" required />
                {errors.headline && touched.headline && (
                  <div className="text-red-500 text-xs">{errors.headline}</div>
                )}
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <GooglePlacesInput
                  value={values.location?.name}
                  onChange={(value: LocationType) => {
                    setFieldValue("location", value)
                    setLocation && setLocation(value)
                  }}
                />
                {errors.location && touched.location && (
                  <div className="text-red-500 text-xs">
                    {(errors.location as any)?.name || errors.location}
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button disabled={loading} type="submit">
                  {loading ? "Saving..." : "Save"}
                </Button>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  )
}