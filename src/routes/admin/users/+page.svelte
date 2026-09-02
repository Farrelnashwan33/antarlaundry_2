<script lang="ts">
	import { enhance } from '$app/forms';

	let { data, form } = $props();
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
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-surface-900/50 p-4 backdrop-blur-sm"
	>
		<div
			class="animate-in fade-in zoom-in-95 flex w-full max-w-md flex-col overflow-hidden rounded-xl border border-surface-100 bg-white shadow-xl duration-200"
		>
			<div
				class="flex items-center justify-between border-b border-surface-100 bg-surface-50/50 p-5"
			>
				<h3 class="text-lg font-bold text-surface-900">Edit Staff Data</h3>
				<button
					onclick={() => (editingStaff = null)}
					class="text-surface-400 hover:text-surface-600"
					aria-label="Close modal"
					><svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						></path></svg
					></button
				>
			</div>
			<form
				method="POST"
				action="?/updateStaff"
				use:enhance={() => {
					return async ({ update }) => {
						await update();
						editingStaff = null;
					};
				}}
				class="flex flex-col gap-4 p-5"
			>
				<input type="hidden" name="userId" value={editingStaff.id} />

				<div class="flex flex-col gap-1">
					<label for="edit-name" class="text-xs font-medium text-surface-700">Full Name</label>
					<input
						type="text"
						id="edit-name"
						name="name"
						value={editingStaff.name}
						required
						class="w-full rounded-md border border-surface-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
					/>
				</div>
				<div class="flex flex-col gap-1">
					<label for="edit-email" class="text-xs font-medium text-surface-700">Email Address</label>
					<input
						type="email"
						id="edit-email"
						name="email"
						value={editingStaff.email}
						required
						class="w-full rounded-md border border-surface-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
					/>
				</div>
				<div class="flex flex-col gap-1">
					<label for="edit-phone" class="text-xs font-medium text-surface-700"
						>Phone Number (Optional)</label
					>
					<input
						type="tel"
						id="edit-phone"
						name="phone"
						value={editingStaff.phone || ''}
						class="w-full rounded-md border border-surface-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
					/>
				</div>
				<div class="flex flex-col gap-1">
					<label for="edit-role" class="text-xs font-medium text-surface-700">Role</label>
					<select
						id="edit-role"
						name="role"
						class="w-full rounded-md border border-surface-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
					>
						<option value="ADMIN" selected={editingStaff.role === 'ADMIN'}>Admin</option>
						<option value="COURIER" selected={editingStaff.role === 'COURIER'}>Go Laundry</option>
						<option value="STAFF" selected={editingStaff.role === 'STAFF'}>Staff Khusus</option>
						<option value="CUSTOMER" selected={editingStaff.role === 'CUSTOMER'}
							>Demote to Customer</option
						>
					</select>
				</div>
				<div class="mt-2 flex flex-col gap-1 border-t border-surface-100 pt-2">
					<label for="edit-password" class="text-xs font-medium text-surface-700"
						>Reset Password (Opsional)</label
					>
					<input
						type="text"
						id="edit-password"
						name="password"
						class="w-full rounded-md border border-surface-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
						placeholder="Biarkan kosong jika tidak ingin mengubah password"
					/>
					<p class="text-[10px] text-surface-500">
						Jika diisi, kata sandi pengguna ini akan langsung diganti dengan yang baru.
					</p>
				</div>
				<div class="mt-4 flex justify-end gap-2 border-t border-surface-100 pt-4">
					<button
						type="button"
						onclick={() => (editingStaff = null)}
						class="rounded-md border border-surface-200 bg-white px-4 py-2 text-sm font-medium text-surface-600 hover:bg-surface-50"
						>Cancel</button
					>
					<button
						type="submit"
						class="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
						>Save Changes</button
					>
				</div>
			</form>
		</div>
	</div>
{/if}

