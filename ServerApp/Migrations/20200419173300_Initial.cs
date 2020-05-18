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
                    ExpectedStartDate = table.Column<DateTime>(nullable: false),
                    ExpectedEndDate = table.Column<DateTime>(nullable: false),
                    StartDate = table.Column<DateTime>(nullable: true),
                    EndDate = table.Column<DateTime>(nullable: true),
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
                    PaperCount = table.Column<int>(nullable: false),
                    CorrectedPaperCount = table.Column<int>(nullable: false)
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
                    UserId = table.Column<string>(nullable: true),
                    RegisterUserId = table.Column<string>(nullable: true),
                    GroupId = table.Column<long>(nullable: true),
                    ExaminationId = table.Column<long>(nullable: true),
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
                        onDelete: ReferentialAction.Restrict);
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
                name: "TestGroups",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RegistrationDate = table.Column<DateTime>(nullable: false),
                    StartDate = table.Column<DateTime>(nullable: true),
                    EndDate = table.Column<DateTime>(nullable: true),
                    GroupId = table.Column<long>(nullable: true),
                    RoomId = table.Column<long>(nullable: false),
                    TestId = table.Column<long>(nullable: false),
                    PaperCount = table.Column<long>(nullable: false),
                    TestSupervisorCount = table.Column<long>(nullable: false),
                    PaperManagerCount = table.Column<int>(nullable: false)
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
                    ExaminationId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Applications", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Applications_Examinations_ExaminationId",
                        column: x => x.ExaminationId,
                        principalTable: "Examinations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
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
                name: "PaperManagers",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RegistrationDate = table.Column<DateTime>(nullable: false),
                    RegisterUserId = table.Column<string>(nullable: true),
                    UserId = table.Column<string>(nullable: true),
                    TestGroupId = table.Column<long>(nullable: false),
                    PaperCount = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PaperManagers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PaperManagers_TestGroups_TestGroupId",
                        column: x => x.TestGroupId,
                        principalTable: "TestGroups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TestSupervisors",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RegistrationDate = table.Column<DateTime>(nullable: false),
                    IsPrincipal = table.Column<bool>(nullable: false),
                    SupervisorId = table.Column<long>(nullable: false),
                    TestGroupId = table.Column<long>(nullable: true),
                    GroupId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TestSupervisors", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TestSupervisors_Supervisors_SupervisorId",
                        column: x => x.SupervisorId,
                        principalTable: "Supervisors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TestSupervisors_TestGroups_TestGroupId",
                        column: x => x.TestGroupId,
                        principalTable: "TestGroups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Papers",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RegistrationDate = table.Column<DateTime>(nullable: false),
                    Score = table.Column<decimal>(nullable: false),
                    RegisterUserId = table.Column<string>(nullable: true),
                    ArrivalDate = table.Column<DateTime>(nullable: true),
                    ReportUserId = table.Column<string>(nullable: true),
                    Comment = table.Column<string>(nullable: true),
                    EndDate = table.Column<DateTime>(nullable: true),
                    Anonymity = table.Column<string>(nullable: true),
                    PaperManagerUserId = table.Column<string>(nullable: true),
                    PaperManagerId = table.Column<long>(nullable: true),
                    CorrectorId = table.Column<long>(nullable: true),
                    TestGroupId = table.Column<long>(nullable: false),
                    StudentId = table.Column<long>(nullable: false),
                    TestSupervisorId = table.Column<long>(nullable: true),
                    ContestCount = table.Column<int>(nullable: false),
                    ReviewCount = table.Column<int>(nullable: false),
                    PaperFileCount = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Papers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Papers_Correctors_CorrectorId",
                        column: x => x.CorrectorId,
                        principalTable: "Correctors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Papers_PaperManagers_PaperManagerId",
                        column: x => x.PaperManagerId,
                        principalTable: "PaperManagers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Papers_Students_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Students",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Papers_TestGroups_TestGroupId",
                        column: x => x.TestGroupId,
                        principalTable: "TestGroups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Papers_TestSupervisors_TestSupervisorId",
                        column: x => x.TestSupervisorId,
                        principalTable: "TestSupervisors",
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
                name: "IX_PaperManagers_TestGroupId",
                table: "PaperManagers",
                column: "TestGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_PaperReviews_PaperId",
                table: "PaperReviews",
                column: "PaperId");

            migrationBuilder.CreateIndex(
                name: "IX_Papers_CorrectorId",
                table: "Papers",
                column: "CorrectorId");

            migrationBuilder.CreateIndex(
                name: "IX_Papers_PaperManagerId",
                table: "Papers",
                column: "PaperManagerId");

            migrationBuilder.CreateIndex(
                name: "IX_Papers_StudentId",
                table: "Papers",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_Papers_TestGroupId",
                table: "Papers",
                column: "TestGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_Papers_TestSupervisorId",
                table: "Papers",
                column: "TestSupervisorId");

            migrationBuilder.CreateIndex(
                name: "IX_Principals_ExaminationId",
                table: "Principals",
                column: "ExaminationId");

            migrationBuilder.CreateIndex(
                name: "IX_Rooms_OrganisationId",
                table: "Rooms",
                column: "OrganisationId");

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

            migrationBuilder.CreateIndex(
                name: "IX_TestSupervisors_SupervisorId",
                table: "TestSupervisors",
                column: "SupervisorId");

            migrationBuilder.CreateIndex(
                name: "IX_TestSupervisors_TestGroupId",
                table: "TestSupervisors",
                column: "TestGroupId");
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
                name: "TestReviews");

            migrationBuilder.DropTable(
                name: "Papers");

            migrationBuilder.DropTable(
                name: "Correctors");

            migrationBuilder.DropTable(
                name: "PaperManagers");

            migrationBuilder.DropTable(
                name: "Students");

            migrationBuilder.DropTable(
                name: "TestSupervisors");

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
