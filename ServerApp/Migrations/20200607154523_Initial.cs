using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Exam.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Organisations",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RegistrationDate = table.Column<DateTime>(nullable: false),
                    UserId = table.Column<string>(nullable: true),
                    AdminUserId = table.Column<string>(nullable: true),
                    Identifier = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    Address = table.Column<string>(nullable: true),
                    ImageName = table.Column<string>(nullable: true),
                    ImageUrl = table.Column<string>(nullable: true),
                    AdminCount = table.Column<long>(nullable: false),
                    ExaminationCount = table.Column<long>(nullable: false),
                    RoomCount = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Organisations", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Admins",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RegistrationDate = table.Column<DateTime>(nullable: false),
                    RegisterUserId = table.Column<string>(nullable: true),
                    UserId = table.Column<string>(nullable: true),
                    Role = table.Column<string>(nullable: true),
                    OrganisationId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Admins", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Admins_Organisations_OrganisationId",
                        column: x => x.OrganisationId,
                        principalTable: "Organisations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Examinations",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RegistrationDate = table.Column<DateTime>(nullable: false),
                    RegisterUserId = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    RequireSpeciality = table.Column<bool>(nullable: false),
                    IsClosed = table.Column<bool>(nullable: false),
                    ExpectedStartDate = table.Column<DateTime>(nullable: false),
                    ExpectedEndDate = table.Column<DateTime>(nullable: false),
                    StartDate = table.Column<DateTime>(nullable: true),
                    EndDate = table.Column<DateTime>(nullable: true),
                    LastGroupingDate = table.Column<DateTime>(nullable: true),
                    OrganisationId = table.Column<long>(nullable: false),
                    PrincipalCount = table.Column<int>(nullable: false),
                    StudentCount = table.Column<int>(nullable: false),
                    TestCount = table.Column<int>(nullable: false),
                    CorrectorCount = table.Column<int>(nullable: false),
                    GroupCount = table.Column<int>(nullable: false),
                    SupervisorCount = table.Column<int>(nullable: false),
                    ApplicationCount = table.Column<int>(nullable: false),
                    AcceptedApplicationCount = table.Column<int>(nullable: false),
                    RejectedApplicationCount = table.Column<int>(nullable: false),
                    ReviewCount = table.Column<int>(nullable: false),
                    ReviewAverage = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Examinations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Examinations_Organisations_OrganisationId",
                        column: x => x.OrganisationId,
                        principalTable: "Organisations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Rooms",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RegistrationDate = table.Column<DateTime>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Capacity = table.Column<long>(nullable: false),
                    Address = table.Column<string>(nullable: true),
                    RegisterUserId = table.Column<string>(nullable: true),
                    OrganisationId = table.Column<long>(nullable: false),
                    GroupCount = table.Column<long>(nullable: false),
                    TestGroupCount = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rooms", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Rooms_Organisations_OrganisationId",
                        column: x => x.OrganisationId,
                        principalTable: "Organisations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Correctors",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RegistrationDate = table.Column<DateTime>(nullable: false),
                    UserId = table.Column<string>(nullable: true),
                    ExaminationId = table.Column<long>(nullable: false),
                    TestGroupCorrectorCount = table.Column<int>(nullable: false),
                    PaperCount = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Correctors", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Correctors_Examinations_ExaminationId",
                        column: x => x.ExaminationId,
                        principalTable: "Examinations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ExaminationReviews",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RegistrationDate = table.Column<DateTime>(nullable: false),
                    UserId = table.Column<string>(nullable: true),
                    Score = table.Column<string>(nullable: true),
                    Comment = table.Column<string>(nullable: true),
                    ExaminationId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExaminationReviews", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ExaminationReviews_Examinations_ExaminationId",
                        column: x => x.ExaminationId,
                        principalTable: "Examinations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Principals",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RegistrationDate = table.Column<DateTime>(nullable: false),
                    RegisterUserId = table.Column<string>(nullable: true),
                    UserId = table.Column<string>(nullable: true),
                    Role = table.Column<string>(nullable: true),
                    ExaminationId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Principals", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Principals_Examinations_ExaminationId",
                        column: x => x.ExaminationId,
                        principalTable: "Examinations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Secretaries",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RegistrationDate = table.Column<DateTime>(nullable: false),
                    UserId = table.Column<string>(nullable: true),
                    RegisterUserId = table.Column<string>(nullable: true),
                    ExaminationId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Secretaries", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Secretaries_Examinations_ExaminationId",
                        column: x => x.ExaminationId,
                        principalTable: "Examinations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Specialities",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RegistrationDate = table.Column<DateTime>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    ExaminationId = table.Column<long>(nullable: true),
                    StudentCount = table.Column<int>(nullable: false),
                    GroupCount = table.Column<int>(nullable: false),
                    TestCount = table.Column<int>(nullable: false),
                    ApplicationCount = table.Column<int>(nullable: false),
                    AcceptedApplicationCount = table.Column<int>(nullable: false),
                    RejectedApplicationCount = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Specialities", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Specialities_Examinations_ExaminationId",
                        column: x => x.ExaminationId,
                        principalTable: "Examinations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Supervisors",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RegistrationDate = table.Column<DateTime>(nullable: false),
                    UserId = table.Column<string>(nullable: true),
                    ExaminationId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Supervisors", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Supervisors_Examinations_ExaminationId",
                        column: x => x.ExaminationId,
                        principalTable: "Examinations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Groups",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RegistrationDate = table.Column<DateTime>(nullable: false),
                    RegisterUserId = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    Index = table.Column<int>(nullable: false),
                    ExaminationId = table.Column<long>(nullable: true),
                    SpecialityId = table.Column<long>(nullable: true),
                    RoomId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Groups", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Groups_Examinations_ExaminationId",
                        column: x => x.ExaminationId,
                        principalTable: "Examinations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Groups_Rooms_RoomId",
                        column: x => x.RoomId,
                        principalTable: "Rooms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Groups_Specialities_SpecialityId",
                        column: x => x.SpecialityId,
                        principalTable: "Specialities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Tests",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RegistrationDate = table.Column<DateTime>(nullable: false),
                    RegisterUserId = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    Code = table.Column<string>(nullable: true),
                    Coefficient = table.Column<long>(nullable: false),
                    Radical = table.Column<int>(nullable: false),
                    PublicationDate = table.Column<DateTime>(nullable: true),
                    ClosingDate = table.Column<DateTime>(nullable: true),
                    UseAnonymity = table.Column<bool>(nullable: false),
                    ExpectedStartDate = table.Column<DateTime>(nullable: false),
                    ExpectedEndDate = table.Column<DateTime>(nullable: false),
                    StartDate = table.Column<DateTime>(nullable: true),
                    EndDate = table.Column<DateTime>(nullable: true),
                    SpecialityId = table.Column<long>(nullable: true),
                    ExaminationId = table.Column<long>(nullable: true),
                    ReviewCount = table.Column<int>(nullable: false),
                    GroupCount = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Tests_Examinations_ExaminationId",
                        column: x => x.ExaminationId,
                        principalTable: "Examinations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Tests_Specialities_SpecialityId",
                        column: x => x.SpecialityId,
                        principalTable: "Specialities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Students",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RegistrationDate = table.Column<DateTime>(nullable: false),
                    RegistrationId = table.Column<string>(nullable: true),
                    FullName = table.Column<string>(nullable: true),
                    BirthDate = table.Column<DateTime>(nullable: false),
                    Gender = table.Column<string>(nullable: false),
                    Index = table.Column<int>(nullable: false),
                    GroupIndex = table.Column<int>(nullable: false),
                    UserId = table.Column<string>(nullable: true),
                    RegisterUserId = table.Column<string>(nullable: true),
                    GroupId = table.Column<long>(nullable: true),
                    ExaminationId = table.Column<long>(nullable: false),
                    SpecialityId = table.Column<long>(nullable: true),
                    PaperCount = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Students", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Students_Examinations_ExaminationId",
                        column: x => x.ExaminationId,
                        principalTable: "Examinations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Students_Groups_GroupId",
                        column: x => x.GroupId,
                        principalTable: "Groups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Students_Specialities_SpecialityId",
                        column: x => x.SpecialityId,
                        principalTable: "Specialities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Scores",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RegistrationDate = table.Column<DateTime>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Radical = table.Column<double>(nullable: false),
                    TestId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Scores", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Scores_Tests_TestId",
                        column: x => x.TestId,
                        principalTable: "Tests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TestGroups",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RegistrationDate = table.Column<DateTime>(nullable: false),
                    StartDate = table.Column<DateTime>(nullable: true),
                    EndDate = table.Column<DateTime>(nullable: true),
                    IsClosed = table.Column<bool>(nullable: false),
                    GroupId = table.Column<long>(nullable: true),
                    RoomId = table.Column<long>(nullable: false),
                    TestId = table.Column<long>(nullable: false),
                    PaperCount = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TestGroups", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TestGroups_Groups_GroupId",
                        column: x => x.GroupId,
                        principalTable: "Groups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TestGroups_Rooms_RoomId",
                        column: x => x.RoomId,
                        principalTable: "Rooms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TestGroups_Tests_TestId",
                        column: x => x.TestId,
                        principalTable: "Tests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TestReviews",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RegistrationDate = table.Column<DateTime>(nullable: false),
                    UserId = table.Column<string>(nullable: true),
                    Score = table.Column<string>(nullable: true),
                    Comment = table.Column<string>(nullable: true),
                    TestId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TestReviews", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TestReviews_Tests_TestId",
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
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RegistrationDate = table.Column<DateTime>(nullable: false),
                    RegistrationId = table.Column<string>(nullable: true),
                    UserId = table.Column<string>(nullable: true),
                    FullName = table.Column<string>(nullable: true),
                    BirthDate = table.Column<DateTime>(nullable: false),
                    Gender = table.Column<string>(nullable: false),
                    ProcessUserId = table.Column<string>(nullable: true),
                    ProcessDate = table.Column<DateTime>(nullable: true),
                    StudentId = table.Column<long>(nullable: true),
                    SpecialityId = table.Column<long>(nullable: true),
                    ExaminationId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Applications", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Applications_Examinations_ExaminationId",
                        column: x => x.ExaminationId,
                        principalTable: "Examinations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Applications_Specialities_SpecialityId",
                        column: x => x.SpecialityId,
                        principalTable: "Specialities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Applications_Students_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Students",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "TestGroupCorrectors",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RegistrationDate = table.Column<DateTime>(nullable: false),
                    CorrectorId = table.Column<long>(nullable: true),
                    TestGroupId = table.Column<long>(nullable: false),
                    PaperCount = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TestGroupCorrectors", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TestGroupCorrectors_Correctors_CorrectorId",
                        column: x => x.CorrectorId,
                        principalTable: "Correctors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TestGroupCorrectors_TestGroups_TestGroupId",
                        column: x => x.TestGroupId,
                        principalTable: "TestGroups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TestGroupSecretaries",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
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
                name: "TestGroupSupervisors",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RegistrationDate = table.Column<DateTime>(nullable: false),
                    IsPrincipal = table.Column<bool>(nullable: false),
                    SupervisorId = table.Column<long>(nullable: true),
                    TestGroupId = table.Column<long>(nullable: false)
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
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RegistrationDate = table.Column<DateTime>(nullable: false),
                    Score = table.Column<double>(nullable: true),
                    Anonymity = table.Column<string>(nullable: true),
                    StartDate = table.Column<DateTime>(nullable: true),
                    EndDate = table.Column<DateTime>(nullable: true),
                    TestGroupId = table.Column<long>(nullable: false),
                    StudentId = table.Column<long>(nullable: true),
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
                    ReviewCount = table.Column<int>(nullable: false),
                    PaperFileCount = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Papers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Papers_Students_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Students",
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
                        onDelete: ReferentialAction.Cascade);
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
                });

            migrationBuilder.CreateTable(
                name: "Contests",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
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
                        .Annotation("SqlServer:Identity", "1, 1"),
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
                name: "PaperReviews",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RegistrationDate = table.Column<DateTime>(nullable: false),
                    UserId = table.Column<string>(nullable: true),
                    Score = table.Column<string>(nullable: true),
                    Comment = table.Column<string>(nullable: true),
                    PaperId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PaperReviews", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PaperReviews_Papers_PaperId",
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
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RegistrationDate = table.Column<DateTime>(nullable: false),
                    ScoreId = table.Column<long>(nullable: false),
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
                        name: "FK_ScorePapers_Scores_ScoreId",
                        column: x => x.ScoreId,
                        principalTable: "Scores",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Admins_OrganisationId",
                table: "Admins",
                column: "OrganisationId");

            migrationBuilder.CreateIndex(
                name: "IX_Applications_ExaminationId",
                table: "Applications",
                column: "ExaminationId");

            migrationBuilder.CreateIndex(
                name: "IX_Applications_SpecialityId",
                table: "Applications",
                column: "SpecialityId");

            migrationBuilder.CreateIndex(
                name: "IX_Applications_StudentId",
                table: "Applications",
                column: "StudentId",
                unique: true,
                filter: "[StudentId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Contests_PaperId",
                table: "Contests",
                column: "PaperId");

            migrationBuilder.CreateIndex(
                name: "IX_Correctors_ExaminationId",
                table: "Correctors",
                column: "ExaminationId");

            migrationBuilder.CreateIndex(
                name: "IX_ExaminationReviews_ExaminationId",
                table: "ExaminationReviews",
                column: "ExaminationId");

            migrationBuilder.CreateIndex(
                name: "IX_Examinations_OrganisationId",
                table: "Examinations",
                column: "OrganisationId");

            migrationBuilder.CreateIndex(
                name: "IX_Groups_ExaminationId",
                table: "Groups",
                column: "ExaminationId");

            migrationBuilder.CreateIndex(
                name: "IX_Groups_RoomId",
                table: "Groups",
                column: "RoomId");

            migrationBuilder.CreateIndex(
                name: "IX_Groups_SpecialityId",
                table: "Groups",
                column: "SpecialityId");

            migrationBuilder.CreateIndex(
                name: "IX_PaperFiles_PaperId",
                table: "PaperFiles",
                column: "PaperId");

            migrationBuilder.CreateIndex(
                name: "IX_PaperReviews_PaperId",
                table: "PaperReviews",
                column: "PaperId");

            migrationBuilder.CreateIndex(
                name: "IX_Papers_StudentId",
                table: "Papers",
                column: "StudentId");

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
                name: "IX_Principals_ExaminationId",
                table: "Principals",
                column: "ExaminationId");

            migrationBuilder.CreateIndex(
                name: "IX_Rooms_OrganisationId",
                table: "Rooms",
                column: "OrganisationId");

            migrationBuilder.CreateIndex(
                name: "IX_ScorePapers_PaperId",
                table: "ScorePapers",
                column: "PaperId");

            migrationBuilder.CreateIndex(
                name: "IX_ScorePapers_ScoreId",
                table: "ScorePapers",
                column: "ScoreId");

            migrationBuilder.CreateIndex(
                name: "IX_Scores_TestId",
                table: "Scores",
                column: "TestId");

            migrationBuilder.CreateIndex(
                name: "IX_Secretaries_ExaminationId",
                table: "Secretaries",
                column: "ExaminationId");

            migrationBuilder.CreateIndex(
                name: "IX_Specialities_ExaminationId",
                table: "Specialities",
                column: "ExaminationId");

            migrationBuilder.CreateIndex(
                name: "IX_Students_ExaminationId",
                table: "Students",
                column: "ExaminationId");

            migrationBuilder.CreateIndex(
                name: "IX_Students_GroupId",
                table: "Students",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_Students_SpecialityId",
                table: "Students",
                column: "SpecialityId");

            migrationBuilder.CreateIndex(
                name: "IX_Supervisors_ExaminationId",
                table: "Supervisors",
                column: "ExaminationId");

            migrationBuilder.CreateIndex(
                name: "IX_TestGroupCorrectors_CorrectorId",
                table: "TestGroupCorrectors",
                column: "CorrectorId");

            migrationBuilder.CreateIndex(
                name: "IX_TestGroupCorrectors_TestGroupId",
                table: "TestGroupCorrectors",
                column: "TestGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_TestGroups_GroupId",
                table: "TestGroups",
                column: "GroupId");

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
                name: "IX_TestReviews_TestId",
                table: "TestReviews",
                column: "TestId");

            migrationBuilder.CreateIndex(
                name: "IX_Tests_ExaminationId",
                table: "Tests",
                column: "ExaminationId");

            migrationBuilder.CreateIndex(
                name: "IX_Tests_SpecialityId",
                table: "Tests",
                column: "SpecialityId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Admins");

            migrationBuilder.DropTable(
                name: "Applications");

            migrationBuilder.DropTable(
                name: "Contests");

            migrationBuilder.DropTable(
                name: "ExaminationReviews");

            migrationBuilder.DropTable(
                name: "PaperFiles");

            migrationBuilder.DropTable(
                name: "PaperReviews");

            migrationBuilder.DropTable(
                name: "Principals");

            migrationBuilder.DropTable(
                name: "ScorePapers");

            migrationBuilder.DropTable(
                name: "TestReviews");

            migrationBuilder.DropTable(
                name: "Papers");

            migrationBuilder.DropTable(
                name: "Scores");

            migrationBuilder.DropTable(
                name: "Students");

            migrationBuilder.DropTable(
                name: "TestGroupCorrectors");

            migrationBuilder.DropTable(
                name: "TestGroupSecretaries");

            migrationBuilder.DropTable(
                name: "TestGroupSupervisors");

            migrationBuilder.DropTable(
                name: "Correctors");

            migrationBuilder.DropTable(
                name: "Secretaries");

            migrationBuilder.DropTable(
                name: "Supervisors");

            migrationBuilder.DropTable(
                name: "TestGroups");

            migrationBuilder.DropTable(
                name: "Groups");

            migrationBuilder.DropTable(
                name: "Tests");

            migrationBuilder.DropTable(
                name: "Rooms");

            migrationBuilder.DropTable(
                name: "Specialities");

            migrationBuilder.DropTable(
                name: "Examinations");

            migrationBuilder.DropTable(
                name: "Organisations");
        }
    }
}
