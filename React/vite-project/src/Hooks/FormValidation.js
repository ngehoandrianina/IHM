export function validateForm(fields, rules) {
    const errors = {};
  
    for (const fieldName in rules) {
      const value = fields[fieldName];
      const rule = rules[fieldName];
  
      if (rule.required && !value?.trim()) {
        errors[fieldName] = "Ce champ est requis.";
      } else if (rule.pattern && !rule.pattern.test(value)) {
        errors[fieldName] = rule.message || "Format invalide.";
      } else if (rule.minLength && value.length < rule.minLength) {
        errors[fieldName] = `Minimum ${rule.minLength} caractères.`;
      }
      // Ajoute d'autres règles selon tes besoins
    }
  
    return errors;
  }