export function updateField(field, value) { return { type: 'UPDATE_FILTER_FIELD', field, value }}

export function updateCheckBox(field) { return { type: 'UPDATE_FILTER_CHECKBOX', field }}

export function updateOrder(value) { return { type: 'UPDATE_FILTER_ORDER', value }}

export function updateIndex(delta, MaxIndex) { return { type: 'UPDATE_FILTER_INDEX', delta, MaxIndex }}
