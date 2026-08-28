import smtplib
import time
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# ============================================================
# GMAIL SETTINGS
# ============================================================

SENDER_EMAIL = "arnabdatta83@gmail.com"
APP_PASSWORD = "dpxl hiys pjqo sgxu"

SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587


# ============================================================
# GOOGLE MEET LINK
# ============================================================
# The Google Meet link will be sent to participants
# through their WhatsApp number.

# ============================================================
# PARTICIPANTS + PRESENTATION TIME
# ============================================================

participants = [
    {
        "name": "MD SIFAT HOSSEN",
        "email": "sifathossen710@gmail.com",
        "presentation_time": "6:00 PM – 6:20 PM",
    },
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
        "name": "Md.Khalid Al-Amin Rafi",
        "email": "rafi44599@gmail.com",
        "presentation_time": "8:00 PM – 8:20 PM",
    },
    {
        "name": "Dibya Joti Saha (Arka)",
        "email": "arka07saha@gmail.com",
        "presentation_time": "8:30 PM – 8:50 PM",
    },
    {
        "name": "Mohammad Safiul Faruk Faiyaz",
        "email": "safiulfaiyaz@gmail.com",
        "presentation_time": "9:00 PM – 9:20 PM",
    },
    {
        "name": "Sheikh Aroshi Riza",
        "email": "rizarosh9@gmail.com",
        "presentation_time": "9:30 PM – 9:50 PM",
    },
    {
        "name": "Toshio Shyki Orpon",
        "email": "orponpro@gmail.com",
        "presentation_time": "10:00 PM – 10:20 PM",
    },
    {
        "name": "Tahasin Al Mahabi",
        "email": "mahabitam123@gmail.com",
        "presentation_time": "10:30 PM – 10:50 PM",
    },
    {
        "name": "Prantika Sarkar",
        "email": "prantikas107@gmail.com",
        "presentation_time": "11:00 PM – 11:20 PM",
    },
]


# ============================================================
# EMAIL SUBJECT
# ============================================================

SUBJECT = (
    "ITECX College Congress National Round – "
    "Live Presentation Schedule"
)


# ============================================================
# CREATE PERSONALIZED EMAIL
# ============================================================

def create_email(participant):

    name = participant["name"]
    email = participant["email"]
    presentation_time = participant["presentation_time"]

    body = f"""Dear {name},

Thank you for participating in the ITECX College Congress National Round.

We have received your abstract submission successfully.

You are now required to prepare for your LIVE PRESENTATION during the National Round.


🎤 LIVE PRESENTATION

Your assigned presentation time is:

{presentation_time}

Please be ready and available before your scheduled time.


📊 PRESENTATION GUIDELINES

• Maximum 10 slides
• Your presentation will be delivered LIVE
• Please prepare your presentation in advance
• Make sure your presentation is clear, concise, and well organized
• Please join the online session a few minutes before your scheduled time


📱 GOOGLE MEET LINK

The Google Meet link and further instructions will be sent to you through your registered WhatsApp number.

Please make sure that your WhatsApp number is active and check your WhatsApp messages before the presentation.


🏆 NATIONAL ROUND & PRIZE-GIVING CEREMONY

If you qualify through the National Round, you will be invited to the ITECX College Congress National Prize-Giving Ceremony at United International University (UIU) on 4 September 2026.

We wish you the very best for your presentation.

Prepare well, present your ideas confidently, and get ready to represent Bangladesh on the international stage! 🇧🇩


See you at the National Round, and hopefully in the historic city of Rome, Italy! 🇮🇹


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

    print("=" * 65)
    print("ITECX COLLEGE CONGRESS EMAIL SENDER")
    print("=" * 65)

    print(f"Sender: {SENDER_EMAIL}")
    print(f"Total participants: {len(participants)}")
    print()

    successful = 0
    failed = 0

    try:

        # --------------------------------------------------------
        # Connect to Gmail
        # --------------------------------------------------------

        print("Connecting to Gmail...")

        server = smtplib.SMTP(
            SMTP_SERVER,
            SMTP_PORT
        )

        server.starttls()

        # --------------------------------------------------------
        # Gmail Login
        # --------------------------------------------------------

        print("Logging into Gmail...")

        server.login(
            SENDER_EMAIL,
            APP_PASSWORD
        )

        print("Login successful!")
        print("-" * 65)


        # --------------------------------------------------------
        # Send emails individually
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
                print(f"    Time : {presentation_time}")
                print()

                # Small delay
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
        # Close connection
        # --------------------------------------------------------

        server.quit()


        # --------------------------------------------------------
        # Final Report
        # --------------------------------------------------------

        print("=" * 65)
        print("EMAIL SENDING COMPLETED")
        print("=" * 65)

        print(f"Successfully sent: {successful}")
        print(f"Failed:            {failed}")
        print(f"Total:             {len(participants)}")

        print("=" * 65)


    except smtplib.SMTPAuthenticationError:

        print()
        print("❌ Gmail authentication failed.")
        print()

        print("Please check:")
        print("1. Gmail address is correct.")
        print("2. 2-Step Verification is enabled.")
        print("3. You are using a Gmail App Password.")
        print("4. App Password is correct.")

    except Exception as e:

        print()
        print("❌ Could not connect to Gmail.")
        print(f"Error: {e}")


# ============================================================
# RUN
# ============================================================

if __name__ == "__main__":
    send_emails()