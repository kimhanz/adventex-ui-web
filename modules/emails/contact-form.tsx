import * as React from "react"
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components"
import { Tailwind } from "@react-email/tailwind"

const baseUrl = process.env.NEXT_PUBLIC_APP_URL
  ? process.env.NEXT_PUBLIC_APP_URL
  : ""

export default function ContactFormEmail({
  name,
  email,
  subject,
  message,
  submittedAt,
}: {
  name: string
  email: string
  subject: string
  message: string
  submittedAt: string
}) {
  return (
    <Html lang="en">
      <Head>
        <title>New Contact Form Submission</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
      </Head>
      <Preview>New contact form submission from {name}</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                accent: "hsl(0 0% 96.1%)",
                "accent-foreground": "hsl(0 0% 9%)",
                background: "hsl(0 0% 100%)",
                border: "hsl(0 0% 89.8%)",
                destructive: "hsl(0 84.2% 60.2%)",
                "destructive-foreground": "hsl(0 0% 98%)",
                foreground: "hsl(0 0% 3.9%)",
                muted: "hsl(0 0% 96.1%)",
                "muted-foreground": "hsl(0 0% 45.1%)",
                primary: "hsl(0 72.2% 50.6%)",
                "primary-foreground": "hsl(0 85.7% 97.3%)",
                secondary: "hsl(0 0% 96.1%)",
                "secondary-foreground": "hsl(0 0% 9%)",
              },
            },
          },
        }}
      >
        <Body className="bg-background font-sans">
          <Container className="mx-auto my-10 max-w-2xl p-4">
            <Section className="bg-primary-foreground rounded-t-lg p-8">
              <Img
                src={`${baseUrl}/favicon.ico`}
                width="40"
                height="40"
                alt="Adventex Logo"
                className="mb-4"
              />
              <Heading className="text-primary text-2xl font-bold">
                New Contact Form Submission
              </Heading>
            </Section>
            <Section className="bg-card rounded-b-lg p-8 shadow-xl">
              <Text className="text-foreground mb-6">Hello Adventex Team,</Text>
              <Text className="text-foreground mb-6">
                You have received a new message from the contact form on your
                website. Here are the details:
              </Text>
              <Section className="bg-accent mb-6 rounded-lg p-6">
                <Text className="text-accent-foreground mb-2 font-semibold">
                  Name:
                </Text>
                <Text className="text-accent-foreground mb-4">{name}</Text>
                <Text className="text-accent-foreground mb-2 font-semibold">
                  Email:
                </Text>
                <Text className="text-accent-foreground mb-4">{email}</Text>
                <Text className="text-accent-foreground mb-2 font-semibold">
                  Subject:
                </Text>
                <Text className="text-accent-foreground mb-4">{subject}</Text>
                <Text className="text-accent-foreground mb-2 font-semibold">
                  Message:
                </Text>
                <Text className="text-accent-foreground mb-4 whitespace-pre-wrap">
                  {message}
                </Text>
                <Text className="text-accent-foreground mb-2 font-semibold">
                  Submitted at:
                </Text>
                <Text className="text-accent-foreground">{submittedAt}</Text>
              </Section>
              <Text className="text-foreground mb-6">
                To respond to this inquiry, you can reply directly to this email
                or use the buttons below:
              </Text>
              <Section className="mb-6">
                <Button
                  href={`mailto:${email}?subject=Re: ${encodeURIComponent(subject)}`}
                  className="bg-primary text-primary-foreground mr-4 transform rounded-full px-6 py-3 font-bold shadow-md transition duration-300 ease-in-out hover:-translate-y-1"
                >
                  Reply to {name}
                </Button>
              </Section>
              <Hr className="border-border my-6" />
              <Text className="text-muted-foreground text-sm">
                This email was sent from the contact form on your Adventex
                website. If you did not expect this message, please contact your
                website administrator.
              </Text>
              <Text className="text-muted-foreground mt-4 text-sm">
                © {new Date().getFullYear()} Adventex Co., Ltd. All rights
                reserved.
              </Text>
              <Link
                href={`${baseUrl}/privacy-policy"`}
                className="text-primary mt-2 block text-sm hover:underline"
              >
                Privacy Policy
              </Link>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
