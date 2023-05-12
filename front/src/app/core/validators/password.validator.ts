import { AbstractControl, ValidationErrors } from "@angular/forms";

export function passwordValidator(control: AbstractControl): ValidationErrors | null {
    const password = <string>control.value;
    
    // Vérification de la présence d'au moins un chiffre, une lettre minuscule, une lettre majuscule et un caractère spécial
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

    if (!passwordRegex.test(password)) {
        return { invalidPassword: true };
    }

    return null;
}