<script lang="ts">
  import { enhance } from '$app/forms';

  let { data } = $props();
  let services = $derived(data.services);

  let isAddingService = $state(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };
</script>

<svelte:head>
  <title>Services - Admin Dashboard</title>
</svelte:head>

<div class="flex flex-col gap-6 w-full">
  
  <!-- Breadcrumb and Title -->
  <div class="flex flex-col gap-1">
    <div class="flex items-center gap-2 text-[11px] text-surface-500 font-medium">
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
      <span>&rsaquo;</span>
      <a href="/admin" class="hover:text-surface-900 transition-colors">Admin</a>
      <span>&rsaquo;</span>
      <span>Services</span>
    </div>
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bold text-surface-900 tracking-tight">Services & Pricing</h1>
      <button onclick={() => isAddingService = !isAddingService} class="flex items-center gap-1 bg-blue-600 text-white shadow-sm px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg> 
        {isAddingService ? 'Cancel' : 'Add Service'}
      </button>
    </div>
  </div>

  {#if isAddingService}
    <div class="bg-white rounded-xl shadow-sm border border-surface-100 p-6 animate-fade-in">
      <h3 class="text-lg font-medium text-surface-900 mb-4">Create New Service</h3>
      <form method="POST" action="?/createService" use:enhance class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="flex flex-col gap-1">
          <label for="name" class="text-sm text-surface-700 font-medium">Service Name</label>
          <input type="text" id="name" name="name" required placeholder="e.g. Cuci Komplit" class="px-3 py-2 border border-surface-200 rounded-md focus:border-blue-500 outline-none">
        </div>
        <div class="flex flex-col gap-1">
          <label for="pricePerKg" class="text-sm text-surface-700 font-medium">Price per Kg (Rp)</label>
          <input type="number" id="pricePerKg" name="pricePerKg" required min="0" placeholder="e.g. 7000" class="px-3 py-2 border border-surface-200 rounded-md focus:border-blue-500 outline-none">
        </div>
        <div class="flex flex-col gap-1 md:col-span-2">
          <label for="description" class="text-sm text-surface-700 font-medium">Description</label>
          <textarea id="description" name="description" rows="2" placeholder="Describe what this service includes..." class="px-3 py-2 border border-surface-200 rounded-md focus:border-blue-500 outline-none"></textarea>
        </div>
        <div class="flex flex-col gap-1">
          <label for="estimatedDays" class="text-sm text-surface-700 font-medium">Estimated Days to Complete</label>
          <input type="number" id="estimatedDays" name="estimatedDays" required min="1" value="3" class="px-3 py-2 border border-surface-200 rounded-md focus:border-blue-500 outline-none">
        </div>
        <div class="flex flex-col gap-1 md:col-span-2 mt-2">
          <h4 class="text-sm font-semibold text-surface-800">Optional Rules</h4>
        </div>
        <div class="flex flex-col gap-1">
          <label for="minWeight" class="text-sm text-surface-700 font-medium">Min. Weight (Kg)</label>
          <input type="number" step="0.1" id="minWeight" name="minWeight" placeholder="e.g. 3" class="px-3 py-2 border border-surface-200 rounded-md focus:border-blue-500 outline-none">
        </div>
        <div class="flex flex-col gap-1">
          <label for="minPrice" class="text-sm text-surface-700 font-medium">Min. Price (Rp)</label>
          <input type="number" id="minPrice" name="minPrice" placeholder="e.g. 20000" class="px-3 py-2 border border-surface-200 rounded-md focus:border-blue-500 outline-none">
        </div>
        <div class="md:col-span-2 flex justify-end mt-4">
          <button type="submit" class="bg-blue-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
            Save Service
          </button>
        </div>
      </form>
    </div>
  {/if}

  <div class="bg-white rounded-xl shadow-sm border border-surface-100 flex flex-col overflow-hidden">
    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="w-full text-sm text-left whitespace-nowrap">
        <thead class="text-[11px] uppercase tracking-wider text-surface-400 border-b border-surface-100 bg-surface-50/50">
          <tr>
            <th class="px-5 py-3 font-medium">Service Name</th>
            <th class="px-5 py-3 font-medium">Description</th>
            <th class="px-5 py-3 font-medium">Est. Days</th>
            <th class="px-5 py-3 font-medium">Price / Kg</th>
            <th class="px-5 py-3 font-medium text-center">Status</th>
            <th class="px-5 py-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-surface-100/60">
          {#each services as service}
            <tr class="hover:bg-surface-50/50 transition-colors">
              <td class="px-5 py-4">
                <span class="font-medium text-surface-900">{service.name}</span>
              </td>
              <td class="px-5 py-4 text-surface-500 truncate max-w-[200px]" title={service.description}>
                {service.description || '-'}
              </td>
              <td class="px-5 py-4 text-surface-600">
                {service.estimatedDays} days
              </td>
              <td class="px-5 py-4">
                <form method="POST" action="?/updateService" use:enhance class="flex gap-2 items-center justify-end md:justify-start">
                  <input type="hidden" name="serviceId" value={service.id} />
                  <input type="hidden" name="estimatedDays" value={service.estimatedDays} />
                  <input type="hidden" name="isActive" value={service.isActive ? 'true' : 'false'} />
                  
                  <div class="flex flex-col gap-1">
                    <span class="text-[9px] text-surface-400 uppercase tracking-wider font-bold">Price/Kg</span>
                    <input 
                      type="number" 
                      name="pricePerKg" 
                      value={service.pricePerKg} 
                      min="0"
                      class="w-20 px-2 py-1 text-sm border border-surface-200 rounded focus:border-blue-500 outline-none" 
                      required 
                    />
                  </div>
                  <div class="flex flex-col gap-1">
                    <span class="text-[9px] text-surface-400 uppercase tracking-wider font-bold">Min Kg</span>
                    <input 
                      type="number" 
                      step="0.1"
                      name="minWeight" 
                      value={service.minWeight || ''} 
                      placeholder="-"
                      class="w-14 px-2 py-1 text-sm border border-surface-200 rounded focus:border-blue-500 outline-none" 
                    />
                  </div>
                  <div class="flex flex-col gap-1">
                    <span class="text-[9px] text-surface-400 uppercase tracking-wider font-bold">Min Rp</span>
                    <input 
                      type="number" 
                      name="minPrice" 
                      value={service.minPrice || ''} 
                      placeholder="-"
                      class="w-20 px-2 py-1 text-sm border border-surface-200 rounded focus:border-blue-500 outline-none" 
                    />
                  </div>
                  <div class="flex flex-col gap-1 justify-end h-full mt-3.5">
                    <button type="submit" class="px-2 py-1 text-xs bg-surface-100 text-surface-600 hover:bg-surface-200 rounded font-medium transition-colors">Save</button>
                  </div>
                </form>
              </td>
              <td class="px-5 py-4 text-center">
                <form method="POST" action="?/updateService" use:enhance>
                  <input type="hidden" name="serviceId" value={service.id} />
                  <input type="hidden" name="estimatedDays" value={service.estimatedDays} />
                  <input type="hidden" name="pricePerKg" value={service.pricePerKg} />
                  <input type="hidden" name="minWeight" value={service.minWeight || ''} />
                  <input type="hidden" name="minPrice" value={service.minPrice || ''} />
                  
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" name="isActive" class="sr-only peer" checked={service.isActive} onchange={(e) => e.currentTarget.form?.requestSubmit()}>
                    <div class="w-9 h-5 bg-surface-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-surface-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </form>
              </td>
              <td class="px-5 py-4 text-right">
                <button class="text-surface-400 hover:text-red-500 transition-colors" aria-label="Delete service">
                  <svg class="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
              </td>
            </tr>
          {:else}
            <tr>
              <td colspan="6" class="px-5 py-8 text-center text-surface-500">
                No services found.
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="p-4 border-t border-surface-100 flex items-center justify-between text-sm text-surface-500">
      <div>Showing <span class="font-medium text-surface-900">{services.length}</span> results</div>
    </div>
  </div>
</div>
