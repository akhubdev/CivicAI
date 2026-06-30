

# =====================================================
# CIVICAI
# AI Powered Community Issue Intelligence Platform
# =====================================================

import os
import sqlite3
from datetime import datetime

from flask import (
    Flask,
    render_template,
    request,
    redirect,
    url_for,
    flash,
    session,
    send_file,
    jsonify
)

from werkzeug.utils import secure_filename

from dotenv import load_dotenv

from PIL import Image as PILImage

import google.generativeai as genai

# PDF
from reportlab.lib.pagesizes import A4
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Image
)
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.colors import HexColor

# =====================================================
# LOAD ENVIRONMENT
# =====================================================

load_dotenv()

# =====================================================
# FLASK APP
# =====================================================

app = Flask(__name__)

app.secret_key = "CIVICAI_SECRET_KEY"

# =====================================================
# CONFIGURATION
# =====================================================

UPLOAD_FOLDER = "static/uploads"

DATABASE = "civicai.db"

ALLOWED_EXTENSIONS = {
    "png",
    "jpg",
    "jpeg",
    "webp"
}

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

os.makedirs(
    UPLOAD_FOLDER,
    exist_ok=True
)

# =====================================================
# GEMINI CONFIGURATION
# =====================================================

genai.configure(

    api_key=os.getenv(
        "GOOGLE_API_KEY"
    )

)

print("GOOGLE_API_KEY =", os.getenv("GOOGLE_API_KEY"))
model = genai.GenerativeModel(

    "gemini-2.5-flash"

)

# =====================================================
# STARTUP
# =====================================================

print("="*50)
print("🚀 CivicAI Backend Started")
print("="*50)



# =====================================================
# DATABASE
# =====================================================

def init_db():

    conn = sqlite3.connect(DATABASE)

    cursor = conn.cursor()

    cursor.execute("""

    CREATE TABLE IF NOT EXISTS reports(

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        image_name TEXT,

        issue_type TEXT,

        severity TEXT,

        priority TEXT,

        department TEXT,

        description TEXT,

        suggested_action TEXT,

        confidence INTEGER,

        created_at TEXT

    )

    """)

    # ----------------------------------------
# Database Upgrade (Safe)
# ----------------------------------------

    cursor.execute("PRAGMA table_info(reports)")
    columns = [column[1] for column in cursor.fetchall()]

    if "status" not in columns:
        cursor.execute("""
            ALTER TABLE reports
            ADD COLUMN status TEXT DEFAULT 'Pending'
        """)

    if "location" not in columns:
        cursor.execute("""
            ALTER TABLE reports
                ADD COLUMN location TEXT DEFAULT 'Unknown'
        """)

    if "resolved_at" not in columns:
        cursor.execute("""
            ALTER TABLE reports
            ADD COLUMN resolved_at TEXT
        """)

    conn.commit()

    conn.close()


init_db()

# =====================================================
# HELPER FUNCTIONS
# =====================================================

def allowed_file(filename):

    return (

        "." in filename

        and

        filename.rsplit(".",1)[1].lower()

        in ALLOWED_EXTENSIONS

    )


def get_db():

    return sqlite3.connect(DATABASE)

# =====================================================
# GEMINI PROMPT
# =====================================================

AI_PROMPT = """

You are CivicAI.

Analyze the uploaded civic issue image.

Return your response exactly in this format.

Issue Type:
Severity:
Priority:
Department:
Confidence:
Description:
Suggested Action:

Rules:

Severity:
Low
Medium
High
Critical

Priority:
Low
Medium
High
Urgent

Confidence:
Only percentage.

Department examples:

Road Department
Municipal Corporation
Electricity Department
Water Supply Department
Traffic Police
Sanitation Department

Description:
Maximum 2-3 lines.

Suggested Action:
Maximum 2-3 lines.

"""

# =====================================================
# AI IMAGE ANALYSIS
# =====================================================

def analyze_image(image_path):

    image = PILImage.open(image_path)

    response = model.generate_content(

        [

            AI_PROMPT,

            image

        ]

    )

    return response.text

