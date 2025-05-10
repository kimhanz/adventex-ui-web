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

const baseUrl = process.env.BASE_URL ? process.env.BASE_URL : ""

interface AutoReplyEmailProps {
  name: string
}

export default function AutoReplyEmail({ name }: AutoReplyEmailProps) {
  return (
    <Html lang="en">
      <Head>
        <title>Thank you for contacting Adventex</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
      </Head>
      <Preview>Thank you for reaching out to Adventex</Preview>
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
                Thank You for Contacting Adventex
              </Heading>
            </Section>
            <Section className="bg-card rounded-b-lg p-8 shadow-xl">
              <Text className="text-foreground mb-6">Dear {name},</Text>
              <Text className="text-foreground mb-6">
                Thank you for reaching out to Adventex. We have received your
                message and appreciate your interest in our services.
              </Text>
              <Text className="text-foreground mb-6">
                Our team is reviewing your inquiry and will get back to you as
                soon as possible. We strive to respond to all messages within
                24-48 business hours.
              </Text>
              <Section className="bg-accent mb-6 rounded-lg p-6">
                <Text className="text-accent-foreground font-semibold">
                  While you wait, you might find these resources helpful:
                </Text>
                <ul className="mt-2 list-disc pl-6">
                  <li className="text-accent-foreground">
                    <Link
                      href={`${baseUrl}/services`}
                      className="text-primary hover:underline"
                    >
                      Our Services
                    </Link>
                  </li>
                  <li className="text-accent-foreground">
                    <Link
                      href={`${baseUrl}/faq"`}
                      className="text-primary hover:underline"
                    >
                      Frequently Asked Questions
                    </Link>
                  </li>
                  <li className="text-accent-foreground">
                    <Link
                      href={`${baseUrl}/blog"`}
                      className="text-primary hover:underline"
                    >
                      Latest Blog Posts
                    </Link>
                  </li>
                </ul>
              </Section>
              <Text className="text-foreground mb-6">
                {
                  "If you have any urgent matters, please don't hesitate to call us at +66 2 123 4567."
                }
              </Text>
              <Button
                href={`${baseUrl}/contact"`}
                className="bg-primary text-primary-foreground transform rounded-full px-6 py-3 font-bold shadow-md transition duration-300 ease-in-out hover:-translate-y-1"
              >
                Visit Our Website
              </Button>
              <Hr className="border-border my-6" />
              <Text className="text-muted-foreground text-sm">
                This is an automated response. Please do not reply directly to
                this email.
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
