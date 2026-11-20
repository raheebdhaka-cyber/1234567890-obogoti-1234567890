-- ==============================================================================
-- BANGLADESH CITIZEN DIGITAL REPORTING SYSTEM - UPDATED SUPABASE SCHEMA
-- Project URL: https://crrjssnehjxjsloutxzq.supabase.co
-- ONLY SUPABASE AUTHENTICATED USERS (via Supabase Auth) GET ADMIN ACCESS
-- ==============================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. CITIZENS / USERS TABLE
create table if not exists public.citizens (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  -- Personal Profile
  full_name text not null,
  phone text not null,
  photo_url text,
  
  -- Address Breakdown
  division text not null,
  district text not null,
  upazila text not null,
  area_type text not null,
  ward_union text not null,
  house_road text,
  
  -- Primary ID Number (Chosen from Birth Certificate / NID / Passport)
  primary_id_type text not null,
  primary_id_number text not null unique,
  
  -- Identity Documents
  birth_certificate_no text,
  nid_no text,
  passport_no text,
  
  -- Contact & Secondary Info
  email text,
  
  -- Parents' Information
  father_name text,
  father_birth_certificate_no text,
  father_nid_no text,
  father_passport_no text,
  
  mother_name text,
  mother_birth_certificate_no text,
  mother_nid_no text,
  mother_passport_no text,
  
  -- System Account Role & Status
  account_type text default 'Civil Citizen' not null,
  assigned_role text default 'Civil Citizen' not null,
  role_sector text default 'General',
  
  is_approved boolean default false not null,
  status text default 'pending' not null,
  
  -- Profile Edit Approval Workflow
  pending_edits jsonb default null,
  has_pending_edit boolean default false not null
);

-- Indexing for fast search
create index if not exists idx_citizens_phone on public.citizens(phone);
create index if not exists idx_citizens_primary_id on public.citizens(primary_id_number);
create index if not exists idx_citizens_role on public.citizens(assigned_role);
create index if not exists idx_citizens_status on public.citizens(status);

-- 2. REPORTS / COMPLAINTS TABLE
create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  citizen_id uuid references public.citizens(id) on delete set null,
  tracking_id text not null unique,
  
  report_type text not null,
  category text not null,
  description text not null,
  
  assigned_sector text not null,
  assigned_role text not null,
  
  status text default 'Submitted' not null,
  is_checked boolean default false not null,
  checked_at timestamp with time zone,
  checked_by text,
  action_remarks text,
  
  citizen_snapshot jsonb
);

create index if not exists idx_reports_citizen_id on public.reports(citizen_id);
create index if not exists idx_reports_assigned_role on public.reports(assigned_role);
create index if not exists idx_reports_tracking_id on public.reports(tracking_id);

-- ==============================================================================
-- 3. GRANT TABLE PERMISSIONS
-- ==============================================================================
grant usage on schema public to postgres, anon, authenticated, service_role;

grant all on table public.citizens to postgres, anon, authenticated, service_role;
grant all on table public.reports to postgres, anon, authenticated, service_role;

grant all on all sequences in schema public to postgres, anon, authenticated, service_role;

-- ==============================================================================
-- 4. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
alter table public.citizens enable row level security;
alter table public.reports enable row level security;

-- Citizens Policies
drop policy if exists "Enable all operations for citizens" on public.citizens;
drop policy if exists "Allow public select citizens" on public.citizens;
drop policy if exists "Allow public insert citizens" on public.citizens;
drop policy if exists "Allow public update citizens" on public.citizens;
drop policy if exists "Allow public delete citizens" on public.citizens;

create policy "Enable all operations for citizens" on public.citizens
  for all
  to anon, authenticated, service_role
  using (true)
  with check (true);

-- Reports Policies
drop policy if exists "Enable all operations for reports" on public.reports;
drop policy if exists "Allow public select reports" on public.reports;
drop policy if exists "Allow public insert reports" on public.reports;
drop policy if exists "Allow public update reports" on public.reports;
drop policy if exists "Allow public delete reports" on public.reports;

-- ==============================================================================
-- 5. AUTOMATED ESCALATION DATABASE FUNCTIONS & TRIGGERS (OPTIONAL IN-DB ENGINE)
-- ==============================================================================