# =====================================================
# SAVE REPORT
# =====================================================

def save_report(

    image_name,

    issue_type,

    severity,

    priority,

    department,

    description,

    suggested_action,

    confidence

):

    conn = get_db()

    cursor = conn.cursor()

    cursor.execute("""

    INSERT INTO reports(

    image_name,
    issue_type,
    severity,
    priority,
    status,
    location,
    department,
    description,
    suggested_action,
    confidence,
    created_at,
    resolved_at

    )

    VALUES(?,?,?,?,?,?,?,?,?,?,?,?)
    """,

    (
    image_name,
    issue_type,
    severity,
    priority,
    "Pending",
    "Unknown",
    department,
    description,
    suggested_action,
    confidence,
    datetime.now().strftime("%d-%m-%Y %H:%M"),
    None
    )

    )

    conn.commit()

    conn.close()

# ==========================================
# CREATE PDF
# ==========================================

def create_pdf(data):

    pdf_path = os.path.join(
        "static",
        "pdf",
        "CivicAI_Report.pdf"
    )

    os.makedirs(
        "static/pdf",
        exist_ok=True
    )

    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=A4
    )

    styles = getSampleStyleSheet()

    title_style = styles["Heading1"]
    title_style.alignment = TA_CENTER
    title_style.textColor = HexColor("#2563EB")

    heading_style = styles["Heading2"]

    normal_style = styles["BodyText"]

    story = []

    story.append(
        Paragraph(
            "CivicAI",
            title_style
        )
    )

    story.append(
        Spacer(
            1,
            15
        )
    )

    story.append(
        Paragraph(
            "AI Powered Civic Issue Report",
            heading_style
        )
    )

    story.append(
        Spacer(
            1,
            25
        )
    )


    story.append(
        Paragraph(
            f"<b>Report Time:</b> {datetime.now().strftime('%d-%m-%Y %I:%M %p')}",
            normal_style
        )
    )

    story.append(
        Spacer(
            1,
            10
        )
    )

    story.append(Spacer(1, 20))

    story.append(
        Paragraph(
            "<b>Report Details</b>",
            heading_style
        )
    )

    story.append(Spacer(1, 10))

    story.append(
        Paragraph(
            f"<b>Issue Type:</b> {data['issue_type']}",
            normal_style
        )
    )

    story.append(
        Paragraph(
            f"<b>Severity:</b> {data['severity']}",
            normal_style
        )
    )

    story.append(
        Paragraph(
            f"<b>Priority:</b> {data['priority']}",
            normal_style
        )
    )

    story.append(
        Paragraph(
            f"<b>Department:</b> {data['department']}",
            normal_style
        )
    )

    story.append(
        Paragraph(
            f"<b>Confidence:</b> {data['confidence']}%",
            normal_style
        )
    )

    story.append(Spacer(1, 20))

    story.append(
        Paragraph(
            "<b>AI Analysis</b>",
            heading_style
        )
    )

    story.append(
        Paragraph(
            data["description"],
            normal_style
        )
    )

    story.append(Spacer(1, 15))

    story.append(
        Paragraph(
            "<b>Suggested Action</b>",
            heading_style
        )
    )

    story.append(
        Paragraph(
            data["suggested_action"],
            normal_style
        )
    )

    story.append(Spacer(1, 20))
    if os.path.exists(data["image_path"]):
        print(data["image_path"])
        img = Image(data["image_path"])
        img.drawWidth = 300
        img.drawHeight = 200

        story.append(
            Paragraph(
                "<b>Uploaded Evidence</b>",
                heading_style
            )
        )

        story.append(img)
    
    story.append(Spacer(1, 20))
    story.append(
        Paragraph(
            "<font color='grey'>Generated by CivicAI • Google Gemini AI • Vibe2Ship Hackathon</font>",
            normal_style
        )
    )

    doc.build(story)

    return pdf_path

    # =====================================================
# BASIC ROUTES
# =====================================================

@app.route("/")
def login():

    return render_template("login.html")


