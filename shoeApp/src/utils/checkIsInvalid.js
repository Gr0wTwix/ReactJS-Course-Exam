export const checkIsInvalid = (formData) =>
    Object.values(formData)
        .some(formObj => formObj.isValid === false);