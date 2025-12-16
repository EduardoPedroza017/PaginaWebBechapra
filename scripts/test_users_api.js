/*
Simple Node script to test admin users endpoints.
Usage:
  NODE_ENV=development NEXT_PUBLIC_API_URL=http://localhost:5000 ADMIN_TOKEN=ey... node scripts/test_users_api.js

It performs: list users, create user (if you allow), update user, delete user.
It expects admin endpoints under /api/admin/users and /api/admin/users-mutations.
*/

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
const TOKEN = process.env.ADMIN_TOKEN; // Bearer token for admin
if (!TOKEN) {
  console.error('Please set ADMIN_TOKEN env var with a valid admin JWT or session token.');
  process.exit(1);
}

async function api(path, opts={}){
  const res = await fetch(API + path, {
    headers: { 'Authorization': `Bearer ${TOKEN}`, 'Content-Type':'application/json' },
    ...opts,
  });
  const text = await res.text();
  try { return { ok: res.ok, status: res.status, body: JSON.parse(text) }; } catch(e){ return { ok: res.ok, status: res.status, body: text }; }
}

async function run(){
  console.log('API:', API);

  console.log('\n1) List users (GET /api/admin/users)');
  let r = await api('/api/admin/users');
  console.log(r.status, r.ok);
  console.log(r.body);

  // Create test user
  console.log('\n2) Create user (POST /api/admin/users-mutations)');
  const testUser = { email: `test+${Date.now()}@example.com`, name: 'Test API', roles: ['user'] };
  r = await api('/api/admin/users-mutations', { method: 'POST', body: JSON.stringify(testUser) });
  console.log(r.status, r.ok);
  console.log(r.body);
  if (!r.ok){ console.error('Create failed, stopping'); return; }
  const created = r.body;
  const userId = created && (created._id || created.id || created.id);
  console.log('Created id:', userId);

  // Update user
  console.log('\n3) Update user (PUT /api/admin/users/:id)');
  const update = { name: 'Test API Updated', roles: ['user','subadmin'] };
  r = await api(`/api/admin/users/${encodeURIComponent(userId)}`, { method: 'PUT', body: JSON.stringify(update) });
  console.log(r.status, r.ok);
  console.log(r.body);

  // Delete user
  console.log('\n4) Delete user (DELETE /api/admin/users/:id)');
  r = await api(`/api/admin/users/${encodeURIComponent(userId)}`, { method: 'DELETE' });
  console.log(r.status, r.ok);
  console.log(r.body);
}

run().catch(e=>{ console.error('Error', e); process.exit(1); });

// --- Helpers to grant/revoke permissions and print a curl for creating news ---
async function grantPermission(email, permission){
  console.log(`Granting permission ${permission} to ${email}`);
  return await api(`/admin/users/${encodeURIComponent(email)}/permissions`, { method: 'POST', body: JSON.stringify({ permission }) });
}

async function revokePermission(email, permission){
  console.log(`Revoking permission ${permission} from ${email}`);
  return await api(`/admin/users/${encodeURIComponent(email)}/permissions`, { method: 'DELETE', body: JSON.stringify({ permission }) });
}

function printCreateNewsCurl(email){
  const curl = `curl -X POST '${API}/api/news' \
  -H 'X-User: ${email}' \
  -H 'X-Roles: ["author"]' \
  -H 'X-Admin: false' \
  -F 'title=Prueba desde curl' \
  -F 'subtitle=Subtitulo' \
  -F 'description=Contenido de prueba' \
  -F 'image=@/path/to/test-image.jpg'`;
  console.log('\nRun this curl to test creating a news item as', email,':\n');
  console.log(curl);
}

module.exports = { api, grantPermission, revokePermission, printCreateNewsCurl };
