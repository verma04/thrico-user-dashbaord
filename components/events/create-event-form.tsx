"use client"

import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, MapPin, Users, DollarSign } from "lucide-react"
import { Button } from "../ui/button"

interface CreateEventFormProps {
  loading: boolean
  onFinish: (values: any) => void
  formId: string
}

const eventCategories = [
  "Technology",
  "Business",
  "Design",
  "Marketing",
  "Education",
  "Health & Wellness",
  "Arts & Culture",
  "Sports & Fitness",
  "Food & Drink",
  "Networking",
  "Workshop",
  "Conference",
]

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Event title is required"),
  category: Yup.string().required("Category is required"),
  date: Yup.string().required("Date is required"),
  time: Yup.string().required("Time is required"),
  eventType: Yup.string().oneOf(["in-person", "online", "hybrid"]).required(),
  pricingType: Yup.string().oneOf(["free", "paid"]).required(),
  location: Yup.string().when("eventType", {
    is: (val: string) => val === "in-person" || val === "hybrid",
    then: (schema) => schema.required("Venue address is required"),
    otherwise: (schema) => schema,
  }),
  onlineLocation: Yup.string().when("eventType", {
    is: (val: string) => val === "online" || val === "hybrid",
    then: (schema) => schema.required("Online platform/link is required"),
    otherwise: (schema) => schema,
  }),
  ticketPrice: Yup.string().when("pricingType", {
    is: "paid",
    then: (schema) =>
      schema
        .required("Ticket price is required")
        .test("is-positive", "Ticket price must be greater than 0", (val) => !!val && parseFloat(val) > 0),
    otherwise: (schema) => schema,
  }),
  maxAttendees: Yup.string()
    .matches(/^\d*$/, "Must be a number")
    .nullable(),
})

