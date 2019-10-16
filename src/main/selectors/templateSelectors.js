export const getTemplates = (state) => (state && state.templates && state.templates.listTemplates) || [];


export const getCurrentTemplate = (state) => (state && state.templates && state.templates.currentTemplate) || {};
