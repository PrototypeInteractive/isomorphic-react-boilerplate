export const SET_VERSION = 'SET_VERSION';
export const SET_LABELS = 'SET_LABELS';

export const setVersion = data => ({
  type: SET_VERSION,
  data
});

export const setLabels = data => ({
  type: SET_LABELS,
  data
});
