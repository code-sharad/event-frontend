"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function Component() {
  const { toast } = useToast();
  const [studentName, setStudentName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [preferences, setPreferences] = useState({
    events: false,
    lectures: false,
    holidays: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handlePreferenceChange = (preference: keyof typeof preferences) => {
    setPreferences((prev) => ({ ...prev, [preference]: !prev[preference] }));
  };

  const simulateWhatsAppMessage = async () => {
    // Simulate API call to send WhatsApp message
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/students`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: studentName,
        phoneNumber,
        notificationType: Object.entries(preferences),
      }),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await simulateWhatsAppMessage();
      setIsSubmitted(true);
      toast({
        title: "Success!",
        description:
          "Your preferences have been saved and a welcome message has been sent.",
      });
    } catch (error: unknown) {
      console.error(error);
      toast({
        title: "Error",
        description:
          "There was a problem saving your preferences. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Congratulations, {studentName}!</CardTitle>
          <CardDescription>
            You've successfully set up your WhatsApp notifications.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>You will now receive notifications for:</p>
          <ul className="list-disc list-inside mt-2">
            {Object.entries(preferences).map(
              ([key, value]) =>
                value && (
                  <li key={key} className="capitalize">
                    {key}
                  </li>
                )
            )}
          </ul>
        </CardContent>
        <CardFooter>
          <Button onClick={() => setIsSubmitted(false)}>
            Set Up Another Student
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>WhatsApp Notification System</CardTitle>
        <CardDescription>Set up your notification preferences</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4 text-left my-6">
          <div className="space-y-2">
            <Label htmlFor="studentName">Student Name</Label>
            <Input
              id="studentName"
              type="text"
              placeholder="Enter your full name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              type="tel"
              placeholder="Enter your WhatsApp number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Notification Preferences</Label>
            <div className="space-y-2">
              {Object.entries(preferences).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2">
                  <Checkbox
                    id={key}
                    checked={value}
                    onCheckedChange={() =>
                      handlePreferenceChange(key as keyof typeof preferences)
                    }
                  />
                  <Label htmlFor={key} className="capitalize">
                    {key}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Setting up..." : "Set Up Notifications"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
