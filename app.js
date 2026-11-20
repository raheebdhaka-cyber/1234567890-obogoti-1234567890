/**
 * Central Client Application Script for Bangladesh Citizen Reporting System
 * Direct Supabase backend integration
 */

// DISABLE CONTEXT MENU (RIGHT-CLICK) AND DEVTOOLS / VIEW-SOURCE SHORTCUTS
document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  return false;
});

document.addEventListener('keydown', (e) => {
  // Disable F12 (DevTools)
  if (e.key === 'F12' || e.keyCode === 123) {
    e.preventDefault();
    return false;
  }

  const isCtrlOrCmd = e.ctrlKey || e.metaKey;

  // Disable Ctrl+Shift+I (Inspect), Ctrl+Shift+J (Console), Ctrl+Shift+C (Element picker)
  if (isCtrlOrCmd && e.shiftKey && ['I', 'i', 'J', 'j', 'C', 'c'].includes(e.key)) {
    e.preventDefault();
    return false;
  }

  // Disable Ctrl+U / Cmd+U (View Source)
  if (isCtrlOrCmd && (e.key === 'u' || e.key === 'U' || e.keyCode === 85)) {
    e.preventDefault();
    return false;
  }

  // Disable Ctrl+S / Cmd+S (Save Page)
  if (isCtrlOrCmd && (e.key === 's' || e.key === 'S' || e.keyCode === 83)) {
    e.preventDefault();
    return false;
  }
});

// SUPABASE CONFIGURATION
const SUPABASE_URL = "https://crrjssnehjxjsloutxzq.supabase.co";
const SUPABASE_KEY = "sb_publishable_4YCAj1YUQRl8xaWb4YR55Q_CP5DuV1g";

const supabaseClient = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY) : null;

// APPLICATION STATE
let currentLang = 'bn';
let currentCitizen = null;
let currentAdmin = null;
let currentActiveView = 'home';

// IN-MEMORY STORAGE FOR IMAGE DATA PREVIEWS
let uploadedPhotoBase64 = null;
let editPhotoBase64 = null;

// ==============================================================================
// INITIALIZATION
// ==============================================================================
document.addEventListener('DOMContentLoaded', () => {
  // Restore language preference
  const savedLang = localStorage.getItem('site_lang');
  if (savedLang) {
    currentLang = savedLang;
  }
  updateLanguageUI();

  // Populate Dropdowns
  populateGeoDropdowns('reg');
  populateGeoDropdowns('acc');
  populateCrimeCategories();
  populateProblemCategories();
  populateSpecialRoleOptions('adminSpecialRoleSelect');
  populateSpecialRoleOptions('adminForwardNewRoleSelect');

  // Check saved session in localStorage
  const savedUser = localStorage.getItem('citizen_session');
  if (savedUser) {
    try {
      currentCitizen = JSON.parse(savedUser);
      onCitizenLoggedIn(false);
    } catch(e) {
      localStorage.removeItem('citizen_session');
    }
  }

  // Listen for Supabase Auth state changes
  if (supabaseClient) {
    supabaseClient.auth.onAuthStateChange((event, session) => {
      if (session && session.user) {
        currentAdmin = session.user;
        localStorage.setItem('admin_session', JSON.stringify(currentAdmin));
        const adminEmailBadge = document.getElementById('adminCurrentEmailDisplay');
        if (adminEmailBadge) adminEmailBadge.textContent = currentAdmin.email;
      } else {
        currentAdmin = null;
        localStorage.removeItem('admin_session');
        if (currentActiveView === 'adminDashboard') {
          navigateTo('home');
        }
      }
    });

    // Check existing Supabase auth session
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      if (session && session.user) {
        currentAdmin = session.user;
        localStorage.setItem('admin_session', JSON.stringify(currentAdmin));
      }
    });
  }
});

// ==============================================================================
// LANGUAGE MANAGEMENT
// ==============================================================================
function toggleLanguage() {
  currentLang = currentLang === 'bn' ? 'en' : 'bn';
  localStorage.setItem('site_lang', currentLang);
  updateLanguageUI();
}

function updateLanguageUI() {
  const isBn = currentLang === 'bn';
  document.getElementById('langBn').classList.toggle('active', isBn);
  document.getElementById('langEn').classList.toggle('active', !isBn);
  document.documentElement.lang = currentLang;

  const t = I18N[currentLang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) {
      el.textContent = t[key];
    }
  });

  // Dynamic user greeting if logged in
  if (currentCitizen) {
    const welcomeTemplate = t.welcomeUser || "Welcome, {name}";
    document.getElementById('welcomeText').textContent = welcomeTemplate.replace('{name}', currentCitizen.full_name);
  } else {
    document.getElementById('welcomeText').textContent = t.welcomeGuest;
  }
}

// ==============================================================================
// MODAL CONTROLS
// ==============================================================================
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add('open');
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('open');
}

// Close modal on click outside
window.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('open');
  }
});

// ==============================================================================
// NAVIGATION ROUTING
// ==============================================================================
function navigateTo(viewName) {
  currentActiveView = viewName;
  const views = ['viewHome', 'viewRegister', 'viewAccount', 'viewDashboard', 'viewAdminDashboard'];
  views.forEach(v => {
    const el = document.getElementById(v);
    if (el) el.style.display = 'none';
  });

  document.querySelectorAll('.nav-tab-btn').forEach(btn => btn.classList.remove('active'));

  if (viewName === 'home') {
    document.getElementById('viewHome').style.display = 'block';
    const tab = document.getElementById('tabBtnHome');
    if (tab) tab.classList.add('active');
    if (currentCitizen) {
      loadCitizenStatusBar();
    }
  } else if (viewName === 'register') {
    document.getElementById('viewRegister').style.display = 'block';
  } else if (viewName === 'account') {
    if (!currentCitizen) {
      openModal('citizenLoginModal');
      return;
    }
    document.getElementById('viewAccount').style.display = 'block';
    const tab = document.getElementById('tabBtnAccount');
    if (tab) tab.classList.add('active');
    populateAccountFormData();
  } else if (viewName === 'dashboard') {
    if (!currentCitizen || currentCitizen.account_type !== 'Special User') {
      alert("Only authorized Special Users can view this dashboard.");
      navigateTo('home');
      return;
    }
    document.getElementById('viewDashboard').style.display = 'block';
    const tab = document.getElementById('tabBtnDashboard');
    if (tab) tab.classList.add('active');
    document.getElementById('specialUserRoleName').textContent = currentCitizen.assigned_role;
    fetchSpecialUserTasks();
  } else if (viewName === 'adminDashboard') {
    if (!currentAdmin) {
      openModal('adminLoginModal');
      return;
    }
    document.getElementById('viewAdminDashboard').style.display = 'block';
    loadAdminDashboardData();
  }
}

