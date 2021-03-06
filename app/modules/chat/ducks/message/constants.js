import { namespace as rootNamespace, selector as rootSelector } from '../constants';

export const SLICE_NAME = 'message';
export const namespace = `${rootNamespace}/${SLICE_NAME}`;
export const selector = (state) => rootSelector(state)[SLICE_NAME];
