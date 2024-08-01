import json
import psycopg2
from psycopg2 import Error

def lambda_handler(event, context):
    # Assuming event contains POST data with JSON payload
    payload = json.loads(event['body'])
    print(payload)
    try:
        connection = psycopg2.connect(
            user="postgres",
            password="root",
            host="host.docker.internal",
            port = "5432",
            database="Employee"
        )
        cursor = connection.cursor()
        
        # Example: Insert data into PostgreSQL table
        cursor.execute("""
            INSERT INTO "samtest" (id, name,dob,gender,nrc,email,address,skills,department)
            VALUES (%s, %s,%s,%s, %s,%s,%s, %s,%s)
        """, (payload['id'], payload['name'],payload['dob'],payload['gender'], payload['nrc'],payload['email'],payload['address'], payload['skills'],payload['department']))
        
        
        for edu in payload.get('Education', []):
            cursor.execute("""
                INSERT INTO education(type, description, year,id)
                VALUES (%s, %s, %s,%s)
            """, (edu['type'], edu['description'], edu['year'],payload['id']))
        connection.commit()


        
        cursor.execute("SELECT * FROM \"samtest\" order by id;")
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
                'dob':str(employee[2]),
                'gender':employee[3],
                'nrc':employee[4],
                'email':employee[5],
                'address':employee[6],
                'skills':employee[7],
                'department':employee[8],
                'Education': [{'type': edu[0], 'description': edu[1], 'year': edu[2]} for edu in educations]
            })
        
        # Process records as needed
        response = {
            "statusCode": 201,
            "body": json.dumps(employee_list)
        }
        return response
        
    except Error as e:
        return {
            'statusCode': 500,
            'body': json.dumps(str(e))
        }
        
    finally:
        if connection:
            cursor.close()
            connection.close()
