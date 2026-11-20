/**
 * Automated Escalation & Routing Engine for Bangladesh Citizen Reporting System
 * 
 * Handles:
 * 1. Initial Routing of Reports based on category & tier limits.
 * 2. Automated Escalation:
 *    - For Local Reports (Electricity, Gas, Water): Max 10 per tier, if < 6 marked "Checked",
 *      escalates reports up the role chain to the next Special User role.
 *    - For Crime Reports: Category-specific initial tier limit; if < 6 marked "Checked",
 *      escalates up the role chain while the capacity limit doubles (2x) at each subsequent tier.
 */

// Initial Crime Tier Capacities
const CRIME_REPORT_LIMITS = {
  "Murder": 1,
  "Manslaughter (not murder)": 1,
  "Involuntary Manslaughter (not murder)": 1,
  "Causing death by negligence": 1,
  "Rash or negligent driving": 30,
  "Hurt/grievous hurt": 15,
  "Acid attack (grievous)": 3,
  "Acid attack (serious)": 3,
  "Kidnapping": 3,
  "Wrongful confinement": 15,
  "Theft": 35,
  "Robbery / dacoity": 15,
  "Extortion": 50,
  "Cheating": 50,
  "Criminal breach of trust": 35,
  "Forgery": 35,
  "Mischief / vandalize (damage)": 3,
  "Trespass": 50,
  "Defamation": 10,
  "Criminal threat": 10,
  "Insulting a woman's modesty": 10,
  "Bribery by a public servant": 20,
  "Fire or explosive negligence": 2,
  "Negligent use of fire or explosives": 2,
  "Sexual Assult / Rape / Molestation": 1
};

const LOCAL_REPORT_LIMIT = 10;
const MIN_CHECKED_THRESHOLD = 6;

/**
 * Returns the active Supabase client instance safely.
 */
function getSupabaseInstance() {
  if (typeof supabaseClient !== 'undefined' && supabaseClient) {
    return supabaseClient;
  }
  if (typeof window !== 'undefined' && window.supabaseClient) {
    return window.supabaseClient;
  }
  return null;
}

/**
 * Normalizes category string to match definitions in CRIME_REPORT_LIMITS.
 */
function normalizeCategoryName(rawCategory) {
  if (!rawCategory) return '';
  const trimmed = rawCategory.trim();
  if (CRIME_REPORT_LIMITS[trimmed] !== undefined) return trimmed;

  const lower = trimmed.toLowerCase();
  for (const key of Object.keys(CRIME_REPORT_LIMITS)) {
    if (key.toLowerCase() === lower) {
      return key;
    }
  }
  return trimmed;
}

/**
 * Returns the ordered array of role names in the hierarchy chain for a given report.
 */
function getRoleChainForReport(report) {
  const reportType = (report.report_type || '').toLowerCase();
  const category = report.category || '';
  const sector = report.assigned_sector || '';

  // Crime Sector Chain
  if (reportType === 'crime' || sector.includes('Crime') || CRIME_REPORT_LIMITS[normalizeCategoryName(category)] !== undefined) {
    const crimeGroup = (typeof SYSTEM_ROLES !== 'undefined' && SYSTEM_ROLES.SPECIAL_GROUPS)
      ? SYSTEM_ROLES.SPECIAL_GROUPS.find(g => g.group.includes("Crime"))
      : null;

    if (crimeGroup && crimeGroup.roles && crimeGroup.roles.length > 0) {
      return [...crimeGroup.roles];
    }

    // Direct fallback chain for Crime Sector
    return [
      "OC (Station)",
      "Assistant Commissioner (AC) / ASP Circle DC (DMP Zone) / Additional Superintendent of Police",
      "Additional Police Commissioner / Superintendent of Police (SP)",
      "Police Commissioner (Metro) / DIG (Range)",
      "Inspector General of Police (IGP)",
      "Secretary, Public Safety Division, Ministry of Home Affairs",
      "Minister/Advisor, Ministry of Home Affairs"
    ];
  }

  // Local / Problem Reports
  const specialGroups = (typeof SYSTEM_ROLES !== 'undefined' && SYSTEM_ROLES.SPECIAL_GROUPS) ? SYSTEM_ROLES.SPECIAL_GROUPS : [];

  if (category.includes("Electricity") || sector.includes("Electricity")) {
    const grp = specialGroups.find(g => g.group.includes("Electricity"));
    return grp ? [...grp.roles] : [];
  }
  if (category.includes("Gas") || sector.includes("Gas")) {
    const grp = specialGroups.find(g => g.group.includes("Gas"));
    return grp ? [...grp.roles] : [];
  }
  if (category.includes("Water") || sector.includes("Water")) {
    let grp = specialGroups.find(g => g.group.includes("Water Supply") && g.group.includes("WASA"));
    if (!grp) {
      grp = specialGroups.find(g => g.group.includes("Water Supply"));
    }
    return grp ? [...grp.roles] : [];
  }
  if (category.includes("Citizen Rights") || sector.includes("Citizen Rights")) {
    const grp = specialGroups.find(g => g.group.includes("Citizen Rights"));
    return grp ? [...grp.roles] : [];
  }

  return [];
}