-- Function to return role hierarchy chain as an array for each category/sector
create or replace function public.get_role_chain(p_report_type text, p_category text, p_assigned_sector text)
returns text[] language plpgsql immutable as $$
declare
  v_type text := lower(coalesce(p_report_type, ''));
  v_cat text := coalesce(p_category, '');
  v_sec text := coalesce(p_assigned_sector, '');
begin
  if v_type = 'crime' or v_sec like '%Crime%' then
    return array[
      'OC (Station)',
      'Assistant Commissioner (AC) / ASP Circle DC (DMP Zone) / Additional Superintendent of Police',
      'Additional Police Commissioner / Superintendent of Police (SP)',
      'Police Commissioner (Metro) / DIG (Range)',
      'Inspector General of Police (IGP)',
      'Secretary, Public Safety Division, Ministry of Home Affairs',
      'Minister/Advisor, Ministry of Home Affairs'
    ];
  elsif v_cat like '%Electricity%' or v_sec like '%Electricity%' then
    return array[
      'Local Sub-station / NOCS Staff',
      'Line Team / Emergency Line Team',
      'Billing Team / Customer Centre Staff',
      'Meter Section Staff',
      'Prepaid / NOCS Cell Staff',
      'XEN (Executive Engineer) / Sub-station XEN',
      'Circle (SE - Superintending Engineer) Engineer',
      'Chief Engineer',
      'Grievance Redress Officer (GRO)',
      'Appellate Officer',
      'Power Division / BERC (Bangladesh Energy Regulatory Commission)'
    ];
  elsif v_cat like '%Gas%' or v_sec like '%Gas%' then
    return array[
      'Assistant Manager (Field/area office level handling complaints, repairs, and meters)',
      'Deputy Manager / Manager (Head of the area or zonal office)',
      'Deputy General Manager (DGM)',
      'General Manager (GM) (Division head at company head office)',
      'Deputy Managing Director (DMD) (Head of a region)',
      'Managing Director (MD) (Head of the gas company)',
      'Chairman, Petrobangla (Parent corporation)',
      'Secretary, Energy and Mineral Resources Division',
      'State Minister, Power, Energy and Mineral Resources',
      'Minister, Power, Energy and Mineral Resources'
    ];
  elsif v_cat like '%Water%' or v_sec like '%Water%' then
    return array[
      'Assistant Engineer (Sohokari Prokowshali) (Field-level engineer in a zone/sub-division)',
      'Executive Engineer (Nirbahi Prokowshali) (Heads a MODS zone or division)',
      'Superintending Engineer (Tottwabodhayok Prokowshali)',
      'Chief Engineer (Prodhan Prokowshali) and Additional Chief Engineers',
      'Managing Director (MD), WASA',
      'Chairman, WASA Board',
      'Secretary, Local Government Division',
      'State Minister, LGRD',
      'Minister, LGRD (Local Government, Rural Development and Co-operatives)'
    ];
  elsif v_cat like '%Citizen Rights%' or v_sec like '%Citizen Rights%' then
    return array[
      'Ward Councilor',
      'Zonal Councilor (City Corporation Zone) / UNO',
      'Pradhan Powder (City Corporation) / Municipal Councilor Officer',
      'Administration / Administrator',
      'Area, Local Government Department',
      'Minister/Advisor, Local Government, Rural Development and Cooperatives',
      'National Consumer Complaint Centre (NCCC) - Intake Desk',
      'Director General (DG) or Empowered Officer',
      'Divisional Deputy Director or District Assistant Director',
      'Investigating & Hearing Officer',
      'District Magistrate (Alternative Jurisdiction)'
    ];
  end if;
  return array[]::text[];
end;
$$;

-- Function to return tier capacity limit
create or replace function public.get_tier_capacity(p_report_type text, p_category text, p_tier_index integer)
returns integer language plpgsql immutable as $$
declare
  v_base integer := 10;
