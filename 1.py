import smtplib
import time
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# ============================================================
# GMAIL SETTINGS
# ============================================================

SENDER_EMAIL = "arnabdatta83@gmail.com"

# IMPORTANT:
# Create a NEW Gmail App Password because the previous one
# was exposed. Do NOT share your App Password publicly.
APP_PASSWORD = "dpxl hiys pjqo sgxu"

SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587


# ============================================================
# PARTICIPANTS + PRESENTATION TIME
# ============================================================

participants = [
    {
        "name": "Zarif Hasin",
        "email": "zarifhasin@gmail.com",
        "presentation_time": "6:30 PM – 6:50 PM",
    },
    {
        "name": "RAIYA RAHMAN",
        "email": "reaz78@gmail.com",
        "presentation_time": "7:00 PM – 7:20 PM",
    },
    {
        "name": "Atikur Rahman",
        "email": "moidulislam22762@gmail.com",
        "presentation_time": "7:30 PM – 7:50 PM",
    },
    {
        "name": "Dibya Joti Saha (Arka)",
        "email": "arka07saha@gmail.com",
        "presentation_time": "8:30 PM – 8:50 PM",
    },

    {
        "name": "Sheikh Aroshi Riza",
        "email": "rizarosh9@gmail.com",
        "presentation_time": "9:30 PM – 9:50 PM",
    },

]


# ============================================================
# EMAIL SUBJECT
# ============================================================

SUBJECT = (
    "Important Update: ITECX College Congress "
    "Live Presentation Rescheduled to 29 August"
)


# ============================================================
# CREATE PERSONALIZED EMAIL
# ============================================================

def create_email(participant):

    name = participant["name"]
    email = participant["email"]
    presentation_time = participant["presentation_time"]

    body = f"""Dear {name},

We sincerely apologize for the inconvenience.

Due to some unforeseen circumstances, including coordination issues with the international team and timing/convenience issues, today's ITECX College Congress National Round live presentation session has been CANCELLED.

The presentation session has been RESCHEDULED for TOMORROW, 29 August 2026.

Your presentation time will remain the SAME:

🎤 YOUR PRESENTATION TIME

{presentation_time}

Please be ready and available before your scheduled time.

📊 PRESENTATION GUIDELINES

• Maximum 10 slides
• The presentation will be delivered LIVE
• Please keep your presentation ready in advance
• Please join the online session a few minutes before your scheduled time

📱 GOOGLE MEET LINK

The Google Meet link and further instructions will be sent to you through your registered WhatsApp number.

Please keep your WhatsApp active and check your messages before your presentation.

We are really sorry for the last-minute change and any inconvenience this may cause. We truly appreciate your patience, cooperation, and understanding.

Thank you for your understanding and continued support.

We look forward to seeing you tomorrow and wish you the very best for your presentation! 🇧🇩🏆


Best regards,

ITECX College Congress
Bangladesh National Round Team
"""

    msg = MIMEMultipart()

    msg["From"] = SENDER_EMAIL
    msg["To"] = email
    msg["Subject"] = SUBJECT

    msg.attach(
        MIMEText(body, "plain", "utf-8")
    )

    return msg


# ============================================================
# SEND EMAILS
# ============================================================

def send_emails():

    print("=" * 70)
    print("ITECX COLLEGE CONGRESS - RESCHEDULE EMAIL SENDER")
    print("=" * 70)

    print(f"Sender: {SENDER_EMAIL}")
    print(f"New Presentation Date: 29 August 2026")
    print(f"Total Participants: {len(participants)}")
    print()

    successful = 0
    failed = 0

    server = None

    try:

        # --------------------------------------------------------
        # CONNECT TO GMAIL
        # --------------------------------------------------------

        print("Connecting to Gmail...")

        server = smtplib.SMTP(
            SMTP_SERVER,
            SMTP_PORT
        )

        server.ehlo()
        server.starttls()
        server.ehlo()

        # --------------------------------------------------------
        # LOGIN
        # --------------------------------------------------------

        print("Logging into Gmail...")

        server.login(
            SENDER_EMAIL,
            APP_PASSWORD
        )

        print("Login successful!")
        print("-" * 70)


        # --------------------------------------------------------
        # SEND EMAILS INDIVIDUALLY
        # --------------------------------------------------------

        for i, participant in enumerate(
            participants,
            start=1
        ):

            name = participant["name"]
            email = participant["email"]
            presentation_time = participant["presentation_time"]

            try:

                msg = create_email(participant)

                server.send_message(msg)

                successful += 1

                print(
                    f"[{i}/{len(participants)}] ✓ SENT"
                )

                print(f"    Name : {name}")
                print(f"    Email: {email}")
                print(f"    Date : 29 August 2026")
                print(f"    Time : {presentation_time}")
                print()

                # Small delay between emails
                time.sleep(2)

            except Exception as e:

                failed += 1

                print(
                    f"[{i}/{len(participants)}] ✗ FAILED"
                )

                print(f"    Name : {name}")
                print(f"    Email: {email}")
                print(f"    Error: {e}")
                print()


        # --------------------------------------------------------
        # CLOSE CONNECTION
        # --------------------------------------------------------

        server.quit()
        server = None


        # --------------------------------------------------------
        # FINAL REPORT
        # --------------------------------------------------------

        print("=" * 70)
        print("EMAIL SENDING COMPLETED")
        print("=" * 70)

        print(f"Successfully sent: {successful}")
        print(f"Failed:            {failed}")
        print(f"Total:             {len(participants)}")

        print("=" * 70)


    except smtplib.SMTPAuthenticationError:

        print()
        print("❌ Gmail authentication failed.")
        print()
        print("Please check:")
        print("1. Your Gmail address is correct.")
        print("2. 2-Step Verification is enabled.")
        print("3. You created a NEW Gmail App Password.")
        print("4. The App Password is copied correctly.")

    except Exception as e:

        print()
        print("❌ Could not connect to Gmail.")
        print(f"Error: {e}")

    finally:

        if server is not None:
            try:
                server.quit()
            except:
                pass


# ============================================================
# RUN
# ============================================================

if __name__ == "__main__":
    send_emails()