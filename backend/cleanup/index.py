import json
import os
import psycopg2
import boto3
from datetime import datetime, timedelta

SECURITY_HEADERS = {
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Content-Security-Policy': "default-src 'none'; script-src 'self'; connect-src 'self'; img-src 'self'; style-src 'self'"
}

def handler(event: dict, context) -> dict:
    """Автоматическая очистка старых записей (старше 1 дня)"""
    frontend_domain = os.environ.get('FRONTEND_DOMAIN', '*')
    method = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': frontend_domain,
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Credentials': 'true',
                **SECURITY_HEADERS
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': frontend_domain,
                'Access-Control-Allow-Credentials': 'true',
                **SECURITY_HEADERS
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    try:
        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        cur = conn.cursor()
        
        cutoff_date = datetime.now() - timedelta(days=1)
        
        cur.execute("""
            SELECT b.id, ts.id as slot_id
            FROM bookings b
            JOIN time_slots ts ON b.slot_id = ts.id
            WHERE ts.slot_date < %s
        """, (cutoff_date.date(),))
        
        old_bookings = cur.fetchall()
        deleted_count = 0
        
        s3 = boto3.client('s3',
            endpoint_url='https://bucket.poehali.dev',
            aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
            aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY']
        )
        
        for booking_id, slot_id in old_bookings:
            try:
                s3.delete_object(Bucket='files', Key=f'bookings/{booking_id}/')
                s3.delete_object(Bucket='files', Key=f'receipts/{booking_id}/')
            except Exception:
                pass
            
            cur.execute("DELETE FROM booking_photos WHERE booking_id = %s", (booking_id,))
            cur.execute("DELETE FROM bookings WHERE id = %s", (booking_id,))
            cur.execute("DELETE FROM time_slots WHERE id = %s", (slot_id,))
            
            deleted_count += 1
        
        conn.commit()
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': frontend_domain,
                'Access-Control-Allow-Credentials': 'true',
                **SECURITY_HEADERS
            },
            'body': json.dumps({
                'message': f'Удалено {deleted_count} старых записей',
                'deleted': deleted_count
            }),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': frontend_domain,
                'Access-Control-Allow-Credentials': 'true',
                **SECURITY_HEADERS
            },
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
