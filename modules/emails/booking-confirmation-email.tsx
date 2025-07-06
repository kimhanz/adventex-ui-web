import * as React from "react"
import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components"

interface BookingConfirmationEmailProps {
  customerName?: string
  tourName?: string
  bookingId?: string
  departureDate?: string
  bookingDetailsUrl?: string
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL
  ? process.env.NEXT_PUBLIC_APP_URL
  : "http://localhost:3000"

export const BookingConfirmationEmail = ({
  customerName = "Customer",
  tourName = "Amazing Tour",
  bookingId = "MTRV12345",
  departureDate = "01 Jan 2025",
  bookingDetailsUrl = `${baseUrl}/bookings/MTRV12345`,
}: BookingConfirmationEmailProps) => (
  <Html>
    <Head />
    <Preview>Your booking for {tourName} is confirmed!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`${baseUrl}/static/mushroom-travel-logo.png`} // Replace with your actual logo path
          width="150"
          height="50"
          alt="Mushroom Travel"
          style={logo}
        />
        <Text style={paragraph}>Hi {customerName},</Text>
        <Text style={paragraph}>
          Thank you for booking your tour with Mushroom Travel! We&apos;re
          excited to have you.
        </Text>
        <Text style={paragraph}>
          Your booking for <strong>{tourName}</strong> is confirmed.
        </Text>
        <Section style={bookingDetails}>
          <Text>
            <strong>Booking ID:</strong> {bookingId}
          </Text>
          <Text>
            <strong>Departure Date:</strong> {departureDate}
          </Text>
        </Section>
        <Text style={paragraph}>
          You can view your complete booking details and manage your reservation
          by clicking the button below:
        </Text>
        <Button
          style={button}
          href={bookingDetailsUrl}
        >
          View Booking Details
        </Button>
        <Hr style={hr} />
        <Text style={footer}>
          Mushroom Travel Team
          <br />
          If you have any questions, please don&apos;t hesitate to contact us.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default BookingConfirmationEmail

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
}

const logo = {
  margin: "0 auto",
}

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
}

const bookingDetails = {
  padding: "12px",
  border: "1px solid #eaeaea",
  borderRadius: "5px",
  marginBottom: "16px",
}

const button = {
  backgroundColor: "#ff5a5f", // Example color, adjust to your brand
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px",
  width: "100%",
}

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
}

const footer = {
  color: "#8898aa",
  fontSize: "12px",
}