@app.route("/home")
def home():

    return render_template("home.html")


@app.route("/upload")
def upload():

    return render_template("upload.html")


@app.route("/loading")
def loading():

    return render_template("loading.html")


# =====================================================
# DASHBOARD
# =====================================================

@app.route("/dashboard")
def dashboard():

    conn = get_db()

    conn.row_factory = sqlite3.Row

    cursor = conn.cursor()

    # ---------------------------------------
    # Total Reports
    # ---------------------------------------

    cursor.execute(
        "SELECT COUNT(*) FROM reports"
    )

    total_reports = cursor.fetchone()[0]

    # ---------------------------------------
    # Critical Reports
    # ---------------------------------------

    cursor.execute("""

        SELECT COUNT(*)

        FROM reports

        WHERE LOWER(severity)='critical'

    """)

    critical_issues = cursor.fetchone()[0]

    # ---------------------------------------
    # Pending Reports
    # ---------------------------------------

    cursor.execute("""

        SELECT COUNT(*)

        FROM reports

        WHERE LOWER(priority)
        IN ('high','urgent')

    """)

    pending_reports = cursor.fetchone()[0]

    # ---------------------------------------
    # Resolved Reports
    # ---------------------------------------

    resolved_reports = max(
        0,
        total_reports - pending_reports
    )

    # ---------------------------------------
    # Latest Reports
    # ---------------------------------------

    cursor.execute("""

        SELECT *

        FROM reports

        ORDER BY id DESC

        LIMIT 5

    """)

    recent_reports = cursor.fetchall()

    cursor.execute("""

    SELECT issue_type,
           created_at

    FROM reports

    ORDER BY id DESC

    LIMIT 4

    """)

    recent_activity = cursor.fetchall()

# -------------------------------
# CHART DATA
# -------------------------------

    cursor.execute("""
    SELECT severity, COUNT(*) as total
    FROM reports
    GROUP BY severity
    """)

    chart_data = cursor.fetchall()

    severity_counts = {
    "Critical": 0,
    "High": 0,
    "Medium": 0,
    "Low": 0
    }

    for row in chart_data:
        severity_counts[row["severity"]] = row["total"]

    conn.close()

    return render_template(

        "dashboard.html",

        total_reports=total_reports,

        critical_issues=critical_issues,

        pending_reports=pending_reports,

        resolved_reports=resolved_reports,

        recent_reports=recent_reports,
        recent_activity=recent_activity,
        severity_counts=severity_counts

    )

@app.route("/history")
def history():

    conn = get_db()
    conn.row_factory = sqlite3.Row
    search = request.args.get("search", "").strip()
    severity = request.args.get("severity", "").strip()
    status = request.args.get("status", "").strip()
    cursor = conn.cursor()

    query = "SELECT * FROM reports WHERE 1=1"
    params = []

    if search:
        query += """
        AND (
            issue_type LIKE ?
            OR department LIKE ?
            OR location LIKE ?
        )
        """
        keyword = f"%{search}%"
        params.extend([keyword, keyword, keyword])

    if severity:
        query += " AND severity=?"
        params.append(severity)

    if status:
        query += " AND status=?"
        params.append(status)

    query += " ORDER BY id DESC"

    cursor.execute(query, params)

    reports = cursor.fetchall()

    cursor.execute("SELECT COUNT(*) FROM reports")
    total_reports = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM reports WHERE status='Resolved'")
    resolved_reports = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM reports WHERE status='Pending'")
    pending_reports = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM reports WHERE severity='Critical'")
    critical_reports = cursor.fetchone()[0]

    conn.close()

    return render_template(
        "history.html",
        reports=reports,
        total_reports=total_reports,
        resolved_reports=resolved_reports,
        pending_reports=pending_reports,
        critical_reports=critical_reports
    )


# ==========================================
# PROFILE PAGE
# ==========================================

@app.route("/profile")
def profile():
    return render_template("profile.html")


# ==========================================
# SETTINGS PAGE
# ==========================================

@app.route("/settings")
def settings():
    return render_template("settings.html")




