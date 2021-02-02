using System;
using System.Collections.Generic;
using Everest.AspNetStartup.Persistence;
using Exam.Entities;
using Exam.Persistence.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace ServerAppTest
{
    public class OrganisationBuilder
    {
        private IServiceProvider _serviceProvider;

        public OrganisationBuilder(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        School CreateSchool()
        {
            var repository = _serviceProvider.GetService<ISchoolRepository>();
            return repository.Save(new School
            {
                Name = "school",
                Acronym = "Acronym"
            });
        }

        List<Department> CreateDepartments(School school, int number)
        {
            var repository = _serviceProvider.GetService<IRepository<Department, long>>();
            List<Department> departments = new List<Department>();
            for (int i = 0; i < number; i++)
            {
                var department = repository.Save(new Department
                {
                    School = school,
                    Name = $"department{i}"
                });
                
                departments.Add(department);
            }

            return departments;
        }

        public List<Speciality> CreateSpecialities(Department department, int number)
        {
            var repository = _serviceProvider.GetService<IRepository<Speciality, long>>();
            List<Speciality> specialities = new List<Speciality>();
            for (int i = 0; i < number; i++)
            {
                var speciality = repository.Save(new Speciality
                {
                    Department = department,
                    Name = $"speciality{i}"
                });
                
                specialities.Add(speciality);
            }

            return specialities;
        }
    }
}