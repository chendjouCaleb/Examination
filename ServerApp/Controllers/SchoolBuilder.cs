using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Exam.Controllers.Courses;
using Exam.Entities;
using Exam.Entities.Courses;
using Exam.Identity;
using Exam.Infrastructure;
using Exam.Models;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace Exam.Controllers
{
    public class SchoolBuilder
    {
        private static string schoolAdminUserId = "2799facb-25fe-46db-8b50-f21514e5ae3b";
        private IServiceProvider _serviceProvider;
        private ILogger<SchoolBuilder> _logger;

        private Speciality statisticsSpeciality;

        private StudentController _studentController;
        private CourseController _courseController;
        private LevelController _levelController;
        private LevelSpecialityController _levelSpecialityController;

        public SchoolBuilder(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
            _logger = serviceProvider.GetRequiredService<ILogger<SchoolBuilder>>();
            _studentController = _serviceProvider.GetRequiredService<StudentController>();
            _courseController = _serviceProvider.GetRequiredService<CourseController>();
            _levelController = _serviceProvider.GetRequiredService<LevelController>();
            _levelSpecialityController = _serviceProvider.GetRequiredService<LevelSpecialityController>();
        }

        public async Task<School> CreateSchool()
        {
            _logger.LogInformation("Creating school");
            var controller = _serviceProvider.GetService<SchoolController>();
            var form = new SchoolForm
            {
                Name = "Faculté des sciences",
                Identifier = "facultedesscience",
                Acronym = "FS",
                Address = "Yaoundé, UY1"
            };
            School school = controller.Add(form, new LoggedUser {UserId = schoolAdminUserId})
                .Value as School;

            school.Departments = await CreateDepartment(school);

            return school;
        }

        async Task<List<Department>> CreateDepartment(School school)
        {
            var controller = _serviceProvider.GetService<DepartmentController>();
            var principalController = _serviceProvider.GetService<PrincipalController>();
            List<Department> departments = new List<Department>();
            
            {
                _logger.LogInformation("Creating Department");
                var form = new AddDepartmentForm
                {
                    Name = $"Mathématiques",
                    Acronym = $"MATH",
                    Address = "Department address",
                    UserId = schoolAdminUserId
                };
                var department = controller.Add(school, form).Value as Department;
                _logger.LogInformation($"Department {department.Name} is created");

                Principal principal = principalController._Add(department, schoolAdminUserId);
                department.Principals = new List<Principal>(new[] {principal});
                
                department.Specialities = new List<Speciality>();
                statisticsSpeciality = CreateSpeciality(department);
                department.Specialities.Add(statisticsSpeciality);

                department.Levels = new List<Level>();
                department.Levels.Add(await CreateLevel1(department));
                department.Levels.Add(await CreateLevel2(department));
                
                

                departments.Add(department);
            }

            return departments;
        }

        public Speciality CreateSpeciality(Department department)
        {
            var controller = _serviceProvider.GetService<SpecialityController>();
            
                var form = new SpecialityForm
                {
                    Name = $"Statistiques",
                    Description = "Analyse et description des données"
                };
                var speciality = controller.Add(department, form);

                return speciality;
        }


        public async Task<Level> CreateLevel1(Department department)
        {
            var level = _levelController.Add(department);
            
            level.Courses = _CreateLevelCourse(level, new long[] { }, "level1-courses.json");
            
            var statisticsLevelSpeciality = _levelSpecialityController.Add(level, statisticsSpeciality).Value as LevelSpeciality;
            _CreateLevelCourse(level, new[] {statisticsLevelSpeciality.Id}, "level1-statistics-courses.json");


            List<StudentForm> studentForms = GetStudentForms("students-level1.json");

            for (int i = 0; i < studentForms.Count; i++)
            {
                studentForms[i].RegistrationId = ("1" + i + studentForms[i].RegistrationId).ToUpper();;
                var student = (await _studentController.Add(studentForms[i], level, 
                        i%3 == 0 ? statisticsLevelSpeciality : null
                        , level.Department.Principals[0]))
                    .Value as Student;
            }

            return level;
        }
        
        public async Task<Level> CreateLevel2(Department department)
        {
            var level = _levelController.Add(department);

            level.Courses = _CreateLevelCourse(level, new long[] { }, "level2-courses.json");
            
            List<StudentForm> studentForms = GetStudentForms("students-level2.json");
            level.Students = new List<Student>();

            for (int i = 0; i < studentForms.Count; i++)
            {
                studentForms[i].RegistrationId = ("2" + i + studentForms[i].RegistrationId).ToUpper();
                var student = (await _studentController.Add(studentForms[i], level,  null
                        , level.Department.Principals[0])
                    ).Value as Student;
                level.Students.Add(student);
            }

            return level;
        }

        private List<Course> _CreateLevelCourse(Level level, long[] levelSpecialityId, string fileName)
        {
            List<CourseForm> forms = GetCourseForms(fileName);
            var courses = new List<Course>();

            foreach (var form in forms)
            {
                Course  course = _courseController.Add(form, level, levelSpecialityId).Value as Course;
                courses.Add(course);
            }

            return courses;
        }
        

        List<StudentForm> GetStudentForms(string fileName)
        {
            string text = File.ReadAllText(Path.Join(Directory.GetCurrentDirectory(), fileName));
            return JsonConvert.DeserializeObject<List<StudentForm>>( text);
        }
        
        
        List<CourseForm> GetCourseForms(string fileName)
        {
            string text = File.ReadAllText(Path.Join(Directory.GetCurrentDirectory(), fileName));
            return JsonConvert.DeserializeObject<List<CourseForm>>( text);
        }
    }
}