<script lang="ts">
  import { enhance } from '$app/forms';

  let { data } = $props();
  let staffUsers = $derived(data.staffUsers);
  let isAddingStaff = $state(false);
  let searchQuery = $state('');
  let editingStaff: any = $state(null);

  let filteredStaff = $derived(
    staffUsers.filter((staff: any) => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        staff.name?.toLowerCase().includes(q) ||
        staff.email?.toLowerCase().includes(q) ||
        staff.role?.toLowerCase().includes(q)
      );
    })
  );
</script>

<svelte:head>
  <title>User & Roles - Admin Dashboard</title>
</svelte:head>

<!-- Edit Staff Modal -->
{#if editingStaff}
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-900/50 backdrop-blur-sm">
    <div class="bg-white rounded-xl shadow-xl border border-surface-100 w-full max-w-md flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
      <div class="flex justify-between items-center p-5 border-b border-surface-100 bg-surface-50/50">
        <h3 class="text-lg font-bold text-surface-900">Edit Staff Data</h3>
        <button onclick={() => editingStaff = null} class="text-surface-400 hover:text-surface-600" aria-label="Close modal"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
      </div>
      <form method="POST" action="?/updateStaff" use:enhance={() => {
        return async ({ update }) => {
          await update();
          editingStaff = null;
        };
      }} class="p-5 flex flex-col gap-4">
        <input type="hidden" name="userId" value={editingStaff.id} />
        
        <div class="flex flex-col gap-1">
          <label for="edit-name" class="text-xs font-medium text-surface-700">Full Name</label>
          <input type="text" id="edit-name" name="name" value={editingStaff.name} required class="w-full px-3 py-2 text-sm border border-surface-200 rounded-md focus:outline-none focus:border-blue-500">
        </div>
        <div class="flex flex-col gap-1">
          <label for="edit-email" class="text-xs font-medium text-surface-700">Email Address</label>
          <input type="email" id="edit-email" name="email" value={editingStaff.email} required class="w-full px-3 py-2 text-sm border border-surface-200 rounded-md focus:outline-none focus:border-blue-500">
        </div>
        <div class="flex flex-col gap-1">
          <label for="edit-phone" class="text-xs font-medium text-surface-700">Phone Number (Optional)</label>
          <input type="tel" id="edit-phone" name="phone" value={editingStaff.phone || ''} class="w-full px-3 py-2 text-sm border border-surface-200 rounded-md focus:outline-none focus:border-blue-500">
        </div>
        <div class="flex flex-col gap-1">
          <label for="edit-role" class="text-xs font-medium text-surface-700">Role</label>
          <select id="edit-role" name="role" class="w-full px-3 py-2 text-sm border border-surface-200 rounded-md focus:outline-none focus:border-blue-500">
            <option value="ADMIN" selected={editingStaff.role === 'ADMIN'}>Admin</option>
            <option value="COURIER" selected={editingStaff.role === 'COURIER'}>Courier</option>
            <option value="STAFF" selected={editingStaff.role === 'STAFF'}>Staff</option>
            <option value="CUSTOMER" selected={editingStaff.role === 'CUSTOMER'}>Demote to Customer</option>
          </select>
        </div>
        <div class="flex flex-col gap-1 border-t border-surface-100 mt-2 pt-2">
          <label for="edit-password" class="text-xs font-medium text-surface-700">Reset Password (Opsional)</label>
          <input type="text" id="edit-password" name="password" class="w-full px-3 py-2 text-sm border border-surface-200 rounded-md focus:outline-none focus:border-blue-500" placeholder="Biarkan kosong jika tidak ingin mengubah password">
          <p class="text-[10px] text-surface-500">Jika diisi, kata sandi pengguna ini akan langsung diganti dengan yang baru.</p>
        </div>
        <div class="flex justify-end gap-2 mt-4 pt-4 border-t border-surface-100">
          <button type="button" onclick={() => editingStaff = null} class="px-4 py-2 text-sm font-medium text-surface-600 bg-white border border-surface-200 rounded-md hover:bg-surface-50">Cancel</button>
          <button type="submit" class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 shadow-sm">Save Changes</button>
        </div>
      </form>
    </div>
  </div>
{/if}

<div class="flex flex-col gap-6 w-full">
  
  <!-- Breadcrumb and Title -->
  <div class="flex flex-col gap-1">
    <div class="flex items-center gap-2 text-[11px] text-surface-500 font-medium">
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
      <span>&rsaquo;</span>
      <a href="/admin" class="hover:text-surface-900 transition-colors">Admin</a>
      <span>&rsaquo;</span>
      <span>Users & Roles</span>
    </div>
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bold text-surface-900 tracking-tight">Users & Roles</h1>
      <button onclick={() => isAddingStaff = !isAddingStaff} class="flex items-center gap-1 bg-blue-600 text-white shadow-sm px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg> Add Staff
      </button>
    </div>
  </div>

  {#if isAddingStaff}
    <div class="bg-white rounded-xl shadow-sm border border-surface-100 p-5 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-200">
      <div class="flex justify-between items-center border-b border-surface-100 pb-3">
        <h3 class="text-lg font-bold text-surface-900">Add New Staff</h3>
        <button onclick={() => isAddingStaff = false} class="text-surface-400 hover:text-surface-600" aria-label="Close modal"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
      </div>
      <form method="POST" action="?/addStaff" use:enhance={() => {
        return async ({ update }) => {
          await update();
          isAddingStaff = false;
        };
      }} class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="flex flex-col gap-1">
          <label for="new-name" class="text-xs font-medium text-surface-700">Full Name</label>
          <input type="text" id="new-name" name="name" required class="w-full px-3 py-2 text-sm border border-surface-200 rounded-md focus:outline-none focus:border-blue-500" placeholder="e.g. John Doe">
        </div>
        <div class="flex flex-col gap-1">
          <label for="new-email" class="text-xs font-medium text-surface-700">Email Address</label>
          <input type="email" id="new-email" name="email" required class="w-full px-3 py-2 text-sm border border-surface-200 rounded-md focus:outline-none focus:border-blue-500" placeholder="e.g. john@antarlaundry.com">
        </div>
        <div class="flex flex-col gap-1">
          <label for="new-phone" class="text-xs font-medium text-surface-700">Phone Number (Optional)</label>
          <input type="tel" id="new-phone" name="phone" class="w-full px-3 py-2 text-sm border border-surface-200 rounded-md focus:outline-none focus:border-blue-500" placeholder="e.g. 08123456789">
        </div>
        <div class="flex flex-col gap-1">
          <label for="new-password" class="text-xs font-medium text-surface-700">Temporary Password</label>
          <input type="text" id="new-password" name="password" required class="w-full px-3 py-2 text-sm border border-surface-200 rounded-md focus:outline-none focus:border-blue-500" placeholder="e.g. pass1234">
        </div>
        <div class="flex flex-col gap-1 md:col-span-2">
          <div class="text-xs font-medium text-surface-700">Role</div>
          <div class="flex gap-4 mt-1">
            <label class="flex items-center gap-2 text-sm text-surface-700 cursor-pointer">
              <input type="radio" name="role" value="COURIER" checked class="text-blue-600 focus:ring-blue-500"> Courier
            </label>
            <label class="flex items-center gap-2 text-sm text-surface-700 cursor-pointer">
              <input type="radio" name="role" value="ADMIN" class="text-blue-600 focus:ring-blue-500"> Admin
            </label>
            <label class="flex items-center gap-2 text-sm text-surface-700 cursor-pointer">
              <input type="radio" name="role" value="STAFF" class="text-blue-600 focus:ring-blue-500"> Staff
            </label>
          </div>
        </div>
        <div class="md:col-span-2 flex justify-end mt-2 pt-4 border-t border-surface-100">
          <button type="submit" class="bg-blue-600 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">Create Account</button>
        </div>
      </form>
    </div>
  {/if}

  <div class="bg-white rounded-xl shadow-sm border border-surface-100 flex flex-col overflow-hidden">
    <!-- Table Header/Filters -->
    <div class="p-5 border-b border-surface-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div class="relative w-full md:w-64">
        <svg class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        <input type="text" bind:value={searchQuery} placeholder="Search staff..." class="w-full pl-9 pr-4 py-1.5 text-sm border border-surface-200 rounded-md focus:outline-none focus:border-blue-500">
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="w-full text-sm text-left whitespace-nowrap">
        <thead class="text-[11px] uppercase tracking-wider text-surface-400 border-b border-surface-100 bg-surface-50/50">
          <tr>
            <th class="px-5 py-3 font-medium">User Info</th>
            <th class="px-5 py-3 font-medium">Contact</th>
            <th class="px-5 py-3 font-medium">Role</th>
            <th class="px-5 py-3 font-medium">Join Date</th>
            <th class="px-5 py-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-surface-100/60">
          {#each filteredStaff as staff}
            <tr class="hover:bg-surface-50/50 transition-colors">
              <td class="px-5 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-slate-100 text-slate-600 border border-slate-200 flex items-center justify-center font-bold text-xs">
                    {staff.name.substring(0, 2).toUpperCase()}
                  </div>
                  <span class="font-medium text-surface-900">{staff.name}</span>
                </div>
              </td>
              <td class="px-5 py-4">
                <div class="flex flex-col">
                  <span class="text-surface-600">{staff.email}</span>
                  <span class="text-xs text-surface-500">{staff.phone || '-'}</span>
                </div>
              </td>
              <td class="px-5 py-4">
                {#if staff.role === 'ADMIN'}
                  <span class="text-purple-600 bg-purple-50 border border-purple-100/50 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Admin</span>
                {:else if staff.role === 'COURIER'}
                  <span class="text-blue-600 bg-blue-50 border border-blue-100/50 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Courier</span>
                {:else}
                  <span class="text-slate-600 bg-slate-50 border border-slate-100/50 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">{staff.role}</span>
                {/if}
              </td>
              <td class="px-5 py-4 text-surface-500">
                {new Date(staff.createdAt).toLocaleDateString('id-ID')}
              </td>
              <td class="px-5 py-4 text-right flex items-center justify-end gap-2">
                <button onclick={() => editingStaff = staff} class="flex items-center gap-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded font-medium transition-colors shadow-sm">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg> Edit
                </button>
                <form method="POST" action="?/deleteStaff" use:enhance onsubmit={(e) => { if(!confirm(`Yakin ingin menghapus staf ${staff.name}?`)) e.preventDefault(); }}>
                  <input type="hidden" name="userId" value={staff.id} />
                  <button type="submit" class="text-red-500 hover:text-red-700 p-1.5 rounded hover:bg-red-50 transition-colors" title="Delete Staff" aria-label="Delete Staff">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  </button>
                </form>
              </td>
            </tr>
          {:else}
            <tr>
              <td colspan="5" class="px-5 py-8 text-center text-surface-500">
                {searchQuery ? `No staff match "${searchQuery}"` : "No staff users found."}
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="p-4 border-t border-surface-100 flex items-center justify-between text-sm text-surface-500">
      <div>Showing <span class="font-medium text-surface-900">{filteredStaff.length}</span> results</div>
    </div>
  </div>
</div>
