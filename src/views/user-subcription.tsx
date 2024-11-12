import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

// Simulated events (in a real app, these would come from a backend)
const simulatedEvents = [
  { id: 1, title: "Tech Fair", date: "2023-06-15", type: "event" },
  {
    id: 2,
    title: "Computer Science Lecture",
    date: "2023-06-16",
    type: "lecture",
  },
  { id: 3, title: "Career Workshop", date: "2023-06-17", type: "event" },
  {
    id: 4,
    title: "Data Structures Lecture",
    date: "2023-06-18",
    type: "lecture",
  },
];

export default function UserSubscription() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [subscriptions, setSubscriptions] = useState(
    simulatedEvents.map((event) => ({ ...event, subscribed: false }))
  );

  const handleSubscriptionToggle = (id: number) => {
    setSubscriptions(
      subscriptions.map((sub) =>
        sub.id === id ? { ...sub, subscribed: !sub.subscribed } : sub
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subscribedEvents = subscriptions.filter((sub) => sub.subscribed);
    console.log(
      `Subscribed to ${subscribedEvents.length} events with phone number ${phoneNumber}`
    );
    // Simulate sending a WhatsApp message
    simulateSendWhatsAppMessage(phoneNumber, subscribedEvents);
  };

  const simulateSendWhatsAppMessage = (phoneNumber: string, events: any[]) => {
    const message = `
      Hello! Here are your upcoming college events and lectures:
      
      ${events
        .map((event) => `- ${event.title} (${event.type}) on ${event.date}`)
        .join("\n")}
      
      We'll send you reminders before each event. Have a great week!
    `;
    console.log(`Simulated WhatsApp message to ${phoneNumber}:`, message);
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Subscribe to College Events and Lectures</CardTitle>
          <CardDescription>
            Receive WhatsApp notifications for upcoming events and lectures
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">WhatsApp Number</Label>
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
              <Label>Select Events and Lectures</Label>
              {subscriptions.map((sub) => (
                <div key={sub.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`event-${sub.id}`}
                    checked={sub.subscribed}
                    onCheckedChange={() => handleSubscriptionToggle(sub.id)}
                  />
                  <Label htmlFor={`event-${sub.id}`} className="text-sm">
                    {sub.title} - {sub.type} on {sub.date}
                  </Label>
                </div>
              ))}
            </div>
            <Button type="submit">Subscribe</Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-600">
            You will receive weekly updates and day-before reminders for
            subscribed events and lectures.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
