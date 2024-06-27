import tkinter as tk
from tkinter import messagebox
import mysql.connector
from mysql.connector import Error

# Function to get a database connection
def get_db_connection():
    try:
        connection = mysql.connector.connect(
            host="localhost",
            user="your_username",
            password="your_password",
            database="schooldb"
        )
        return connection
    except Error as e:
        messagebox.showerror("Connection Error", f"Error connecting to the database: {e}")
        return None

# Function to insert data into the students table
def insert_student():
    first_name = entry_first_name.get()
    last_name = entry_last_name.get()
    date_of_birth = entry_dob.get()
    grade_id = entry_grade_id.get()
    
    if first_name and last_name and date_of_birth and grade_id:
        connection = get_db_connection()
        if connection:
            try:
                cursor = connection.cursor()
                cursor.execute(
                    "INSERT INTO students (first_name, last_name, date_of_birth, grade_id) VALUES (%s, %s, %s, %s)", 
                    (first_name, last_name, date_of_birth, grade_id)
                )
                connection.commit()
                cursor.close()
                connection.close()
                
                messagebox.showinfo("Success", "Student data inserted successfully")
                entry_first_name.delete(0, tk.END)
                entry_last_name.delete(0, tk.END)
                entry_dob.delete(0, tk.END)
                entry_grade_id.delete(0, tk.END)
            except Error as e:
                messagebox.showerror("Insert Error", f"Error inserting data: {e}")
        else:
            messagebox.showerror("Connection Error", "Unable to connect to the database")
    else:
        messagebox.showwarning("Input Error", "Please fill in all fields")

# Create the main window
root = tk.Tk()
root.title("School Database Interface")

# Create and place labels, entries, and buttons
tk.Label(root, text="First Name").grid(row=0, column=0)
entry_first_name = tk.Entry(root)
entry_first_name.grid(row=0, column=1)

tk.Label(root, text="Last Name").grid(row=1, column=0)
entry_last_name = tk.Entry(root)
entry_last_name.grid(row=1, column=1)

tk.Label(root, text="Date of Birth (YYYY-MM-DD)").grid(row=2, column=0)
entry_dob = tk.Entry(root)
entry_dob.grid(row=2, column=1)

tk.Label(root, text="Grade ID").grid(row=3, column=0)
entry_grade_id = tk.Entry(root)
entry_grade_id.grid(row=3, column=1)

btn_insert = tk.Button(root, text="Insert Student", command=insert_student)
btn_insert.grid(row=4, column=0, columnspan=2)

# Run the application
root.mainloop()
