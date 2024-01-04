import psycopg2
import csv

HOSTNAME = 'localhost'
USERNAME = 'postgres'
PASSWORD = 'postgres'
DATABASE = 'jobs'

connection = psycopg2.connect(host=HOSTNAME, user=USERNAME, password=PASSWORD, dbname=DATABASE )
cursor = connection.cursor()

def db_saver(filename) :

# Columns in the csv file: company_name, job_name, location, URL, job_description
    with open(filename, 'r') as file:
        reader = csv.reader(file)
# Skips the header row
        next(reader)  
        for row in reader:
            company_name, job_name, location, URL, job_description = row
            cursor.execute("INSERT INTO job_table (job_title, job_description) VALUES (%s, %s)", (company_name, job_name, location, URL, job_description))
            connection.commit()


# Close the cursor and connection
cursor.close()
connection.close()