export function CreateEventForm({ loading, onFinish, formId }: CreateEventFormProps) {
  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        category: "",
        date: "",
        time: "",
        location: "",
        onlineLocation: "",
        maxAttendees: "",
        ticketPrice: "",
        eventType: "in-person",
        pricingType: "free",
      }}
      validationSchema={validationSchema}
      onSubmit={onFinish}
    >
      {({ values, setFieldValue, isValid, touched, errors }) => (
        <Form id={formId} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <CalendarDays className="h-4 w-4" />
              Basic Information
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Event Title *</Label>
              <Field
                as={Input}
                id="title"
                name="title"
                placeholder="Enter event title..."
                className="w-full"
                disabled={loading}
              />
              <ErrorMessage name="title" component="div" className="text-xs text-red-500" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Field
                as={Textarea}
                id="description"
                name="description"
                placeholder="Brief description of your event..."
                rows={3}
                className="w-full resize-none"
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={values.category}
                onValueChange={(value) => setFieldValue("category", value)}
                disabled={loading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select event category" />
                </SelectTrigger>
                <SelectContent>
                  {eventCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {touched.category && errors.category && (
                <div className="text-xs text-red-500">{errors.category}</div>
              )}
            </div>
          </div>

          <Separator />

          {/* Date & Time */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <CalendarDays className="h-4 w-4" />
              Date & Time
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Event Date *</Label>
                <Field
                  as={Input}
                  id="date"
                  name="date"
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  disabled={loading}
                />
                <ErrorMessage name="date" component="div" className="text-xs text-red-500" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Start Time *</Label>
                <Field
                  as={Input}
                  id="time"
                  name="time"
                  type="time"
                  disabled={loading}
                />
                <ErrorMessage name="time" component="div" className="text-xs text-red-500" />
              </div>
            </div>
          </div>

          <Separator />

          {/* Location */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <MapPin className="h-4 w-4" />
              Event Type & Location
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <Button
                  type="button"
                  variant={values.eventType === "in-person" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFieldValue("eventType", "in-person")}
                  className="flex-1 text-xs"
                  disabled={loading}
                >
                  📍 In-Person
                </Button>
                <Button
                  type="button"
                  variant={values.eventType === "online" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFieldValue("eventType", "online")}
                  className="flex-1 text-xs"
                  disabled={loading}
                >
                  💻 Online
                </Button>
                <Button
                  type="button"
                  variant={values.eventType === "hybrid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFieldValue("eventType", "hybrid")}
                  className="flex-1 text-xs"
                  disabled={loading}
                >
                  🌐 Hybrid
                </Button>
              </div>
              {values.eventType === "hybrid" && (
                <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded-md">
                  💡 Hybrid events allow attendees to participate both in-person and online. Please provide both venue and online platform details.
                </div>
              )}
              {(values.eventType === "in-person" || values.eventType === "hybrid") && (
                <div className="space-y-2">
                  <Label htmlFor="location">Venue Address</Label>
                  <Field
                    as={Input}
                    id="location"
                    name="location"
                    placeholder="Enter venue address..."
                    disabled={loading}
                  />
                  <ErrorMessage name="location" component="div" className="text-xs text-red-500" />
                </div>
              )}
              {(values.eventType === "online" || values.eventType === "hybrid") && (
                <div className="space-y-2">
                  <Label htmlFor="onlineLocation">
                    {values.eventType === "hybrid" ? "Online Platform/Link" : "Meeting Link/Platform"}
                  </Label>
                  <Field
                    as={Input}
                    id="onlineLocation"
                    name="onlineLocation"
                    placeholder="Zoom, Google Meet, YouTube Live, etc."
                    disabled={loading}
                  />
                  <ErrorMessage name="onlineLocation" component="div" className="text-xs text-red-500" />
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Capacity & Pricing */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Users className="h-4 w-4" />
              Capacity & Pricing
            </div>
            <div className="space-y-3">
              <Label>Event Pricing *</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  variant={values.pricingType === "free" ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setFieldValue("pricingType", "free")
                    setFieldValue("ticketPrice", "0")
                  }}
                  className="flex-1 text-xs"
                  disabled={loading}
                >
                  🆓 Free Event
                </Button>
                <Button
                  type="button"
                  variant={values.pricingType === "paid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFieldValue("pricingType", "paid")}
                  className="flex-1 text-xs"
                  disabled={loading}
                >
                  💰 Paid Event
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="maxAttendees">
                  Max Attendees {values.eventType === "hybrid" && "(Total)"}
                </Label>
                <Field
                  as={Input}
                  id="maxAttendees"
                  name="maxAttendees"
                  type="number"
                  placeholder="100"
                  min="1"
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ticketPrice">
                  {values.pricingType === "free" ? "Ticket Price (Free)" : "Ticket Price ($) *"}
                </Label>
                <Field
                  as={Input}
                  id="ticketPrice"
                  name="ticketPrice"
                  type="number"
                  placeholder={values.pricingType === "free" ? "0" : "25.00"}
                  min="0"
                  step="0.01"
                  disabled={values.pricingType === "free" || loading}
                  className={values.pricingType === "free" ? "bg-gray-100" : ""}
                />
                <ErrorMessage name="ticketPrice" component="div" className="text-xs text-red-500" />
                {values.pricingType === "free" && (
                  <p className="text-xs text-gray-500">
                    This event is free for all attendees
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border">
              <DollarSign className="h-4 w-4 text-green-600" />
              <div className="flex-1">
                <span className="text-sm font-medium text-gray-700">
                  {values.pricingType === "free"
                    ? "🎉 Free Event - No charge for attendees"
                    : values.ticketPrice && parseFloat(values.ticketPrice) > 0
                    ? `💳 $${parseFloat(values.ticketPrice).toFixed(2)} per ticket`
                    : "💰 Paid Event - Set your ticket price"}
                </span>
                {values.pricingType === "paid" &&
                  values.maxAttendees &&
                  values.ticketPrice && (
                    <div className="text-xs text-gray-500 mt-1">
                      Potential revenue: $
                      {(parseFloat(values.ticketPrice) * parseInt(values.maxAttendees)).toFixed(2)}
                    </div>
                  )}
              </div>
            </div>
            {values.pricingType === "paid" && (
              <div className="text-xs text-amber-600 bg-amber-50 p-2 rounded-md">
                💡 <strong>Pricing Tip:</strong> Consider your target audience and event value. Free events typically have higher attendance but lower commitment. Paid events often have more engaged attendees.
              </div>
            )}
          </div>

          <Separator />

          {/* Preview */}
          {values.title && (
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-700">Preview</div>
              <div className="border rounded-lg p-4 bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg">{values.title}</h3>
                  <div className="flex gap-1 flex-wrap">
                    {values.category && <Badge variant="secondary">{values.category}</Badge>}
                    {values.eventType === "hybrid" && (
                      <Badge variant="outline" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
                        🌐 Hybrid
                      </Badge>
                    )}
                    {values.pricingType === "free" ? (
                      <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
                        🆓 Free
                      </Badge>
                    ) : (
                      values.ticketPrice &&
                      parseFloat(values.ticketPrice) > 0 && (
                        <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-300">
                          💰 ${parseFloat(values.ticketPrice).toFixed(2)}
                        </Badge>
                      )
                    )}
                  </div>
                </div>
                {values.description && (
                  <p className="text-sm text-gray-600 mb-3">{values.description}</p>
                )}
                <div className="space-y-1 text-sm text-gray-600">
                  {values.date && values.time && (
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4" />
                      <span>
                        {new Date(values.date).toLocaleDateString()} at {values.time}
                      </span>
                    </div>
                  )}
                  {(values.location || values.onlineLocation) && (
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <div className="space-y-1">
                        {values.eventType === "hybrid" ? (
                          <div className="space-y-1">
                            {values.location && (
                              <div className="flex items-center gap-2">
                                <span>{values.location}</span>
                                <Badge variant="outline" className="text-xs">
                                  In-Person
                                </Badge>
                              </div>
                            )}
                            {values.onlineLocation && (
                              <div className="flex items-center gap-2">
                                <span>{values.onlineLocation}</span>
                                <Badge variant="outline" className="text-xs">
                                  Online
                                </Badge>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span>
                              {values.eventType === "online"
                                ? values.onlineLocation
                                : values.location}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {values.eventType === "online" ? "Online" : "In-Person"}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  {values.maxAttendees && (
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>
                        Max {values.maxAttendees} attendees
                        {values.pricingType === "paid" &&
                          values.ticketPrice && (
                            <span className="text-green-600 ml-2">
                              (${(parseFloat(values.ticketPrice) * parseInt(values.maxAttendees)).toFixed(2)} max revenue)
                            </span>
                          )}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </Form>
      )}
    </Formik>
  )
}