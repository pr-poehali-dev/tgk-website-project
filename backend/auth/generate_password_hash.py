#!/usr/bin/env python3
"""
Скрипт для генерации bcrypt хеша пароля админ-панели.
Запустите: python3 generate_password_hash.py
"""
import bcrypt

# Пароль для админ-панели
password = "fevwqt_nails"

# Генерация хеша с cost factor 12
hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt(rounds=12))

print("=" * 60)
print("Bcrypt хеш для пароля 'fevwqt_nails':")
print("=" * 60)
print(hashed.decode('utf-8'))
print("=" * 60)
print("\nСкопируйте хеш выше и добавьте его в секрет ADMIN_PASSWORD_HASH")
print("в настройках проекта (Настройки → Секреты)")