function openRegisterPage() {
  navigateTo('register');
}

// ==============================================================================
// GEOGRAPHICAL DATA POPULATION (PDF-extracted Hierarchy)
// ==============================================================================
function populateGeoDropdowns(prefix) {
  const divSelect = document.getElementById(`${prefix}Division`);
  if (!divSelect) return;
  divSelect.innerHTML = `<option value="">${I18N[currentLang].selectDivision}</option>`;

  Object.keys(BD_GEOLOCATION_DATA).forEach(div => {
    const opt = document.createElement('option');
    opt.value = div;
    opt.textContent = div;
    divSelect.appendChild(opt);
  });
}

function onDivisionChange(prefix) {
  const divVal = document.getElementById(`${prefix}Division`).value;
  const distSelect = document.getElementById(`${prefix}District`);
  const upazilaSelect = document.getElementById(`${prefix}Upazila`);
  const areaTypeSelect = document.getElementById(`${prefix}AreaType`);

  distSelect.innerHTML = `<option value="">${I18N[currentLang].selectDistrict}</option>`;
  upazilaSelect.innerHTML = `<option value="">${I18N[currentLang].selectUpazila}</option>`;
  areaTypeSelect.innerHTML = `<option value="">${I18N[currentLang].selectAreaType}</option>`;

  if (!divVal || !BD_GEOLOCATION_DATA[divVal]) return;

  Object.keys(BD_GEOLOCATION_DATA[divVal]).forEach(dist => {
    const opt = document.createElement('option');
    opt.value = dist;
    opt.textContent = dist;
    distSelect.appendChild(opt);
  });
}

function onDistrictChange(prefix) {
  const divVal = document.getElementById(`${prefix}Division`).value;
  const distVal = document.getElementById(`${prefix}District`).value;
  const upazilaSelect = document.getElementById(`${prefix}Upazila`);
  const areaTypeSelect = document.getElementById(`${prefix}AreaType`);

  upazilaSelect.innerHTML = `<option value="">${I18N[currentLang].selectUpazila}</option>`;
  areaTypeSelect.innerHTML = `<option value="">${I18N[currentLang].selectAreaType}</option>`;

  if (!divVal || !distVal || !BD_GEOLOCATION_DATA[divVal][distVal]) return;

  Object.keys(BD_GEOLOCATION_DATA[divVal][distVal]).forEach(upz => {
    const opt = document.createElement('option');
    opt.value = upz;
    opt.textContent = upz;
    upazilaSelect.appendChild(opt);
  });
}

function onUpazilaChange(prefix) {
  const divVal = document.getElementById(`${prefix}Division`).value;
  const distVal = document.getElementById(`${prefix}District`).value;
  const upzVal = document.getElementById(`${prefix}Upazila`).value;
  const areaTypeSelect = document.getElementById(`${prefix}AreaType`);

  areaTypeSelect.innerHTML = `<option value="">${I18N[currentLang].selectAreaType}</option>`;

  if (!divVal || !distVal || !upzVal || !BD_GEOLOCATION_DATA[divVal][distVal][upzVal]) return;

  const areaTypes = Object.keys(BD_GEOLOCATION_DATA[divVal][distVal][upzVal]);
  areaTypes.forEach(at => {
    const opt = document.createElement('option');
    opt.value = at;
    opt.textContent = at;
    areaTypeSelect.appendChild(opt);
  });

  // Auto trigger change if single type
  if (areaTypes.length === 1) {
    areaTypeSelect.value = areaTypes[0];
    onAreaTypeChange(prefix);
  }
}

function onAreaTypeChange(prefix) {
  const divVal = document.getElementById(`${prefix}Division`).value;
  const distVal = document.getElementById(`${prefix}District`).value;
  const upzVal = document.getElementById(`${prefix}Upazila`).value;
  const areaTypeVal = document.getElementById(`${prefix}AreaType`).value;
  const container = document.getElementById(`${prefix}WardUnionContainer`);

  if (!container) return;

  if (areaTypeVal.toLowerCase().includes('city corp') || areaTypeVal.toLowerCase().includes('wards')) {
    // Check if predefined wards exist
    const items = BD_GEOLOCATION_DATA[divVal]?.[distVal]?.[upzVal]?.[areaTypeVal] || [];
    if (items.length > 0) {
      let optionsHtml = `<select id="${prefix}WardUnion" class="form-control" required><option value="">${I18N[currentLang].selectUnionWard}</option>`;
      items.forEach(w => {
        optionsHtml += `<option value="${w}">${w}</option>`;
      });
      optionsHtml += `</select>`;
      container.innerHTML = optionsHtml;
    } else {
      // Free text space for ward no
      container.innerHTML = `<input type="text" id="${prefix}WardUnion" class="form-control" placeholder="${I18N[currentLang].enterWardPrompt}" required>`;
    }
  } else {
    // Union Parishad dropdown
    const items = BD_GEOLOCATION_DATA[divVal]?.[distVal]?.[upzVal]?.[areaTypeVal] || [];
    let optionsHtml = `<select id="${prefix}WardUnion" class="form-control" required><option value="">${I18N[currentLang].selectUnionWard}</option>`;
    items.forEach(u => {
      optionsHtml += `<option value="${u}">${u}</option>`;
    });
    optionsHtml += `</select>`;
    container.innerHTML = optionsHtml;
  }
}

// ==============================================================================
// CATEGORIES & ROLES POPULATION
// ==============================================================================
function populateCrimeCategories() {
  const select = document.getElementById('crimeCategorySelect');
  if (!select) return;
  select.innerHTML = `<option value="">${I18N[currentLang].crimeCategoryDefault}</option>`;
  CRIME_CATEGORIES.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c;
    opt.textContent = c;
    select.appendChild(opt);
  });
}

function populateProblemCategories() {
  const select = document.getElementById('problemCategorySelect');
  if (!select) return;
  select.innerHTML = `<option value="">${I18N[currentLang].problemCategoryDefault}</option>`;
  PROBLEM_CATEGORIES.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p;
    opt.textContent = p;
    select.appendChild(opt);
  });
}

function populateSpecialRoleOptions(selectId) {
  const select = document.getElementById(selectId);
  if (!select) return;
  select.innerHTML = `<option value="">-- Choose Role / পদবী নির্বাচন করুন --</option>`;
  SYSTEM_ROLES.SPECIAL_GROUPS.forEach(grp => {
    const optgroup = document.createElement('optgroup');
    optgroup.label = grp.group;
    grp.roles.forEach(role => {
      const opt = document.createElement('option');
      opt.value = role;
      opt.textContent = role;
      optgroup.appendChild(opt);
    });
    select.appendChild(optgroup);
  });
}

