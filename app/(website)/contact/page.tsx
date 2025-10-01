import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { WavyBackground } from "@/components/ui/wavy-background";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}

      {/* Hero Section */}
      <BackgroundBeamsWithCollision className="relative bg-gradient-to-r from-primary via-primary/80 to-primary/60 text-white py-16 ">
        <div className="container mx-auto px-4 ">
          <div className="text-center max-w-2xl md:max-w-4xl mx-auto">
            <h1 className="heading-h1 text-3xl sm:text-4xl md:text-6xl font-extrabold text-white mb-4 sm:mb-6">
              Fast, Friendly Support: Submit Your Help Request Today
            </h1>
            <p className="body-text text-blue-100 mb-6 sm:mb-8 text-base sm:text-lg">
              Have questions about Thrico? Want to partner with us? We'd love to
              hear from you. Our team is here to help you make the most of your
              community experience.
            </p>
          </div>
        </div>
      </BackgroundBeamsWithCollision>

      {/* Contact Form & Info */}

      <section className="py-10 sm:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            {/* Contact Form */}
            <div className="w-full max-w-xl">
              <h2 className="heading-h2 text-gray-900 mb-4 sm:mb-6 text-2xl sm:text-3xl text-center">
                Fast, Friendly Support
              </h2>
              <p className="body-text text-gray-600 mb-3 sm:mb-4 text-base sm:text-lg text-center">
                Submit your help request today. New to our Knowledge Base?
                Before you submit a ticket, take a quick look{" "}
                <a href="#" className="text-blue-600 underline">
                  here
                </a>{" "}
                to find answers to your Thrico questions.
                <br />
                If you're having trouble accessing Thrico,{" "}
                <a href="#" className="text-blue-600 underline">
                  click here
                </a>{" "}
                to learn about planned downtime and potential outages.
              </p>
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <form className="space-y-5 sm:space-y-6">
                    <div>
                      <Label htmlFor="email" className="label-text">
                        Email Address<span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        className="mt-1 w-full"
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Please use your Thrico user email address if you have
                        one.
                      </p>
                    </div>
                    <div>
                      <Label htmlFor="requestType" className="label-text">
                        Request Type<span className="text-red-500">*</span>
                      </Label>
                      <select
                        id="requestType"
                        className="mt-1 w-full border rounded px-3 py-2"
                        required
                      >
                        <option value="">Select a request type</option>
                        <option value="account">Account Issue</option>
                        <option value="technical">Technical Support</option>
                        <option value="billing">Billing</option>
                        <option value="feedback">Feedback</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="requestSubtype" className="label-text">
                        Request Subtype<span className="text-red-500">*</span>
                      </Label>
                      <select
                        id="requestSubtype"
                        className="mt-1 w-full border rounded px-3 py-2"
                        required
                      >
                        <option value="">Select a subtype</option>
                        <option value="login">Login Problem</option>
                        <option value="feature">Feature Request</option>
                        <option value="bug">Bug Report</option>
                        <option value="payment">Payment Issue</option>
                        <option value="general">General Inquiry</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="description" className="label-text">
                        Description<span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="description"
                        placeholder="Describe your issue or question in detail..."
                        className="mt-1 min-h-[100px] sm:min-h-[120px] w-full"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full button-text">
                      Submit Request
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
