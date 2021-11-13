using System;
using System.ComponentModel.DataAnnotations;

namespace Exam.Validators
{
    public class FutureAttribute:ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            DateTime dateTime = Convert.ToDateTime(value);

            if (dateTime > DateTime.Now)
            {
                return new ValidationResult("The date must be future.");
            }
            return ValidationResult.Success;
        }
    }
}