// File to Base64 utility
function previewImageFile(event, previewContainerId) {
  const file = event.target.files[0];
  if (!file) return;

  if (file.size > 1024 * 1024) {
    alert("Image size exceeds 1MB limit. Please upload a smaller picture.");
    event.target.value = "";
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    const previewContainer = document.getElementById(previewContainerId);
    if (previewContainer) {
      const img = previewContainer.querySelector('img') || previewContainer;
      img.src = e.target.result;
      previewContainer.style.display = 'block';
      if (previewContainerId === 'regPhotoPreview') {
        uploadedPhotoBase64 = e.target.result;
      } else {
        editPhotoBase64 = e.target.result;
      }
    }
  };
  reader.readAsDataURL(file);
}

// ==============================================================================
// CITIZEN REGISTRATION FLOW
// ==============================================================================
async function handleRegistrationSubmit(event) {
  event.preventDefault();

  const fullName = document.getElementById('regFullName').value.trim();
  const phone = document.getElementById('regPhone').value.trim();
  const division = document.getElementById('regDivision').value;
  const district = document.getElementById('regDistrict').value;
  const upazila = document.getElementById('regUpazila').value;
  const areaType = document.getElementById('regAreaType').value;
  const wardUnionEl = document.getElementById('regWardUnion');
  const wardUnion = wardUnionEl ? wardUnionEl.value.trim() : '';
  const houseRoad = document.getElementById('regHouseRoad').value.trim();
  const primaryIdType = document.getElementById('regPrimaryIdType').value;
  const primaryIdNumber = document.getElementById('regPrimaryIdNumber').value.trim();

  if (!fullName || !phone || !division || !district || !upazila || !areaType || !wardUnion || !primaryIdNumber) {
    alert("Please fill all required fields correctly.");
    return;
  }

  const newCitizen = {
    full_name: fullName,
    phone: phone,
    photo_url: uploadedPhotoBase64 || null,
    division: division,
    district: district,
    upazila: upazila,
    area_type: areaType,
    ward_union: wardUnion,
    house_road: houseRoad,
    primary_id_type: primaryIdType,
    primary_id_number: primaryIdNumber,
    birth_certificate_no: primaryIdType === 'birth_certificate' ? primaryIdNumber : null,
    nid_no: primaryIdType === 'nid' ? primaryIdNumber : null,
    passport_no: primaryIdType === 'passport' ? primaryIdNumber : null,
    account_type: 'Civil Citizen',
    assigned_role: 'Civil Citizen',
    status: 'pending',
    is_approved: false,
    has_pending_edit: false
  };

  try {
    const { data, error } = await supabaseClient
      .from('citizens')
      .insert([newCitizen])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      alert("Registration Error: " + (error.message || "Failed to register. Primary ID might already be registered."));
      return;
    }

    const registeredUser = data && data[0] ? data[0] : newCitizen;
    alert("Citizen Registration Successful! Your application is now submitted for administrative approval.");
    
    // Auto-login citizen to let them view Home / Account
    currentCitizen = registeredUser;
    localStorage.setItem('citizen_session', JSON.stringify(currentCitizen));
    onCitizenLoggedIn(true);

  } catch(err) {
    console.error(err);
    alert("Network or database connection error: " + err.message);
  }
}

// ==============================================================================
// AUTHENTICATION & LOGIN
// ==============================================================================
async function handleCitizenLogin(event) {
  event.preventDefault();
  const idNo = document.getElementById('loginIdNumber').value.trim();
  const phone = document.getElementById('loginPassword').value.trim();

  try {
    const { data, error } = await supabaseClient
      .from('citizens')
      .select('*')
      .eq('primary_id_number', idNo)
      .eq('phone', phone)
      .single();

    if (error || !data) {
      alert("Invalid ID Number or Password (Phone Number). Please check and try again.");
      return;
    }

    currentCitizen = data;
    localStorage.setItem('citizen_session', JSON.stringify(currentCitizen));
    closeModal('citizenLoginModal');
    onCitizenLoggedIn(true);

  } catch(err) {
    alert("Login failed: " + err.message);
  }
}

function onCitizenLoggedIn(shouldNavigateHome = true) {
  document.getElementById('unauthHeaderActions').style.display = 'none';
  document.getElementById('authHeaderActions').style.display = 'flex';
  
  const roleDisplay = currentCitizen.account_type === 'Special User' ? currentCitizen.assigned_role : 'Civil Citizen';
  document.getElementById('headerUserBadge').textContent = `${currentCitizen.full_name} (${roleDisplay})`;

  // Tabs based on role
  const mainNavTabs = document.getElementById('mainNavTabs');
  const tabBtnDashboard = document.getElementById('tabBtnDashboard');
  const tabBtnHome = document.getElementById('tabBtnHome');
  const tabBtnAccount = document.getElementById('tabBtnAccount');

  mainNavTabs.style.display = 'flex';

  if (currentCitizen.account_type === 'Special User') {
    // "if the selected role is 'Special User', after client successfully logging in, their account will have three Tabs options. they are 'Dasboard', 'Account'."
    tabBtnHome.style.display = 'none';
    tabBtnDashboard.style.display = 'inline-block';
    tabBtnAccount.style.display = 'inline-block';
    if (shouldNavigateHome) navigateTo('dashboard');
  } else {
    // "if the selected role is 'Civil Citizen', after client successfully logging in, their account will have two Tabs options. they are 'Home', 'Account'."
    tabBtnHome.style.display = 'inline-block';
    tabBtnDashboard.style.display = 'none';
    tabBtnAccount.style.display = 'inline-block';
    if (shouldNavigateHome) navigateTo('home');
  }

  updateLanguageUI();
  loadCitizenStatusBar();
}

function logoutSession() {
  currentCitizen = null;
  localStorage.removeItem('citizen_session');
  document.getElementById('authHeaderActions').style.display = 'none';
  document.getElementById('unauthHeaderActions').style.display = 'flex';
  document.getElementById('mainNavTabs').style.display = 'none';
  const statusBar = document.getElementById('citizenStatusBar');
  if (statusBar) statusBar.style.display = 'none';
  const defaultVisual = document.getElementById('visualCardDefaultContent');
  if (defaultVisual) defaultVisual.style.display = 'flex';
  updateLanguageUI();
  navigateTo('home');
}

