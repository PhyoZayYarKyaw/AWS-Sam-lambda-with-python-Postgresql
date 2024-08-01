import json
import psycopg2
from psycopg2 import Error

def lambda_handler(event, context):
    try:
        # Connect to PostgreSQL database
        connection = psycopg2.connect(
            user="postgres",
            password="root",
            host="host.docker.internal",
            port="5432",
            database="Employee"
        )

        cursor = connection.cursor()
        parameter = event['pathParameters']
        id = event['pathParameters']['id']  # Extract ID from pathParameters
        print("parameter is ",parameter)
        print(id)

        # Example: Read operation
        cursor.execute("""SELECT * FROM "samtest" where id = %s;""", (id,))
        employees = cursor.fetchall()

        employee_list = []

        for employee in employees:
            emp_id = str(employee[0])
            # Fetch education for the employee
            cursor.execute("""
                SELECT education.type,education.description,education.year
                FROM education WHERE id=%s
            """, (emp_id,))
            
            educations = cursor.fetchall()
            
            employee_list.append({
                'id': employee[0],
                'name': employee[1],
                'dob': str(employee[2]),
                'gender': employee[3],
                'nrc': employee[4],
                'email': employee[5],
                'address': employee[6],
                'skills': employee[7],
                'department': employee[8],
                'Education': [{'type': edu[0], 'description': edu[1], 'year': edu[2]} for edu in educations]
            })

        link = 'https://localhost:3000/employees/edit/' + id
        print(link)

        response = {
            'statusCode': 200,
            'body': json.dumps(employee_list),
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',  # Allow any origin
                'Access-Control-Allow-Methods': 'GET',  # Allow only GET method
                'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,Access-Control-Allow-Origin,Access-Control-Allow-Methods'
            }
        }

    except Error as e:
        response = {
            "statusCode": 500,
            "body": str(e),
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',  # Allow any origin
                'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,Access-Control-Allow-Origin,Access-Control-Allow-Methods'
            }
        }
    finally:
        # Close database connection
        if connection:
            cursor.close()
            connection.close()

    return response