/**
 * Calculates the capacity limit for a report at a given tier index (0-based).
 * - Crime Reports: Category base limit doubles (2x) at each subsequent tier: baseLimit * (2 ^ tierIndex).
 * - Local Reports: 10 reports.
 */
function getCapacityLimitForTier(report, tierIndex) {
  const reportType = (report.report_type || '').toLowerCase();
  const normalizedCategory = normalizeCategoryName(report.category);

  if (reportType === 'crime' || (report.assigned_sector || '').includes('Crime') || CRIME_REPORT_LIMITS[normalizedCategory] !== undefined) {
    const baseLimit = CRIME_REPORT_LIMITS[normalizedCategory] !== undefined ? CRIME_REPORT_LIMITS[normalizedCategory] : 10;
    // Doubles at each subsequent tier: baseLimit * 2^(tierIndex)
    return Math.round(baseLimit * Math.pow(2, tierIndex));
  }

  // Local reports (Electricity, Gas, Water) maintain standard limit of 10
  return LOCAL_REPORT_LIMIT;
}

/**
 * Finds the starting/current tier index of a role in the category chain.
 */
function getRoleTierIndex(roleName, chain) {
  if (!roleName || !chain || chain.length === 0) return -1;
  const target = roleName.trim().toLowerCase();
  return chain.findIndex(r => r.trim().toLowerCase() === target);
}

/**
 * Determines the target role for a newly submitted report.
 * Finds the active role in the chain starting from the 1st Special User.
 * If that role has reached its capacity limit AND has not marked >= 6 reports as "Checked",
 * it routes up to the next role in the chain (with capacity doubling for crimes).
 */
async function determineInitialRoleForReport(reportPayload) {
  const sb = getSupabaseInstance();
  const chain = getRoleChainForReport(reportPayload);
  if (!chain || chain.length === 0) {
    return reportPayload.assigned_role || "OC (Station)";
  }

  if (!sb) {
    return chain[0];
  }

  try {
    for (let i = 0; i < chain.length; i++) {
      const role = chain[i];
      const capacity = getCapacityLimitForTier(reportPayload, i);

      // Check how many reports this role currently has active (unsolved) for this category
      const { count: activeCount, error: countErr } = await sb
        .from('reports')
        .select('id', { count: 'exact', head: true })
        .eq('assigned_role', role)
        .eq('category', reportPayload.category)
        .neq('status', 'Solved');

      // Check how many reports this role has marked as checked for this category
      const { count: checkedCount, error: checkErr } = await sb
        .from('reports')
        .select('id', { count: 'exact', head: true })
        .eq('assigned_role', role)
        .eq('category', reportPayload.category)
        .eq('is_checked', true);

      const totalActive = countErr ? 0 : (activeCount || 0);
      const totalChecked = checkErr ? 0 : (checkedCount || 0);

      // If role marked at least 6 checked, it has cleared threshold and can accept up to capacity
      // If role hasn't reached capacity, assign to this role
      if (totalActive < capacity || totalChecked >= MIN_CHECKED_THRESHOLD || i === chain.length - 1) {
        return role;
      }
      // Otherwise, role reached capacity without marking 6 checked -> continue to next tier
    }
  } catch (err) {
    console.warn("determineInitialRoleForReport error:", err);
  }

  return chain[0];
}

/**
 * Background Automation Engine:
 * Scans active reports grouped by category and assigned role.
 * Rule:
 * If the Special User role of that selected category has active reports reaching its tier capacity,
 * and does NOT mark minimum 6 reports as "Checked", then auto forward all the reports to the
 * 2nd (next) Special User of that category.
 * Continue this chain while the report capacity doubles (2x) for crime cases till it reaches the Last Special User.
 */