// ==============================================================================
// CITIZEN STATUS BAR & REPORT STATUS TRACKING
// ==============================================================================
async function loadCitizenStatusBar() {
  const statusBar = document.getElementById('citizenStatusBar');
  const defaultVisual = document.getElementById('visualCardDefaultContent');
  if (!currentCitizen) {
    if (statusBar) statusBar.style.display = 'none';
    if (defaultVisual) defaultVisual.style.display = 'flex';
    return;
  }

  if (defaultVisual) defaultVisual.style.display = 'none';
  if (statusBar) statusBar.style.display = 'flex';
  document.getElementById('userCurrentRole').textContent = `${currentCitizen.account_type} - ${currentCitizen.assigned_role} (${currentCitizen.status.toUpperCase()})`;

  const editBadge = document.getElementById('pendingEditBadgeContainer');
  if (currentCitizen.has_pending_edit) {
    editBadge.innerHTML = `<span class="status-pill pending">Edit Request Pending Admin Review</span>`;
  } else {
    editBadge.innerHTML = '';
  }

  // Fetch reports submitted by this citizen
  const listContainer = document.getElementById('citizenReportList');
  listContainer.innerHTML = '<span style="font-size:0.85rem; color:#64748b;">Loading status...</span>';

  try {
    const { data: reports, error } = await supabaseClient
      .from('reports')
      .select('*')
      .eq('citizen_id', currentCitizen.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error(error);
      listContainer.innerHTML = `<span style="font-size:0.85rem; color:#ef4444;">Could not load reports.</span>`;
      return;
    }

    if (!reports || reports.length === 0) {
      listContainer.innerHTML = `<span style="font-size:0.85rem; color:#64748b;">${I18N[currentLang].noReportsYet}</span>`;
      return;
    }

    let html = '';
    reports.forEach(r => {
      const isSolved = r.status.toLowerCase() === 'solved';
      const statusPillClass = isSolved ? 'solved' : 'submitted';
      html += `
        <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; padding:0.6rem 0.85rem; display:flex; justify-content:space-between; align-items:center;">
          <div>
            <span style="font-weight:700; color:var(--primary-navy);">[${r.tracking_id}] ${r.category}</span>
            <div style="font-size:0.82rem; color:#475569; margin-top:2px;">
              <span><strong>${I18N[currentLang].statusSubmittedTo.replace('{target}', r.assigned_role || 'Unassigned')}</strong></span>
            </div>
          </div>
          <div style="display:flex; align-items:center; gap:0.5rem;">
            <span class="status-pill ${statusPillClass}">${r.status}</span>
            <button class="btn btn-outline btn-sm" onclick='generateReportDossierPDF(${JSON.stringify(r)}, ${JSON.stringify(currentCitizen)})' title="Download PDF">PDF</button>
          </div>
        </div>
      `;
    });
    listContainer.innerHTML = html;

  } catch(e) {
    listContainer.innerHTML = `<span style="font-size:0.85rem; color:#64748b;">${I18N[currentLang].noReportsYet}</span>`;
  }
}

// ==============================================================================
// CITIZEN ACCOUNT PROFILE REVIEW & EDIT (Section 2 & 3)
// ==============================================================================
function populateAccountFormData() {
  if (!currentCitizen) return;

  const c = currentCitizen;
  document.getElementById('accFullName').value = c.full_name || '';
  document.getElementById('accPhone').value = c.phone || '';

  // Select Division, District, Upazila
  const divSelect = document.getElementById('accDivision');
  divSelect.value = c.division || '';
  onDivisionChange('acc');

  const distSelect = document.getElementById('accDistrict');
  distSelect.value = c.district || '';
  onDistrictChange('acc');

  const upzSelect = document.getElementById('accUpazila');
  upzSelect.value = c.upazila || '';
  onUpazilaChange('acc');

  const areaTypeSelect = document.getElementById('accAreaType');
  areaTypeSelect.value = c.area_type || '';
  onAreaTypeChange('acc');

  const wardEl = document.getElementById('accWardUnion');
  if (wardEl) wardEl.value = c.ward_union || '';

  document.getElementById('accHouseRoad').value = c.house_road || '';

  // Section 2
  document.getElementById('accBirthCert').value = c.birth_certificate_no || '';
  document.getElementById('accNid').value = c.nid_no || '';
  document.getElementById('accPassport').value = c.passport_no || '';
  document.getElementById('accEmail').value = c.email || '';

  // Lock the primary ID field
  if (c.primary_id_type === 'birth_certificate') {
    document.getElementById('accBirthCert').setAttribute('readonly', 'true');
    document.getElementById('accBirthCert').style.backgroundColor = '#f1f5f9';
  } else if (c.primary_id_type === 'nid') {
    document.getElementById('accNid').setAttribute('readonly', 'true');
    document.getElementById('accNid').style.backgroundColor = '#f1f5f9';
  } else if (c.primary_id_type === 'passport') {
    document.getElementById('accPassport').setAttribute('readonly', 'true');
    document.getElementById('accPassport').style.backgroundColor = '#f1f5f9';
  }

  // Display current photo
  const currentPhotoImg = document.getElementById('accCurrentPhotoImg');
  if (c.photo_url) {
    currentPhotoImg.src = c.photo_url;
    currentPhotoImg.style.display = 'block';
  }

  // Section 3
  document.getElementById('accFatherName').value = c.father_name || '';
  document.getElementById('accFatherBirthCert').value = c.father_birth_certificate_no || '';
  document.getElementById('accFatherNid').value = c.father_nid_no || '';
  document.getElementById('accFatherPassport').value = c.father_passport_no || '';

  document.getElementById('accMotherName').value = c.mother_name || '';
  document.getElementById('accMotherBirthCert').value = c.mother_birth_certificate_no || '';
  document.getElementById('accMotherNid').value = c.mother_nid_no || '';
  document.getElementById('accMotherPassport').value = c.mother_passport_no || '';

  // Status Badge
  const badge = document.getElementById('accountStatusBadge');
  badge.textContent = `${c.account_type} - ${c.status.toUpperCase()}`;
  badge.className = `status-pill ${c.status === 'approved' ? 'solved' : 'pending'}`;

  const editNotice = document.getElementById('accountEditPendingNotice');
  editNotice.style.display = c.has_pending_edit ? 'flex' : 'none';
}

