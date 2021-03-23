using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Exam.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TestGroupCorrectors",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RegistrationDate = table.Column<DateTime>(nullable: false),
                    CorrectorId = table.Column<long>(nullable: false),
                    TestGroupId = table.Column<long>(nullable: false),
                    PaperCount = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TestGroupCorrectors", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CourseSessions",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RegistrationDate = table.Column<DateTime>(nullable: false),
                    CourseTeacherId = table.Column<long>(nullable: true),
                    CourseHourId = table.Column<long>(nullable: true),
                    CourseId = table.Column<long>(nullable: false),
                    RoomId = table.Column<long>(nullable: true),
                    ExpectedStartDate = table.Column<DateTime>(nullable: true),
                    ExpectedEndDate = table.Column<DateTime>(nullable: true),
                    StartDate = table.Column<DateTime>(nullable: true),
                    EndDate = table.Column<DateTime>(nullable: true),
                    Objective = table.Column<string>(nullable: true),
                    Report = table.Column<string>(nullable: true),
                    Presence = table.Column<int>(nullable: true),
                    Lecture = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseSessions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TestLevelSpecialities",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RegistrationDate = table.Column<DateTime>(nullable: false),
                    TestId = table.Column<long>(nullable: true),
                    CourseLevelSpecialityId = table.Column<long>(nullable: true),
                    ExaminationLevelSpecialityId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TestLevelSpecialities", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CourseHours",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RegistrationDate = table.Column<DateTime>(nullable: false),
                    CourseId = table.Column<long>(nullable: false),
                    CourseTeacherId = table.Column<long>(nullable: true),
                    RoomId = table.Column<long>(nullable: true),
                    DayOfWeek = table.Column<int>(nullable: false),
                    StartHour = table.Column<TimeSpan>(nullable: false),
                    EndHour = table.Column<TimeSpan>(nullable: false),
                    Lecture = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseHours", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CourseLevelSpecialities",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RegistrationDate = table.Column<DateTime>(nullable: false),
                    CourseId = table.Column<long>(nullable: true),
                    LevelSpecialityId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseLevelSpecialities", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CourseTeachers",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RegistrationDate = table.Column<DateTime>(nullable: false),
                    CourseId = table.Column<long>(nullable: true),
                    TeacherId = table.Column<long>(nullable: true),
                    Tutorial = table.Column<bool>(nullable: false),
                    Lecture = table.Column<bool>(nullable: false),
                    IsPrincipal = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseTeachers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Scores",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RegistrationDate = table.Column<DateTime>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Radical = table.Column<double>(nullable: false),
                    CourseId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Scores", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Tests",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RegistrationDate = table.Column<DateTime>(nullable: false),
                    RegisterUserId = table.Column<string>(nullable: true),
                    Coefficient = table.Column<uint>(nullable: false),
                    Radical = table.Column<uint>(nullable: false),
                    IsGeneral = table.Column<bool>(nullable: false),
                    MultipleScore = table.Column<bool>(nullable: false),
                    UseAnonymity = table.Column<bool>(nullable: false),
                    ExpectedStartDate = table.Column<DateTime>(nullable: false),
                    ExpectedEndDate = table.Column<DateTime>(nullable: false),
                    StartDate = table.Column<DateTime>(nullable: true),
                    EndDate = table.Column<DateTime>(nullable: true),
                    PublicationDate = table.Column<DateTime>(nullable: true),
                    LastGroupingDate = table.Column<DateTime>(nullable: true),
                    Grouped = table.Column<bool>(nullable: false),
                    ClosingDate = table.Column<DateTime>(nullable: true),
                    TestGroupCount = table.Column<uint>(nullable: false),
                    PaperCount = table.Column<uint>(nullable: false),
                    CorrectedPaperCount = table.Column<uint>(nullable: false),
                    PresentPaperCount = table.Column<uint>(nullable: false),
                    ConsignedPaperCount = table.Column<uint>(nullable: false),
                    NotGroupedStudentCount = table.Column<uint>(nullable: false),
                    CourseId = table.Column<long>(nullable: true),
                    ExaminationLevelId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tests", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TestScores",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RegistrationDate = table.Column<DateTime>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Radical = table.Column<double>(nullable: false),
                    TestId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TestScores", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TestScores_Tests_TestId",
                        column: x => x.TestId,
                        principalTable: "Tests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Applications",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RegistrationDate = table.Column<DateTime>(nullable: false),
                    RegistrationId = table.Column<string>(nullable: true),
                    UserId = table.Column<string>(nullable: true),
                    FullName = table.Column<string>(nullable: true),
                    BirthDate = table.Column<DateTime>(nullable: false),
                    Gender = table.Column<char>(nullable: false),
                    ProcessUserId = table.Column<string>(nullable: true),
                    ProcessDate = table.Column<DateTime>(nullable: true),
                    StudentId = table.Column<long>(nullable: true),
                    LevelSpecialityId = table.Column<long>(nullable: true),
                    LevelId = table.Column<long>(nullable: false),
                    DepartmentId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Applications", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Correctors",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RegistrationDate = table.Column<DateTime>(nullable: false),
                    UserId = table.Column<string>(nullable: true),
                    MemberId = table.Column<long>(nullable: false),
                    DepartmentId = table.Column<long>(nullable: false),
                    TestGroupCorrectorCount = table.Column<int>(nullable: false),
                    PaperCount = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Correctors", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ExaminationDepartments",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RegistrationDate = table.Column<DateTime>(nullable: false),
                    StartDate = table.Column<DateTime>(nullable: true),
                    EndDate = table.Column<DateTime>(nullable: true),
                    ExaminationId = table.Column<long>(nullable: true),
                    DepartmentId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExaminationDepartments", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Levels",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RegistrationDate = table.Column<DateTime>(nullable: false),
                    Index = table.Column<int>(nullable: false),
                    DepartmentId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Levels", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Courses",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RegistrationDate = table.Column<DateTime>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    ChapterText = table.Column<string>(nullable: true),
                    PracticalWork = table.Column<bool>(nullable: false),
                    Code = table.Column<string>(nullable: true),
                    IsGeneral = table.Column<bool>(nullable: false),
                    LevelId = table.Column<long>(nullable: true),
                    Radical = table.Column<uint>(nullable: false),
                    MultipleScore = table.Column<bool>(nullable: false),
                    Coefficient = table.Column<uint>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Courses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Courses_Levels_LevelId",
                        column: x => x.LevelId,
                        principalTable: "Levels",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ExaminationLevels",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RegistrationDate = table.Column<DateTime>(nullable: false),
                    StartDate = table.Column<DateTime>(nullable: true),
                    EndDate = table.Column<DateTime>(nullable: true),
                    LevelId = table.Column<long>(nullable: true),
                    ExaminationDepartmentId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExaminationLevels", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ExaminationLevels_ExaminationDepartments_ExaminationDepartmentId",
                        column: x => x.ExaminationDepartmentId,
                        principalTable: "ExaminationDepartments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ExaminationLevels_Levels_LevelId",
                        column: x => x.LevelId,
                        principalTable: "Levels",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Principals",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RegistrationDate = table.Column<DateTime>(nullable: false),
                    RegisterUserId = table.Column<string>(nullable: true),
                    UserId = table.Column<string>(nullable: true),
                    MemberId = table.Column<long>(nullable: false),
                    DepartmentId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Principals", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Rooms",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RegistrationDate = table.Column<DateTime>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Capacity = table.Column<uint>(nullable: false),
                    Address = table.Column<string>(nullable: true),
                    RegisterUserId = table.Column<string>(nullable: true),
                    SchoolId = table.Column<long>(nullable: false),
                    DepartmentId = table.Column<long>(nullable: true),
                    LevelId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rooms", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Rooms_Levels_LevelId",
                        column: x => x.LevelId,
                        principalTable: "Levels",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "TestGroups",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RegistrationDate = table.Column<DateTime>(nullable: false),
                    StartDate = table.Column<DateTime>(nullable: true),
                    EndDate = table.Column<DateTime>(nullable: true),
                    Capacity = table.Column<uint>(nullable: false),
                    Index = table.Column<int>(nullable: false),
                    IsClosed = table.Column<bool>(nullable: false),
                    PaperCount = table.Column<uint>(nullable: false),
                    CorrectedPaperCount = table.Column<uint>(nullable: false),
                    PresentPaperCount = table.Column<uint>(nullable: false),
                    ConsignedPaperCount = table.Column<uint>(nullable: false),
                    RoomId = table.Column<long>(nullable: true),
                    TestId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TestGroups", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TestGroups_Rooms_RoomId",
                        column: x => x.RoomId,
                        principalTable: "Rooms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TestGroups_Tests_TestId",
                        column: x => x.TestId,
                        principalTable: "Tests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Secretaries",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RegistrationDate = table.Column<DateTime>(nullable: false),
                    RegisterUserId = table.Column<string>(nullable: true),
                    UserId = table.Column<string>(nullable: true),
                    MemberId = table.Column<long>(nullable: false),
                    DepartmentId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Secretaries", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TestGroupSecretaries",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RegistrationDate = table.Column<DateTime>(nullable: false),
                    SecretaryId = table.Column<long>(nullable: true),
                    TestGroupId = table.Column<long>(nullable: false),
                    PaperCount = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TestGroupSecretaries", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TestGroupSecretaries_Secretaries_SecretaryId",
                        column: x => x.SecretaryId,
                        principalTable: "Secretaries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TestGroupSecretaries_TestGroups_TestGroupId",
                        column: x => x.TestGroupId,
                        principalTable: "TestGroups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Specialities",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RegistrationDate = table.Column<DateTime>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    DepartmentId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Specialities", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ExaminationSpecialities",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RegistrationDate = table.Column<DateTime>(nullable: false),
                    SpecialityId = table.Column<long>(nullable: true),
                    ExaminationDepartmentId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExaminationSpecialities", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ExaminationSpecialities_ExaminationDepartments_ExaminationDepartmentId",
                        column: x => x.ExaminationDepartmentId,
                        principalTable: "ExaminationDepartments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ExaminationSpecialities_Specialities_SpecialityId",
                        column: x => x.SpecialityId,
                        principalTable: "Specialities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "LevelSpecialities",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RegistrationDate = table.Column<DateTime>(nullable: false),
                    SpecialityId = table.Column<long>(nullable: true),
                    LevelId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LevelSpecialities", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LevelSpecialities_Levels_LevelId",
                        column: x => x.LevelId,
                        principalTable: "Levels",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_LevelSpecialities_Specialities_SpecialityId",
                        column: x => x.SpecialityId,
                        principalTable: "Specialities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ExaminationLevelSpecialities",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RegistrationDate = table.Column<DateTime>(nullable: false),
                    LevelSpecialityId = table.Column<long>(nullable: false),
                    ExaminationLevelId = table.Column<long>(nullable: true),
                    ExaminationSpecialityId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExaminationLevelSpecialities", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ExaminationLevelSpecialities_ExaminationLevels_ExaminationLevelId",
                        column: x => x.ExaminationLevelId,
                        principalTable: "ExaminationLevels",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ExaminationLevelSpecialities_ExaminationSpecialities_ExaminationSpecialityId",
                        column: x => x.ExaminationSpecialityId,
                        principalTable: "ExaminationSpecialities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ExaminationLevelSpecialities_LevelSpecialities_LevelSpecialityId",
                        column: x => x.LevelSpecialityId,
                        principalTable: "LevelSpecialities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Students",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RegistrationDate = table.Column<DateTime>(nullable: false),
                    RegistrationId = table.Column<string>(nullable: true),
                    FullName = table.Column<string>(nullable: true),
                    BirthDate = table.Column<DateTime>(nullable: false),
                    Gender = table.Column<char>(nullable: false),
                    UserId = table.Column<string>(nullable: true),
                    RegisterUserId = table.Column<string>(nullable: true),
                    LevelId = table.Column<long>(nullable: false),
                    LevelSpecialityId = table.Column<long>(nullable: true),
                    DepartmentId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Students", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Students_Levels_LevelId",
                        column: x => x.LevelId,
                        principalTable: "Levels",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Students_LevelSpecialities_LevelSpecialityId",
                        column: x => x.LevelSpecialityId,
                        principalTable: "LevelSpecialities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ExaminationStudents",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RegistrationDate = table.Column<DateTime>(nullable: false),
                    StudentId = table.Column<long>(nullable: false),
                    ExaminationLevelId = table.Column<long>(nullable: true),
                    ExaminationLevelSpecialityId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExaminationStudents", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ExaminationStudents_ExaminationLevels_ExaminationLevelId",
                        column: x => x.ExaminationLevelId,
                        principalTable: "ExaminationLevels",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ExaminationStudents_ExaminationLevelSpecialities_ExaminationLevelSpecialityId",
                        column: x => x.ExaminationLevelSpecialityId,
                        principalTable: "ExaminationLevelSpecialities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ExaminationStudents_Students_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Students",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Supervisors",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RegistrationDate = table.Column<DateTime>(nullable: false),
                    UserId = table.Column<string>(nullable: true),
                    MemberId = table.Column<long>(nullable: false),
                    DepartmentId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Supervisors", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TestGroupSupervisors",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RegistrationDate = table.Column<DateTime>(nullable: false),
                    IsPrincipal = table.Column<bool>(nullable: false),
                    SupervisorId = table.Column<long>(nullable: true),
                    TestGroupId = table.Column<long>(nullable: false),
                    PaperCount = table.Column<uint>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TestGroupSupervisors", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TestGroupSupervisors_Supervisors_SupervisorId",
                        column: x => x.SupervisorId,
                        principalTable: "Supervisors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TestGroupSupervisors_TestGroups_TestGroupId",
                        column: x => x.TestGroupId,
                        principalTable: "TestGroups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Papers",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RegistrationDate = table.Column<DateTime>(nullable: false),
                    Score = table.Column<double>(nullable: true),
                    GroupIndex = table.Column<int>(nullable: true),
                    Anonymity = table.Column<string>(nullable: true),
                    StartDate = table.Column<DateTime>(nullable: true),
                    EndDate = table.Column<DateTime>(nullable: true),
                    TestId = table.Column<long>(nullable: false),
                    TestLevelSpecialityId = table.Column<long>(nullable: true),
                    TestGroupId = table.Column<long>(nullable: true),
                    ExaminationStudentId = table.Column<long>(nullable: true),
                    TestGroupSupervisorId = table.Column<long>(nullable: true),
                    SupervisorComment = table.Column<string>(nullable: true),
                    SupervisorUserId = table.Column<string>(nullable: true),
                    CollectorUserId = table.Column<string>(nullable: true),
                    TestGroupCorrectorId = table.Column<long>(nullable: true),
                    CorrectorUserId = table.Column<string>(nullable: true),
                    CorrectorComment = table.Column<string>(nullable: true),
                    TestGroupSecretaryId = table.Column<long>(nullable: true),
                    SecretaryUserId = table.Column<string>(nullable: true),
                    SecretaryComment = table.Column<string>(nullable: true),
                    ContestCount = table.Column<int>(nullable: false),
                    PaperFileCount = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Papers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Papers_ExaminationStudents_ExaminationStudentId",
                        column: x => x.ExaminationStudentId,
                        principalTable: "ExaminationStudents",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Papers_TestGroupCorrectors_TestGroupCorrectorId",
                        column: x => x.TestGroupCorrectorId,
                        principalTable: "TestGroupCorrectors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Papers_TestGroups_TestGroupId",
                        column: x => x.TestGroupId,
                        principalTable: "TestGroups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Papers_TestGroupSecretaries_TestGroupSecretaryId",
                        column: x => x.TestGroupSecretaryId,
                        principalTable: "TestGroupSecretaries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Papers_TestGroupSupervisors_TestGroupSupervisorId",
                        column: x => x.TestGroupSupervisorId,
                        principalTable: "TestGroupSupervisors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Papers_Tests_TestId",
                        column: x => x.TestId,
                        principalTable: "Tests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Papers_TestLevelSpecialities_TestLevelSpecialityId",
                        column: x => x.TestLevelSpecialityId,
                        principalTable: "TestLevelSpecialities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Contests",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RegistrationDate = table.Column<DateTime>(nullable: false),
                    Comment = table.Column<string>(nullable: true),
                    Resolved = table.Column<bool>(nullable: false),
                    PaperId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Contests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Contests_Papers_PaperId",
                        column: x => x.PaperId,
                        principalTable: "Papers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PaperFiles",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RegistrationDate = table.Column<DateTime>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Corrected = table.Column<bool>(nullable: false),
                    Index = table.Column<int>(nullable: false),
                    Url = table.Column<string>(nullable: true),
                    PaperId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PaperFiles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PaperFiles_Papers_PaperId",
                        column: x => x.PaperId,
                        principalTable: "Papers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ScorePapers",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RegistrationDate = table.Column<DateTime>(nullable: false),
                    TestScoreId = table.Column<long>(nullable: false),
                    PaperId = table.Column<long>(nullable: true),
                    Value = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ScorePapers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ScorePapers_Papers_PaperId",
                        column: x => x.PaperId,
                        principalTable: "Papers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ScorePapers_TestScores_TestScoreId",
                        column: x => x.TestScoreId,
                        principalTable: "TestScores",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Teachers",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RegistrationDate = table.Column<DateTime>(nullable: false),
                    UserId = table.Column<string>(nullable: true),
                    MemberId = table.Column<long>(nullable: false),
                    DepartmentId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Teachers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Planners",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RegistrationDate = table.Column<DateTime>(nullable: false),
                    RegisterUserId = table.Column<string>(nullable: true),
                    UserId = table.Column<string>(nullable: true),
                    MemberId = table.Column<long>(nullable: false),
                    SchoolId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Planners", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Schools",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RegistrationDate = table.Column<DateTime>(nullable: false),
                    RegisterUserId = table.Column<string>(nullable: true),
                    PrincipalUserId = table.Column<string>(nullable: true),
                    PrincipalId1 = table.Column<long>(nullable: true),
                    PrincipalId = table.Column<long>(nullable: true),
                    Identifier = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    Acronym = table.Column<string>(nullable: true),
                    Address = table.Column<string>(nullable: true),
                    HasImage = table.Column<bool>(nullable: false),
                    HasCoverImage = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Schools", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Departments",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RegistrationDate = table.Column<DateTime>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Acronym = table.Column<string>(nullable: true),
                    Address = table.Column<string>(nullable: true),
                    PrincipalUserId = table.Column<string>(nullable: true),
                    HasImage = table.Column<bool>(nullable: false),
                    HasCoverImage = table.Column<bool>(nullable: false),
                    SchoolId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Departments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Departments_Schools_SchoolId",
                        column: x => x.SchoolId,
                        principalTable: "Schools",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Examinations",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RegistrationDate = table.Column<DateTime>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    IsClosed = table.Column<bool>(nullable: false),
                    ExpectedStartDate = table.Column<DateTime>(nullable: false),
                    ExpectedEndDate = table.Column<DateTime>(nullable: false),
                    StartDate = table.Column<DateTime>(nullable: true),
                    EndDate = table.Column<DateTime>(nullable: true),
                    SchoolId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Examinations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Examinations_Schools_SchoolId",
                        column: x => x.SchoolId,
                        principalTable: "Schools",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Members",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RegistrationDate = table.Column<DateTime>(nullable: false),
                    UserId = table.Column<string>(nullable: true),
                    SchoolId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Members", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Members_Schools_SchoolId",
                        column: x => x.SchoolId,
                        principalTable: "Schools",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Applications_DepartmentId",
                table: "Applications",
                column: "DepartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_Applications_LevelId",
                table: "Applications",
                column: "LevelId");

            migrationBuilder.CreateIndex(
                name: "IX_Applications_LevelSpecialityId",
                table: "Applications",
                column: "LevelSpecialityId");

            migrationBuilder.CreateIndex(
                name: "IX_Applications_StudentId",
                table: "Applications",
                column: "StudentId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Contests_PaperId",
                table: "Contests",
                column: "PaperId");

            migrationBuilder.CreateIndex(
                name: "IX_Correctors_DepartmentId",
                table: "Correctors",
                column: "DepartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_Correctors_MemberId",
                table: "Correctors",
                column: "MemberId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CourseHours_CourseId",
                table: "CourseHours",
                column: "CourseId");

            migrationBuilder.CreateIndex(
                name: "IX_CourseHours_CourseTeacherId",
                table: "CourseHours",
                column: "CourseTeacherId");

            migrationBuilder.CreateIndex(
                name: "IX_CourseHours_RoomId",
                table: "CourseHours",
                column: "RoomId");

            migrationBuilder.CreateIndex(
                name: "IX_CourseLevelSpecialities_CourseId",
                table: "CourseLevelSpecialities",
                column: "CourseId");

            migrationBuilder.CreateIndex(
                name: "IX_CourseLevelSpecialities_LevelSpecialityId",
                table: "CourseLevelSpecialities",
                column: "LevelSpecialityId");

            migrationBuilder.CreateIndex(
                name: "IX_Courses_LevelId",
                table: "Courses",
                column: "LevelId");

            migrationBuilder.CreateIndex(
                name: "IX_CourseSessions_CourseHourId",
                table: "CourseSessions",
                column: "CourseHourId");

            migrationBuilder.CreateIndex(
                name: "IX_CourseSessions_CourseId",
                table: "CourseSessions",
                column: "CourseId");

            migrationBuilder.CreateIndex(
                name: "IX_CourseSessions_CourseTeacherId",
                table: "CourseSessions",
                column: "CourseTeacherId");

            migrationBuilder.CreateIndex(
                name: "IX_CourseSessions_RoomId",
                table: "CourseSessions",
                column: "RoomId");

            migrationBuilder.CreateIndex(
                name: "IX_CourseTeachers_CourseId",
                table: "CourseTeachers",
                column: "CourseId");

            migrationBuilder.CreateIndex(
                name: "IX_CourseTeachers_TeacherId",
                table: "CourseTeachers",
                column: "TeacherId");

            migrationBuilder.CreateIndex(
                name: "IX_Departments_SchoolId",
                table: "Departments",
                column: "SchoolId");

            migrationBuilder.CreateIndex(
                name: "IX_ExaminationDepartments_DepartmentId",
                table: "ExaminationDepartments",
                column: "DepartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_ExaminationDepartments_ExaminationId",
                table: "ExaminationDepartments",
                column: "ExaminationId");

            migrationBuilder.CreateIndex(
                name: "IX_ExaminationLevels_ExaminationDepartmentId",
                table: "ExaminationLevels",
                column: "ExaminationDepartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_ExaminationLevels_LevelId",
                table: "ExaminationLevels",
                column: "LevelId");

            migrationBuilder.CreateIndex(
                name: "IX_ExaminationLevelSpecialities_ExaminationLevelId",
                table: "ExaminationLevelSpecialities",
                column: "ExaminationLevelId");

            migrationBuilder.CreateIndex(
                name: "IX_ExaminationLevelSpecialities_ExaminationSpecialityId",
                table: "ExaminationLevelSpecialities",
                column: "ExaminationSpecialityId");

            migrationBuilder.CreateIndex(
                name: "IX_ExaminationLevelSpecialities_LevelSpecialityId",
                table: "ExaminationLevelSpecialities",
                column: "LevelSpecialityId");

            migrationBuilder.CreateIndex(
                name: "IX_Examinations_SchoolId",
                table: "Examinations",
                column: "SchoolId");

            migrationBuilder.CreateIndex(
                name: "IX_ExaminationSpecialities_ExaminationDepartmentId",
                table: "ExaminationSpecialities",
                column: "ExaminationDepartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_ExaminationSpecialities_SpecialityId",
                table: "ExaminationSpecialities",
                column: "SpecialityId");

            migrationBuilder.CreateIndex(
                name: "IX_ExaminationStudents_ExaminationLevelId",
                table: "ExaminationStudents",
                column: "ExaminationLevelId");

            migrationBuilder.CreateIndex(
                name: "IX_ExaminationStudents_ExaminationLevelSpecialityId",
                table: "ExaminationStudents",
                column: "ExaminationLevelSpecialityId");

            migrationBuilder.CreateIndex(
                name: "IX_ExaminationStudents_StudentId",
                table: "ExaminationStudents",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_Levels_DepartmentId",
                table: "Levels",
                column: "DepartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_LevelSpecialities_LevelId",
                table: "LevelSpecialities",
                column: "LevelId");

            migrationBuilder.CreateIndex(
                name: "IX_LevelSpecialities_SpecialityId",
                table: "LevelSpecialities",
                column: "SpecialityId");

            migrationBuilder.CreateIndex(
                name: "IX_Members_SchoolId",
                table: "Members",
                column: "SchoolId");

            migrationBuilder.CreateIndex(
                name: "IX_PaperFiles_PaperId",
                table: "PaperFiles",
                column: "PaperId");

            migrationBuilder.CreateIndex(
                name: "IX_Papers_ExaminationStudentId",
                table: "Papers",
                column: "ExaminationStudentId");

            migrationBuilder.CreateIndex(
                name: "IX_Papers_TestGroupCorrectorId",
                table: "Papers",
                column: "TestGroupCorrectorId");

            migrationBuilder.CreateIndex(
                name: "IX_Papers_TestGroupId",
                table: "Papers",
                column: "TestGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_Papers_TestGroupSecretaryId",
                table: "Papers",
                column: "TestGroupSecretaryId");

            migrationBuilder.CreateIndex(
                name: "IX_Papers_TestGroupSupervisorId",
                table: "Papers",
                column: "TestGroupSupervisorId");

            migrationBuilder.CreateIndex(
                name: "IX_Papers_TestId",
                table: "Papers",
                column: "TestId");

            migrationBuilder.CreateIndex(
                name: "IX_Papers_TestLevelSpecialityId",
                table: "Papers",
                column: "TestLevelSpecialityId");

            migrationBuilder.CreateIndex(
                name: "IX_Planners_MemberId",
                table: "Planners",
                column: "MemberId");

            migrationBuilder.CreateIndex(
                name: "IX_Planners_SchoolId",
                table: "Planners",
                column: "SchoolId");

            migrationBuilder.CreateIndex(
                name: "IX_Principals_DepartmentId",
                table: "Principals",
                column: "DepartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_Principals_MemberId",
                table: "Principals",
                column: "MemberId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Rooms_DepartmentId",
                table: "Rooms",
                column: "DepartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_Rooms_LevelId",
                table: "Rooms",
                column: "LevelId");

            migrationBuilder.CreateIndex(
                name: "IX_Rooms_SchoolId",
                table: "Rooms",
                column: "SchoolId");

            migrationBuilder.CreateIndex(
                name: "IX_Schools_PrincipalId1",
                table: "Schools",
                column: "PrincipalId1");

            migrationBuilder.CreateIndex(
                name: "IX_ScorePapers_PaperId",
                table: "ScorePapers",
                column: "PaperId");

            migrationBuilder.CreateIndex(
                name: "IX_ScorePapers_TestScoreId",
                table: "ScorePapers",
                column: "TestScoreId");

            migrationBuilder.CreateIndex(
                name: "IX_Scores_CourseId",
                table: "Scores",
                column: "CourseId");

            migrationBuilder.CreateIndex(
                name: "IX_Secretaries_DepartmentId",
                table: "Secretaries",
                column: "DepartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_Secretaries_MemberId",
                table: "Secretaries",
                column: "MemberId");

            migrationBuilder.CreateIndex(
                name: "IX_Specialities_DepartmentId",
                table: "Specialities",
                column: "DepartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_Students_DepartmentId",
                table: "Students",
                column: "DepartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_Students_LevelId",
                table: "Students",
                column: "LevelId");

            migrationBuilder.CreateIndex(
                name: "IX_Students_LevelSpecialityId",
                table: "Students",
                column: "LevelSpecialityId");

            migrationBuilder.CreateIndex(
                name: "IX_Supervisors_DepartmentId",
                table: "Supervisors",
                column: "DepartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_Supervisors_MemberId",
                table: "Supervisors",
                column: "MemberId");

            migrationBuilder.CreateIndex(
                name: "IX_Teachers_DepartmentId",
                table: "Teachers",
                column: "DepartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_Teachers_MemberId",
                table: "Teachers",
                column: "MemberId");

            migrationBuilder.CreateIndex(
                name: "IX_TestGroupCorrectors_CorrectorId",
                table: "TestGroupCorrectors",
                column: "CorrectorId");

            migrationBuilder.CreateIndex(
                name: "IX_TestGroupCorrectors_TestGroupId",
                table: "TestGroupCorrectors",
                column: "TestGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_TestGroups_RoomId",
                table: "TestGroups",
                column: "RoomId");

            migrationBuilder.CreateIndex(
                name: "IX_TestGroups_TestId",
                table: "TestGroups",
                column: "TestId");

            migrationBuilder.CreateIndex(
                name: "IX_TestGroupSecretaries_SecretaryId",
                table: "TestGroupSecretaries",
                column: "SecretaryId");

            migrationBuilder.CreateIndex(
                name: "IX_TestGroupSecretaries_TestGroupId",
                table: "TestGroupSecretaries",
                column: "TestGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_TestGroupSupervisors_SupervisorId",
                table: "TestGroupSupervisors",
                column: "SupervisorId");

            migrationBuilder.CreateIndex(
                name: "IX_TestGroupSupervisors_TestGroupId",
                table: "TestGroupSupervisors",
                column: "TestGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_TestLevelSpecialities_CourseLevelSpecialityId",
                table: "TestLevelSpecialities",
                column: "CourseLevelSpecialityId");

            migrationBuilder.CreateIndex(
                name: "IX_TestLevelSpecialities_ExaminationLevelSpecialityId",
                table: "TestLevelSpecialities",
                column: "ExaminationLevelSpecialityId");

            migrationBuilder.CreateIndex(
                name: "IX_TestLevelSpecialities_TestId",
                table: "TestLevelSpecialities",
                column: "TestId");

            migrationBuilder.CreateIndex(
                name: "IX_Tests_CourseId",
                table: "Tests",
                column: "CourseId");

            migrationBuilder.CreateIndex(
                name: "IX_Tests_ExaminationLevelId",
                table: "Tests",
                column: "ExaminationLevelId");

            migrationBuilder.CreateIndex(
                name: "IX_TestScores_TestId",
                table: "TestScores",
                column: "TestId");

            migrationBuilder.AddForeignKey(
                name: "FK_TestGroupCorrectors_TestGroups_TestGroupId",
                table: "TestGroupCorrectors",
                column: "TestGroupId",
                principalTable: "TestGroups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TestGroupCorrectors_Correctors_CorrectorId",
                table: "TestGroupCorrectors",
                column: "CorrectorId",
                principalTable: "Correctors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CourseSessions_Courses_CourseId",
                table: "CourseSessions",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CourseSessions_CourseTeachers_CourseTeacherId",
                table: "CourseSessions",
                column: "CourseTeacherId",
                principalTable: "CourseTeachers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_CourseSessions_Rooms_RoomId",
                table: "CourseSessions",
                column: "RoomId",
                principalTable: "Rooms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_CourseSessions_CourseHours_CourseHourId",
                table: "CourseSessions",
                column: "CourseHourId",
                principalTable: "CourseHours",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_TestLevelSpecialities_ExaminationLevelSpecialities_ExaminationLevelSpecialityId",
                table: "TestLevelSpecialities",
                column: "ExaminationLevelSpecialityId",
                principalTable: "ExaminationLevelSpecialities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_TestLevelSpecialities_Tests_TestId",
                table: "TestLevelSpecialities",
                column: "TestId",
                principalTable: "Tests",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_TestLevelSpecialities_CourseLevelSpecialities_CourseLevelSpecialityId",
                table: "TestLevelSpecialities",
                column: "CourseLevelSpecialityId",
                principalTable: "CourseLevelSpecialities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_CourseHours_Courses_CourseId",
                table: "CourseHours",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CourseHours_CourseTeachers_CourseTeacherId",
                table: "CourseHours",
                column: "CourseTeacherId",
                principalTable: "CourseTeachers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_CourseHours_Rooms_RoomId",
                table: "CourseHours",
                column: "RoomId",
                principalTable: "Rooms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_CourseLevelSpecialities_LevelSpecialities_LevelSpecialityId",
                table: "CourseLevelSpecialities",
                column: "LevelSpecialityId",
                principalTable: "LevelSpecialities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CourseLevelSpecialities_Courses_CourseId",
                table: "CourseLevelSpecialities",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_CourseTeachers_Courses_CourseId",
                table: "CourseTeachers",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_CourseTeachers_Teachers_TeacherId",
                table: "CourseTeachers",
                column: "TeacherId",
                principalTable: "Teachers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Scores_Courses_CourseId",
                table: "Scores",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tests_Courses_CourseId",
                table: "Tests",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Tests_ExaminationLevels_ExaminationLevelId",
                table: "Tests",
                column: "ExaminationLevelId",
                principalTable: "ExaminationLevels",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Applications_Departments_DepartmentId",
                table: "Applications",
                column: "DepartmentId",
                principalTable: "Departments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Applications_Levels_LevelId",
                table: "Applications",
                column: "LevelId",
                principalTable: "Levels",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Applications_LevelSpecialities_LevelSpecialityId",
                table: "Applications",
                column: "LevelSpecialityId",
                principalTable: "LevelSpecialities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Applications_Students_StudentId",
                table: "Applications",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Correctors_Departments_DepartmentId",
                table: "Correctors",
                column: "DepartmentId",
                principalTable: "Departments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Correctors_Members_MemberId",
                table: "Correctors",
                column: "MemberId",
                principalTable: "Members",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ExaminationDepartments_Departments_DepartmentId",
                table: "ExaminationDepartments",
                column: "DepartmentId",
                principalTable: "Departments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ExaminationDepartments_Examinations_ExaminationId",
                table: "ExaminationDepartments",
                column: "ExaminationId",
                principalTable: "Examinations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Levels_Departments_DepartmentId",
                table: "Levels",
                column: "DepartmentId",
                principalTable: "Departments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Principals_Departments_DepartmentId",
                table: "Principals",
                column: "DepartmentId",
                principalTable: "Departments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Principals_Members_MemberId",
                table: "Principals",
                column: "MemberId",
                principalTable: "Members",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Rooms_Departments_DepartmentId",
                table: "Rooms",
                column: "DepartmentId",
                principalTable: "Departments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Rooms_Schools_SchoolId",
                table: "Rooms",
                column: "SchoolId",
                principalTable: "Schools",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Secretaries_Departments_DepartmentId",
                table: "Secretaries",
                column: "DepartmentId",
                principalTable: "Departments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Secretaries_Members_MemberId",
                table: "Secretaries",
                column: "MemberId",
                principalTable: "Members",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Specialities_Departments_DepartmentId",
                table: "Specialities",
                column: "DepartmentId",
                principalTable: "Departments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Students_Departments_DepartmentId",
                table: "Students",
                column: "DepartmentId",
                principalTable: "Departments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Supervisors_Departments_DepartmentId",
                table: "Supervisors",
                column: "DepartmentId",
                principalTable: "Departments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Supervisors_Members_MemberId",
                table: "Supervisors",
                column: "MemberId",
                principalTable: "Members",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Teachers_Departments_DepartmentId",
                table: "Teachers",
                column: "DepartmentId",
                principalTable: "Departments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Teachers_Members_MemberId",
                table: "Teachers",
                column: "MemberId",
                principalTable: "Members",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Planners_Members_MemberId",
                table: "Planners",
                column: "MemberId",
                principalTable: "Members",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Planners_Schools_SchoolId",
                table: "Planners",
                column: "SchoolId",
                principalTable: "Schools",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Schools_Members_PrincipalId1",
                table: "Schools",
                column: "PrincipalId1",
                principalTable: "Members",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Schools_Members_PrincipalId1",
                table: "Schools");

            migrationBuilder.DropTable(
                name: "Applications");

            migrationBuilder.DropTable(
                name: "Contests");

            migrationBuilder.DropTable(
                name: "CourseSessions");

            migrationBuilder.DropTable(
                name: "PaperFiles");

            migrationBuilder.DropTable(
                name: "Planners");

            migrationBuilder.DropTable(
                name: "Principals");

            migrationBuilder.DropTable(
                name: "ScorePapers");

            migrationBuilder.DropTable(
                name: "Scores");

            migrationBuilder.DropTable(
                name: "CourseHours");

            migrationBuilder.DropTable(
                name: "Papers");

            migrationBuilder.DropTable(
                name: "TestScores");

            migrationBuilder.DropTable(
                name: "CourseTeachers");

            migrationBuilder.DropTable(
                name: "ExaminationStudents");

            migrationBuilder.DropTable(
                name: "TestGroupCorrectors");

            migrationBuilder.DropTable(
                name: "TestGroupSecretaries");

            migrationBuilder.DropTable(
                name: "TestGroupSupervisors");

            migrationBuilder.DropTable(
                name: "TestLevelSpecialities");

            migrationBuilder.DropTable(
                name: "Teachers");

            migrationBuilder.DropTable(
                name: "Students");

            migrationBuilder.DropTable(
                name: "Correctors");

            migrationBuilder.DropTable(
                name: "Secretaries");

            migrationBuilder.DropTable(
                name: "Supervisors");

            migrationBuilder.DropTable(
                name: "TestGroups");

            migrationBuilder.DropTable(
                name: "CourseLevelSpecialities");

            migrationBuilder.DropTable(
                name: "ExaminationLevelSpecialities");

            migrationBuilder.DropTable(
                name: "Rooms");

            migrationBuilder.DropTable(
                name: "Tests");

            migrationBuilder.DropTable(
                name: "ExaminationSpecialities");

            migrationBuilder.DropTable(
                name: "LevelSpecialities");

            migrationBuilder.DropTable(
                name: "Courses");

            migrationBuilder.DropTable(
                name: "ExaminationLevels");

            migrationBuilder.DropTable(
                name: "Specialities");

            migrationBuilder.DropTable(
                name: "ExaminationDepartments");

            migrationBuilder.DropTable(
                name: "Levels");

            migrationBuilder.DropTable(
                name: "Examinations");

            migrationBuilder.DropTable(
                name: "Departments");

            migrationBuilder.DropTable(
                name: "Members");

            migrationBuilder.DropTable(
                name: "Schools");
        }
    }
}
