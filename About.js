/**
 * About.js — Team Data Model & Renderer
 * شركة البريق التقني المميز · v2.0
 */

// ─── Scalable Team Data Array ─────────────────────────────
// To add a new member: append one object to this array. No other code changes needed.
const teamMembersData = [
    {
        id:        1,
        name:      "علي أحمد قاسم",
        nameEn:    "Ali Ahmad Qasim",
        age:       41,
        birthYear: 1984,
        role:      "المؤسس ورئيس الشركة",
        roleEn:    "Founder & Chief Executive",
        roleBadge: "founder",          // CSS modifier: .team-role-badge.founder
        country:   "مصر، بني سويف، قرية تلت",
        countryEn: "Egypt · Beni Suef · Talt Village",
        image:     "icns/user.png"
    },
    {
        id:        2,
        name:      "ياسين مجاهد حسن",
        nameEn:    "Yassin Mujahid Hassan",
        age:       14,
        birthYear: 2013,
        role:      "مهندس تقني والمسؤول عن الواجهة التقنية والإعلامية للشركة",
        roleEn:    "Technical Engineer · Tech & Media Interface Lead",
        roleBadge: "tech",             // CSS modifier: .team-role-badge.tech
        country:   "مصر",
        countryEn: "Egypt",
        image:     "icns/user.png"
    }
];

// ─── Renderer ─────────────────────────────────────────────
function renderTeam() {
    const container = document.getElementById('team-container');
    if (!container) return;

    const isEn = typeof currentLang !== 'undefined' && currentLang === 'en';
    const ageLabel     = isEn ? 'Age'      : 'العمر';
    const birthLabel   = isEn ? 'Birth'    : 'الميلاد';
    const countryLabel = isEn ? 'Location' : 'الإقامة';

    container.innerHTML = teamMembersData.map(m => {
        const name    = isEn && m.nameEn    ? m.nameEn    : m.name;
        const role    = isEn && m.roleEn    ? m.roleEn    : m.role;
        const country = isEn && m.countryEn ? m.countryEn : m.country;

        return `
        <article class="team-card" data-member-id="${m.id}">
            <div class="team-card-header">
                <img src="${m.image}" alt="${name}" class="team-avatar">
                <div class="team-name-block">
                    <p class="team-name">${name}</p>
                    <span class="team-role-badge ${m.roleBadge}">${role}</span>
                </div>
            </div>
            <div class="team-meta">
                <div class="team-meta-row">
                    <span class="meta-label">${ageLabel}</span>
                    <span class="meta-value"><strong>${m.age}</strong> ${isEn ? 'years' : 'سنة'}</span>
                </div>
                <div class="team-meta-row">
                    <span class="meta-label">${birthLabel}</span>
                    <span class="meta-value">${m.birthYear}</span>
                </div>
                <div class="team-meta-row">
                    <span class="meta-label">${countryLabel}</span>
                    <span class="meta-value">${country}</span>
                </div>
            </div>
        </article>`;
    }).join('');
}

// Re-render when language toggles
window.addEventListener('langChanged', renderTeam);

document.addEventListener('DOMContentLoaded', renderTeam);
