using System;
using System.Collections.Generic;
using Everest.AspNetStartup.Persistence;
using Exam.Entities;
using Exam.Infrastructure;
using Exam.Models;
using Exam.Persistence.Repositories;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace Exam.Controllers
{
    public class SchoolBuilder
    {
        private static string userId = "87cdaff0-bc80-4e7e-a2e6-34cc98c1cb03";
        private IServiceProvider _serviceProvider;
        private ILogger<SchoolBuilder> _logger;

        public SchoolBuilder(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
            _logger = serviceProvider.GetRequiredService<ILogger<SchoolBuilder>>();
        }

        public School CreateSchool()
        {
            _logger.LogInformation("Creating school");
            var controller = _serviceProvider.GetService<SchoolController>();
            var form = new SchoolForm
            {
                Name = "Faculté des sciences",
                Identifier = "facultescience",
                Acronym = "FS",
                Address = "Yaoundé, UY1"
            };
            School school = controller.Add(form, new User {Id = "87cdaff0-bc80-4e7e-a2e6-34cc98c1cb03"})
                .Value as School;

            school.Departments = CreateDepartments(school, 2);

            return school;
        }

        List<Department> CreateDepartments(School school, int number)
        {
            var controller = _serviceProvider.GetService<DepartmentController>();
            var principalController = _serviceProvider.GetService<PrincipalController>();
            List<Department> departments = new List<Department>();
            for (int i = 0; i < number; i++)
            {
                _logger.LogInformation("Creating Department");
                var form = new AddDepartmentForm
                {
                    Name = $"Department {i}",
                    Acronym = $"DEPT{i}",
                    Address = "Department address",
                    UserId = "87cdaff0-bc80-4e7e-a2e6-34cc98c1cb03"
                };
                var department = controller.Add(school, form).Value as Department;
                _logger.LogInformation($"Department {department.Name} is created");

                Principal principal = principalController._Add(department, userId);
                department.Principals = new List<Principal>(new[] {principal});

                department.Levels = CreateLevels(department, 2);
                department.Specialities = CreateSpecialities(department, 3);

                foreach (var level in department.Levels)
                {
                    CreateLevelSpecialities(level, department.Specialities);
                }

                departments.Add(department);
            }

            return departments;
        }

        public List<Speciality> CreateSpecialities(Department department, int number)
        {
            var controller = _serviceProvider.GetService<SpecialityController>();
            List<Speciality> specialities = new List<Speciality>();
            for (int i = 0; i < number; i++)
            {
                var form = new SpecialityForm
                {
                    Name = $"Speciality {i}",
                    Description = "speciality description"
                };
                var speciality = controller.Add(department, form);
                specialities.Add(speciality);
            }

            return specialities;
        }


        public List<Level> CreateLevels(Department department, int number)
        {
            var controller = _serviceProvider.GetService<LevelController>();
            List<Level> levels = new List<Level>();
            for (int i = 0; i < number; i++)
            {
                _logger.LogInformation("Creating Level");
                var level = controller.Add(department);

                level.Students = CreateStudents(level, 25);
                levels.Add(level);
                _logger.LogInformation($"The level {level.Index} is created");
            }

            return levels;
        }

        public List<LevelSpeciality> CreateLevelSpecialities(Level level, List<Speciality> specialities)
        {
            var controller = _serviceProvider.GetService<LevelSpecialityController>();
            List<LevelSpeciality> levelSpecialities = new List<LevelSpeciality>();

            foreach (var speciality in specialities)
            {
                _logger.LogInformation("Creating LevelSpeciality");
                LevelSpeciality levelSpeciality = controller.Add(level, speciality).Value as LevelSpeciality;

                levelSpecialities.Add(levelSpeciality);
                levelSpeciality.Students = CreateStudents(levelSpeciality, 25);

                _logger.LogInformation($"LevelSpeciality: {levelSpeciality.Id} is created");
            }

            return levelSpecialities;
        }

        List<Student> CreateStudents(Level level, int number)
        {
            var controller = _serviceProvider.GetService<StudentController>();
            List<Student> students = new List<Student>();
            for (int i = 0; i < number; i++)
            {
                var form = new StudentForm
                {
                    FullName = "Student Name",
                    BirthDate = DateTime.Now.AddYears(-20).AddDays(i),
                    Gender = i % 2 == 0 ? 'F' : 'M',
                    RegistrationId = $"SL-{level.Id}-{level.Index}-{i}"
                };
                var student = controller.Add(form, level, null, level.Department.Principals[0])
                    .Value as Student;
                students.Add(student);
            }

            return students;
        }


        public List<Student> CreateStudents(LevelSpeciality levelSpeciality, int number)
        {
            var controller = _serviceProvider.GetService<StudentController>();
            List<Student> students = new List<Student>();
            for (int i = 0; i < number; i++)
            {
                var form = new StudentForm
                {
                    FullName = $"LS Student {i} ",
                    BirthDate = DateTime.Now.AddYears(-20).AddDays(i),
                    Gender = i % 2 == 0 ? 'F' : 'M',
                    RegistrationId = $"SLS{levelSpeciality.Level.Index}-{levelSpeciality.Id}-{i}"
                };
                var level = levelSpeciality.Level;
                var student = controller.Add(form, level, levelSpeciality, level.Department.Principals[0])
                    .Value as Student;


                students.Add(student);
            }

            return students;
        }
    }
}