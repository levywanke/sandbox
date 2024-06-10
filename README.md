School Database Project

This project involves creating a MySQL database for a school with several tables, including `students`, `parents`, `grade`, `marks`, `subject`, and `events`. A Python script is used to set up the database and tables, and a Tkinter-based GUI provides a simple interface for interacting with the database.

## Table of Contents
- [Project Overview](#project-overview)
- [Database Schema](#database-schema)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [License](#license)

## Project Overview
The goal of this project is to create a structured database for managing school-related information and provide a basic graphical user interface (GUI) to interact with the data. The database schema includes tables for storing student details, parent information, grades, marks, subjects, and events.

## Database Schema
- **students**
  - `student_id` (Primary Key)
  - `first_name`
  - `last_name`
  - `date_of_birth`
  - `grade_id` (Foreign Key to `grade`)

- **parents**
  - `parent_id` (Primary Key)
  - `first_name`
  - `last_name`
  - `phone`
  - `email`

- **grade**
  - `grade_id` (Primary Key)
  - `grade_name`

- **marks**
  - `mark_id` (Primary Key)
  - `student_id` (Foreign Key to `students`)
  - `subject_id` (Foreign Key to `subject`)
  - `mark`

- **subject**
  - `subject_id` (Primary Key)
  - `subject_name`

- **events**
  - `event_id` (Primary Key)
  - `event_name`
  - `event_date`

## Setup Instructions

### Prerequisites
- MySQL Server
- Python 3
- `mysql-connector-python` library
- `tkinter` library (usually included with Python)

### Installation

1. **Install MySQL Server:**
   Download and install MySQL Server from [here](https://dev.mysql.com/downloads/installer/).

2. **Install MySQL Connector for Python:**
   ```bash
   pip install mysql-connector-python