async function handleAccountEditSubmit(event) {
  event.preventDefault();
  if (!currentCitizen) return;

  const wardEl = document.getElementById('accWardUnion');

  // Proposed edits payload
  const proposedEdits = {
    full_name: document.getElementById('accFullName').value.trim(),
    phone: document.getElementById('accPhone').value.trim(),
    division: document.getElementById('accDivision').value,
    district: document.getElementById('accDistrict').value,
    upazila: document.getElementById('accUpazila').value,
    area_type: document.getElementById('accAreaType').value,
    ward_union: wardEl ? wardEl.value.trim() : '',
    house_road: document.getElementById('accHouseRoad').value.trim(),
    birth_certificate_no: document.getElementById('accBirthCert').value.trim(),
    nid_no: document.getElementById('accNid').value.trim(),
    passport_no: document.getElementById('accPassport').value.trim(),
    email: document.getElementById('accEmail').value.trim(),
    photo_url: editPhotoBase64 || currentCitizen.photo_url,
    father_name: document.getElementById('accFatherName').value.trim(),
    father_birth_certificate_no: document.getElementById('accFatherBirthCert').value.trim(),
    father_nid_no: document.getElementById('accFatherNid').value.trim(),
    father_passport_no: document.getElementById('accFatherPassport').value.trim(),
    mother_name: document.getElementById('accMotherName').value.trim(),
    mother_birth_certificate_no: document.getElementById('accMotherBirthCert').value.trim(),
    mother_nid_no: document.getElementById('accMotherNid').value.trim(),
    mother_passport_no: document.getElementById('accMotherPassport').value.trim()
  };

  // Re-verify that Primary ID has not been changed
  if (currentCitizen.primary_id_type === 'birth_certificate') {
    proposedEdits.birth_certificate_no = currentCitizen.primary_id_number;
  } else if (currentCitizen.primary_id_type === 'nid') {
    proposedEdits.nid_no = currentCitizen.primary_id_number;
  } else if (currentCitizen.primary_id_type === 'passport') {
    proposedEdits.passport_no = currentCitizen.primary_id_number;
  }

  try {
    const { data, error } = await supabaseClient
      .from('citizens')
      .update({
        pending_edits: proposedEdits,
        has_pending_edit: true,
        updated_at: new Date().toISOString()
      })
      .eq('id', currentCitizen.id)
      .select();

    if (error) {
      alert("Error submitting edit request: " + error.message);
      return;
    }

    currentCitizen.pending_edits = proposedEdits;
    currentCitizen.has_pending_edit = true;
    localStorage.setItem('citizen_session', JSON.stringify(currentCitizen));
    alert("Profile changes submitted successfully! The admin will review and approve your requested edits.");
    populateAccountFormData();

  } catch(e) {
    alert("Database update failed: " + e.message);
  }
}

function downloadCurrentProfilePdf() {
  if (!currentCitizen) return;
  generateCitizenPDF(currentCitizen);
}

// ==============================================================================
// REPORT ACTIONS (Report Crime & Report Problem)
// ==============================================================================
function handleReportCrimeClick() {
  if (!currentCitizen) {
    alert("Please sign in or register your citizen profile first to report a crime.");
    openModal('citizenLoginModal');
    return;
  }
  openModal('reportCrimeModal');
}

function handleReportProblemClick() {
  if (!currentCitizen) {
    alert("Please sign in or register your citizen profile first to report a local issue.");
    openModal('citizenLoginModal');
    return;
  }
  openModal('reportProblemModal');
}

async function handleCrimeReportSubmit(event) {
  event.preventDefault();
  const category = document.getElementById('crimeCategorySelect').value;
  const desc = document.getElementById('crimeDescription').value.trim();

  if (!category || !desc) {
    alert("Please select category and provide description.");
    return;
  }

  // Default fallback if engine not loaded
  let assignedRole = "OC (Station)";
  const tempPayload = {
    report_type: 'crime',
    category: category,
    assigned_sector: 'Crime Sector'
  };

  if (typeof determineInitialRoleForReport === 'function') {
    assignedRole = await determineInitialRoleForReport(tempPayload);
  } else {
    const isAutoSp = SP_AUTO_ROUTED_CRIMES.some(c => c.toLowerCase() === category.toLowerCase());
    assignedRole = isAutoSp ? "Additional Police Commissioner / Superintendent of Police (SP)" : "OC (Station)";
  }
  const trackingId = "BD-CR-" + Math.floor(100000 + Math.random() * 900000);

  const reportPayload = {
    citizen_id: currentCitizen.id,
    tracking_id: trackingId,
    report_type: 'crime',
    category: category,
    description: desc,
    assigned_sector: 'Crime Sector',
    assigned_role: assignedRole,
    status: 'Submitted',
    citizen_snapshot: currentCitizen
  };

  try {
    const { data, error } = await supabaseClient
      .from('reports')
      .insert([reportPayload])
      .select();

    if (error) {
      alert("Error submitting report: " + error.message);
      return;
    }

    closeModal('reportCrimeModal');
    document.getElementById('crimeDescription').value = "";
    alert(`Crime report submitted successfully! Tracking ID: ${trackingId}\nAssigned To: ${assignedRole}`);

    // Auto generate Dossier PDF
    generateReportDossierPDF(reportPayload, currentCitizen);
    loadCitizenStatusBar();

    // Trigger auto escalation check to enforce limits
    if (typeof runAutoEscalationCheck === 'function') {
      runAutoEscalationCheck();
    }

  } catch(err) {
    alert("Submission error: " + err.message);
  }
}

async function handleProblemReportSubmit(event) {
  event.preventDefault();
  const category = document.getElementById('problemCategorySelect').value;
  const desc = document.getElementById('problemDescription').value.trim();

  if (!category || !desc) {
    alert("Please select sector category and provide problem details.");
    return;
  }

  // Dynamic routing based on 1st Special User role and capacity
  let defaultRole = "Citizen Rights / Public Service Desk";
  const tempProblemPayload = {
    report_type: 'problem',
    category: category,
    assigned_sector: category
  };

  if (typeof determineInitialRoleForReport === 'function') {
    defaultRole = await determineInitialRoleForReport(tempProblemPayload);
  } else {
    if (category.includes("Electricity")) defaultRole = "Local Sub-station / NOCS Staff";
    else if (category.includes("Gas")) defaultRole = "Assistant Manager (Field/area office level handling complaints, repairs, and meters)";
    else if (category.includes("Water")) defaultRole = "Assistant Engineer (Sohokari Prokowshali) (Field-level engineer in a zone/sub-division)";
    else if (category.includes("Citizen Rights")) defaultRole = "Ward Councilor";
  }

  const trackingId = "BD-PR-" + Math.floor(100000 + Math.random() * 900000);

  const reportPayload = {
    citizen_id: currentCitizen.id,
    tracking_id: trackingId,
    report_type: 'problem',
    category: category,
    description: desc,
    assigned_sector: category,
    assigned_role: defaultRole,
    status: 'Submitted',
    citizen_snapshot: currentCitizen
  };

  try {
    const { data, error } = await supabaseClient
      .from('reports')
      .insert([reportPayload])
      .select();

    if (error) {
      alert("Error submitting problem report: " + error.message);
      return;
    }

    closeModal('reportProblemModal');
    document.getElementById('problemDescription').value = "";
    alert(`Problem report submitted successfully! Tracking ID: ${trackingId}\nInitial Target: ${defaultRole}`);

    // Auto generate Dossier PDF
    generateReportDossierPDF(reportPayload, currentCitizen);
    loadCitizenStatusBar();

    // Trigger auto escalation check to enforce limits
    if (typeof runAutoEscalationCheck === 'function') {
      runAutoEscalationCheck();
    }

  } catch(err) {
    alert("Submission error: " + err.message);
  }
}

