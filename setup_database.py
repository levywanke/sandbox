import mysql.connector

# Connect to MySQL
connection = mysql.connector.connect(
    host="localhost",
    user="your_username",
    password="your_password"
)

# Create a cursor object
cursor = connection.cursor()

# Create a new database
cursor.execute("CREATE DATABASE IF NOT EXISTS schooldb")

# Select the database
cursor.execute("USE schooldb")

# Create students table
cursor.execute("""
CREATE TABLE IF NOT EXISTS students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    date_of_birth DATE NOT NULL,
    grade_id INT,
    FOREIGN KEY (grade_id) REFERENCES grade(grade_id)
)
""")

# Create parents table
cursor.execute("""
CREATE TABLE IF NOT EXISTS parents (
    parent_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    phone VARCHAR(15),
    email VARCHAR(255)
)
""")

# Create grade table
cursor.execute("""
CREATE TABLE IF NOT EXISTS grade (
    grade_id INT AUTO_INCREMENT PRIMARY KEY,
    grade_name VARCHAR(50) NOT NULL
)
""")

# Create marks table
cursor.execute("""
CREATE TABLE IF NOT EXISTS marks (
    mark_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    subject_id INT,
    mark INT NOT NULL,
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (subject_id) REFERENCES subject(subject_id)
)
""")

# Create subject table
cursor.execute("""
CREATE TABLE IF NOT EXISTS subject (
    subject_id INT AUTO_INCREMENT PRIMARY KEY,
    subject_name VARCHAR(100) NOT NULL
)
""")

# Create events table
cursor.execute("""
CREATE TABLE IF NOT EXISTS events (
    event_id INT AUTO_INCREMENT PRIMARY KEY,
    event_name VARCHAR(255) NOT NULL,
    event_date DATE NOT NULL
)
""")

# Create fees table
cursor.execute("""
CREATE TABLE IF NOT EXISTS fees (
    class_id INT,
    fee_amount DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (class_id) REFERENCES grade(grade_id)
)
""")

# Create payments table
cursor.execute("""
CREATE TABLE IF NOT EXISTS payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    amount_paid DECIMAL(10, 2) NOT NULL,
    payment_date DATE NOT NULL,
    FOREIGN KEY (student_id) REFERENCES students(student_id)
)
""")

# Commit the changes
connection.commit()

# Close the cursor and connection
cursor.close()
connection.close()

print("Database and tables created successfully.")
