import os
import psycopg2
from datetime import datetime

def verify_admin_token(token: str) -> bool:
    """Проверяет валидность токена администратора"""
    if not token:
        return False
    
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    
    try:
        cur.execute("""
            SELECT expires_at FROM admin_sessions 
            WHERE token = %s
        """, (token,))
        
        result = cur.fetchone()
        
        if not result:
            return False
        
        expires_at = result[0]
        
        if datetime.now() > expires_at:
            cur.execute("DELETE FROM admin_sessions WHERE token = %s", (token,))
            conn.commit()
            return False
        
        return True
    except Exception:
        return False
    finally:
        cur.close()
        conn.close()