// ==============================================================================
// SPECIAL USER DASHBOARD (Role-based access & Checklist)
// ==============================================================================
async function fetchSpecialUserTasks() {
  if (!currentCitizen || currentCitizen.account_type !== 'Special User') return;

  const tbody = document.getElementById('specialUserTasksBody');
  tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding:1.5rem;">Loading tasks...</td></tr>';

  try {
    // "No roles can view the messages assigned to other roles."
    // Filtering strictly by assigned_role matching currentCitizen.assigned_role
    const { data: tasks, error } = await supabaseClient
      .from('reports')
      .select('*, citizens(*)')
      .eq('assigned_role', currentCitizen.assigned_role)
      .order('created_at', { ascending: false });

    if (error) {
      console.error(error);
      tbody.innerHTML = `<tr><td colspan="7" style="color:red; text-align:center;">Failed to fetch tasks: ${error.message}</td></tr>`;
      return;
    }

    if (!tasks || tasks.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; color:#64748b; padding:1.5rem;">${I18N[currentLang].noTasks}</td></tr>`;
      return;
    }

    let rowsHtml = '';
    tasks.forEach(t => {
      const c = t.citizens || t.citizen_snapshot || {};
      const isSolved = t.is_checked || t.status.toLowerCase() === 'solved';
      const statusBadge = isSolved ? `<span class="status-pill solved">${I18N[currentLang].solved}</span>` : `<span class="status-pill submitted">${t.status}</span>`;

      rowsHtml += `
        <tr>
          <td><strong>${t.tracking_id}</strong></td>
          <td style="font-size:0.85rem;">${new Date(t.created_at).toLocaleDateString()}</td>
          <td>
            <strong>${c.full_name || 'N/A'}</strong><br>
            <small style="color:#64748b;">${c.phone || ''}</small>
          </td>
          <td><span style="font-weight:600; color:var(--primary-navy);">${t.category}</span></td>
          <td style="max-width:250px; font-size:0.88rem;">${t.description}</td>
          <td>${statusBadge}</td>
          <td>
            <div style="display:flex; gap:0.4rem; align-items:center;">
              <button class="btn btn-outline btn-sm" onclick='generateReportDossierPDF(${JSON.stringify(t)}, ${JSON.stringify(c)})' title="View Dossier PDF">
                PDF
              </button>
              ${!isSolved ? `
                <button class="btn btn-success btn-sm" onclick="markTaskSolved('${t.id}')">
                  ${I18N[currentLang].markSolved}
                </button>
              ` : `
                <span style="color:#16a34a; font-weight:700; font-size:0.85rem;">✓ Checked</span>
              `}
            </div>
          </td>
        </tr>
      `;
    });

    tbody.innerHTML = rowsHtml;

  } catch(e) {
    tbody.innerHTML = `<tr><td colspan="7" style="color:red; text-align:center;">Error: ${e.message}</td></tr>`;
  }
}

async function markTaskSolved(reportId) {
  if (!confirm("Are you sure you want to mark this report as checked and solved?")) return;

  try {
    const { error } = await supabaseClient
      .from('reports')
      .update({
        status: 'Solved',
        is_checked: true,
        checked_at: new Date().toISOString(),
        checked_by: currentCitizen.assigned_role,
        updated_at: new Date().toISOString()
      })
      .eq('id', reportId);

    if (error) {
      alert("Failed to update status: " + error.message);
      return;
    }

    alert("Report marked as checked & solved!");
    fetchSpecialUserTasks();
    if (typeof runAutoEscalationCheck === 'function') {
      runAutoEscalationCheck();
    }

  } catch(e) {
    alert("Error: " + e.message);
  }
}

// ==============================================================================
// ADMINISTRATIVE CONTROL DASHBOARD (Strict Supabase Auth)
// ==============================================================================
async function handleAdminLogin(event) {
  event.preventDefault();
  const email = document.getElementById('adminEmail').value.trim();
  const password = document.getElementById('adminPassword').value.trim();

  try {
    // Authenticate directly with Supabase Auth service
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email: email,
      password: password
    });

    if (error || !data || !data.user) {
      alert("Supabase Authentication Failed: " + (error ? error.message : "Invalid credentials."));
      return;
    }

    currentAdmin = data.user;
    localStorage.setItem('admin_session', JSON.stringify(currentAdmin));
    closeModal('adminLoginModal');
    alert("Supabase Admin Authentication Successful!");
    onAdminLoggedIn(true);

  } catch(e) {
    alert("Supabase Auth Error: " + e.message);
  }
}

function onAdminLoggedIn(shouldNavigate = true) {
  const adminEmailBadge = document.getElementById('adminCurrentEmailDisplay');
  if (adminEmailBadge && currentAdmin) {
    adminEmailBadge.textContent = currentAdmin.email;
  }
  if (shouldNavigate) navigateTo('adminDashboard');
}

async function logoutAdmin() {
  try {
    if (supabaseClient) {
      await supabaseClient.auth.signOut();
    }
  } catch(e) {
    console.error(e);
  }
  currentAdmin = null;
  localStorage.removeItem('admin_session');
  navigateTo('home');
}

function switchAdminSubTab(tabNumber) {
  [1, 2, 3].forEach(n => {
    document.getElementById(`adminSubTab${n}`).style.display = (n === tabNumber) ? 'block' : 'none';
    document.getElementById(`adminTabBtn${n}`).classList.toggle('active', n === tabNumber);
  });
}

async function loadAdminDashboardData() {
  loadAdminPendingCitizens();
  loadAdminPendingEdits();
  loadAdminReportsForDispatch();
}

