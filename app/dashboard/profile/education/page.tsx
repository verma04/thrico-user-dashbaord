"use client";
import { EducationList } from "@/components/profile/education/education-list";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useOnboardingStore } from "@/lib/onboardingStore";

function Education() {
  const { educationData, addEducation, editEducation, deleteEducation } =
    useOnboardingStore();

  return (
    <section aria-labelledby="invite-heading" className="space-y-4">
     

      <Card>
        
        <CardContent className="space-y-6">
          <EducationList
            education={educationData}
            onAdd={addEducation}
            onEdit={editEducation}
            onDelete={deleteEducation}
          />
        </CardContent>
      </Card>
    </section>
  );
}

export default Education;
