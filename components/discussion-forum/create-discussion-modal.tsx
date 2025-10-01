"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getDiscussionForumCategory } from "../grapqhl/action/feed";

interface CreateDiscussionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  title: string;
  content: string;
  category: string;
  isAnonymous: boolean;
}

const categories = [
  { id: "general", name: "General" },
  { id: "technology", name: "Technology" },
  { id: "career", name: "Career" },
  { id: "help", name: "Help" },
  { id: "business", name: "Business" },
];

const validationSchema = Yup.object({
  title: Yup.string()
    .required("Please enter a title for your post")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title cannot exceed 100 characters"),
  content: Yup.string()
    .required("Please enter content for your post")
    .min(10, "Content must be at least 10 characters")
    .max(500, "Content cannot exceed 500 characters"),
  category: Yup.string().required("Please select a category"),
  isAnonymous: Yup.boolean(),
});

export function CreateDiscussionModal({
  isOpen,
  onClose,
}: CreateDiscussionModalProps) {
  const initialValues: FormData = {
    title: "",
    content: "",
    category: "",
    isAnonymous: false,
  };

  const handleSubmit = async (
    values: FormData,
    {
      setSubmitting,
      resetForm,
    }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }
  ) => {
    setSubmitting(true);
    try {
      // Simulate API call
      // await new Promise((resolve) => setTimeout(resolve, 1000))
      // resetForm()
      // onClose()
      console.log("Discussion created:", values);
    } catch (error) {
      console.error("Error creating discussion:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = (resetForm?: () => void, isSubmitting?: boolean) => {
    if (!isSubmitting && resetForm) {
      resetForm();
    }
    onClose();
  };
  const { data, loading: categoryLoading } = getDiscussionForumCategory();
  console.log(data);
  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Create a Discussions
          </DialogTitle>
        </DialogHeader>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            isSubmitting,
            setFieldValue,
            resetForm,
          }) => (
            <Form className="space-y-6">
              <Card>
                {console.log(errors)}
                <CardContent className="pt-6 space-y-4">
                  <p className="text-sm text-gray-600 mb-6">
                    Share your thoughts with the community
                  </p>
                  {/* Title Input */}
                  <div className="space-y-2">
                    <Label htmlFor="title">
                      Title <span className="text-red-500">*</span>
                    </Label>
                    <Field
                      as={Input}
                      id="title"
                      name="title"
                      placeholder="Give your post a title"
                      maxLength={100}
                      className={
                        errors.title && touched.title ? "border-red-500" : ""
                      }
                    />
                    <ErrorMessage
                      name="title"
                      component="p"
                      className="text-sm text-red-500"
                    />
                  </div>
                  {/* Content Input */}
                  <div className="space-y-2">
                    <Label htmlFor="content">
                      Content <span className="text-red-500">*</span>
                    </Label>
                    <Field
                      as={Textarea}
                      id="content"
                      name="content"
                      placeholder="What would you like to discuss?"
                      className={`min-h-[120px] ${
                        errors.content && touched.content
                          ? "border-red-500"
                          : ""
                      }`}
                      maxLength={500}
                    />
                    <div className="flex justify-between items-center">
                      <div>
                        <ErrorMessage
                          name="content"
                          component="p"
                          className="text-sm text-red-500"
                        />
                      </div>
                      <p className="text-sm text-gray-500">
                        {values.content.length}/500
                      </p>
                    </div>
                  </div>
                  {/* Category Selector */}
                  <div className="space-y-2">
                    <Label htmlFor="category">
                      Category <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={values.category}
                      onValueChange={(value) =>
                        setFieldValue("category", value)
                      }
                    >
                      <SelectTrigger
                        className={
                          errors.category && touched.category
                            ? "border-red-500"
                            : ""
                        }
                      >
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <ErrorMessage
                      name="category"
                      component="p"
                      className="text-sm text-red-500"
                    />
                  </div>
                  {/* Anonymous Switch */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="space-y-1">
                      <Label
                        htmlFor="anonymous"
                        className="text-sm font-medium"
                      >
                        Make this post Anonymous
                      </Label>
                      <p className="text-xs text-gray-600">
                        Your identity will be hidden from other users
                      </p>
                    </div>
                    <Switch
                      id="anonymous"
                      checked={values.isAnonymous}
                      onCheckedChange={(checked) =>
                        setFieldValue("isAnonymous", checked)
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              <DialogFooter className="flex-col-reverse sm:flex-row sm:justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleClose(resetForm, isSubmitting)}
                  disabled={isSubmitting}
                  className="w-full sm:w-auto bg-transparent"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="min-w-[100px] w-full sm:w-auto"
                >
                  {isSubmitting ? "Creating..." : "Create Post"}
                </Button>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
