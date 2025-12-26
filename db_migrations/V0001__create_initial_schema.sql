-- Таблица слотов времени
CREATE TABLE IF NOT EXISTS time_slots (
    id SERIAL PRIMARY KEY,
    slot_date DATE NOT NULL,
    slot_time TIME NOT NULL,
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(slot_date, slot_time)
);

-- Таблица заявок на запись
CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    slot_id INTEGER REFERENCES time_slots(id),
    client_name VARCHAR(255) NOT NULL,
    client_contact VARCHAR(255) NOT NULL,
    booking_type VARCHAR(50) NOT NULL CHECK (booking_type IN ('know_what_i_want', 'not_sure', 'no_design')),
    comment TEXT,
    payment_status VARCHAR(50) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'cancelled')),
    receipt_url TEXT,
    telegram_sent BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица фотографий к заявкам
CREATE TABLE IF NOT EXISTS booking_photos (
    id SERIAL PRIMARY KEY,
    booking_id INTEGER REFERENCES bookings(id),
    photo_url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица администраторов
CREATE TABLE IF NOT EXISTS admins (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Индексы для оптимизации
CREATE INDEX idx_slots_date ON time_slots(slot_date);
CREATE INDEX idx_bookings_slot ON bookings(slot_id);
CREATE INDEX idx_bookings_status ON bookings(payment_status);
CREATE INDEX idx_photos_booking ON booking_photos(booking_id);
