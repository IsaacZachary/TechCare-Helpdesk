-- Create schema
create schema if not exists techcare;

-- Users table
create table if not exists techcare.users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text unique not null,
  password text not null,
  role text default 'user' check (role in ('user', 'admin', 'superadmin')),
  created_at timestamptz default now()
);

-- Tickets table
create table if not exists techcare.tickets (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  priority text check (priority in ('low', 'medium', 'high')) default 'low',
  status text check (status in ('open', 'in_progress', 'resolved', 'closed')) default 'open',
  created_by uuid references techcare.users(id) on delete cascade,
  assigned_to uuid references techcare.users(id) on delete set null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Comments table
create table if not exists techcare.comments (
  id uuid primary key default gen_random_uuid(),
  ticket_id uuid references techcare.tickets(id) on delete cascade,
  user_id uuid references techcare.users(id) on delete cascade,
  comment text not null,
  created_at timestamptz default now()
);