async function runAutoEscalationCheck() {
  const sb = getSupabaseInstance();
  if (!sb) return;

  try {
    // Fetch all active (un-solved) reports
    const { data: activeReports, error } = await sb
      .from('reports')
      .select('*')
      .neq('status', 'Solved')
      .order('created_at', { ascending: true });

    if (error || !activeReports || activeReports.length === 0) {
      return;
    }

    // Group active reports by (category + '::' + assigned_role)
    const roleReportMap = {};
    activeReports.forEach(rep => {
      const key = `${rep.category}::${rep.assigned_role}`;
      if (!roleReportMap[key]) {
        roleReportMap[key] = {
          category: rep.category,
          assigned_role: rep.assigned_role,
          reports: []
        };
      }
      roleReportMap[key].reports.push(rep);
    });

    // Inspect each group
    for (const key of Object.keys(roleReportMap)) {
      const group = roleReportMap[key];
      const sampleReport = group.reports[0];
      const chain = getRoleChainForReport(sampleReport);
      const currentTier = getRoleTierIndex(group.assigned_role, chain);

      // If role is not in the chain or already at the Last Special User, cannot escalate further
      if (currentTier === -1 || currentTier >= chain.length - 1) {
        continue;
      }

      const nextRole = chain[currentTier + 1];
      const tierCapacity = getCapacityLimitForTier(sampleReport, currentTier);

      // Check how many reports this role has marked as checked for this category
      const { count: checkedCount, error: checkErr } = await sb
        .from('reports')
        .select('id', { count: 'exact', head: true })
        .eq('assigned_role', group.assigned_role)
        .eq('category', group.category)
        .eq('is_checked', true);

      const totalChecked = checkErr ? 0 : (checkedCount || 0);

      // Condition:
      // If the current role has NOT marked minimum 6 reports as "Checked"
      // AND active un-checked reports reach or exceed the tier capacity limit:
      if (totalChecked < MIN_CHECKED_THRESHOLD && group.reports.length >= tierCapacity) {
        const reportIdsToForward = group.reports.map(r => r.id);

        console.log(`[Auto-Escalation Triggered]`);
        console.log(`- Category: ${group.category}`);
        console.log(`- Current Tier: ${currentTier + 1} (${group.assigned_role})`);
        console.log(`- Tier Capacity: ${tierCapacity} reports (Doubles to ${getCapacityLimitForTier(sampleReport, currentTier + 1)} at next tier)`);
        console.log(`- Pending Reports: ${group.reports.length}, Checked Count: ${totalChecked} (< 6)`);
        console.log(`- Forwarding ${reportIdsToForward.length} reports to: Tier ${currentTier + 2} (${nextRole})`);

        const { error: updateErr } = await sb
          .from('reports')
          .update({
            assigned_role: nextRole,
            updated_at: new Date().toISOString(),
            action_remarks: `[Auto-Escalated] Escalated from Tier ${currentTier + 1} (${group.assigned_role}) to Tier ${currentTier + 2} (${nextRole}) because min 6 reports were not marked Checked.`
          })
          .in('id', reportIdsToForward);

        if (updateErr) {
          console.error("[Auto-Escalation] Update error:", updateErr);
        } else {
          // If special user dashboard or citizen status bar is open on this client, refresh them
          if (typeof fetchSpecialUserTasks === 'function' && typeof currentCitizen !== 'undefined' && currentCitizen && currentCitizen.account_type === 'Special User') {
            fetchSpecialUserTasks();
          }
          if (typeof loadCitizenStatusBar === 'function' && typeof currentCitizen !== 'undefined' && currentCitizen) {
            loadCitizenStatusBar();
          }
        }
      }
    }

  } catch (err) {
    console.warn("Auto escalation check warning:", err.message);
  }
}

// Global exposure
if (typeof window !== 'undefined') {
  window.CRIME_REPORT_LIMITS = CRIME_REPORT_LIMITS;
  window.LOCAL_REPORT_LIMIT = LOCAL_REPORT_LIMIT;
  window.MIN_CHECKED_THRESHOLD = MIN_CHECKED_THRESHOLD;
  window.getRoleChainForReport = getRoleChainForReport;
  window.getCapacityLimitForTier = getCapacityLimitForTier;
  window.getRoleTierIndex = getRoleTierIndex;
  window.determineInitialRoleForReport = determineInitialRoleForReport;
  window.runAutoEscalationCheck = runAutoEscalationCheck;

  // Background ticker running every 10 seconds
  window.addEventListener('DOMContentLoaded', () => {
    setTimeout(runAutoEscalationCheck, 2000);
    setInterval(runAutoEscalationCheck, 10000);
  });
}

// Export for Node / scripts if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    CRIME_REPORT_LIMITS,
    LOCAL_REPORT_LIMIT,
    MIN_CHECKED_THRESHOLD,
    getRoleChainForReport,
    getCapacityLimitForTier,
    getRoleTierIndex,
    determineInitialRoleForReport,
    runAutoEscalationCheck
  };
}
