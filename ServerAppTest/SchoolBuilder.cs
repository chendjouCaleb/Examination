using System;
using System.Collections.Generic;
using Everest.AspNetStartup.Persistence;
using Exam.Controllers.Periods;
using Exam.Entities;
using Exam.Entities.Periods;
using Exam.Models;
using Exam.Persistence.Repositories;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace ServerAppTest
{
    public class SchoolBuilder
    {
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
            var repository = _serviceProvider.GetService<ISchoolRepository>();
            School school = repository.Save(new School
            {
                Name = "school",
                Acronym = "Acronym"
            });

            school.Departments = CreateDepartments(school, 2);

            return school;
        }

        public Year CreateYear(School school)
        {
            YearForm _yearForm = new YearForm
            {
                ExpectedStartDate = DateTime.Now.AddDays(2),
                ExpectedEndDate = DateTime.Now.AddMonths(10)
            };

            var controller = _serviceProvider.GetService<YearController>();
            Year year = controller.Add(school, _yearForm).Value as Year;

            return year;
        }

        public List<YearTeacher> AddYearTeachers(Year year)
        {
            var yearTeacherController = _serviceProvider.GetRequiredService<YearTeacherController>();
            return yearTeacherController.AddTeachers(year);
        }
        
        public List<SemesterTeacher> AddSemesterTeachers(Semester semester)
        {
            var semesterTeacherController = _serviceProvider.GetRequiredService<SemesterTeacherController>();
            return semesterTeacherController.AddTeachers(semester);
        }
        
        public List<YearStudent> AddYearStudents(Year year)
        {
            var yearStudentController = _serviceProvider.GetRequiredService<YearStudentController>();
            return yearStudentController.AddStudents(year);
        }
        
        
        public Semester CreateSemester(Year year, DateTime? expectedStartDate = null, DateTime? expectedEndDate = null)
        {
            SemesterForm _semesterForm = new SemesterForm
            {
                ExpectedStartDate = expectedStartDate ?? DateTime.Now.AddDays(2),
                ExpectedEndDate = expectedEndDate ?? DateTime.Now.AddMonths(10)
            };

            var controller = _serviceProvider.GetService<SemesterController>();
            Semester semester = controller.Add(year, _semesterForm).Value as Semester;

            return semester;
        }

        List<Department> CreateDepartments(School school, int number)
        {
            var repository = _serviceProvider.GetService<IRepository<Department, long>>();
            List<Department> departments = new List<Department>();
            for (int i = 0; i < number; i++)
            {
                _logger.LogInformation("Creating Department");
                var department = repository.Save(new Department
                {
                    School = school,
                    Name = $"department{i}"
                });
                _logger.LogInformation($"Department {department.Name} is created");

                department.Levels = CreateLevels(department, 2);
                department.Specialities = CreateSpecialities(department, 2);
                department.Teachers = CreateTeachers(department);

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


        public List<Teacher> CreateTeachers(Department department, int number = 3)
        {
            var repository = _serviceProvider.GetService<IRepository<Teacher, long>>();
            List<Teacher> teachers = new List<Teacher>();
            for (int i = 0; i < number; i++)
            {
                var teacher = repository.Save(new Teacher
                {
                    Department = department,
                    UserId = Guid.NewGuid().ToString()
                });

                teachers.Add(teacher);
            }

            return teachers;
        }


        public List<Level> CreateLevels(Department department, int number)
        {
            var repository = _serviceProvider.GetService<IRepository<Level, long>>();
            List<Level> levels = new List<Level>();
            for (int i = 0; i < number; i++)
            {
                _logger.LogInformation("Creating Level");
                var level = repository.Save(new Level
                {
                    Department = department,
                    Index = i
                });

                level.Students = CreateStudents(level, 5);
                levels.Add(level);
                _logger.LogInformation($"The level {level.Index} is created");
            }

            return levels;
        }

        public List<LevelSpeciality> CreateLevelSpecialities(Level level, List<Speciality> specialities)
        {
            var repository = _serviceProvider.GetService<IRepository<LevelSpeciality, long>>();
            List<LevelSpeciality> levelSpecialities = new List<LevelSpeciality>();

            foreach (var speciality in specialities)
            {
                _logger.LogInformation("Creating LevelSpeciality");
                LevelSpeciality levelSpeciality = repository.Save(new LevelSpeciality
                {
                    Level = level,
                    Speciality = speciality
                });

                levelSpecialities.Add(levelSpeciality);
                levelSpeciality.Students = CreateStudents(levelSpeciality, 5);

                _logger.LogInformation($"LevelSpeciality: {levelSpeciality.Id} is created");
            }

            return levelSpecialities;
        }

        List<Student> CreateStudents(Level level, int number)
        {
            var repository = _serviceProvider.GetService<IRepository<Student, long>>();
            List<Student> students = new List<Student>();
            for (int i = 0; i < number; i++)
            {
                var student = repository.Save(new Student
                {
                    Level = level,
                    FullName = $"LevelStudent{i}",
                    RegistrationId = $"SL{level.Index}-{i}"
                });

                students.Add(student);
            }

            return students;
        }


        public List<Student> CreateStudents(LevelSpeciality levelSpeciality, int number)
        {
            var repository = _serviceProvider.GetService<IRepository<Student, long>>();
            List<Student> students = new List<Student>();
            for (int i = 0; i < number; i++)
            {
                var student = repository.Save(new Student
                {
                    Level = levelSpeciality.Level,
                    LevelSpeciality = levelSpeciality,
                    FullName = $"LevelSpecialityStudent{i}",
                    RegistrationId = $"SLS{levelSpeciality.Level.Index}-{levelSpeciality.Id}-{i}"
                });

                students.Add(student);
            }

            return students;
        }
    }
}