# ==========================================
# Analytics PAGE
# ==========================================

@app.route("/analytics")
def analytics():

    conn = get_db()
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    # -----------------------
    # Dashboard Counts
    # -----------------------

    cursor.execute("SELECT COUNT(*) FROM reports")
    total_reports = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM reports WHERE status='Resolved'")
    resolved_reports = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM reports WHERE status='Pending'")
    pending_reports = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM reports WHERE severity='Critical'")
    critical_reports = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM reports WHERE severity='High'")
    high_reports = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM reports WHERE severity='Medium'")
    medium_reports = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM reports WHERE severity='Low'")
    low_reports = cursor.fetchone()[0]

    # -----------------------
    # Department Chart
    # -----------------------

    cursor.execute("""
        SELECT department, COUNT(*) as total
        FROM reports
        GROUP BY department
    """)

    department_data = cursor.fetchall()
    department_labels = []
    department_counts = []

    for row in department_data:
        department_labels.append(row["department"])
        department_counts.append(row["total"])

    # -----------------------
    # Monthly Trend
    # -----------------------

    cursor.execute("""
        SELECT substr(created_at,4,7) as month,
               COUNT(*) as total
        FROM reports
        GROUP BY month
        ORDER BY month
    """)

    monthly_data = cursor.fetchall()
    monthly_labels = []
    monthly_counts = []

    for row in monthly_data:
        monthly_labels.append(row["month"])
        monthly_counts.append(row["total"])

    conn.close()

    return render_template(

        "analytics.html",

        total_reports=total_reports,
        critical_reports=critical_reports,
        pending_reports=pending_reports,
        resolved_reports=resolved_reports,

        high_reports=high_reports,
        medium_reports=medium_reports,
        low_reports=low_reports,

        department_labels=department_labels,
        department_counts=department_counts,

        monthly_labels=monthly_labels,
        monthly_counts=monthly_counts
    )


@app.route("/report/<int:report_id>")
def report(report_id):

    conn = get_db()
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    cursor.execute(
        "SELECT * FROM reports WHERE id=?",
        (report_id,)
    )

    report = cursor.fetchone()

    conn.close()

    if not report:

        flash(
            "Report not found.",
            "warning"
        )

        return redirect(url_for("history"))

    return render_template(
        "report.html",

        report=report,

        report_id=report["id"],

        report_date=report["created_at"],

        citizen_name="Citizen",

        citizen_email="Not Provided",

        location="Unknown",

        department=report["department"],

        issue_type=report["issue_type"],

        severity=report["severity"],

        priority=report["priority"],

        status=report["status"],

        image_path=url_for(
            "static",
            filename = "uploads/" + report["image_name"]
        ),

        result=report["description"],

        recommendation=report["suggested_action"],

        estimated_resolution="24-48 Hours"
    )

@app.route("/download_pdf")
def download_pdf():

    result_data = session.get("last_result")

    if not result_data:
        flash("No report found.", "error")
        return redirect(url_for("upload"))

    data = {
    "image_name": result_data["image_name"],
    "issue_type": result_data["issue_type"],
    "severity": result_data["severity"],
    "priority": result_data["priority"],
    "department": result_data["department"],
    "confidence": result_data["confidence"],
    "description": result_data["description"],
    "suggested_action": result_data["suggested_action"],
    "image_path": os.path.join(
        app.config["UPLOAD_FOLDER"],
        result_data["image_name"]
    )
}

    pdf_path = create_pdf(data)

    return send_file(
        pdf_path,
        as_attachment=True
    )


@app.route("/logout")
def logout():

    session.clear()

    flash(

        "Logged out successfully.",

        "success"

    )

    return redirect(
        url_for("login")
    )



# =====================================================
# IMAGE UPLOAD + AI ANALYSIS
# =====================================================