begin
  if lower(coalesce(p_report_type, '')) = 'crime' then
    case p_category
      when 'Murder' then v_base := 1;
      when 'Manslaughter (not murder)' then v_base := 1;
      when 'Causing death by negligence' then v_base := 1;
      when 'Rash or negligent driving' then v_base := 30;
      when 'Hurt/grievous hurt' then v_base := 15;
      when 'Acid attack (grievous)' then v_base := 3;
      when 'Kidnapping' then v_base := 3;
      when 'Wrongful confinement' then v_base := 15;
      when 'Theft' then v_base := 35;
      when 'Robbery / dacoity' then v_base := 15;
      when 'Extortion' then v_base := 50;
      when 'Cheating' then v_base := 50;
      when 'Criminal breach of trust' then v_base := 35;
      when 'Forgery' then v_base := 35;
      when 'Mischief / vandalize (damage)' then v_base := 3;
      when 'Trespass' then v_base := 50;
      when 'Defamation' then v_base := 10;
      when 'Criminal threat' then v_base := 10;
      when 'Insulting a woman''s modesty' then v_base := 10;
      when 'Bribery by a public servant' then v_base := 20;
      when 'Fire or explosive negligence' then v_base := 2;
      when 'Sexual Assult / Rape / Molestation' then v_base := 1;
      else v_base := 10;
    end case;
    -- Doubles at each subsequent tier: v_base * 2^(p_tier_index)
    return (v_base * (2 ^ p_tier_index))::integer;
  end if;

  -- Local reports limit is 10
  return 10;
end;
$$;

-- Trigger function executed on each new report insertion to assign appropriate Special User tier
create or replace function public.trg_route_report_tier()
returns trigger language plpgsql as $$
declare
  v_chain text[];
  v_tier integer;
  v_role text;
  v_capacity integer;
  v_active_count integer;
begin
  v_chain := public.get_role_chain(new.report_type, new.category, new.assigned_sector);
  if array_length(v_chain, 1) is null or array_length(v_chain, 1) = 0 then
    return new;
  end if;

  -- Find first tier with available capacity
  for v_tier in 0 .. (array_length(v_chain, 1) - 1) loop
    v_role := v_chain[v_tier + 1];
    v_capacity := public.get_tier_capacity(new.report_type, new.category, v_tier);

    select count(*) into v_active_count
    from public.reports
    where assigned_role = v_role
      and category = new.category
      and status != 'Solved';

    if v_active_count < v_capacity or v_tier = (array_length(v_chain, 1) - 1) then
      new.assigned_role := v_role;
      exit;
    end if;
  end loop;

  return new;
end;
$$;

drop trigger if exists trg_before_insert_route_report on public.reports;
create trigger trg_before_insert_route_report
before insert on public.reports
for each row execute function public.trg_route_report_tier();

-- Stored procedure to execute auto-escalation check across all pending reports
create or replace function public.perform_auto_escalation()
returns table(escalated_count integer) language plpgsql as $$
declare
  r record;
  v_chain text[];
  v_idx integer;
  v_next_role text;
  v_checked_count integer;
  v_tier_cap integer;
  v_total_escalated integer := 0;
begin
  for r in (
    select category, assigned_role, report_type, assigned_sector, count(*) as pending_count
    from public.reports
    where status != 'Solved'
    group by category, assigned_role, report_type, assigned_sector
  ) loop
    v_chain := public.get_role_chain(r.report_type, r.category, r.assigned_sector);
    
    -- Find current role index (1-based in postgres array)
    v_idx := 0;
    if v_chain is not null then
      for i in 1 .. array_length(v_chain, 1) loop
        if v_chain[i] = r.assigned_role then
          v_idx := i;
          exit;
        end if;
      end loop;
    end if;

    -- If not last tier, check if escalation needed
    if v_idx > 0 and v_idx < array_length(v_chain, 1) then
      v_next_role := v_chain[v_idx + 1];
      v_tier_cap := public.get_tier_capacity(r.report_type, r.category, v_idx - 1);

      select count(*) into v_checked_count
      from public.reports
      where assigned_role = r.assigned_role
        and category = r.category
        and is_checked = true;

      -- If role does not mark minimum 6 reports as "Checked"
      if coalesce(v_checked_count, 0) < 6 and r.pending_count > 0 then
        update public.reports
        set assigned_role = v_next_role,
            updated_at = timezone('utc'::text, now()),
            action_remarks = '[Auto-Escalated] Escalated from ' || r.assigned_role || ' to ' || v_next_role
        where assigned_role = r.assigned_role
          and category = r.category
          and status != 'Solved';

        v_total_escalated := v_total_escalated + r.pending_count;
      end if;
    end if;
  end loop;

  return query select v_total_escalated;
end;
$$;
