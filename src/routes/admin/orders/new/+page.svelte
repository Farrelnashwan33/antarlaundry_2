<script lang="ts">
  import { enhance } from '$app/forms';
  
  let { data } = $props();
  
  let selectedCustomerId = $state('');
  
  let selectedCustomer = $derived(
    data.customers.find((c: any) => c.id === selectedCustomerId)
  );
  
  let availableAddresses = $derived(
    selectedCustomer?.customerProfile?.addresses || []
  );
  
  let isSubmitting = $state(false);
</script>

<svelte:head>
  <title>New Order - Admin Dashboard</title>
</svelte:head>

<div class="flex flex-col gap-6 w-full max-w-3xl mx-auto">
  
  <!-- Breadcrumb and Title -->
  <div class="flex flex-col gap-1">
    <div class="flex items-center gap-2 text-[11px] text-surface-500 font-medium">
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
      <span>&rsaquo;</span>
      <a href="/admin" class="hover:text-surface-900 transition-colors">Admin</a>
      <span>&rsaquo;</span>
      <a href="/admin/orders" class="hover:text-surface-900 transition-colors">Orders</a>
      <span>&rsaquo;</span>
      <span>New Order</span>
    </div>
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bold text-surface-900 tracking-tight">Create New Order</h1>
    </div>
  </div>

  <div class="bg-white rounded-xl shadow-sm border border-surface-100 overflow-hidden">
    <form 
      method="POST" 
      class="p-6 flex flex-col gap-6"
      use:enhance={() => {
        isSubmitting = true;
        return async ({ update }) => {
          await update();
          isSubmitting = false;
        };
      }}
    >
      
      <!-- Customer Section -->
      <div>
        <h2 class="text-lg font-semibold text-surface-900 mb-4 pb-2 border-b border-surface-100">Customer Details</h2>
        <div class="grid grid-cols-1 gap-4">
          <div class="flex flex-col gap-1.5">
            <label for="customerId" class="text-sm font-medium text-surface-700">Select Customer <span class="text-red-500">*</span></label>
            <select 
              id="customerId" 
              name="customerId" 
              bind:value={selectedCustomerId}
              required
              class="w-full px-3 py-2 border border-surface-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            >
              <option value="" disabled>-- Choose a customer --</option>
              {#each data.customers as customer}
                <option value={customer.id}>{customer.name} ({customer.phone || customer.email})</option>
              {/each}
            </select>
          </div>
          
          {#if selectedCustomerId && availableAddresses.length > 0}
            <div class="flex flex-col gap-1.5">
              <label for="pickupAddressId" class="text-sm font-medium text-surface-700">Pickup / Delivery Address <span class="text-red-500">*</span></label>
              <select 
                id="pickupAddressId" 
                name="pickupAddressId" 
                required
                class="w-full px-3 py-2 border border-surface-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              >
                {#each availableAddresses as address}
                  <option value={address.id}>{address.label} - {address.fullAddress}, {address.city}</option>
                {/each}
              </select>
            </div>
          {:else if selectedCustomerId && availableAddresses.length === 0}
            <div class="p-4 bg-yellow-50 text-yellow-800 rounded-lg border border-yellow-200 text-sm">
              <span class="font-semibold">Warning:</span> This customer does not have any saved addresses. An address is required to create an order.
            </div>
          {/if}
        </div>
      </div>

      <!-- Service Details -->
      <div>
        <h2 class="text-lg font-semibold text-surface-900 mb-4 pb-2 border-b border-surface-100">Service Details</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex flex-col gap-1.5">
            <label for="serviceId" class="text-sm font-medium text-surface-700">Laundry Service <span class="text-red-500">*</span></label>
            <select 
              id="serviceId" 
              name="serviceId" 
              required
              class="w-full px-3 py-2 border border-surface-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            >
              <option value="" disabled selected>-- Choose a service --</option>
              {#each data.services as service}
                <option value={service.id}>{service.name} (Rp {Number(service.pricePerKg).toLocaleString('id-ID')}/Kg)</option>
              {/each}
            </select>
          </div>
          
          <div class="flex flex-col gap-1.5">
            <label for="weight" class="text-sm font-medium text-surface-700">Estimated Weight (Kg) <span class="text-surface-400 font-normal">(Optional)</span></label>
            <input 
              type="number" 
              id="weight" 
              name="weight" 
              step="0.1" 
              min="0"
              placeholder="e.g. 5"
              class="w-full px-3 py-2 border border-surface-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
          
          <div class="flex flex-col gap-1.5">
            <label for="pickupDate" class="text-sm font-medium text-surface-700">Pickup Date <span class="text-red-500">*</span></label>
            <input 
              type="datetime-local" 
              id="pickupDate" 
              name="pickupDate" 
              required
              class="w-full px-3 py-2 border border-surface-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
        </div>
        
        <div class="mt-4 flex flex-col gap-1.5">
          <label for="notes" class="text-sm font-medium text-surface-700">Additional Notes <span class="text-surface-400 font-normal">(Optional)</span></label>
          <textarea 
            id="notes" 
            name="notes" 
            rows="3"
            placeholder="Any special requests or details for the courier/laundry..."
            class="w-full px-3 py-2 border border-surface-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          ></textarea>
        </div>
      </div>
      
      <!-- Actions -->
      <div class="flex justify-end gap-3 pt-4 border-t border-surface-100">
        <a href="/admin/orders" class="px-5 py-2 text-sm font-medium text-surface-700 bg-white border border-surface-300 rounded-lg hover:bg-surface-50 transition-colors">
          Cancel
        </a>
        <button 
          type="submit" 
          disabled={isSubmitting || !selectedCustomerId || availableAddresses.length === 0}
          class="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
        >
          {#if isSubmitting}
            <svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Creating...
          {:else}
            Create Order
          {/if}
        </button>
      </div>

    </form>
  </div>
</div>
