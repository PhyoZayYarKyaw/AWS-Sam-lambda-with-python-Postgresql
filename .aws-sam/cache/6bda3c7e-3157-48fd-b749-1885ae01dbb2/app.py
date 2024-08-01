import json
import psycopg2
from psycopg2 import Error

def lambda_handler(event, context):
    # Assuming event contains POST data with JSON payload
    payload = json.loads(event['body'])
    print("data are ",payload)
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
                UPDATE samtest SET name=%s, dob=%s,gender=%s,nrc=%s,email=%s,address=%s,skills=%s,department=%s
	            WHERE id=%s;""",
                ( payload['name'],payload['dob'],payload['gender'], payload['nrc'],payload['email'],payload['address'], payload['skills'],payload['department'],payload['id']))
        
        id = payload['id']
        cursor.execute("""delete from education where id = %s""",( id,))
        
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
            "statusCode": 200,
            "body": json.dumps(employee_list)
        }

    except Error as e:
        response = {
            "statusCode": 500,
            "body": str(e)
        }
    finally:
        # Close database connection
        if connection:
            cursor.close()
            connection.close()

    return response