// Sub Tab 1: Pending Citizen Registrations
async function loadAdminPendingCitizens() {
  const tbody = document.getElementById('adminPendingCitizenBody');
  tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:1.2rem;">Loading applications...</td></tr>';

  try {
    const { data: citizens, error } = await supabaseClient
      .from('citizens')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: false });

    if (error) {
      tbody.innerHTML = `<tr><td colspan="6" style="color:red; text-align:center;">Error: ${error.message}</td></tr>`;
      return;
    }

    if (!citizens || citizens.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:#64748b; padding:1.5rem;">${I18N[currentLang].noPendingRegistrations}</td></tr>`;
      return;
    }

    let html = '';
    citizens.forEach(c => {
      html += `
        <tr>
          <td style="font-size:0.85rem;">${new Date(c.created_at).toLocaleDateString()}</td>
          <td><strong>${c.full_name}</strong></td>
          <td>${c.phone}</td>
          <td><span style="font-family:monospace; font-weight:700;">${c.primary_id_number}</span> (${c.primary_id_type})</td>
          <td style="font-size:0.85rem;">${c.ward_union}, ${c.upazila}, ${c.district}</td>
          <td>
            <div style="display:flex; gap:0.5rem;">
              <button class="btn btn-outline btn-sm" onclick='generateCitizenPDF(${JSON.stringify(c)})'>PDF</button>
              <button class="btn btn-primary btn-sm" onclick='openAdminAssignRoleModal(${JSON.stringify(c)})'>Approve & Assign Role</button>
            </div>
          </td>
        </tr>
      `;
    });
    tbody.innerHTML = html;

  } catch(e) {
    tbody.innerHTML = `<tr><td colspan="6" style="color:red; text-align:center;">Error: ${e.message}</td></tr>`;
  }
}

function openAdminAssignRoleModal(citizen) {
  document.getElementById('adminTargetCitizenId').value = citizen.id;
  document.getElementById('adminTargetCitizenName').textContent = `${citizen.full_name} (ID: ${citizen.primary_id_number})`;
  document.getElementById('adminAccountTypeSelect').value = 'Civil Citizen';
  onAdminAccountTypeChange();
  openModal('adminAssignRoleModal');
}

function onAdminAccountTypeChange() {
  const type = document.getElementById('adminAccountTypeSelect').value;
  const group = document.getElementById('adminSpecialRoleGroup');
  group.style.display = (type === 'Special User') ? 'block' : 'none';
}

async function handleAdminRoleAssignmentSubmit(event) {
  event.preventDefault();
  const citizenId = document.getElementById('adminTargetCitizenId').value;
  const accountType = document.getElementById('adminAccountTypeSelect').value;
  let assignedRole = accountType;

  if (accountType === 'Special User') {
    assignedRole = document.getElementById('adminSpecialRoleSelect').value;
    if (!assignedRole) {
      alert("Please select a specific role designation for this Special User.");
      return;
    }
  }

  try {
    const { data, error } = await supabaseClient
      .from('citizens')
      .update({
        account_type: accountType,
        assigned_role: assignedRole,
        status: 'approved',
        is_approved: true,
        updated_at: new Date().toISOString()
      })
      .eq('id', citizenId)
      .select();

    if (error) {
      alert("Failed to approve and assign role: " + error.message);
      return;
    }

    closeModal('adminAssignRoleModal');
    alert(`Citizen successfully approved as: ${assignedRole}`);

    // Generate PDF upon admin approval as requested
    const approvedCitizen = data && data[0] ? data[0] : null;
    if (approvedCitizen) {
      generateCitizenPDF(approvedCitizen);
    }

    loadAdminPendingCitizens();

  } catch(e) {
    alert("Error: " + e.message);
  }
}

// Sub Tab 2: Profile Edits
async function loadAdminPendingEdits() {
  const tbody = document.getElementById('adminPendingEditsBody');
  tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; padding:1.2rem;">Loading edit requests...</td></tr>';

  try {
    const { data: citizens, error } = await supabaseClient
      .from('citizens')
      .select('*')
      .eq('has_pending_edit', true);

    if (error) {
      tbody.innerHTML = `<tr><td colspan="4" style="color:red; text-align:center;">Error: ${error.message}</td></tr>`;
      return;
    }

    if (!citizens || citizens.length === 0) {
      tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:#64748b; padding:1.5rem;">${I18N[currentLang].noPendingEdits}</td></tr>`;
      return;
    }

    let html = '';
    citizens.forEach(c => {
      const edits = c.pending_edits || {};
      let diffHtml = '<ul style="margin:0; padding-left:1.2rem; font-size:0.85rem;">';
      Object.keys(edits).forEach(k => {
        if (edits[k] !== c[k] && k !== 'photo_url') {
          diffHtml += `<li><strong>${k}:</strong> ${c[k] || 'None'} &rarr; <span style="color:#15803d; font-weight:700;">${edits[k]}</span></li>`;
        }
      });
      diffHtml += '</ul>';

      html += `
        <tr>
          <td><strong>${c.full_name}</strong></td>
          <td><span style="font-family:monospace;">${c.primary_id_number}</span></td>
          <td>${diffHtml}</td>
          <td>
            <div style="display:flex; gap:0.5rem;">
              <button class="btn btn-success btn-sm" onclick="approveCitizenEdit('${c.id}')">Approve Edit</button>
              <button class="btn btn-danger btn-sm" onclick="rejectCitizenEdit('${c.id}')">Reject</button>
            </div>
          </td>
        </tr>
      `;
    });

    tbody.innerHTML = html;

  } catch(e) {
    tbody.innerHTML = `<tr><td colspan="4" style="color:red; text-align:center;">Error: ${e.message}</td></tr>`;
  }
}

async function approveCitizenEdit(citizenId) {
  if (!confirm("Approve this profile edit? All changes will directly apply to Supabase.")) return;

  try {
    const { data: citizenData, error: fetchErr } = await supabaseClient
      .from('citizens')
      .select('*')
      .eq('id', citizenId)
      .single();

    if (fetchErr || !citizenData || !citizenData.pending_edits) {
      alert("Could not load edit details.");
      return;
    }

    const updates = {
      ...citizenData.pending_edits,
      has_pending_edit: false,
      pending_edits: null,
      updated_at: new Date().toISOString()
    };

    const { error: updateErr } = await supabaseClient
      .from('citizens')
      .update(updates)
      .eq('id', citizenId);

    if (updateErr) {
      alert("Failed to apply edit: " + updateErr.message);
      return;
    }

    alert("Profile edit approved and updated on Supabase!");
    loadAdminPendingEdits();

  } catch(e) {
    alert("Error: " + e.message);
  }
}

async function rejectCitizenEdit(citizenId) {
  if (!confirm("Reject this profile edit?")) return;

  try {
    const { error } = await supabaseClient
      .from('citizens')
      .update({
        has_pending_edit: false,
        pending_edits: null,
        updated_at: new Date().toISOString()
      })
      .eq('id', citizenId);

    if (error) {
      alert("Error: " + error.message);
      return;
    }

    alert("Edit request rejected.");
    loadAdminPendingEdits();

  } catch(e) {
    alert("Error: " + e.message);
  }
}

