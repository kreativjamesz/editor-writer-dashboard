<script setup lang="ts">
import type { CompanyCombobox } from '@/types';
const open = ref(false);
const value = ref('');

const props = defineProps({
  modelValue: String,
  companies: Array,
});

console.log('modelValue', props.modelValue);
console.log('companies', props.companies);
</script>

<template>
  <div>
    <h1>Company Combo Box</h1>
    <!-- <Popover v-model:open="open">
      <PopoverTrigger as-child>
        <Button variant="outline" role="combobox" :aria-expanded="open" class="w-[200px] justify-between">
          {{ value ? companies.find((company) => company.value === value)?.label : 'Select company...' }}
          <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent class="w-[200px] p-0">
        <Command v-model="value">
          <CommandInput placeholder="Search company..." />
          <CommandEmpty>No company found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              <CommandItem
                v-for="company in companies"
                :key="company.value"
                :value="company.value"
                @select="open = false"
              >
                <Check :class="cn('mr-2 h-4 w-4', value === company.value ? 'opacity-100' : 'opacity-0')" />
                {{ company.label }}
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover> -->
  </div>
</template>
