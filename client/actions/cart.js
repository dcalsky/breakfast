import { createAction } from 'redux-actions'

export const addFood = createAction('add food')
export const removeFood = createAction('remove food')
export const clearFood = createAction('clear food')
export const addIngredient = createAction('add ingredient')
export const removeIngredient = createAction('remove ingredient')