@app.route("/analyze", methods=["POST"])
def analyze():

    if "image" not in request.files:

        print("ERROR 1 : image not found")

        flash("Please upload an image.", "error")

        return redirect(url_for("upload"))

    file = request.files["image"]

    if file.filename == "":

        print("ERROR 2 : filename empty")

        flash("No image selected.", "error")

        return redirect(url_for("upload"))

    if not allowed_file(file.filename):

        print("ERROR 3 : invalid file")

        flash("Unsupported file type.", "error")

        return redirect(url_for("upload"))

    filename = secure_filename(file.filename)

    image_path = os.path.join(

        app.config["UPLOAD_FOLDER"],

        filename

    )

    file.save(image_path)

    try:
        ai_result = analyze_image(image_path)
        print("\n===== GEMINI RESPONSE =====")
        print(ai_result)
        print("===========================\n")

    except Exception as e:
        print("\n===== GEMINI ERROR =====")
        print(repr(e))
        print("========================\n")
        flash(f"Gemini Error: {e}", "error")
        return redirect(url_for("upload"))

    # -------------------------------------
    # DEFAULT VALUES
    # -------------------------------------

    issue_type = "Unknown"

    severity = "Medium"

    priority = "Medium"

    department = "Municipal Corporation"

    confidence = 90

    description = ""

    suggested_action = ""

    # -------------------------------------
    # PARSE GEMINI RESPONSE
    # -------------------------------------

    for line in ai_result.splitlines():

        line = line.strip()

        if line.startswith("Issue Type:"):

            issue_type = line.replace(

                "Issue Type:", ""

            ).strip()

        elif line.startswith("Severity:"):

            severity = line.replace(

                "Severity:", ""

            ).strip()

        elif line.startswith("Priority:"):

            priority = line.replace(

                "Priority:", ""

            ).strip()

        elif line.startswith("Department:"):

            department = line.replace(

                "Department:", ""

            ).strip()

        elif line.startswith("Confidence:"):

            value = line.replace(

                "Confidence:", ""

            ).replace("%", "").strip()

            try:

                confidence = int(value)

            except:

                confidence = 90

        elif line.startswith("Description:"):

            description = line.replace(

                "Description:", ""

            ).strip()

        elif line.startswith("Suggested Action:"):

            suggested_action = line.replace(

                "Suggested Action:", ""

            ).strip()

    # -------------------------------------
    # SAVE DATABASE
    # -------------------------------------

    save_report(

        filename,

        issue_type,

        severity,

        priority,

        department,

        description,

        suggested_action,

        confidence

    )

    # -------------------------------------
    # SESSION
    # -------------------------------------

    session["last_result"] = {

        "image_name": filename,

        "issue_type": issue_type,

        "severity": severity,

        "priority": priority,

        "department": department,

        "confidence": confidence,

        "description": description,

        "suggested_action": suggested_action,

        "raw_result": ai_result

    }

    return redirect(

        url_for("result")

    )


# =====================================================
# RESULT PAGE
# =====================================================

@app.route("/result")
def result():

    result_data = session.get("last_result")

    if not result_data:

        flash(
            "No analysis found.",
            "warning"
        )

        return redirect(url_for("upload"))

    return render_template(

        "result.html",

        result=result_data["raw_result"],

        image_path=url_for(
            "static",
            filename="uploads/" + result_data["image_name"]
        ),

        issue_type=result_data["issue_type"],

        severity=result_data["severity"],

        priority=result_data["priority"],

        department=result_data["department"],

        recommendation=result_data["suggested_action"],

        location="Unknown",

        report_time=datetime.now().strftime("%d-%m-%Y %I:%M %p"),

        confidence=result_data["confidence"]

    )

# ==========================================
# DELETE REPORT
# ==========================================

@app.route("/delete/<int:report_id>")
def delete_report(report_id):

    conn = get_db()

    cursor = conn.cursor()

    cursor.execute(

        "DELETE FROM reports WHERE id=?",

        (report_id,)

    )

    conn.commit()

    conn.close()

    flash(

        "Report deleted successfully.",

        "success"

    )

    return redirect(

        url_for("history")

    )


# =====================================================
# RUN APPLICATION
# =====================================================

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=int(os.environ.get("PORT", 5000)),
        debug=False
    )