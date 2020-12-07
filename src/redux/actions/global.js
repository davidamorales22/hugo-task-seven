import { createAction } from '@reduxjs/toolkit';

export const handleError = createAction("handleError");
export const reset = createAction("reset");
export const setGlobalState = createAction("setGlobalState");