<div class="flex w-full flex-col gap-6">
	<!-- Breadcrumb and Title -->
	<div class="flex flex-col gap-1">
		<div class="flex items-center gap-2 text-[11px] font-medium text-surface-500">
			<svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
				></path></svg
			>
			<span>&rsaquo;</span>
			<a href="/admin" class="transition-colors hover:text-surface-900">Admin</a>
			<span>&rsaquo;</span>
			<span>Users & Roles</span>
		</div>
		<div class="flex items-center justify-between">
			<h1 class="text-3xl font-bold tracking-tight text-surface-900">Users & Roles</h1>
			<button
				onclick={() => (isAddingStaff = !isAddingStaff)}
				class="flex items-center gap-1 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
			>
				<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
					><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"
					></path></svg
				> Add Staff
			</button>
		</div>
	</div>

	{#if form?.error}
		<div
			class="animate-in fade-in rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600"
		>
			{form.error}
		</div>
	{/if}

	{#if isAddingStaff}
		<div
			class="animate-in fade-in slide-in-from-top-4 flex flex-col gap-4 rounded-xl border border-surface-100 bg-white p-5 shadow-sm duration-200"
		>
			<div class="flex items-center justify-between border-b border-surface-100 pb-3">
				<h3 class="text-lg font-bold text-surface-900">Add New Staff</h3>
				<button
					onclick={() => (isAddingStaff = false)}
					class="text-surface-400 hover:text-surface-600"
					aria-label="Close modal"
					><svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						></path></svg
					></button
				>
			</div>
			<form
				method="POST"
				action="?/addStaff"
				use:enhance={() => {
					return async ({ update }) => {
						await update();
						isAddingStaff = false;
					};
				}}
				class="grid grid-cols-1 gap-4 md:grid-cols-2"
			>
				<div class="flex flex-col gap-1">
					<label for="new-name" class="text-xs font-medium text-surface-700">Full Name</label>
					<input
						type="text"
						id="new-name"
						name="name"
						required
						class="w-full rounded-md border border-surface-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
						placeholder="e.g. John Doe"
					/>
				</div>
				<div class="flex flex-col gap-1">
					<label for="new-email" class="text-xs font-medium text-surface-700">Email Address</label>
					<input
						type="email"
						id="new-email"
						name="email"
						required
						class="w-full rounded-md border border-surface-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
						placeholder="e.g. john@antarlaundry.com"
					/>
				</div>
				<div class="flex flex-col gap-1">
					<label for="new-phone" class="text-xs font-medium text-surface-700"
						>Phone Number (Optional)</label
					>
					<input
						type="tel"
						id="new-phone"
						name="phone"
						class="w-full rounded-md border border-surface-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
						placeholder="e.g. 08123456789"
					/>
				</div>
				<div class="flex flex-col gap-1">
					<label for="new-password" class="text-xs font-medium text-surface-700"
						>Temporary Password</label
					>
					<input
						type="text"
						id="new-password"
						name="password"
						required
						class="w-full rounded-md border border-surface-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
						placeholder="e.g. pass1234"
					/>
				</div>
				<div class="flex flex-col gap-1 md:col-span-2">
					<div class="text-xs font-medium text-surface-700">Role</div>
					<div class="mt-1 flex gap-4">
						<label class="flex cursor-pointer items-center gap-2 text-sm text-surface-700">
							<input
								type="radio"
								name="role"
								value="COURIER"
								checked
								class="text-blue-600 focus:ring-blue-500"
							/> Go Laundry
						</label>
						<label class="flex cursor-pointer items-center gap-2 text-sm text-surface-700">
							<input
								type="radio"
								name="role"
								value="ADMIN"
								class="text-blue-600 focus:ring-blue-500"
							/> Admin
						</label>
						<label class="flex cursor-pointer items-center gap-2 text-sm text-surface-700">
							<input
								type="radio"
								name="role"
								value="STAFF"
								class="text-blue-600 focus:ring-blue-500"
							/> Staff
						</label>
					</div>
				</div>
				<div class="mt-2 flex justify-end border-t border-surface-100 pt-4 md:col-span-2">
					<button
						type="submit"
						class="rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
						>Create Account</button
					>
				</div>
			</form>
		</div>
	{/if}

	<div
		class="flex flex-col overflow-hidden rounded-xl border border-surface-100 bg-white shadow-sm"
	>
		<!-- Table Header/Filters -->
		<div
			class="flex flex-col items-start justify-between gap-4 border-b border-surface-100 p-5 md:flex-row md:items-center"
		>
			<div class="relative w-full md:w-64">
				<svg
					class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-surface-400"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					></path></svg
				>
				<input
					type="text"
					bind:value={searchQuery}
					placeholder="Search staff..."
					class="w-full rounded-md border border-surface-200 py-1.5 pr-4 pl-9 text-sm focus:border-blue-500 focus:outline-none"
				/>
			</div>
		</div>

		<!-- Table -->
		<div class="overflow-x-auto">
			<table class="w-full text-left text-sm whitespace-nowrap">
				<thead
					class="border-b border-surface-100 bg-surface-50/50 text-[11px] tracking-wider text-surface-400 uppercase"
				>
					<tr>
						<th class="px-5 py-3 font-medium">User Info</th>
						<th class="px-5 py-3 font-medium">Contact</th>
						<th class="px-5 py-3 font-medium">Role</th>
						<th class="px-5 py-3 font-medium">Join Date</th>
						<th class="px-5 py-3 text-right font-medium">Actions</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-surface-100/60">
					{#each filteredStaff as staff}
						<tr class="transition-colors hover:bg-surface-50/50">
							<td class="px-5 py-4">
								<div class="flex items-center gap-3">
									<div
										class="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-xs font-bold text-slate-600"
									>
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
									<span
										class="rounded-full border border-purple-100/50 bg-purple-50 px-2.5 py-1 text-[10px] font-bold tracking-wider text-purple-600 uppercase"
										>Admin</span
									>
								{:else if staff.role === 'COURIER'}
									<span
										class="rounded-full border border-blue-100/50 bg-blue-50 px-2.5 py-1 text-[10px] font-bold tracking-wider text-blue-600 uppercase"
										>Go Laundry</span
									>
								{:else}
									<span
										class="rounded-full border border-slate-100/50 bg-slate-50 px-2.5 py-1 text-[10px] font-bold tracking-wider text-slate-600 uppercase"
										>{staff.role}</span
									>
								{/if}
							</td>
							<td class="px-5 py-4 text-surface-500">
								{new Date(staff.createdAt).toLocaleDateString('id-ID')}
							</td>
							<td class="flex items-center justify-end gap-2 px-5 py-4 text-right">
								<button
									onclick={() => (editingStaff = staff)}
									class="flex items-center gap-1 rounded border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm transition-colors hover:bg-slate-100 hover:text-slate-900"
								>
									<svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
										><path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
										></path></svg
									> Edit
								</button>
								<form
									method="POST"
									action="?/deleteStaff"
									use:enhance
									onsubmit={(e) => {
										if (!confirm(`Yakin ingin menghapus staf ${staff.name}?`)) e.preventDefault();
									}}
								>
									<input type="hidden" name="userId" value={staff.id} />
									<button
										type="submit"
										class="rounded p-1.5 text-red-500 transition-colors hover:bg-red-50 hover:text-red-700"
										title="Delete Staff"
										aria-label="Delete Staff"
									>
										<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
											><path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
											></path></svg
										>
									</button>
								</form>
							</td>
						</tr>
					{:else}
						<tr>
							<td colspan="5" class="px-5 py-8 text-center text-surface-500">
								{searchQuery ? `No staff match "${searchQuery}"` : 'No staff users found.'}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<!-- Pagination -->
		<div
			class="flex items-center justify-between border-t border-surface-100 p-4 text-sm text-surface-500"
		>
			<div>
				Showing <span class="font-medium text-surface-900">{filteredStaff.length}</span> results
			</div>
		</div>
	</div>
</div>