// Sub Tab 3: Dispatch & Forward Reports
async function loadAdminReportsForDispatch() {
  const tbody = document.getElementById('adminReportsDispatchBody');
  tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding:1.2rem;">Loading reports...</td></tr>';

  try {
    const { data: reports, error } = await supabaseClient
      .from('reports')
      .select('*, citizens(*)')
      .order('created_at', { ascending: false });

    if (error) {
      tbody.innerHTML = `<tr><td colspan="7" style="color:red; text-align:center;">Error: ${error.message}</td></tr>`;
      return;
    }

    if (!reports || reports.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; color:#64748b; padding:1.5rem;">${I18N[currentLang].noReportsToForward}</td></tr>`;
      return;
    }

    let html = '';
    reports.forEach(r => {
      const c = r.citizens || r.citizen_snapshot || {};
      html += `
        <tr>
          <td><strong>${r.tracking_id}</strong></td>
          <td>${c.full_name || 'N/A'}<br><small style="color:#64748b;">${c.phone || ''}</small></td>
          <td><span style="font-weight:600; color:var(--primary-navy);">${r.category}</span></td>
          <td style="max-width:200px; font-size:0.85rem;">${r.description}</td>
          <td><strong style="color:var(--secondary-crimson); font-size:0.85rem;">${r.assigned_role}</strong></td>
          <td><span class="status-pill ${r.status === 'Solved' ? 'solved' : 'submitted'}">${r.status}</span></td>
          <td>
            <div style="display:flex; gap:0.4rem;">
              <button class="btn btn-outline btn-sm" onclick='generateReportDossierPDF(${JSON.stringify(r)}, ${JSON.stringify(c)})'>PDF</button>
              <button class="btn btn-primary btn-sm" onclick='openAdminForwardReportModal(${JSON.stringify(r)})'>Forward Role</button>
            </div>
          </td>
        </tr>
      `;
    });

    tbody.innerHTML = html;

  } catch(e) {
    tbody.innerHTML = `<tr><td colspan="7" style="color:red; text-align:center;">Error: ${e.message}</td></tr>`;
  }
}

function openAdminForwardReportModal(report) {
  document.getElementById('adminForwardReportId').value = report.id;
  document.getElementById('adminForwardTrackingId').textContent = report.tracking_id;
  document.getElementById('adminForwardCurrentRole').textContent = report.assigned_role;
  openModal('adminForwardReportModal');
}

async function handleAdminForwardReportSubmit(event) {
  event.preventDefault();
  const reportId = document.getElementById('adminForwardReportId').value;
  const newRole = document.getElementById('adminForwardNewRoleSelect').value;

  if (!newRole) {
    alert("Please select the target role to forward to.");
    return;
  }

  try {
    const { error } = await supabaseClient
      .from('reports')
      .update({
        assigned_role: newRole,
        updated_at: new Date().toISOString()
      })
      .eq('id', reportId);

    if (error) {
      alert("Error forwarding report: " + error.message);
      return;
    }

    closeModal('adminForwardReportModal');
    alert(`Report successfully forwarded to: ${newRole}`);
    loadAdminReportsForDispatch();

  } catch(e) {
    alert("Error: " + e.message);
  }
}

// ==============================================================================
// DRAGGABLE FLOATING CHATBOT BUBBLE INITIALIZATION
// ==============================================================================
function initDraggableChatbotBubble() {
  const bubble = document.getElementById('draggableChatbotBubble');
  const link = document.getElementById('chatbotBubbleLink');
  if (!bubble || !link) return;

  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let initialLeft = 0;
  let initialTop = 0;
  let dragDistance = 0;

  // Restore saved position if available
  const savedPos = localStorage.getItem('chatbot_bubble_pos');
  if (savedPos) {
    try {
      const pos = JSON.parse(savedPos);
      const maxX = window.innerWidth - bubble.offsetWidth - 10;
      const maxY = window.innerHeight - bubble.offsetHeight - 10;
      const left = Math.min(Math.max(10, pos.left), Math.max(10, maxX));
      const top = Math.min(Math.max(10, pos.top), Math.max(10, maxY));
      bubble.style.left = `${left}px`;
      bubble.style.top = `${top}px`;
      bubble.style.right = 'auto';
      bubble.style.bottom = 'auto';
    } catch(e) {}
  }

  function onPointerDown(e) {
    // Only accept primary button (left click) or touch
    if (e.button !== undefined && e.button !== 0) return;

    isDragging = false;
    dragDistance = 0;
    startX = e.clientX || (e.touches && e.touches[0].clientX);
    startY = e.clientY || (e.touches && e.touches[0].clientY);

    const rect = bubble.getBoundingClientRect();
    initialLeft = rect.left;
    initialTop = rect.top;

    bubble.style.left = `${initialLeft}px`;
    bubble.style.top = `${initialTop}px`;
    bubble.style.right = 'auto';
    bubble.style.bottom = 'auto';

    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp);
    document.addEventListener('pointercancel', onPointerUp);
  }

  function onPointerMove(e) {
    const currentX = e.clientX || (e.touches && e.touches[0].clientX);
    const currentY = e.clientY || (e.touches && e.touches[0].clientY);
    const dx = currentX - startX;
    const dy = currentY - startY;

    dragDistance = Math.hypot(dx, dy);

    if (dragDistance > 5) {
      if (!isDragging) {
        isDragging = true;
        bubble.classList.add('is-dragging');
      }

      let newLeft = initialLeft + dx;
      let newTop = initialTop + dy;

      // Keep within viewport boundaries
      const padding = 8;
      const minLeft = padding;
      const maxLeft = window.innerWidth - bubble.offsetWidth - padding;
      const minTop = padding;
      const maxTop = window.innerHeight - bubble.offsetHeight - padding;

      newLeft = Math.max(minLeft, Math.min(maxLeft, newLeft));
      newTop = Math.max(minTop, Math.min(maxTop, newTop));

      bubble.style.left = `${newLeft}px`;
      bubble.style.top = `${newTop}px`;
    }
  }

  function onPointerUp(e) {
    document.removeEventListener('pointermove', onPointerMove);
    document.removeEventListener('pointerup', onPointerUp);
    document.removeEventListener('pointercancel', onPointerUp);

    if (isDragging) {
      bubble.classList.remove('is-dragging');

      // Save position to localStorage
      const rect = bubble.getBoundingClientRect();
      localStorage.setItem('chatbot_bubble_pos', JSON.stringify({
        left: rect.left,
        top: rect.top
      }));

      // Prevent link navigation if it was a drag operation
      setTimeout(() => {
        isDragging = false;
      }, 50);
    }
  }

  bubble.addEventListener('pointerdown', onPointerDown);

  // Click interceptor: prevent navigating if user dragged
  link.addEventListener('click', (e) => {
    if (dragDistance > 5 || isDragging) {
      e.preventDefault();
      e.stopPropagation();
    }
  });
}

// Call on load
document.addEventListener('DOMContentLoaded', () => {
  initDraggableChatbotBubble();
});
